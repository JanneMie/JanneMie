const mysql = require("mysql");
const yhteys = mysql.createConnection({
                                        host     : "localhost",
                                        user     : "root",
                                        password : "",
                                        database : "elokuvatietokanta"
                                    });

yhteys.connect((err) => {
    if(!err) {
        console.log("Tietokantayhteys avattu");    
    } else {
        throw `Virhe yhdistettäessä tietokantaan: ${err}`;    
    }
});

module.exports = {
    
    "hae" : (lomaketiedot, callback) => {

        let ehdot = []; //Uusi alustettu array johon voidaan push komennolla lisätä tavaraa

        if (lomaketiedot.haunkohde) { //Tällä tarkastetaan onko yhtään check / radio nappi valintaa tehtynä

            let hakuehdot;

            if (Array.isArray(lomaketiedot.haunkohde)) { //Jos useampia kortteja valittuna

                let kohteet = lomaketiedot.haunkohde.map((kohde) => {

                    return mysql.escape(kohde);

                });

                hakuehdot = kohteet.join(" OR haunkohde = "); //Tällä tulee lisää valintoja luottokorttityyppeihin

            } else {

                hakuehdot = mysql.escape(lomaketiedot.haunkohde); //Jos vain yksi kortti valittuna

            }

            ehdot.push(`(haunkohde = ${hakuehdot})`); //Tällä lisätään arrayhin checkboxit / radiobuttonit

        }

        if (lomaketiedot.haunkohde == "nimi") { //Tällä tavalla luodaan uusi ehto ehdot arrayhin

            ehdot.push(`(haunkohde = \'nimi\')`); //Kenoviiva on tietoturvaa varten

        } 

        if (lomaketiedot.haunkohde == "ohjaajat") {

            ehdot.push(`(haunkohde = \'ohjaajat\')`);

        }         

        let hakusana = mysql.escape(`%${lomaketiedot.hakusana}%`); //escape on tietoturvaa varten

        let hakusanaehdot = `(nimi LIKE ${hakusana})`; //like operaattorilla saadaan osanimet toimimaan (% eteen tai taakse vaikuttaa mitä saa olla edessä tai takana)

        let hakusanaehdot2 = `(ohjaajat LIKE ${hakusana})`;

        let hakusanaehdot3 = `(nayttelijat LIKE ${hakusana})`;

        

        ehdot.push(hakusanaehdot); //Tämäkin menee arrayhin ehtona

        let sql = `SELECT * FROM elokuvat WHERE ${ehdot.join(" AND ")} LIMIT 20;`; //Tähän kohtaan voi laittaa muitakin ehtoja kuten SORT BY tms, AND yhdistää arrayn kaikki ehdot (muista välit eteen ja taakse)

        console.log(sql); // debuggausta varten, ota pois tuotannossa

        yhteys.query(sql, (err, data) => { //Datassa on ne rivit jotka palautetaan tietokannasta

            callback(err, data);

        });

    }

};