; (function () {
    'use strict';
    //check while you type
    let liveCheck = false;

    let validateForm = function () {
        let isValid = true;

        // input
        let vraagGebruiker = document.getElementById('vraagGebruiker');
        let vraagSchoolNaam = document.getElementById('vraagSchoolNaam');
        let vraagSchoolPostcode = document.getElementById('vraagSchoolPostcode')
        let vraagSchoolAdres = document.getElementById('vraagSchoolAdres');
        let vraagNiveau = document.getElementById('vraagNiveau');
    
        // error messages
        let errGebruiker = document.getElementById('errGebruiker');
        let errSchooNaam = document.getElementById('errSchooNaam');
        let errSchoolAdres = document.getElementById('errSchoolAdres');
        let errNiveau = document.getElementById('errNiveau');

        if (vraagGebruiker.value == '') {
            isValid = false;
            errGebruiker.innerHTML = 'gelieve een gebruiker te kiezen';
            errGebruiker.style.display = 'block';
        }else{
            errGebruiker.style.display = 'none';
        }
        if (vraagSchoolNaam.value == '') {
            isValid = false;
            errSchooNaam.innerHTML = 'gelieve u schoolnaam in te vullen';
            errSchooNaam.style.display = 'block';
        }else{
            errSchooNaam.style.display = 'none';
        }
        if (vraagSchoolAdres.value == '' || vraagSchoolPostcode.value == '') {
            isValid = false;
            errSchoolAdres.innerHTML = 'gelieve u schooladres in te vullen';
            errSchoolAdres.style.display = 'block';
        }else{
            errSchoolAdres.style.display = 'none';
        }
        if (vraagNiveau.value == '') {
            isValid = false;
            errNiveau.innerHTML = 'gelieve een niveau te kiezen';
            errNiveau.style.display = 'block';
        }else{
            errNiveau.style.display = 'none';
        }
        return isValid;
    };
    window.addEventListener('load', function () {
        document.getElementById('form').setAttribute('novalidate', 'novalidate');

        document.getElementById('form').addEventListener('change', function () {
            if (!liveCheck) return;
            validateForm();
        });

        document.getElementById('form').addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();

            let errMessages = document.querySelectorAll('.bericht--error');
            for (let i = 0; i < errMessages.length; i++) {
                errMessages[i].style.display = 'none';
            }

            let isValid = validateForm();

            liveCheck = true;

            let foutmelding = document.getElementById('foutmelding');
            if (!isValid) {
                window.scrollTo(0, 0);
                foutmelding.style.display = 'block';
                //document.getElementById('titel').style.marginTop ='70%';
            }else{
                let data = {
                    "records": [{
                        "fields": {
                            "Gebruiker": vraagGebruiker.value,
                            "school naam": vraagSchoolNaam.value,
                            "school adres": vraagSchoolAdres.value,
                            "school postcode": vraagSchoolPostcode.value,
                            "klas_of_schoolniveau": vraagNiveau.value,
                        }
                    }]
                };
                fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/gebruikers', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer keybe7D1M6i7oaWj6',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response=> response.json())
                .then(json => {
                    fetch('https://api.airtable.com/v0/app9SiJUqIxbsSwyi/gebruikers', {
                    headers: {
                        'Authorization': 'Bearer keybe7D1M6i7oaWj6',
                    },
                })
                .then(response=> response.json())
                .then(json =>{

                    console.log(json);
                    localStorage.setItem('klasofschool', vraagNiveau.value);
                    let hoop = localStorage.getItem('klasofschool');
                    console.log(hoop);
                    
                    setTimeout(()=>{ 
                        if(vraagNiveau.value == 'schoolniveau'){
                        location.href = "../www/Schoolkeuze.html"; 
                        document.querySelectorAll('vragen').href = "../www/Schoolkeuze.html";
                        }else{
                        location.href = "../www/Klaskeuze.html";
                        }

                    }, 1000); 
                })
                })
                .catch(error =>{
                    console.log('failed', error)
                })
            }
        });
 
    })
})();