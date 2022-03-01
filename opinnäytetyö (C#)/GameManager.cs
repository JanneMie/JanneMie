using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{

    bool gameHasEnded = false;

    public float restartDelay = 10f;



    public GameObject completeLevelUI;
    public GameObject endLevelUI;


    public void CompleteLevel()
    {
        completeLevelUI.SetActive(true);

    }

    public void EndGame()
    {
        if (gameHasEnded == false)
        {
            gameHasEnded = true;

            Debug.Log("GAME OVER");
            Invoke("Restart", restartDelay);
        }
    }

    public void EndGame2()
    {
        if (gameHasEnded == false)
        {
            gameHasEnded = true;

            Debug.Log("GAME OVER");
            Invoke("Restart", restartDelay);
        }
    }

    void Restart()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }






}

