using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BackGroundScroll : MonoBehaviour
{

    Material material;
    Vector2 offset;

    public int xVelocity, yVelocity;

    private void Awake()
    {
        material = GetComponent<Renderer>().material;
    }

    
    void Start()
    {
        offset = new Vector2(xVelocity, yVelocity);
    }   // Start

    
    void Update()
    {
        material.mainTextureOffset += offset * Time.deltaTime;  // Material offset saa joka framella uuden arvon
    } // Update
}   // Class
