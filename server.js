
const path = require('path');
const server= express();
const port = 12493;
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const Rezervacija = require('./rezervacija');
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());
server.use(express.json());
const express = require('express');


server.use(express.static('html'));

server.use('/css',express.static(path.join(__dirname,'css')));
server.use('/dokumenti',express.static(path.join(__dirname,'dokumenti')));
server.use('/jsk', express.static(path.join(__dirname, 'jsk')));
server.use(express.static('dokumentacija'));
server.use('/podaci', express.static(path.join(__dirname, 'podaci')));

 server.get('/', (zah, odg) => {
    odg.sendFile(path.join(__dirname,'html/index.html'))
  });

 server.get('/autor', (zah, odg) => {
    odg.sendFile(path.join(__dirname,'dokumentacija/autor.html'))
  });

  server.get('/dokumentacija', (zah, odg) => {
    odg.sendFile(path.join(__dirname,'dokumentacija/dokumentacija.html'))
  });

  server.get('/ponudaproljece', (zah, odg) => {
    odg.sendFile(path.join(__dirname,'html/ponudaproljece.html'))
  });

  server.get('/galerijaslika', (zah, odg) => {
    odg.sendFile(path.join(__dirname,'html/galerijaslika.html'))
  });

  server.get('/obrazac1', (zah, odg) => {
    odg.sendFile(path.join(__dirname,'html/obrazac1.html'))
  });

  server.get('/obrazac2', (zah, odg) => {
    odg.sendFile(path.join(__dirname,'html/obrazac2.html'))
  });

  server.get('/ponudapraznikrada', (zah, odg) => {
    odg.sendFile(path.join(__dirname,'html/ponudapraznikrada.html'))
  });

  server.get('/ponudavikend', (zah, odg) => {
    odg.sendFile(path.join(__dirname,'html/ponudavikend.html'))
  });

  server.get('/javascript', (zah, odg) => {
    odg.sendFile(path.join(__dirname, 'jsk/vvugrinec21.js'));
  });

  server.get('/slike', (zah, odg) => {
    odg.sendFile(path.join(__dirname,'dokumentacija','slike'));
  });

  server.get('/dinamicna', (zah, odg) => {
    const prvidio = fs.readFileSync('podaci/prvidio.txt','UTF-8');
    const drugidio = fs.readFileSync('podaci/drugidio.txt','UTF-8');
    const cjenik= JSON.parse(fs.readFileSync('podaci/cjenik.json','UTF-8'));

    function createTable(data) {
        let tableHTML = '<table id="cjenik">';
        tableHTML += '<thead><tr>';
      
        let columnIndex = 0;
        for (const key in data[0]) {
          let className = '';
          if (columnIndex === 0) {
            className = 'usluga';
          } else if (columnIndex === 1) {
            className = 'cijena';
          } else if (columnIndex === 2) {
            className = 'opis';
          }
      
          tableHTML += `<th class="${className}">${key}</th>`;
          columnIndex++;
        }
      
        tableHTML += '</tr></thead>';
        tableHTML += '<tbody>';
      
        data.forEach(row => {
          tableHTML += '<tr>';
      
          let columnIndex = 0;
          for (const key in row) {
            let className = '';
            if (columnIndex === 0) {
              className = 'usluga';
            } else if (columnIndex === 1) {
              className = 'cijena';
            } else if (columnIndex === 2) {
              className = 'opis';
            }
      
            tableHTML += `<td class="${className}">${row[key]}</td>`;
            columnIndex++;
          }
      
          tableHTML += '</tr>';
        });
      
        tableHTML += '</tbody>';
        tableHTML += '</table>';
      
        return tableHTML;
      }
      

      const cjelastranica = prvidio + createTable(cjenik) + drugidio;

      odg.send(cjelastranica);
      
  });

  
// GET metoda - Vraća popis svih rezervacija
server.get('/api/rezervacije', (zah, odg) => {
  const rezervacije = rezervacija.citajRezervacije();
  odg.status(200).json(rezervacije);
});
//POST metoda
const rezervacija = new Rezervacija('podaci/rezervacije.csv');

server.post("/api/rezervacije", (zah, odg) => {
  const novaRezervacija = zah.body;

  if (!novaRezervacija) {
    return odg.status(417).json({ greska: 'Nevaljani podaci' });
  }

  rezervacija.pisiRezervaciju(novaRezervacija);

  odg.status(200).json({ message: 'Podaci dodani' });
});

// PUT metoda - Nije implementirana
server.put('/api/rezervacije', (zah, odg) => {
  odg.status(501).json({ greska: 'Metoda nije implementirana' });
});

// DELETE metoda - Nije implementirana
server.delete('/api/rezervacije', (zah, odg) => {
  odg.status(501).json({ greska: 'Metoda nije implementirana' });
});

server.get("/api/rezervacije/:id", (zah, odg) => {
  const redak = parseInt(zah.params.id) - 1;
  const rezervacije = rezervacija.citajRezervacije();

  if (redak < 0 || redak >= rezervacije.length) {
    return odg.status(404).json({ greska: 'Nema resursa' });
  }

  const trazenaRezervacija = rezervacije[redak];
  const formatiranaRezervacija = {
    ime: trazenaRezervacija[0],
    prezime: trazenaRezervacija[1],
    broj_mobitela: trazenaRezervacija[2],
    rezervacija: trazenaRezervacija[3],
    vrijeme: trazenaRezervacija[4],
    broj_osoba: trazenaRezervacija[5],
    opcija: trazenaRezervacija[6],
    napomena: trazenaRezervacija[7],
    prihvacam_uvjete: trazenaRezervacija[8]
  };

  return odg.status(200).json(formatiranaRezervacija);
});



server.post('/api/rezervacije/:id', (zah, odg) => {
  odg.status(405).json({ greska: 'Metoda nije dopuštena' });
});

server.put('/api/rezervacije/:id', (zah, odg) => {
  odg.status(501).json({ greska: 'Metoda nije implementirana' });
});

server.delete("/api/rezervacije/:id", (zah, odg) => {
  const redak = parseInt(zah.params.id) - 1;
  const rezervacije = rezervacija.citajRezervacije();

  if (redak < 0 || redak >= rezervacije.length) {
    return odg.status(417).json({ greska: 'Nevaljani podaci' });
  }

  const uspjesnoObrisano = rezervacija.obrisiRezervaciju(redak);

  if (uspjesnoObrisano) {
    return odg.status(200).json({ message: 'Podaci obrisani' });
  } else {
    return odg.status(417).json({ greska: 'Nevaljani podaci' });
  }
});

  server.use((zah, odg) => {
    odg.status(404);
    odg.send('<a href="/">Početna stranica</a>');
  });

  server.listen(port, () => {
    console.log(`Server je pokrenut na portu ${port}`);
  });

