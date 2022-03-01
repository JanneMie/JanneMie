using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;


// Käytetään scene manageria

public class Maalikoodi : MonoBehaviour
{
    public float aikalaskuri = 0f;
    private float pohjanopeus = 0;

    void Start()
    {
        this.pohjanopeus = Random.Range(0f, 0f);
    }


    void Update()
    {

        this.GetComponent<Transform>().Translate(-this.pohjanopeus * Time.deltaTime, 0f, 0f);

        if (this.GetComponent<Transform>().position.x < -15000f)
        {
            Destroy(this.gameObject);
        }
    }

    void OnTriggerEnter2D(Collider2D tormaaja)
    {
        if (tormaaja.name.Equals("Player"))
        {
            // GameObject.Find("musiikki").GetComponents<AudioSource>()[5].Play();
            // Tässä kohtaa siirrytään toiseen sceneen
            PlayerPrefs.SetFloat("Aika", this.aikalaskuri);
            Destroy(this.gameObject);
            SceneManager.LoadScene("Voitto Scene");
          //  gameManager.EndGame();
        } // if
    }

}