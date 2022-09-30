using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ovikoodi1 : MonoBehaviour
{
    
    void Start()
    {
        
    }   // Start

    
    void Update()
    {
        // O-näppäin aukaisee oven

        if (Input.GetKeyDown(KeyCode.O))

        {
            this.GetComponent<Animator>().SetInteger("ovitila1", 1);

        }   // if

        // K-näppäin sulkee oven

        if (Input.GetKeyDown(KeyCode.K))

        {
            this.GetComponent<Animator>().SetInteger("ovitila1", 0);

        }   // if

    }   // Update
}   // class
