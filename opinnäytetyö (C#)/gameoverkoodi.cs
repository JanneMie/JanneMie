using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using UnityEngine.UI;   // Tämä tarvitaan, että UI-elementit näkyvät koodissa

public class gameoverkoodi : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        // Haetaan pelaajan kenttään käyttämä aika ja näytetään se UI-elementissä text aika.
        float aikamaara = PlayerPrefs.GetFloat("Aika");
        GameObject.Find("Aika").GetComponent<Text>().text = "Aika = " + aikamaara.ToString("0.00") + " s";



    }   // start

    
}   //class
