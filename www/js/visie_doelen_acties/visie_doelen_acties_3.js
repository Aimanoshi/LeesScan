; (function () {
    'use strict';
    let liveCheck = false;

    let validateForm = function () {
        let isValid = true;

        let vraag1 = document.querySelectorAll('.form1 > input:checked');
        let vraag2 = document.querySelectorAll('.form2 > input:checked');
        let vraag3 = document.querySelectorAll('.form3 > input:checked');

        let errVraag1 = document.getElementById('errVraag1');
        let errVraag2 = document.getElementById('errVraag2');
        let errVraag3 = document.getElementById('errVraag3');

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

        // vraag 3
        if (vraag3.length == 0) {
            isValid = false;
            errVraag3.innerHTML = 'gelieve een cijfer te kiezen';
            errVraag3.style.display = 'block';
        } else {
            errVraag3.style.display = 'none';

        }

        return isValid;
    }

    window.addEventListener('load', function () {
        let querystring = '?sort%5B0%5D%5Bfield%5D=Vraag';
        querystring += '&sort%5B0%5D%5Bdirection%5D=asc';

        fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/Visie_Doelen_Acties_VRAGEN' + querystring, {
            headers: {
                'Authorization': process.env.apiKey,
            }
        })
            .then(response => response.json())
            .then(json => {
                let Tonen = document.querySelectorAll('.toon');
                for (let i = 0; i < Tonen.length; i++) {
                    Tonen[i].innerHTML = json.records[i].fields.subklasse3;
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
                setTimeout(()=>{ location.href = "../../www/visie_doelen_acties/visie_doelen_acties_4.html"}, 1000); 

                let totaal = [];
                let nul = [];

                //vraag1

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


                // vraag 3
                let keuze3 = '';

                let vraag3 = document.querySelectorAll('input[name ="vraag3"]');

                for (let i = 0; i < vraag3.length; i++) {
                    if (vraag3[i].checked) {
                        keuze3 = vraag3[i].value;
                        if (keuze3 > 0) {
                            totaal.push(keuze3);
                        } else {
                            nul.push(keuze3);
                        }
                    }
                };


                let sum = 0;
                //totaal
                sum = totaal.reduce(function (a, b) {
                    return parseInt(a) + parseInt(b);
                }, 0);

                console.log(totaal);
                let totaalSum3 = (sum / (totaal.length * 5)) * 100;

                localStorage.setItem('Subklasse3', totaalSum3);
            }
        });
    });
})();

