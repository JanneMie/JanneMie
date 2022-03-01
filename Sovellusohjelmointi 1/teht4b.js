$(document).ready(function(){ 
	//***********************************************************************
	//ALUSTUKSET
	//alustetaan arrayn indeksi niin, että se ei osoita mitään alkiota. Katso myös https://api.jquery.com/index/
	//***********************************************************************
    var selected_index = -1; 
	var muistioArray = []; //kaikkia tietoja pyöritellään selaimen muistissa ihmisetArrayssa
    var operaatio = "A"; //lisäystila päällä oletuksena (vaihtoehto on editointitila)
	//Haetaan ja näytetään aluksi kaikki
	if(localStorage.getItem("muistio") != null) { //jos localstorage on olemassa
		tulosta();
	}

 function tulosta(){
		if (localStorage.getItem('muistio') != null){ //jos on jotain tulostettavaa
			var muistioJSON = localStorage.getItem("muistio"); //haetaan kakki local storagesta JSON-muodossa     
			muistioArray = JSON.parse(muistioJSON); //sijoitetaan kaikki tietueet arraylle		
			if(muistioArray == null){ //jos ei ole ketään kotona, alustetaan array-taulukko tyhjäksi
				muistioArray = [];
			}
			
			//Tulostetaan html-taulukon sisältö, aluksi sarakeotsikot
			$("#lista").html = "";
			$("#lista").html("<thead><tr><th>ID</th><th>Etunimi</th><th>Sukunimi</th><th>Sähköposti</th><th></th></tr></thead><tbody></tbody>");
			/*
			Käydään kaikki tietueet (ihmiset) läpi yksi kerrallaan ja lisätään rivit ja solut html-tableen.
			Tulostetaan myös edit ja Delete-kuvakkeet omiin soluihinsa. Kummallakin on alt-määre, jossa on rivin indeksi (i). Sitä tarvitaan, että osataan poistaa ja muokata oikeaa riviä.
			*/
			 for(var i = 0;i < muistioArray.length; i++){ //käydään kaikki alkiot (ihmiset) läpi yksi kerrallaan
				$("#lista tbody").append("<tr><td>" + i +"</td><td>" + muistioArray[i].uusiRivi + "</td><td>" + muistioArray[i].strDate + "</td><td>" + "</td><td></td></tr>");
			}
		}		
	}

 $("#lisaa_nappi").click(function(){ 
	
        if($("#uusiRivi").val() != ""){ 
var rivi = "<tr><td>" + uusiRivi + "</td><td>" + strDate + "</td></tr>";
          $(rivi).appendTo("#lista").hide().slideDown();
		  $("tr:even").css("background-color", "#000000");

			//lomakkeelta tulevat tiedot sijoitetaan olion kenttiin
		
		   var muistioOlio = { 
                uusiRivi = $("#inputti").val(),
				d = new Date(),
                strDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear()
            }
			
			if(operaatio == "A") { //JOS LISÄYSTILA 
				//lisätään uusi henkilöolio arrayn loppuun
				muistioArray.push(muistioOlio); //ihmisetArray sisältää alkioinaan jokaisen henkilön tiedot 	
			}
			
			if(operaatio == "E")  { //JOS MUUTOSTILA
				muistioArray[selected_index] = muistioOlio; //Muutetaan tieto entisen päälle	
				operaatio = "A"; //lisäystila on oletustila 
			}	
			
			//tallennetaan ihmiset-tietovarastoon. vain stringiä voi tallentaa
            localStorage.setItem("muistio",JSON.stringify(muistioArray));
		}				
		
		//tyhjennetään lomake
		$("#etuNimi").val("");
        $("#sukuNimi").val("");
        $("#email").val("");
		$("#etuNimi").focus();
        tulosta(); //tulostetaan muuttunut tilanne tableen
    });







});