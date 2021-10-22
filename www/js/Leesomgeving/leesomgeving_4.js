; (function () {
    'use strict';
    let liveCheck = false;

    let validateForm = function () {
        let isValid = true;

        let vraag1 = document.querySelectorAll('.form1 > input:checked');
    

        let errVraag1 = document.getElementById('errVraag1');

        // vraag 1 
        if (vraag1.length == 0) {
            isValid = false;
            errVraag1.innerHTML = 'gelieve een cijfer te kiezen';
            errVraag1.style.display = 'block';
        } else {
            errVraag1.style.display = 'none';
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
                    Tonen[i].innerHTML = json.records[i].fields.subklasse4;
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
                setTimeout(()=>{ location.href = "../../www/Leesomgeving/Leesomgeving_5.html"}, 1000); 

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

                let sum = 0 ; 
                //totaal
                sum = totaal.reduce(function (a, b) {
                    return parseInt(a) + parseInt(b);
                }, 0);

                console.log(totaal);
                let totaalSum4 = (sum / (totaal.length * 5)) * 100;

                localStorage.setItem('Subklasse4Leesomgeving', totaalSum4);

            }
        });
    });
})();

