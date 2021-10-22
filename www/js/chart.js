; (function () {
    'use strict';

    window.addEventListener('load', function () {

        let result = [];
        let labels = [];

        let vragenlijst1 = localStorage.getItem('vragenlijst1');
        if (vragenlijst1 != null) {
            fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/Visie_Doelen_Acties_ANTWOORDEN/' + vragenlijst1, {
                headers: {
                    'Authorization': 'Bearer keybe7D1M6i7oaWj6'
                }
            })
                .then(response => response.json())
                .then(json => {
                    //punten van de eerste vragenlijst
                    let eerstVragenlijst = json.fields.Totaal;
                    result.push(eerstVragenlijst);
                    labels.push('Visie Doelen Acties');
                })
                .catch(function (error) {
                    console.log("fail", error)
                })
        }

        let vragenlijst2 = localStorage.getItem('vragenlijst2');
        if (vragenlijst2 != null) {
            fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/Begrijpend_Lezen_ANTWOORDEN/' + vragenlijst2, {
                headers: {
                    'Authorization': 'Bearer keybe7D1M6i7oaWj6'
                }
            })
                .then(response => response.json())
                .then(json => {
                    //punten van de eerste vragenlijst
                    let tweedeVragenlijst = json.fields.Totaal;
                    result.push(tweedeVragenlijst);
                    labels.push('Begrijpend lezen');
                })
                .catch(function (error) {
                    console.log("fail", error)
                })
        }


        let vragenlijst3 = localStorage.getItem('vragenlijst3');
        if (vragenlijst3 != null) {
            fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/Leesomgeving_ANTWOORDEN/' + vragenlijst3, {
                headers: {
                    'Authorization': 'Bearer keybe7D1M6i7oaWj6'
                }
            })
                .then(response => response.json())
                .then(json => {
                    //punten van de eerste vragenlijst
                    let derdeVragenlijst = json.fields.Totaal;
                    result.push(derdeVragenlijst);
                    labels.push('Leesomgeving');
                })
                .catch(function (error) {
                    console.log("fail", error)
                })
        }


        let vragenlijst4 = localStorage.getItem('vragenlijst4');
        if (vragenlijst4 != null) {
            fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/Leesmonitoring_ANTWOORD/' + vragenlijst4, {
                headers: {
                    'Authorization': 'Bearer keybe7D1M6i7oaWj6'
                }
            })
                .then(response => response.json())
                .then(json => {
                    //punten van de eerste vragenlijst
                    let vierdeVragenlijst = json.fields.Totaal;
                    result.push(vierdeVragenlijst);
                    labels.push('Leesmonitoring');
                })
                .catch(function (error) {
                    console.log("fail", error)
                })
        }



        const ctx1 = document.getElementById('chart1').getContext('2d');
        const chart1 = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: result,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(102, 255, 51, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(102, 255, 51, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                layout: {
                    padding: {
                        top: 50,
                        bottom: 50,
                        left: -10,
                    }
                },
                labels: {
                    padding: {
                        left: 0,
                        right: 10,
                        bottom: 50,
                    }
                },
                legend: {
                    position: 'top',
                    align: 'center',
                    labels: {
                        padding: 20,
                    }
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }]
                }
            }
        });
        let chartone = document.getElementById('chart1')
        chartone.onclick = function (e) {
            let slice = chart1.getElementAtEvent(e);
            if (!slice.length) return; // return if not clicked on slice
            let label = slice[0]._model.label;

            if (label == 'Begrijpend lezen') {
                location.href = "../www/Begrijpend lezen.html";
                console.log('yess')
            } else if(label == 'Visie Doelen Acties') {
                location.href = "../www/Visie Doelen Acties.html";
                console.log('yess')
            } else if(label == 'Leesomgeving') {
                location.href = "../www/Leesomgeving.html";
                console.log('yess')
            } else if(label == 'Leesmonitoring'){
                location.href = "../www/Leesmonitoring.html";
            }
        }
        function display() {
            window.print();
        }
    })
})();
