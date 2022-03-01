const express = require("express");
const app = express();

const multer = require("multer");
const upload = multer({ dest : "./public/uploads/" }); // Tässä määritellään mitä muuttuja upload tekee, käyttää multeria ja sitten osoite minne tallennetaan

const fs = require("fs"); // File System

const portti = 3003;
const tiedostonimi = "./hakemukset.json"; 

app.use(express.static("./public/")); // Public kansio on se joka näkyy kaikille, jos ei halua jotain näytettävän niin se pitää siirtää muualle

app.post("/hakemus/", upload.single("tiedosto"), (req, res) => { //Tällä koodilla lähetetään yksi tiedosto, pitää vastata html:n tekstejä, muuten ei toimi. req.filen tekee upload middleware

    fs.readFile(tiedostonimi, (err, data) => { // Tiedoston nimeksi tulee tiivistefunktion tulos

        if (!err) {

            let hakemukset = JSON.parse(data); // Muuttaa data kuten stringissä kuvattu

           

            let uusihakemus = { 
                            
                            "henkilötunnus" : req.body.hetu,
                            "opiskelijanumero" : req.body.numero,
                            "oppilaitos" : req.body.oppi,
                            "kotikunta" : req.body.kunta,
                            "kansalaisuus" : req.body.kansa,
                            "tiedosto" : req.file.filename  // Jos otsikon jättää pois niin pitäisi soveltua soveltaa työtä varten
                           };                               // '/uploads/${req.file.filename}'

            hakemukset.push(uusihakemus); // res.json näyttäisi json parin suoraan selaimessa (tästä voisi olla apua tehtävässä 9)

            fs.writeFileSync(tiedostonimi, JSON.stringify(hakemukset, null, 2));    // Asynkroninen tiedostonluku, keskimmäinen parametri on null, 2 merkkiä tyhjää          

        }

    });


    res.redirect("/kiitos.html");

});

app.get("/", (req, res) => {

    

    fs.readFile(tiedostonimi, (err, data) => {

        if (!err) {

            let hakemusarkistoHTML = ""; //Apumuuttuja

            let hakemukset = JSON.parse(data);

            
            
            hakemukset.forEach(hakemus => { // + symboli on lyhenne että muuttuja on muuttuja ja lisätty sisältö
                hakemusarkistoHTML += `
                                   
                                    <p class="mt-3">Henkilötunnus : ${hakemus.henkilötunnus}</p>
                                    <p class="mt-3">Opiskelijanumero : ${hakemus.opiskelijanumero}</p>
                                    <p class="mt-3">Oppilaitos : ${hakemus.oppilaitos}</p>
                                    <p class="mt-3"> Kotikunta : ${hakemus.kotikunta}</p>
                                    <p class="mt-3"> Kansalaisuus : ${hakemus.kansalaisuus}</p>
                                    
                                    <img src="uploads/${hakemus.tiedosto}" width="200">
                                    `;
            });



            let sivu2 = `  
                <!DOCTYPE html>
                <html lang="fi">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
                    <title>Soveltava harjoitustyö</title>
                    <style>
        body {
          background-color: rgb(172, 170, 170);
        }
        </style>
                </head>
                <body>
                    
                    <div class="container">

                    <img src="logo.jpg" alt="">
                
                    <h1 class="mb-4">Opiskelijakorttihakemus</h1>
                
                    <p>Täältä voit hakea itsellesi xamk:n opiskelijakorttia.
                    Sillä pääset käsiksi moneen rahanarvoiseen etuun. </p>
                
                    <a href="lisaa.html" class="btn btn-primary">Hae korttia</a>
                
                    

                    </div>
                
                </body>
                </html>    
                `;

            res.send(sivu2); // index.htmllää ei tarvita koska käytetään tätä päivitysmetodia

        }

    });


    

});



app.get("/hakemukset", (req, res) => {

    

    fs.readFile(tiedostonimi, (err, data) => {

        if (!err) {

            let hakemusarkistoHTML = ""; //Apumuuttuja

            let hakemukset = JSON.parse(data);

          
            
            hakemukset.forEach(hakemus => { // + symboli on lyhenne että muuttuja on muuttuja ja lisätty sisältö
                hakemusarkistoHTML += `
                                   
                                    <p class="mt-3">Henkilötunnus : ${hakemus.henkilötunnus}</p>
                                    <p class="mt-3">Opiskelijanumero : ${hakemus.opiskelijanumero}</p>
                                    <p class="mt-3">Oppilaitos : ${hakemus.oppilaitos}</p>
                                    <p class="mt-3"> Kotikunta : ${hakemus.kotikunta}</p>
                                    <p class="mt-3"> Kansalaisuus : ${hakemus.kansalaisuus}</p>
                                    
                                    <img src="uploads/${hakemus.tiedosto}" width="200">
                                    `;
            });



            let sivu = `  
                <!DOCTYPE html>
                <html lang="fi">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
                    <title>Soveltava harjoitustyö</title>
                    <style>
        body {
          background-color: rgb(172, 170, 170);
        }
        </style>
                </head>
                <body>
                    
                    <div class="container">
                
                    <img src="logo.jpg" alt="">
                
                    <h2 class="mb-4">Hakemukset</h2>
                
                    
                
                    ${hakemusarkistoHTML}

                    </div>
                
                </body>
                </html>    
                `;

            res.send(sivu); // index.htmllää ei tarvita koska käytetään tätä päivitysmetodia

        }

    });


    

});




app.listen(portti, () =>  {

   console.log(`Palvelin käynnistyi porttiin: ${portti}`); 

});