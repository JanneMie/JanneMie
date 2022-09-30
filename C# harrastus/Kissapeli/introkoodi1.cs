using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// Jotta scenen vaihto onnistuu
using UnityEngine.SceneManagement;

public class introkoodi1 : MonoBehaviour
{
    
    void Start()
    {
        // Jätetään ääniolio muistiin kun skene vaihtuu
        DontDestroyOnLoad(GameObject.Find("soundiolio1"));
    }   // start

    
    void Update()
    {
        // Jatketaan millä tahansa näppäimellä
        if (Input.anyKey)
        {
            SceneManager.LoadScene("peliscene");
        } // if
    }   // update
}   // class
