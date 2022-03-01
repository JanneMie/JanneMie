
$(document).ready(function(){
		//JSON-muotoista dataa. Kuvat ovat kuvat-nimisessä kansiossa
		var karusellit = [
			{
			"kohde":"1",
			"kuvatiedosto":"asunnot.json.kohde1"
			},
			{
			"kohde":"2",
			"kuvatiedosto":"asunnot.json.kohde2"
			},
			{
			"kohde":"3",
			"kuvatiedosto":"asunnot.json.kohde3"
			}
		]
		//Ohjelma näyttää käyttäjän haluaman aiheen kuvat
		$("#nappi").click(function(){
			var kohde = $("#kohde").val();//syöttötieto lomakkeelta
			//muuttaa pieniksi kirjimiksi. käyttäjä voi kirjoittaa halutessaan ison alkukirjaimen yms.
			var kohde = kohde.toLowerCase(); 
			var tulostus = "";
			for(i = 0;i < karusellit.length;i++){//Käydään koko JSON läpi eli kaikki kuvat peräkkäin
				if(karusellit[i].kohde == kohde){ //haku eli jos aihe on sama kuin käyttäjän haluama
					//kuvan lähde (src) on kuvatiedoston nimi
					tulostus += "<img src='kuvat/" + karusellit[i].kuvatiedosto + "'/><br/>"; 
				}
			}
			$("#laatikko").html(tulostus);//tulostus diville
		})
			
	
	});