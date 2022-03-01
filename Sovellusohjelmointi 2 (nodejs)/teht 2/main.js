    const express = require("express");

    const app = express();

    const portti = 3002;

    const bodyParser = require("body-parser");
    const fs = require("fs");

    app.use(bodyParser.json()); // Muunna lähetetyt tiedot JSON-muotoon

    app.use(bodyParser.urlencoded( { extended : true } )); // Määritelee käytetyn formin lähetystavan

    app.use(express.static("./public"));   

    app.post("/tallenna", (req, res) => {

        let vanhatViestit = fs.readFileSync("./viestit.txt");

        let nyt = Date();

        let pvm = nyt.toLocaleString();

        let viestit = `${vanhatViestit}

                       <i>${pvm}</i>
        
                       <p>
                       ${req.body.viesti}
                       </p>
                      `;

        fs.writeFileSync("./viestit.txt", viestit);

        res.redirect("/kiitos.html");

    });

    app.get("/lue.html", (req, res) => {

        let viestit = fs.readFileSync("./viestit.txt");

        let sivu = `<!DOCTYPE html>
                    <html lang="fi">
                    <head>
                        <meta charset="UTF-8">
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
                        <title>Demo 2: NodeJS ja ExpressJS</title>
                    </head>
                    <body>
                    
                        <div class="container">

                            <h1>Demo 2: NodeJS ja ExpressJS</h1>
                    
                            <h2>Vieraskirjan viestit</h2>

                            ${viestit}

                            <a class="btn btn-secondary" href="/">Palaa etusivulle</a>

                        </div>
                    
                    </body>
                    </html>
                   `;

        res.send(sivu);

    })


    app.listen(portti, () => { // Käynnistää palvelimen

        console.log(`Palvelin käynnistyi porttiin ${portti}`);

    });