using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// Jotta UI-elementit näkyvät
using UnityEngine.UI;

public class voittokoodi1 : MonoBehaviour
{
    
    void Start()
    {

        // Haetaan aika-arvo
        float aika1 = PlayerPrefs.GetFloat("aika");
        // Tulostetaan aika tekstikenttään
        GameObject.Find("aikateksti").GetComponent<Text>().text = "AIKA: " + aika1.ToString("0") + " s";
    }   // start

    
    void Update()
    {
        
    }   // update
}   // class
