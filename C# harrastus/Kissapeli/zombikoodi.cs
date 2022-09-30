using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class zombikoodi : MonoBehaviour
{

    void Start()
    {

    }   // start


    void Update()
    {
        
    }   // update

    private void OnTriggerEnter(Collider other)
    {
        // Oliko törmääjä pelaaja
        if (other.name.Equals("pelaaja"))
        {
            // Päästetään ääni
            GameObject.Find("soundiolio3").GetComponent<AudioSource>().Play();

            // Päivitetään kissalaskuria
            GameObject.Find("koodivarasto").GetComponent<pistehallinta1>().terveys--;


            Debug.Log("ZOMBI LÖI !!!");
            
        }   // if


    }   // OnTriggerEnter

}   // class