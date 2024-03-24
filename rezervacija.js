const fs = require('fs');

class Rezervacija {
  constructor(putanja) {
    this.putanja = putanja;
  }

  citajRezervacije() {
    try {
      const podaci = fs.readFileSync(this.putanja, 'utf-8');
      const redovi = podaci.split('\n');
      const rezervacije = [];
  
      for (let i = 0; i < redovi.length; i++) {
        const red = redovi[i];
        if (red.trim() === '') continue;
        const polja = red.split(';');
        rezervacije.push(polja);
      }
  
      return rezervacije;
    } catch (error) {
      console.log('Greška prilikom čitanja rezervacija:', error);
      return [];
    }
  }
  

  pisiRezervaciju(novaRezervacija) {
    const noviZapis = [
      novaRezervacija.ime,
      novaRezervacija.prezime,
      novaRezervacija.broj_mobitela,
      novaRezervacija.rezervacija,
      novaRezervacija.vrijeme,
      novaRezervacija.broj_osoba,
      novaRezervacija.opcija,
      novaRezervacija.napomena,
      novaRezervacija.prihvacam_uvjete + ";"
    ].join(";") + '\n';
  
    try {
      fs.appendFileSync(this.putanja, noviZapis, 'utf-8');
      console.log('Rezervacija uspješno spremljena.');
    } catch (error) {
      console.log('Greška prilikom pisanja rezervacije:', error);
    }
  }
  

  obrisiRezervaciju(redak) {
    try {
      const rezervacije = this.citajRezervacije();
      if (redak < 0 || redak >= rezervacije.length) {
        return false; 
      }
      rezervacije.splice(redak, 1);
      const noviZapis = rezervacije.map(red => red.join(";")).join("\n");
      fs.writeFileSync(this.putanja, noviZapis, 'utf-8');
      return true; 
    } catch (error) {
      console.log('Greška prilikom brisanja rezervacije:', error);
      return false; 
    }
  }
  
  
}

module.exports = Rezervacija;
