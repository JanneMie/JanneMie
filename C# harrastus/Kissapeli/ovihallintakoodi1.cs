using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ovihallintakoodi1 : MonoBehaviour
{

    private void OnTriggerEnter(Collider other)
    {
        // Etsitään ovi ja avataan se jos pelaaja
        if (other.name.Equals("pelaaja"))
        {
            GameObject.Find("ovi1").GetComponent<Animator>().SetInteger("ovitila1", 1);
        }   // if
    }   // OnTriggerEnter

    private void OnTriggerExit(Collider other)
    {
        // Etsitään ovi ja suljetaan se jos pelaaja
        if (other.name.Equals("pelaaja"))
        {
            GameObject.Find("ovi1").GetComponent<Animator>().SetInteger("ovitila1", 0);
        }   // if
    }   // OnTriggerExit

}   // class
