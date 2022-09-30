using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class lopetuskoodi1 : MonoBehaviour
{
    
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            Application.Quit();
        } // if
        //Lopetetaan sovellus
    }   // Update
}   //class
