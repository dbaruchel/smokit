//prend ce qu'il y a dans le formulaire et l'envoie dans localStorage à l'id 'userName' Possibilité de trucs JSON

var uName=localStorage.getItem('userName');

//Si la variableuName est définie, on l'affiche en haut, sinon(à faire) on affiche le formulaire
if (uName!=null) {
var titre=document.createElement('h1'),
    titreText=document.createTextNode(uName);
    titre.appendChild(titreText);
   // document.body.appendChild(titre); Met en dernier
   document.body.insertBefore(titre,document.body.firstChild);  
}

function getUserName() {
var userName = document.getElementById('userName').value;
localStorage.setItem('userName', userName);
alert(userName);
var retrieved = localStorage.getItem('userName');
alert(retrieved);

//console.log('retrieved: ', JSON.parse(retrieved)); Vu sur stackOverflow mais, A quoi ca sert ??
}

