; (function () {
    'use strict';

    window.addEventListener('load', function () {

        /*nav*/
        document.getElementById('menu').addEventListener("click", mijnfunctie);
        function mijnfunctie() {
            document.getElementById("menu").classList.toggle("change");
            document.getElementById("nav").classList.toggle("change");

            document.getElementById("menu-bg").classList.toggle("change-bg");

        }
        let link = document.querySelectorAll('.link');

        for (let i = 0; i < link.length; i++) {
            link[i].addEventListener('click', function () {
                link[i].style.visibility="hidden";
                console.log('button id gone');
            })
        }
        // inner html zorgen dat de gebruiker de juiste vragenlijst invult

        let Id = localStorage.getItem('Id');
        fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/Gebruikers/' + Id, {
            headers: {
                'Authorization': 'Bearer keybe7D1M6i7oaWj6'
            }
        })
            .then(response => response.json())
            .then(json => {
                //punten van de eerste vragenlijst
                let antwoord = localStorage.getItem('klasofschool')
                let vraag = this.document.querySelectorAll('.keuze')
                console.log(antwoord);
                if (antwoord == "schoolniveau") {
                    for (let i = 0; i < vraag.length; i++) {
                        vraag[i].href = "Schoolkeuze.html"
                    }
                } else {
                    for (let i = 0; i < vraag.length; i++) {
                        vraag[i].href = "Klaskeuze.html"
                    }
                }
            })
            .catch(function (error) {
                console.log("fail", error)
            })
    })
})();