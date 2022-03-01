const http = require("http");
const url = require("url");
const fs = require("fs");

const portti = 3001;

const palvelin = http.createServer((req, res) => {

    if (req.url != "/favicon.ico") {

        let otsikko = fs.readFileSync("https://learn.xamk.fi/pluginfile.php/495652/mod_assign/intro/lomake.html");

        let tiedot = url.parse(req.url, true).query;
  
        let nimi = (tiedot.nimi) ? tiedot.nimi : "Anna nimesi sekä sähköpostiosoitteesi ja hyväksy käyttöehdot";  

        res.writeHead(200, { "Content-type" : "text/html; charset=utf-8" });
        res.write(otsikko);
        res.write(`<p>Heippa, ${nimi}!</p>`);
        res.end();

    }

});

palvelin.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin ${portti}!`);

});

