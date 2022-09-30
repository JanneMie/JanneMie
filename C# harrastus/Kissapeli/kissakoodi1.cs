using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class kissakoodi1 : MonoBehaviour
{
    
    void Start()
    {
        
    }   // start

    
    void Update()
    {
        // Pyöritetään kissaa
        
    }   // update

    private void OnTriggerEnter(Collider other)
    {
        // Oliko törmääjä pelaaja
        if (other.name.Equals("pelaaja"))
        {
            // Päästetään ääni
            GameObject.Find("soundiolio2").GetComponent<AudioSource>().Play();

            // Päivitetään kissalaskuria
            GameObject.Find("koodivarasto").GetComponent<pistehallinta1>().kissat++;


            Debug.Log("KISSA LÖYTYI !!!");
            Destroy(this.gameObject);
        }   // if


    }   // OnTriggerEnter

}   // class
