; (function () {
    'use strict';

    window.addEventListener('load', function () {

        let result = [];
        let labels = [];

        let vragenlijst2 =localStorage.getItem('Svragenlijst2');

        fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/SLeesomgeving_ANTWOORD/' + vragenlijst2, {
            headers: {
                'Authorization': 'Bearer keybe7D1M6i7oaWj6'
            }
        })
            .then(response => response.json())
            .then(json => {
                //punten van de eerste vragenlijst
                let vragenlijs1 = json.fields.subklasse1;
                result.push(vragenlijs1);
                labels.push('1');

                let vragenlijs2 = json.fields.subklasse2;
                result.push(vragenlijs2);
                labels.push('2');

                let vragenlijs3 = json.fields.subklasse3;
                result.push(vragenlijs3);
                labels.push('3');

              
            })
            .catch(function (error) {
                console.log("fail", error)
            })

        // ik weet het nog niets
        const ctx2 = document.getElementById('chart2S').getContext('2d');
        const chart2 = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: result,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                        
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
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
    });
})();