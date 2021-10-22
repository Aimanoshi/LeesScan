; (function () {
    'use strict';
    let liveCheck = false;

    let validateForm = function () {
        let isValid = true;

        let vraag1 = document.querySelectorAll('.form1 > input:checked');
        let vraag2 = document.querySelectorAll('.form2 > input:checked');
        let vraag3 = document.querySelectorAll('.form3 > input:checked');
        let vraag4 = document.querySelectorAll('.form4 > input:checked');
        let vraag5 = document.querySelectorAll('.form5 > input:checked');
        let vraag6 = document.querySelectorAll('.form6 > input:checked');
        let vraag7 = document.querySelectorAll('.form7 > input:checked');
        let vraag8 = document.querySelectorAll('.form8 > input:checked');




        let errVraag1 = document.getElementById('errVraag1');
        let errVraag2 = document.getElementById('errVraag2');
        let errVraag3 = document.getElementById('errVraag3');
        let errVraag4 = document.getElementById('errVraag4');
        let errVraag5 = document.getElementById('errVraag5');
        let errVraag6 = document.getElementById('errVraag6');
        let errVraag7 = document.getElementById('errVraag7');
        let errVraag8 = document.getElementById('errVraag8');



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

        // vraag 4
        if (vraag4.length == 0) {
            isValid = false;
            errVraag4.innerHTML = 'gelieve een cijfer te kiezen';
            errVraag4.style.display = 'block';
        } else {
            errVraag4.style.display = 'none';
        }

        // vraag 5
        if (vraag5.length == 0) {
            isValid = false;
            errVraag5.innerHTML = 'gelieve een cijfer te kiezen';
            errVraag5.style.display = 'block';
        } else {
            errVraag5.style.display = 'none';
        }

        // vraag 6
        if (vraag6.length == 0) {
            isValid = false;
            errVraag6.innerHTML = 'gelieve een cijfer te kiezen';
            errVraag6.style.display = 'block';
        } else {
            errVraag6.style.display = 'none';

        }

        // vraag 7
        if (vraag7.length == 0) {
            isValid = false;
            errVraag7.innerHTML = 'gelieve een cijfer te kiezen';
            errVraag7.style.display = 'block';
        } else {
            errVraag7.style.display = 'none';

        }

        // vraag 8
        if (vraag8.length == 0) {
            isValid = false;
            errVraag8.innerHTML = 'gelieve een cijfer te kiezen';
            errVraag8.style.display = 'block';
        } else {
            errVraag8.style.display = 'none';

        }

        return isValid;
    }

    window.addEventListener('load', function () {
        let querystring = '?sort%5B0%5D%5Bfield%5D=Vraag';
        querystring += '&sort%5B0%5D%5Bdirection%5D=asc';

        fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/Leesmonitoring_VRAGEN' + querystring, {
            headers: {
                'Authorization': 'Bearer keybe7D1M6i7oaWj6',
            }
        })
            .then(response => response.json())
            .then(json => {
                let Tonen = document.querySelectorAll('.toon');
                for (let i = 0; i < Tonen.length; i++) {
                    Tonen[i].innerHTML = json.records[i].fields.subklasse6;
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

                // vraag 4
                let keuze4 = '';

                let vraag4 = document.querySelectorAll('input[name ="vraag4"]');

                for (let i = 0; i < vraag4.length; i++) {
                    if (vraag4[i].checked) {
                        keuze4 = vraag4[i].value;
                        if (keuze4 > 0) {
                            totaal.push(keuze4);
                        } else {
                            nul.push(keuze4);
                        }
                    }
                };

                // vraag 5
                let keuze5 = '';

                let vraag5 = document.querySelectorAll('input[name ="vraag5"]');

                for (let i = 0; i < vraag5.length; i++) {
                    if (vraag5[i].checked) {
                        keuze5 = vraag5[i].value;
                        if (keuze5 > 0) {
                            totaal.push(keuze5);
                        } else {
                            nul.push(keuze5);
                        }
                    }
                };

                // vraag 6
                let keuze6 = '';

                let vraag6 = document.querySelectorAll('input[name ="vraag6"]');

                for (let i = 0; i < vraag6.length; i++) {
                    if (vraag6[i].checked) {
                        keuze6 = vraag6[i].value;
                        if (keuze6 > 0) {
                            totaal.push(keuze6);
                        } else {
                            nul.push(keuze6);
                        }
                    }
                };

                // vraag 7
                let keuze7 = '';

                let vraag7 = document.querySelectorAll('input[name ="vraag7"]');

                for (let i = 0; i < vraag7.length; i++) {
                    if (vraag7[i].checked) {
                        keuze7 = vraag7[i].value;
                        if (keuze7 > 0) {
                            totaal.push(keuze7);
                        } else {
                            nul.push(keuze7);
                        }
                    }
                };

                // vraag 8
                let keuze8 = '';

                let vraag8 = document.querySelectorAll('input[name ="vraag8"]');

                for (let i = 0; i < vraag8.length; i++) {
                    if (vraag8[i].checked) {
                        keuze8 = vraag8[i].value;
                        if (keuze8 > 0) {
                            totaal.push(keuze8);
                        } else {
                            nul.push(keuze8);
                        }
                    }
                };


                let sum = 0;
                //totaal
                sum = totaal.reduce(function (a, b) {
                    return parseInt(a) + parseInt(b);
                }, 0);

                console.log(totaal);
                let totaalSum6 = (sum / (totaal.length * 5)) * 100;

                localStorage.setItem('Subklasse6Leesmonitoring', totaalSum6);

                // totaal bereken van alle sub klasse
                let TotaalSubklasse = [];


                let subklasse1 = localStorage.getItem('Subklasse1Leesmonitoring');
                TotaalSubklasse.push(subklasse1);

                let subklasse2 = localStorage.getItem('Subklasse2Leesmonitoring');
                TotaalSubklasse.push(subklasse2);

                let subklasse3 = localStorage.getItem('Subklasse3Leesmonitoring');
                TotaalSubklasse.push(subklasse3);

                let subklasse4 = localStorage.getItem('Subklasse4Leesmonitoring');
                TotaalSubklasse.push(subklasse4);

                let subklasse5 = localStorage.getItem('Subklasse5Leesmonitoring');
                TotaalSubklasse.push(subklasse5);

                let subklasse6 = localStorage.getItem('Subklasse6Leesmonitoring');
                TotaalSubklasse.push(subklasse6);


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
                            "Totaal": avg
                        }
                    }]
                };
                fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/Leesmonitoring_ANTWOORD', {
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
                        localStorage.setItem('vragenlijst4', json.records[0].id);
                    }
                    );
            }
        });
    });
})();

