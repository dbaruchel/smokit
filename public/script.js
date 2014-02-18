//prend ce qu'il y a dans le formulaire et l'envoie dans localStorage à l'id 'userName' Possibilité de trucs JSON
var uName=localStorage.getItem('userName');
//Si la variableuName est définie, on l'affiche en haut, sinon on affiche le formulaire
if (uName!=null && uName!='') {
var titre=document.createElement('h1'),
    titreText=document.createTextNode(uName);
    titre.appendChild(titreText);
   // document.body.appendChild(titre); Met en dernier
   document.body.insertBefore(titre,document.body.firstChild);
  	
var form=document.createElement('form'),
	inputCreer=document.createElement('input');
	
	form.id='myForm';
	inputCreer.type='submit';
	inputCreer.value='Autre utilisateur ?';
	inputCreer.setAttribute("onclick","resetStorage();");
	inputCreer.onclick=resetStorage;		
	form.appendChild(inputCreer);
	document.body.appendChild(form);

//Requete XMLHttpRequest en GET
var xhr = getXMLHttpRequest();
//Avant de passer des variables, faire
//var sVar=encodeURIComponent("Contenu avec des espaces");
xhr.open("GET","/users/2", true);
xhr.send(null);
}

else {
	var form=document.createElement('form'),
	label=document.createElement('label'),
	labelText=document.createTextNode('Entrez Username :'),
	span=document.createElement('span'),
	inputUser=document.createElement('input'),
	inputCreer=document.createElement('input');
	form.id='myForm';
	label.className='form_col';
	label.htmlFor='userName';
	inputUser.name='userName';
	inputUser.id='userName';
	inputUser.type='text';
	span.className='form_col';
	inputCreer.type='submit';
	inputCreer.value='M inscrire';
	inputCreer.setAttribute("onclick","getUserName();");
	inputCreer.onclick=getUserName;
	label.appendChild(labelText);
	form.appendChild(label);
	form.appendChild(inputUser);
	form.appendChild(span);
	form.appendChild(inputCreer);
	document.body.appendChild(form);
}

function getUserName() {
var userName = document.getElementById('userName').value;
localStorage.setItem('userName', userName);

//Tests du localStorage
//alert(userName);
//var retrieved = localStorage.getItem('userName');
//alert(retrieved);

//console.log('retrieved: ', JSON.parse(retrieved)); Vu sur stackOverflow mais, A quoi ca sert ??
}

function resetStorage() {
localStorage.clear();
}

function getXMLHttpRequest() {
	var xhr = null;

	if (window.XMLHttpRequest || window.ActiveXObject){
		if (window.ActiveXObject) {
			try {
			xhr = new ActiveXObject("Masxml2.XMLHTTP");
			} catch (e) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest();
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	return xhr;
}

