let targetInput = document.getElementById('search');
let titleInput = document.getElementById('title');
let price = document.getElementById('price');
let surface = document.getElementById('surface');
let street = document.getElementById('street');
let targetInputId = document.getElementById('id');
let results = document.getElementById('lists');
let xhr = new XMLHttpRequest();
let data = [];
let matches = [];




targetInput.focus();

if(!targetInput.value) {
    targetInputId.value = ''
}

xhr.open('GET', 'estate_ad.php', true);

xhr.onload = function(e) {
    if(this.status == 200) {
        data = JSON.parse(this.responseText);
        console.log(data);

        data.forEach(e => {
            console.log(e.ad_title)
        })
    }

}
xhr.send();


targetInput.addEventListener('keyup', function(event){
    


    results.innerHTML = '';
    // toggleResults('hide');

    if(this.value.length > 0) {
        matches = getMatches(this.value);

        if(matches.length > 0 ) {
            displayMatches(matches);
            
        }
    }
});







// function toggleResults(opt) {
//     if(opt == 'show') {
//         results.classList.add('visible');
//     } else if(opt == 'hide') {
//         results.classList.remove('visible');
//     }
// }



function getMatches(text) {
    var matchList = [];
    data.forEach(element => {
        if(element.ad_title.toLowerCase().indexOf(text.toLowerCase()) != -1){
            matchList.push({
                title: element.ad_title,
                id: element.id_ad,
                street: element.street,
                price: element.price,
                surface: element.surface
            })
        }
    })
    console.log(matchList)
    return matchList;
}

function displayMatches(matchList) {
    output = '';

    for(i in matchList) {
        output += '<li id="result" class="result">' +  matchList[i].title + '</li>'
    }

    results.innerHTML = output;

    let single = document.querySelectorAll('.result');
    for(let i = 0; i < single.length; i++) {
        single[i].addEventListener('click', () => {

            for (i in matchList) {
                
                if(event.target == single[i]) {
                    // console.log(matchList[i].id);
                    titleInput.value = matchList[i].title;
                    targetInputId.value = matchList[i].id;
                    street.value = matchList[i].street;
                    price.value = '$ ' + matchList[i].price;
                    surface.value = matchList[i].surface + 'm2';
                    targetInput.value = '';
                    results.innerHTML = '';
                }
            }
        })
    }




}

