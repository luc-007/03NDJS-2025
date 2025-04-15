import * as cheerio from 'cheerio';
import { writeFile } from 'fs/promises';

async function getAndSaveStandings() {
  try {
    const $ = await cheerio.fromURL('https://www.lequipe.fr/Football/ligue-1/page-classement-equipes/general');
    const standings = $('table.table--teams tbody tr').map((i, row) => ({
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

    // Sauvegarde dans un fichier JSON
    await writeFile('scraper.json', JSON.stringify(standings, null, 2));
    console.log('Données sauvegardées dans scraper.json');

    return standings;
  } catch (error) {
    console.error('Erreur:', error.message);
    return [];
  }
}

// Appel de la fonction
getAndSaveStandings().then(standings => {
  console.log('Classement Ligue 1:');
  console.log(standings.map(t => `${t.position}. ${t.club} - ${t.points} pts`).join('\n'));
});