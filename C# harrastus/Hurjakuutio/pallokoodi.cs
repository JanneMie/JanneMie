﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class pallokoodi : MonoBehaviour
{
    private float laskuri = 0;
    private GameObject tekstiolio = null;
    // Start is called before the first frame update
    void Start()
    {
        this.tekstiolio = GameObject.Find("laskuriteksti 2");
    }

    // Update is called once per frame
    void Update()
    {
        if (this.laskuri < 350)
        {
            this.GetComponent<Transform>().Rotate(140f * Time.deltaTime, 70f * Time.deltaTime, 250f * Time.deltaTime);
            this.laskuri = laskuri + Time.deltaTime * 20;
            this.tekstiolio.GetComponent<TextMesh>().text = "LASKURI 2: " + this.laskuri.ToString("0");
        }
        else
        {
            this.GetComponent<Rigidbody>().isKinematic = false;
            this.tekstiolio.GetComponent<TextMesh>().color = new Color(1f, 0f, 0f);
            this.tekstiolio.GetComponent<TextMesh>().text = "PUTOAA !!!";
        }
    }
}
