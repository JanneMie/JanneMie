import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Ostoskori from "./components/Ostoskori";
import Otsikko from "./components/Otsikko";
import Ohjeteksti from "./components/Ohjeteksti";
import Nappi from "./components/Nappi";
import { Checkmark } from 'react-checkmark'



function App() {

  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #20C41E 30%, #8D1EC4 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'black',
      height: 1300,
      padding: '0 500px',
    },
  });

 


  const classes = useStyles();

  const [ostokset, setOstokset] = useState([
                                            { 
                                              nimi : "Maito",
                                              poimittu : false
                                            },
                                            { 
                                              nimi : "Leipä",
                                              poimittu : false
                                            },
                                            { 
                                              nimi : "Makkara",
                                              poimittu : false
                                            },
                                            { 
                                              nimi : "Juusto",
                                              poimittu : false
                                            },
                                            { 
                                              nimi : "Kurkku",
                                              poimittu : false
                                            }
                                          ]);

  const lisaaOstos = (uusiOstos) => {

    let apuOstos = {
                        nimi : uusiOstos,
                        poimittu : false
                     }

    setOstokset([apuOstos, ...ostokset]);

  }

  const ostosPoimittu = (indeksi) => {

    ostokset[indeksi].poimittu = !ostokset[indeksi].poimittu;

    setOstokset([...ostokset]);

  }

  
 


  return (
    <div className={classes.root}>

      <Otsikko></Otsikko>

      <Ostoskori></Ostoskori>

      <h2>Ostoskori</h2>

      <input 
            className="form-control" 
            type="text" 
            placeholder="Lisää tuote..." 
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                lisaaOstos(e.target.value);
                e.target.value = null;
              }
            }}      
      />      

      <ul className="list-group mt-3">

      {ostokset.map((ostos, idx) => {

        return (
                <li className="list-group-item list-group-item-primary" key={idx} onClick={ () => { ostosPoimittu(idx) }}>
                 {
                  (ostos.poimittu === true)
                  ? <Checkmark size="small" color="#DF9025">{ostos.nimi}</Checkmark>
                  :  ostos.nimi
                }
                
                </li>


               )

               

      })}

      </ul>

      

      <Ohjeteksti></Ohjeteksti>

      <Nappi></Nappi>

    </div>
  );
}

export default App;
