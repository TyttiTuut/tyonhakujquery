/* const div_rakentaja_asiantuntijatyot2 = $("#Rakentaja_asiantuntijatyot2");
const div_rakentaja_asiantuntijatyot = $("#Rakentaja_asiantuntijatyot") */
/* const div_piirtajatyot2 = $("#Piirtajatyot2");
const div_piirtajatyot = $("#Piirtajatyot");  
const div_insinoorityot = $("#Insinoorityot"); */
/* const div_johtajatyot = $("#Johtajatyot"); */
const div_rakennusalatyot = $("#Rakennusalatyot");
const div_rakennusalatyot2 = $("#Rakennusalatyot2");
const div_hakutyot = $("Hakutyot")
const div_hakutyot2 = $("Hakutyot2")
const div_valintatyot = $("#valintatyot");
const div_valintatyot2 = $("#valintatyot2");
const div_kohta1 = $("#kohta1");
const div_kohta2 = $("#kohta2");

var rakentajaAsiantuntijaTiedotHaettu = false; // Muuttuja seuraamaan, onko rakentaja/asiantuntijan tiedot haettu

$("#Rakentaja_asiantuntija").click(function () {
    // Tarkistetaan, onko rakentaja/asiantuntijan tiedot jo haettu, jos ei niin suoritetaan funktiot ja piilotetaan ylimääräiset näppäimet
    if (!rakentajaAsiantuntijaTiedotHaettu) {
        console.log('Rakentaja_asiantuntija button clicked');
        const url2 = "https://paikat.te-palvelut.fi/tpt-api/v1/tyopaikat.rss?alueet=Uusimaa&valitutAmmattialat=3112&ilmoitettuPvm=1&vuokrapaikka=---&etatyopaikka=---";
        const url = "https://duunitori.fi/api/v1/jobentries?area=Uusimaa&search=rakennusala+%28ala%29";
        haeJaNaytaTyot(url2, div_kohta2);
        haeAsiantuntija(url, div_kohta1);
        // Piilotetaan ylimääräiset näppäimet
        $("#Piirtaja").hide()
        $("#Insinoori").hide()
        $("#Johtaja").hide()
        rakentajaAsiantuntijaTiedotHaettu = true; // Merkitään, että rakentaja/asiantuntijan tiedot on haettu
    } else {
        // Tyhjennetään rakentaja/asiantuntijan tiedot ja näytetään ylimääräiset näppäimet
        div_kohta1.empty();
        div_kohta2.empty();
        $("#Piirtaja").show()
        $("#Insinoori").show()
        $("#Johtaja").show()
        rakentajaAsiantuntijaTiedotHaettu = false; // Merkitään, että rakentaja/asiantuntijan tiedot on tyhjennetty
    }
});

function haeAsiantuntija(url, targetDiv) {
    // Tehdään AJAX-pyyntö annettuun URL:ään
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'xml',
        success: function (data) {
            // Haetaan kaikki 'item'-elementit XML-dokumentista
            $(data).find('item').each(function () {
                // Haetaan otsikko ('title'), linkki ('link'), kuvaus ('description') ja julkaisupv, ('pubDate') jokaisesta 'item'-elementistä
                var title = $(this).find('title').text();
                var link = $(this).find('link').text();
                var description = $(this).find('description').text();
                var pubdate = $(this).find('pubDate').text();

                // Muunnetaan päivämäärä haluttuun muotoon
                var dateObj = new Date(pubdate);
                var formattedDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;

                // Tarkistetaan, sisältääkö kuvaus tai otsikko sanan "asiantuntija"
                if (description.toLowerCase().includes('asiantuntija') || title.toLowerCase().includes('asiantuntija')
                
                ) {
                    // Lisätään otsikko ja linkki HTML-div-elementtiin
                    targetDiv.append(`<div class="inline-container"><p id="title"> ${title}</p>&nbsp;&nbsp;<p id="julkaistu"> (julkaistu: ${formattedDate})</p></div><p><a href="${link}" target="_blank">${link}</a></p>`);
                }
            });
        }
    });
}

var piirtajaTiedotHaettu = false; // Muuttuja seuraamaan, onko piirtäjän tiedot haettu

$("#Piirtaja").click(function () {
    // Tarkistetaan, onko piirtäjän tiedot jo haettu, jos ei niin suoritetaan funktiot ja piilotetaan ylimääräiset näppäimet
    if (!piirtajaTiedotHaettu) {
        console.log('Piirtaja button clicked');
        const url2 = "https://paikat.te-palvelut.fi/tpt-api/v1/tyopaikat.rss?alueet=Uusimaa&valitutAmmattialat=3118&ilmoitettuPvm=1&vuokrapaikka=---&etatyopaikka=---";
        const url = "https://duunitori.fi/api/v1/jobentries?area=Uusimaa&search=rakennusala+%28ala%29"

        haeJaNaytaTyot(url2, div_kohta2);
        haePiirtaja(url, div_kohta1)
        // Piilotetaan ylimääräiset näppäimet
        $("#Rakentaja_asiantuntija").hide()
        $("#Insinoori").hide()
        $("#Johtaja").hide()
        piirtajaTiedotHaettu = true; // Merkitään, että piirtäjän tiedot on haettu
    } else {
        // Tyhjennetään piirtäjän tiedot ja näytetään ylimääräiset näppäimet
        div_kohta1.empty();
        div_kohta2.empty();
        $("#Rakentaja_asiantuntija").show()
        $("#Insinoori").show()
        $("#Johtaja").show()
        piirtajaTiedotHaettu = false; // Merkitään, että piirtäjän tiedot on tyhjennetty
    }
});

function haePiirtaja(url, targetDiv) {
    // Tehdään AJAX-pyyntö annettuun URL:ään
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'xml',
        success: function (data) {
            // Haetaan kaikki 'item'-elementit XML-dokumentista
            $(data).find('item').each(function () {
                // Haetaan otsikko ('title'), linkki ('link'), kuvaus ('description') ja julkaisupv, ('pubDate') jokaisesta 'item'-elementistä
                var title = $(this).find('title').text();
                var link = $(this).find('link').text();
                var description = $(this).find('description').text();
                var pubdate = $(this).find('pubDate').text();

                // Muunnetaan päivämäärä haluttuun muotoon
                var dateObj = new Date(pubdate);
                var formattedDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;

                // Tarkistetaan, sisältääkö kuvaus tai otsikko sanan "kemisti"
                if (description.toLowerCase().includes('piirtäjä') || title.toLowerCase().includes('piirtäjä')
                    || description.toLowerCase().includes('suunnittelija') || title.toLowerCase().includes('suunnittelija')
                ) {
                
                    // Lisätään otsikko ja linkki HTML-div-elementtiin
                    targetDiv.append(`<div class="inline-container"><p id="title"> ${title}</p>&nbsp;&nbsp;<p id="julkaistu"> (julkaistu: ${formattedDate})</p></div><p><a href="${link}" target="_blank">${link}</a></p>`);
                }
            });
        }
    });
}

var insinooriTiedotHaettu = false; // Muuttuja seuraamaan, onko insinöörin tiedot haettu

$("#Insinoori").click(function ()  {
    // Tarkistetaan, onko insinöörin tiedot jo haettu, jos ei niin suoritetaan funktiot ja piilotetaan ylimääräiset näppäimet
    if (!insinooriTiedotHaettu) {
        console.log('Button Insinööri clicked');
        const url = "https://duunitori.fi/api/v1/jobentries?area=Uusimaa&search=rakennusala+%28ala%29"
        haeInsinoori(url, div_kohta1);
        // Piilotetaan ylimääräiset näppäimet
        $("#Rakentaja_asiantuntija").hide()
        $("#Piirtaja").hide()
        $("#Johtaja").hide()
        insinooriTiedotHaettu = true; // Merkitään, että insinöörin tiedot on haettu
    } else {
        // Tyhjennetään insinöörin tiedot ja näytetään ylimääräiset näppäimet
        div_kohta1.empty();
        div_kohta2.empty();
        $("#Rakentaja_asiantuntija").show()
        $("#Piirtaja").show()
        $("#Johtaja").show()
        insinooriTiedotHaettu = false; // Merkitään, että insinöörin tiedot on tyhjennetty
    }
});

function haeInsinoori(url, targetDiv) {
    // Tehdään AJAX-pyyntö annettuun URL:ään
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'xml',
        success: function (data) {
            // Haetaan kaikki 'item'-elementit XML-dokumentista
            $(data).find('item').each(function () {
                // Haetaan otsikko ('title'), linkki ('link'), kuvaus ('description') ja julkaisupv, ('pubDate') jokaisesta 'item'-elementistä
                var title = $(this).find('title').text();
                var link = $(this).find('link').text();
                var description = $(this).find('description').text();
                var pubdate = $(this).find('pubDate').text();

                // Muunnetaan päivämäärä haluttuun muotoon
                var dateObj = new Date(pubdate);
                var formattedDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;

                // Tarkistetaan, sisältääkö kuvaus tai otsikko sanan "kemisti"
                if (description.toLowerCase().includes('insinoori') || title.toLowerCase().includes('insinoori')
                    || description.toLowerCase().includes('insinööri') || title.toLowerCase().includes('insinööri')
                    || description.toLowerCase().includes('diplomi') || title.toLowerCase().includes('diplomi')    
                ) {
                    // Lisätään otsikko ja linkki HTML-div-elementtiin
                    targetDiv.append(`<div class="inline-container"><p id="title"> ${title}</p>&nbsp;&nbsp;<p id="julkaistu"> (julkaistu: ${formattedDate})</p></div><p><a href="${link}" target="_blank">${link}</a></p>`);

                }
            });
        }
    });
}


var johtajaTiedotHaettu = false; // Muuttuja seuraamaan, onko johtajan tiedot haettu

$("#Johtaja").click(function () {
    // Tarkistetaan, onko johtajan tiedot jo haettu, jos ei niin suoritetaan funktiot ja piilotetaan ylimääräiset näppäimet
    if (!johtajaTiedotHaettu) {
        console.log('Button Johtaja clicked');
        const url = "https://duunitori.fi/api/v1/jobentries?area=Uusimaa&search=rakennusala+%28ala%29";
        haeJohtaja(url, div_kohta1);
        // Piilotetaan ylimääräiset näppäimet
        $("#Rakentaja_asiantuntija").hide()
        $("#Piirtaja").hide()
        $("#Insinoori").hide()
        johtajaTiedotHaettu = true; // Merkitään, että johtajan tiedot on haettu
    } else {
        // Tyhjennetään johtajan tiedot ja näytetään ylimääräiset näppäimet
        div_kohta1.empty();
        div_kohta2.empty();
        $("#Rakentaja_asiantuntija").show()
        $("#Piirtaja").show()
        $("#Insinoori").show()
        johtajaTiedotHaettu = false; // Merkitään, että johtajan tiedot on tyhjennetty
    }
});

function haeJohtaja(url, targetDiv) {
    // Tehdään AJAX-pyyntö annettuun URL:ään
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'xml',
        success: function (data) {
            // Haetaan kaikki 'item'-elementit XML-dokumentista
            $(data).find('item').each(function () {
                // Haetaan otsikko ('title'), linkki ('link'), kuvaus ('description') ja julkaisupv, ('pubDate') jokaisesta 'item'-elementistä
                var title = $(this).find('title').text();
                var link = $(this).find('link').text();
                var description = $(this).find('description').text();
                var pubdate = $(this).find('pubDate').text();

                // Muunnetaan päivämäärä haluttuun muotoon
                var dateObj = new Date(pubdate);
                var formattedDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;

                // Tarkistetaan, sisältääkö kuvaus tai otsikko sanan "kemisti"
                if (description.toLowerCase().includes('johtaj') || title.toLowerCase().includes('johtaj')
                    || description.toLowerCase().includes('päällik') || title.toLowerCase().includes('päällik')
                    || description.toLowerCase().includes('paallik') || title.toLowerCase().includes('paallik')    
                    || description.toLowerCase().includes('esihenkilö') || title.toLowerCase().includes('esihenkilö')
                    || description.toLowerCase().includes('esihenkilo') || title.toLowerCase().includes('esihenkilo')          
                ) {
                    // Lisätään otsikko ja linkki HTML-div-elementtiin
                    targetDiv.append(`<div class="inline-container"><p id="title"> ${title}</p>&nbsp;&nbsp;<p id="julkaistu"> (julkaistu: ${formattedDate})</p></div><p><a href="${link}" target="_blank">${link}</a></p>`);

                }
            });
        }
    });
}

$("#textfield").on("input", function() {
    var inputField = $(this);
    var errorMessage = $("#error-message");
    var inputValue = inputField.val().trim(); // Poistetaan ylimääräiset välilyönnit

    if (inputValue.length < 3) {
        // Näytetään virheilmoitus ja korostetaan kenttä punaisella reunuksella
        errorMessage.css("display", "block");
        inputField.css("border-color", "red");
    } else {
        // Piilotetaan virheilmoitus ja poistetaan mahdollinen korostus
        errorMessage.css("display", "none");
        inputField.css("border-color", ""); // Palautetaan alkuperäinen reunusväri
    }
}); 

$(document).ready(function() {
    // Piilotetaan hakukenttä aluksi
    $("#textfield").hide();
    
    // Klikkauksen käsittelijä nuoli-elementille
    $("#nuoli").click(function() {
        // Näytetään/piilotetaan hakukenttä ja käännä nuoli
        $("#textfield").slideToggle();
        $(this).toggleClass("rotated");
        
        // Tyhjennä hakutulokset
        $("#Hakutyot, #Hakutyot2").empty();
    });

    // Hakukentän input-tapahtuman käsittelijä
    $("#textfield").on("input", function() {
        var inputField = $(this);
        var errorMessage = $("#error-message");
        var inputValue = inputField.val().trim();

        if (inputValue.length < 3) {
            errorMessage.css("display", "block");
            inputField.css("border-color", "red");
        } else {
            errorMessage.css("display", "none");
            inputField.css("border-color", "");
        }
    });

    // Hakukentän enter-näppäimen painalluksen käsittelijä
    $("#textfield").on("keydown", function(event) {
        if (event.key === "Enter") {
            var hakusana = $(this).val().trim();
            if (hakusana !== "") {
                var url = `https://duunitori.fi/api/v1/jobentries?search=${encodeURIComponent(hakusana)}`;
                $("#Hakutyot").empty();
                haeJaNaytaTyot(url, $("#Hakutyot"));
                
                var url2 = `https://paikat.te-palvelut.fi/tpt-api/v1/tyopaikat.rss?hakusana=${encodeURIComponent(hakusana)}&hakusanakentta=sanahaku&ilmoitettuPvm=1&vuokrapaikka=---&etatyopaikka=---`;
                $("#Hakutyot2").empty();
                haeJaNaytaTyot(url2, $("#Hakutyot2"));
            }
            $(this).val("");
        }
    });
});

function haeJaNaytaTyot(url, targetDiv) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'xml',
        success: function (data) {
            targetDiv.empty();
            $(data).find('item').each(function () {
                var title = $(this).find('title').text();
                var link = $(this).find('link').text();
                var pubdate = $(this).find('pubDate').text();

                // Muunnetaan päivämäärä haluttuun muotoon
                var dateObj = new Date(pubdate);
                var formattedDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
                targetDiv.append(`<div class="inline-container"><p id="title"> ${title}</p>&nbsp;&nbsp;<p id="julkaistu"> (julkaistu: ${formattedDate})</p></div><p><a href="${link}" target="_blank">${link}</a></p>`);
            });
        }
    });
}

$("#mySelect").change(function () {
    const selectElement = this;
    
    if (selectElement.value === 'Betonirakennus') {
        const url= 'https://duunitori.fi/api/v1/jobentries?area=Uusimaa&search=betonirakennus+%28ala%29';
        haeJaNaytaTyot(url, div_valintatyot);
    } else if (selectElement.value === 'Rakennussuunnittelu') {
        const url= 'https://duunitori.fi/api/v1/jobentries?area=Uusimaa&search=rakennussuunnittelu+%28ala%29';
        haeJaNaytaTyot(url, div_valintatyot);
    } else if (selectElement.value === 'Talonrakennus') {
        const url= 'https://duunitori.fi/api/v1/jobentries?area=Uusimaa&search=talonrakennus+%28ala%29';
        haeJaNaytaTyot(url, div_valintatyot);
    } else if (selectElement.value === 'Talotekniikka') {
        const url= 'https://duunitori.fi/api/v1/jobentries?area=Uusimaa&search=talotekniikka+%28ala%29';
        haeJaNaytaTyot(url, div_valintatyot);
    } else if (selectElement.value === 'Tyonjohto') {
        const url= 'https://duunitori.fi/api/v1/jobentries?area=Uusimaa&search=ty%C3%B6njohto-+ja+esimiesteht%C3%A4v%C3%A4t%2C+rakennustarkastus+%28ala%29';
        haeJaNaytaTyot(url, div_valintatyot);
    } else if (selectElement.value === 'tyhjennä') {
        div_valintatyot.empty();
        div_valintatyot2.empty();
    }
});


var rakennusalaTiedotHaettu = false; // Muuttuja seuraamaan, onko rakennusalan tiedot jo haettu

$("#Rakennusala").click(function () {
    // Tarkistetaan, onko rakennusalan tiedot jo haettu, jos ei niin suoritetaan funktiot ja piilotetaan ylimääräiset näppäimet
    if (!rakennusalaTiedotHaettu) {
        console.log('Rakennusala button clicked');
        const url = "https://duunitori.fi/api/v1/jobentries?area=Uusimaa&search=rakennusala+%28ala%29";
        const url2 = "https://paikat.te-palvelut.fi/tpt-api/v1/tyopaikat.rss?alueet=Uusimaa&valitutAmmattialat=3112&valitutAmmattialat=3118&ilmoitettuPvm=1&vuokrapaikka=---&etatyopaikka=---";
        haeJaNaytaTyot(url, div_rakennusalatyot);
        haeJaNaytaTyot(url2, div_rakennusalatyot2);
        rakennusalaTiedotHaettu = true; // Merkitään, että rakennusalan tiedot on haettu
    } else {
        // Tyhjennetään rakennusalan tiedot ja näytetään ylimääräinen painike
        div_rakennusalatyot.empty();
        div_rakennusalatyot2.empty();
        rakennusalaTiedotHaettu = false; // Merkitään, että rakennusalan tiedot on tyhjennetty
    }
});

//Varmistetaan että kaikki kentät ovat tyhjät ja kaikki näppäimet näkyvissä
$("#tyhjennäkaikki").click(function () {
/*     $("#Rakentaja_asiantuntijatyot").empty();
    $("#Rakentaja_asiantuntijatyot2").empty();
    $("#Piirtajatyot").empty();
    $("#Piirtajatyot2").empty();
    $("#Insinoorityot").empty();
    $("#Johtajatyot").empty();    
    $("#Rakennusalatyot").empty();
    $("#Rakennusalatyot2").empty();
    $("#ITtyot").empty();
    $("#ITtyot2").empty();
    $("#valintatyot").empty();
    $("#valintatyot2").empty();
    $("#Hakutyot").empty();
    $("#Hakutyot2").empty(); */
    $("#kohta1").empty();
    $("#kohta2").empty();
    $("#Piirtaja").show();
    $("#Johtaja").show();    
    $("#Insinoori").show();
    $("#Rakentaja_asiantuntija").show();
    $("#Rakennusala").show();

});
