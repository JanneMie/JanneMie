using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// Jotta UI-elementit näkyisivät
using UnityEngine.UI;

// Jotta voidaan siirtyä skenestä toiseen

using UnityEngine.SceneManagement;

public class pistehallinta1 : MonoBehaviour
{

    // Aikalaskuri
    private float aikalaskuri = 600f;

    // Löydetyt kissat
    public int kissat = 0;
    public int terveys = 6;

    // Näihin raahataan Unityssä tekstikentät
    public GameObject t1 = null;
    public GameObject t2 = null;
    public GameObject t3 = null;

    void Start()
    {
        
    }   // start

    
    void Update()
    {
        // Lisätään aikaa
        this.aikalaskuri -= Time.deltaTime;


        // Päivitetään aika ja kissat tekstikenttiin
        this.t1.GetComponent<Text>().text = "TIME: " + this.aikalaskuri.ToString("0") + " s";
        this.t2.GetComponent<Text>().text = "CATS: " + this.kissat + "/10";
        this.t3.GetComponent<Text>().text = "HEALTH: " + this.terveys + "/6";

        // Kun kaikki kissat löytyneet, niin mennää victory-skeneen
        if (this.kissat >= 10)
        {
            PlayerPrefs.SetFloat("aika", this.aikalaskuri);
            SceneManager.LoadScene("voittoscene");

        }   // if

        if (this.terveys <= 0)
        {
            PlayerPrefs.SetFloat("aika", this.aikalaskuri);
            SceneManager.LoadScene("gameoverscene");

        }   // if

        if (this.aikalaskuri <= 0)
        {
            PlayerPrefs.SetFloat("aika", this.aikalaskuri);
            SceneManager.LoadScene("gameoverscene");

        }   // if


    }   // update
}   // class
