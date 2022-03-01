const express = require("express");
const app = express()
const bodyParser = require("body-parser");

const elokuvat = require("./models/elokuvat")

const portti = 3008; 

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./public")); //Tällä ei käyttöä tässä demossa

app.post("/haku/", (req, res) => {

    elokuvat.hae(req.body, (err, data) => { //Haetaan käyttäjät javascriptistä komennolla hae

        let tulosrivit = data.slice(0,10); //Palautettava data tietokannasta
        let tulosrivit2 = data.slice(0,11);
        let virhe = null; //Tällä muuttujalla käsitellää virheitä, alussa niitä ei ole eli arvo on null
        let virhe2 = null;
        let lomaketiedot = req.body;

        if (tulosrivit.length == 0) { //Jos haulla ei löytynyt yhtään tuloksia (tehtävässä 10+)

            virhe = `Hakusanalla ${lomaketiedot.hakusana} ei löytynyt yhtään elokuvaa`;
            tulosrivit = null;

        }

        if (tulosrivit2.length > 10) { //Jos haulla ei löytynyt yhtään tuloksia (tehtävässä 10+)
            tulosrivit;
            virhe2 = `Haulla löytyi yli kymmenen elokuvaa. Näytetään vain ensimmäiset 10 tulosta. Ole hyvä ja tarkenna hakua`;
           

        }

        if (err) {

            virhe = "Virhe tietokantayhteydessä. Yritä myöhemmin uudelleen.";
            tulosrivit = null;
            

        }

        if (req.body.hakusana.length == 1) { //Jos hakusanaa ei ole ollenkaan (tähän tehtävässä min 2)

            virhe = "Hakusana puuttuu. Anna hakusana.";
            tulosrivit = null;
            

        }

        if (req.body.hakusana.length == 0) { //Jos hakusanaa ei ole ollenkaan (tähän tehtävässä min 2)

            virhe = "Hakusana puuttuu. Anna hakusana.";
            tulosrivit = null;

        }



        res.render("index", { 
                                "elokuvat" : tulosrivit, //Ensin teksti ja sen jälkeen muuttuja
                                "virhe" : virhe, 
                                "virhe2" : virhe2,
                                "lomaketiedot" : lomaketiedot
                            });

    });

});


app.get("/", (req, res) => {
    
    let lomakeoletukset = {
                            "hakusana" : null,
                            
                            
                          };

    res.render("index", { 
                            "elokuvat" : null, 
                            "virhe" : null, 
                            "virhe2" : null,
                            "lomaketiedot" : lomakeoletukset
                        });
    
});

app.listen(portti, () => {
    
    console.log(`Palvelin käynnistyi porttiin ${portti}`);
    
});