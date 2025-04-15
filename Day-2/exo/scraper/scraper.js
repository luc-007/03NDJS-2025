import * as cheerio from 'cheerio';
import https from 'https';

const url = 'https://www.lequipe.fr/Football/ligue-1/page-classement-equipes/general';

async function scrapeStandings() {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => {
        try {
          const $ = cheerio.load(data);
          const standings = [];

          // Sélection du tableau et des lignes
          $('table.table--teams tbody tr').each((index, row) => {
            const columns = [];
            $(row).find('td').each((i, col) => {
              columns.push($(col).text().trim());
            });

            // Vérification pour éviter les lignes vides (en-têtes)
            if (columns.length > 0) {
              // Extraction des données spécifiques
              const club = columns[1]; // Nom du club (index peut varier selon la structure du tableau)
              const points = columns[11]; // Points (index peut varier)
              const joue = columns[2];
              const gagne = columns[3];
              const nul = columns[4];
              const perdu = columns[5];
              const bp = columns[6];
              const bc = columns[7];
              const diff = columns[8];

              standings.push({
                position: index + 1,
                club: club,
                points: points,
                joue: joue,
                gagne: gagne,
                nul: nul,
                perdu: perdu,
                bp: bp,
                bc: bc,
                diff: diff
              });
            }
          });

          if (!standings.length) throw new Error('Aucune donnée trouvée');
          resolve(standings);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Exécution
scrapeStandings()
  .then(standings => {
    console.log('Classement Ligue 1 2024-2025:');
    standings.forEach(team => {
      console.log(`
        ${team.position}. ${team.club}
        Points: ${team.points}
        Matchs Joués: ${team.joue}
        Gagnés: ${team.gagne}
        Nuls: ${team.nul}
        Perdus: ${team.perdu}
        Buts Pour: ${team.bp}
        Buts Contre: ${team.bc}
        Différence: ${team.diff}
      `);
    });
  })
  .catch(console.error);