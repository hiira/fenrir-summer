'use strict';

var range = 1;

var radio = document.getElementsByName('options');
var button = document.getElementById('search_button');

button.addEventListener('click', ()=>{
    for(var i = 0; i<5; i++){
        if(radio[i].checked){
            range = i + 1;
        }
    }
    location.href = "search.html?range=" + range + "?page=1";

});
