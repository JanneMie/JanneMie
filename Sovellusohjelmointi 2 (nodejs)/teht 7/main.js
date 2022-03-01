const express = require("express");
const app = express();
const keskustelut = require("./models/keskustelut");
const bodyParser = require("body-parser");

const portti = 3007;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended" : true }));

app.set("views", "./views");
app.set("view engine", "ejs");

app.post("/tallenna/", (req, res) => {

    keskustelut.muokkaaPalvelua(req.body, (err) => {

        if (err) throw err;

        res.redirect("/");

    });    

});

app.post("/kirjoita/", (req, res) => {

    keskustelut.kirjoitaPalvelua(req.body, (err) => {

        if (err) throw err;

        res.redirect("/");

    });    

});

app.get('/uusi', (req, res) => {
    res.render('uusikeskustelu');
   });


app.get("/muokkaa/:otsikko", (req, res) => {

    let otsikko = req.params.otsikko;

    keskustelut.haePalvelu(otsikko, (err, data) => {

        if (err) throw err;

        res.render("keskustelu", { "keskustelut" : data[0] });

    });


});


app.get("/", (req, res) => {

    keskustelut.haeKaikkiPalvelut((err, data) => {

        if (err) throw err;

        res.render("index", { "keskustelut" : data });

    });

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi portiin: ${portti}`);

});