import * as cheerio from 'cheerio';
import fs from 'fs/promises';

async function getLigue1Standings() {
  try {
    const $ = await cheerio.fromURL('https://www.lequipe.fr/Football/ligue-1/page-classement-equipes/general');

    return $('table.table--teams tbody tr').map((i, row) => ({
      position: i + 1,
      club: $(row).find('td').eq(1).text().trim(),
      points: $(row).find('td').eq(11).text().trim(),
      joue: $(row).find('td').eq(2).text().trim(),
      gagne: $(row).find('td').eq(3).text().trim(),
      nul: $(row).find('td').eq(4).text().trim(),
      perdu: $(row).find('td').eq(5).text().trim(),
      bp: $(row).find('td').eq(6).text().trim(),
      bc: $(row).find('td').eq(7).text().trim(),
      diff: $(row).find('td').eq(8).text().trim()
    })).get().filter(team => team.club);
  } catch (error) {
    console.error('Scraping error:', error);
    return [];
  }
}

async function exportToJson(data, filename = 'scraper.json') {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filename, jsonData, 'utf8');
    console.log(`Données exportées vers ${filename}`);
  } catch (error) {
    console.error('Erreur lors de l\'exportation vers JSON:', error);
  }
}

// Usage
async function main() {
  try {
    const standings = await getLigue1Standings();

    // Formater les données pour l'affichage (facultatif)
    const formattedStandings = standings.map(team =>
      `${team.position}. ${team.club.padEnd(20)} ${team.points} pts` +
      ` | MJ:${team.joue} G:${team.gagne} N:${team.nul} P:${team.perdu}` +
      ` | ${team.bp}-${team.bc} (${team.diff})`
    );

    // Exporter les données formatées vers un fichier JSON
    await exportToJson(formattedStandings, 'scraper.json');

    // Afficher les données formatées dans la console (facultatif)
    console.log('Classement Ligue 1 2024-2025:\n' + formattedStandings.join('\n'));

  } catch (error) {
    console.error("Erreur lors de l'exécution :", error);
  }
}

main();