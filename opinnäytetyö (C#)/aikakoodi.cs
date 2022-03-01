using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using UnityEngine.UI;

using UnityEngine.SceneManagement;

public class aikakoodi : MonoBehaviour
{
    public float aikalaskuri = 0.00f;

    
   
    public float position = 0f;
    public GameManager gameManager;
    

    private GameObject t1 = null;
    

    void Start()
    {
        this.t1 = GameObject.Find("Aika");
        
        
    }

    
    void Update()
    {
        this.aikalaskuri += (Time.deltaTime);

        this.t1.GetComponent<Text>().text = "TIME: " + (int)this.aikalaskuri;
        
        

       // .ToString("F2") ei toimi int tyyppiin... koodi kirjoitettava eritavalla?





        if (this.aikalaskuri >= 600.00f)    // Jos pelaaja käyttää kenttään yli 10 minuuttia tulee game over
        {
            
            Destroy(this.gameObject);
            SceneManager.LoadScene("GameOver Scene");
            gameManager.EndGame();
        }

        

       

    }
}
