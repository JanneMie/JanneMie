import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from "@testing-library/react";

function App() {

  

  // alle 15 = sairaalloinen alipaino (alert-danger)      NÄITÄ KÄYTETÄÄN DIV CLASSINA!!!
  // 15 - 17 = merkittävä alipaino (alert-danger)
  // 17 - 18,5 = normaalia alhaisempi paino (alert-warning)
  // 18,5 - 25 = normaali paino (alert-success)
  // 25 - 30 = lievä ylipaino (alert-warning)
  // 30 - 35 = merkittävä ylipaino (alert-warning)
  // 35- 40 = vaikea ylipaino (alert-danger)
  // yli 40 = sairaalloinen ylipaino (alert-danger)
  
  const [painoindeksi, setPainoindeksi] = useState("");
  const [paino, setPaino] = useState("");
  const [pituus, setPituus] = useState("");

  
  const painoluokka1 = painoindeksi < 15;                                       // Eri painoluokat joihin painoindeksiä verrataan tulostuksen yhteydessä
  const painoluokka2 = painoindeksi <= 17 && painoindeksi > 15;
  const painoluokka3 = painoindeksi <= 18.5 && painoindeksi > 17;
  const painoluokka4 = painoindeksi <= 25 && painoindeksi > 18.5;
  const painoluokka5 = painoindeksi <= 30 && painoindeksi > 25;
  const painoluokka6 = painoindeksi <= 35 && painoindeksi > 30;
  const painoluokka7 = painoindeksi <= 40 && painoindeksi > 35;
  const painoluokka8 = painoindeksi > 40;

  const naytaPainoindeksi = () => {

    setPainoindeksi(`${Number(paino / ( (pituus / 100) * (pituus / 100))).toFixed(2)}`);    //Laskukaava painoindeksiä varten sekä pyöristys kahteen desimaaliin

  }

  

  return (



    
    <div className="container">

      <h1>Tehtävä 1 : Painoindeksi</h1>

      <h2>"Laske painoindeksisi!"</h2>

      <input className="form-control" 
             type="text" 
             placeholder="Anna pituutesi senttimetreinä..." 
             onChange={(e) => {
                setPituus(e.target.value);
             }}
             onFocus={(e) => {
                setPainoindeksi("");
             }}
             />

<input className="form-control" 
             type="text" 
             placeholder="Anna painosi kilogrammoina..." 
             onChange={(e) => {
                setPaino(e.target.value);
             }}
             onFocus={(e) => {
                setPainoindeksi("");
             }}
             />

      <button className="btn btn-primary btn-block" onClick={naytaPainoindeksi}>Laske painoindeksi</button>
      
      {
        (painoindeksi) 
        
        ? <div className="card card-body mt-3">
            {"Painoindeksisi on: " + painoindeksi}
            {(painoluokka1) ? <div className= "alert alert-danger mt-2">{"Sairaalloinen alipaino"}</div> : null}
            {(painoluokka2) ? <div className= "alert alert-danger mt-2">{"Merkittävä alipaino"}</div> : null}
            {(painoluokka3) ? <div className= "alert alert-warning mt-2">{"Normaalia alhaisempi paino"}</div> : null}
            {(painoluokka4) ? <div className= "alert alert-success mt-2">{"Normaali paino"}</div> : null}
            {(painoluokka5) ? <div className= "alert alert-warning mt-2">{"Lievä ylipaino"}</div> : null}
            {(painoluokka6) ? <div className= "alert alert-warning mt-2">{"Merkittävä ylipaino"}</div> : null}
            {(painoluokka7) ? <div className= "alert alert-danger mt-2">{"Vaikea ylipaino"}</div> : null}
            {(painoluokka8) ? <div className= "alert alert-danger mt-2">{"Sairaalloinen ylipaino"}</div> : null}
         
            
          </div> 
          
          
          : null 
      }


    </div>

  );
          
  

}

export default App;
