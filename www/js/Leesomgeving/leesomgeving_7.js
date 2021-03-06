; (function () {
    'use strict';
    let liveCheck = false;

    let validateForm = function () {
        let isValid = true;

        let vraag1 = document.querySelectorAll('.form1 > input:checked');
        let vraag2 = document.querySelectorAll('.form2 > input:checked');


        let errVraag1 = document.getElementById('errVraag1');
        let errVraag2 = document.getElementById('errVraag2');


        // vraag 1 
        if (vraag1.length == 0) {
            isValid = false;
            errVraag1.innerHTML = 'gelieve een cijfer te kiezen';
            errVraag1.style.display = 'block';
        } else {
            errVraag1.style.display = 'none';
        }

        // vraag 2
        if (vraag2.length == 0) {
            isValid = false;
            errVraag2.innerHTML = 'gelieve een cijfer te kiezen';
            errVraag2.style.display = 'block';
        } else {
            errVraag2.style.display = 'none';
        }

        return isValid;
    }

    window.addEventListener('load', function () {
        let querystring = '?sort%5B0%5D%5Bfield%5D=Vraag';
        querystring += '&sort%5B0%5D%5Bdirection%5D=asc';

        fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/Leesomgeving_VRAGEN' + querystring, {
            headers: {
                'Authorization': process.env.apiKey,
            }
        })
            .then(response => response.json())
            .then(json => {
                let Tonen = document.querySelectorAll('.toon');
                for (let i = 0; i < Tonen.length; i++) {
                    Tonen[i].innerHTML = json.records[i].fields.subklasse7;
                    console.log(i)
                }
            })

        document.getElementById('form').addEventListener('input', function () {
            if (!liveCheck) return;
            validateForm();
        });

        document.getElementById('form').setAttribute('novalidate', 'novalidate');
        document.getElementById('form').addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();

            /* let errMessages = document.querySelectorAll('.bericht--error');
             for (let i = 0; i < errMessages.length; i++) {
                 errMessages[i].style.display = 'none';*/


            let isValid = validateForm();

            liveCheck = true;

            if (isValid == false) {
                window.scrollTo(0, 0);
                foutmelding.style.display = 'block';
            } else {
                setTimeout(() => { location.href = "../../www/tussenpagina.html" }, 1000);

                let totaal = [];
                let nul = [];


                let vraag1 = document.querySelectorAll('input[name ="vraag1"]');

                let keuze1 = '';
                for (let i = 0; i < vraag1.length; i++) {
                    if (vraag1[i].checked) {
                        keuze1 = vraag1[i].value;
                        if (keuze1 > 0) {
                            totaal.push(keuze1);
                        } else {
                            nul.push(keuze1);
                        }
                        console.log("eerste keuze" + keuze1)
                    }
                };


                // vraag 2
                let vraag2 = document.querySelectorAll('input[name ="vraag2"]');

                let keuze2 = '';
                for (let i = 0; i < vraag2.length; i++) {
                    if (vraag2[i].checked) {
                        keuze2 = vraag2[i].value;
                        if (keuze2 > 0) {
                            totaal.push(keuze2);
                        } else {
                            nul.push(keuze2);
                        }
                    }
                };

                let sum = 0;
                //totaal
                sum = totaal.reduce(function (a, b) {
                    return parseInt(a) + parseInt(b);
                }, 0);

                console.log(totaal);
                let totaalSum7 = (sum / (totaal.length * 5)) * 100;

                localStorage.setItem('Subklasse7Leesomgeving', totaalSum7);

                // totaal bereken van alle sub klasse
                let TotaalSubklasse = [];


                let subklasse1 = localStorage.getItem('Subklasse1Leesomgeving');
                TotaalSubklasse.push(subklasse1);

                let subklasse2 = localStorage.getItem('Subklasse2Leesomgeving');
                TotaalSubklasse.push(subklasse2);

                let subklasse3 = localStorage.getItem('Subklasse3Leesomgeving');
                TotaalSubklasse.push(subklasse3);

                let subklasse4 = localStorage.getItem('Subklasse4Leesomgeving');
                TotaalSubklasse.push(subklasse4);

                let subklasse5 = localStorage.getItem('Subklasse5Leesomgeving');
                TotaalSubklasse.push(subklasse5);

                let subklasse6 = localStorage.getItem('Subklasse6Leesomgeving');
                TotaalSubklasse.push(subklasse6);

                let subklasse7 = localStorage.getItem('Subklasse7Leesomgeving');
                TotaalSubklasse.push(subklasse7);

                //totaal
                let sumTotaal;
                sumTotaal = TotaalSubklasse.reduce(function (a, b) {
                    return parseInt(a) + parseInt(b);
                }, 0);

                let avg = sumTotaal / TotaalSubklasse.length;

                console.log("totaal " + avg)

                let data = {
                    "records": [{
                        "fields": {
                            "subklasse1": subklasse1,
                            "subklasse2": subklasse2,
                            "subklasse3": subklasse3,
                            "subklasse4": subklasse4,
                            "subklasse5": subklasse5,
                            "subklasse6": subklasse6,
                            "subklasse7": subklasse7,
                            "Totaal": avg
                        }
                    }]
                };
                fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/Leesomgeving_ANTWOORDEN', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer keybe7D1M6i7oaWj6',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(json => {
                        console.log(json)
                        localStorage.setItem('vragenlijst3', json.records[0].id);
                    }

                    );
            }
        });
    });
})();

