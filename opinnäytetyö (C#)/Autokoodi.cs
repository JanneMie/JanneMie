using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class Autokoodi : MonoBehaviour
{
    private float nopeuseteen = -2000f; // Tällä säädetään nopeutta eteenpäin
    private float nopeustaakse = 800f; // Tällä säädetään nopeutta taakse
    private float hyppyvoima = 2500f;
    private float kiertovoima = 1f;
    private float Brakes = 0f;

    private bool cooldown = false;

    private float SpaceRate = 2.0f;
    private float NextSpace;


    private bool ilmassa = false;
    public GameManager gameManager;
    public float rahat = 0f;

    


    void Start()
    {
        // Haetaan kamera tähän valmiiksi
        

    } // Start

    //Ajetaan autoa

    void Update()
    {
        // Siirretään kameraa auton mukana
        

        if (Input.GetKeyDown(KeyCode.RightArrow))
        {
            JointMotor2D moottori1 = this.GetComponents<WheelJoint2D>()[0].motor;
            moottori1.motorSpeed = this.nopeuseteen;
            this.GetComponents<WheelJoint2D>()[0].motor = moottori1;
            this.GetComponents<WheelJoint2D>()[0].useMotor = true;

            JointMotor2D moottori2 = this.GetComponents<WheelJoint2D>()[1].motor;
            moottori2.motorSpeed = this.nopeuseteen;
            this.GetComponents<WheelJoint2D>()[1].motor = moottori2;
            this.GetComponents<WheelJoint2D>()[1].useMotor = true;

        } // if

        if (Input.GetKeyUp(KeyCode.RightArrow))
        {
            this.GetComponents<WheelJoint2D>()[0].useMotor = false;
            this.GetComponents<WheelJoint2D>()[1].useMotor = false;
        } // if

        if (Input.GetKeyDown(KeyCode.LeftArrow))
        {
            JointMotor2D moottori1 = this.GetComponents<WheelJoint2D>()[0].motor;
            moottori1.motorSpeed = this.nopeustaakse;
            this.GetComponents<WheelJoint2D>()[0].motor = moottori1;
            this.GetComponents<WheelJoint2D>()[0].useMotor = true;

            JointMotor2D moottori2 = this.GetComponents<WheelJoint2D>()[1].motor;
            moottori2.motorSpeed = this.nopeustaakse;
            this.GetComponents<WheelJoint2D>()[1].motor = moottori2;
            this.GetComponents<WheelJoint2D>()[1].useMotor = true;

        } // if

        if (Input.GetKeyUp(KeyCode.LeftArrow))
        {
            this.GetComponents<WheelJoint2D>()[0].useMotor = false;
            this.GetComponents<WheelJoint2D>()[1].useMotor = false;
        } // if

        if (Input.GetKeyDown(KeyCode.Space) && (!this.ilmassa) && Time.time > NextSpace)  //hypätään
        {
            this.GetComponent<Rigidbody2D>().AddForce(Vector2.up * this.hyppyvoima);
            NextSpace = Time.time + SpaceRate;
        } // if

        if (Input.GetKeyDown(KeyCode.DownArrow) == true)
        {
            Brakes = 1500;
        }
        else
        {
            Brakes = 0;
        }

        if (Input.GetKey("escape"))
        {
            Application.Quit();
        }



        void OnCollisionEnter2D(Collision2D toinen)
        {
            this.ilmassa = false;
        }

        void OnCollisionExit2D(Collision2D toinen)
        {
            this.ilmassa = true;
        }



    } // Update
} // Class