
$(document).ready(function(){
	$('.form_date').datepicker({ 
        language:  'fi',
		format: "dd.mm.yyyy",
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		minView: 2,
		forceParse: 0
    });

var nimi = ""; //globaali muuttuja näkyy kaikille ikkunoille (funktioille)
var posti = "";
var puhelin = "";
var hinta = "";

	//Modaalin avausnappi
	$("#avaaModaaliNappi").click(function(){
		
		nimi = $("#nimi").val();
		posti = $("#posti").val();
		puhelin = $("#puhelin").val();
		hinta = $("#eroVuorokausissa").val();
		$("#laatikko").html(nimi);
		$("#laatikko").html(posti);
		$("#laatikko").html(puhelin);
		$("#laatikko").html(hinta);
		$('#myModal').modal('show');
	});
	
	//Save eli tallenna-napin koodi tekee JSON-muotoisen datan ja tulostaa sen konsoliin
	//(Tämä esimerkki ei siis tallenna tietoa mihinkään pysyvään muistiin)
	$("#tallennaNappi").click(function(){			
			var tiedotObjekti = { nimi : nimi, sähköposti : posti, puhelin : puhelin, hinta : hinta };//JS-objekti, esim. 				
			var tiedotJSON = JSON.stringify(tiedotObjekti);//Muunnetaan JSON-stringiksi
			console.log(tiedotJSON);//testitulostus konsoliin (selaimessa paina F12)
			$("#exampleModal").modal("hide");//suljetaan modaali-ikkuna
	});

	//lasketaan aikojen erotus vuorokausissa
	$("#avaaModaaliNappi").click(function(){ 
		var pvm1 = $("#pvm1").val(); //päivämääräkentät lomakkeelta
		var pvm2 = $("#pvm2").val();
		
		 var d = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    today = monthNames[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear();
		
		 $('#to').attr('disabled', 'disabled'); //löysin netistä pätkän koodia jolla rajoittaa kalenterin toinen päivä 7:n
    $('#from').datepicker({
        defaultDate: "+1d",
        minDate: 1,
        maxDate: "+3M",
        dateFormat: 'dd M yy',
        showOtherMonths: true,
        changeMonth: true,
        selectOtherMonths: true,
        required: true,
        showOn: "focus",
        numberOfMonths: 1,
    });
		
		$('#from').change(function () {
		var from = $('#from').datepicker('getDate');
		var date_diff = Math.ceil((from.getTime() - Date.parse(today)) / 86400000);
        var maxDate_d = date_diff+7+'d';
        date_diff = date_diff + 'd';
		 $('#to').val('').removeAttr('disabled').removeClass('hasDatepicker').datepicker({
            dateFormat: 'dd.mm.yy',
            minDate: date_diff,
            maxDate: maxDate_d
        });
		 });
		 
		  $('#to').keyup(function () {
        $(this).val('');
        alert('Please select date from Calendar');
    });
    $('#from').keyup(function () {
        $('#from,#to').val('');
        $('#to').attr('disabled', 'disabled');
        alert('Please select date from Calendar');
    });
		 
		if (pvm2 < pvm1) { //tarkastetaan että lopetuspäivä ei ole ennen aloituspäivää
		var minDate = $("#pvm2").datepicker("option", "mindate");
		$("pvm2").datepicker("setDate", minDate);
		alert("Lopetuspäivä ei saa olla ennen aloituspäivää");
		}
		if (pvm1Olio + 7 > pvm2) {
			alert("Enimmäisvarausaika on yksi viikko");
		}
		/*
		Päivämääräero lasketaan siten, että muutetaan päiväykset Unix-aikaan (sekunneiksi) ja lasketaan , montako sekuntia erotus on. (Katso Wikipediasta, mikä Unix-aika on).
		
		Lomakkeelta tuleva suomalainen (pp.kk.vvvv) kalenteriaika pitää muuttaa  jenkkimuotoon (kk/pp/vvvv), jotta voidaan suorittaa laskentaa (JS käyttää jenkkimuotoa sisäisessä laskennassaan).		
		*/
			var d1 = pvm1.substring(0, 2); //Parsitaan päivät, kuukaudet ja vuodet suomalaisesta kalenteriajasta
			var d2 = pvm2.substring(0, 2);
			var m1 = pvm1.substring(3, 5);
			var m2 = pvm2.substring(3, 5);
			var y1 = pvm1.substring(6, 11);
			var y2 = pvm2.substring(6, 11);		
			pvm1 = m1 + "/" + d1 + "/" + y1; //Vaihdetaan kuukausien ja päivien järjestystä, sekä lisätään sinne /-viivat
			pvm2 = m2 + "/" + d2 + "/" + y2;	
            pvm3 = d1 + "." + m1 + "." + y1;
            pvm4 = d2 + "." + m2 + "." + y2;
			var pvm1Olio = new Date(pvm1); 
			var pvm2Olio = new Date(pvm2);
			var unixAika1 = pvm1Olio.getTime(); //Unix-aika
			var unixAika2 = pvm2Olio.getTime(); //Unix-aika
			//Suoritetaan vähennyslasku, jotta saadaan selville, montako sekuntia varaus kestää
			var ero = Math.abs(unixAika2 - unixAika1); 
			//Lasketaan sekuntiero kokonaisissa vuorokausissa
			var eroVuorokausissa = Math.ceil(ero / (24 * 60 * 60 * 1000)); 
			var hinta = eroVuorokausissa * 120;
			var hinta2 = hinta + 120;
			
		$("#laatikko").html("Nimi: " + nimi + " </br>Sähköpostiosoitteesi: " + posti + "</br>Puhelinnumerosi: " + puhelin + "</br>Varausajankohta " + pvm3 + "-" + pvm4 + "</br>Hinta yhteensä: " + hinta2 + " euroa.");
	});
});
