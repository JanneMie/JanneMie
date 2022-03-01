const mysql = require("mysql");

const yhteys = mysql.createConnection({
                                        "host" : "localhost",
                                        "user" : "root",
                                        "password" : "",
                                        "database" : "keskustelupalsta"
                                      });

yhteys.connect((err) => {

    if (!err) {

        console.log("Yhteys tietokantapalvelimeen avattu!");

    } else {

        throw err;

    }

});                                      


module.exports = {

    haeKaikkiPalvelut : (callback) => {

        let sql = "SELECT * FROM keskustelut ORDER BY aikaleima DESC";

        yhteys.query(sql, (err, data) => {

            callback(err, data);

        });

    },

    haePalvelu : (otsikko, callback) => {

        let sql = "SELECT * FROM keskustelut WHERE otsikko = ?";

        yhteys.query(sql, [otsikko], (err, data) => {

            callback(err, data);

        });

    },

    muokkaaPalvelua : (tiedot, callback) => {

        let sql = "UPDATE keskustelut SET sisältö = ?, kirjoittaja = ? WHERE otsikko = ?";

        yhteys.query(sql, [tiedot.sisältö, tiedot.kirjoittaja, tiedot.otsikko], (err) => {

            callback(err);            

        });

    },

    kirjoitaPalvelua : (tiedot, callback) => {

        let sql = "INSERT INTO keskustelut SET otsikko = ?, sisältö = ?, kirjoittaja = ?, aikaleima = ?";

        yhteys.query(sql, [tiedot.otsikko, tiedot.sisältö, tiedot.kirjoittaja, tiedot.aikaleima], (err) => {

            callback(err);            

        });

    }



};