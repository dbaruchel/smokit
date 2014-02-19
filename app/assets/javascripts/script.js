//setTimeout(function ...) utiliser jquery.ready
//prend ce qu'il y a dans le formulaire et l'envoie dans localStorage à l'id 'userName' Possibilité de trucs JSON
//console.log pour débugger dans chrome
//puts "===" dans ruby 
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
	request(readData);
	
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
	//prend la valeur du formulaire avec id=userName pour la mettre
var userName = document.getElementById('userName').value;
localStorage.setItem('userName', userName);

//Tests du localStorage
//alert(userName);
//var retrieved = localStorage.getItem('userName');
//alert(retrieved);
//console.log('retrieved: ', JSON.parse(retrieved)); Vu sur stackOverflow mais, A quoi ca sert ??
}

function resetStorage() {
//pour remettre la variable à 0
localStorage.clear();
}

function getXMLHttpRequest() {
	//fonction qui créé l'objetXHR de la bonne manière suivant les navigateurs
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

//Requete XMLHttpRequest en GET
function request(callback) {
	var xhr = getXMLHttpRequest();

	//Avant de passer des variables, faire
	//var sVar=encodeURIComponent("Contenu avec des espaces");
	xhr.onreadystatechange = function() {
	    	if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
        	callback(xhr.responseText);
    		}
	};
	var suName= encodeURIComponent(uName);
	xhr.open("GET","/users/name/"+suName+".json", true);
	xhr.send(null);
}

function readData(sData) {
	// On peut maintenant traiter les données sans encombrer l'objet XHR.	
	//But, créer une table qui affiche tout bien
	//sData=textToXML(sData);
	var table = document.createElement('table'),
	tr = document.createElement('tr'),
	thDate= document.createElement('th'),
	thLat= document.createElement('th'),
	thLon= document.createElement('th'),
	textD=document.createTextNode('Date'),
	textLat=document.createTextNode('Latitude'),
	textLon=document.createTextNode('Longitude');
	

	table.appendChild(tr);
	tr.appendChild(thDate);
	tr.appendChild(thLat);
	tr.appendChild(thLon);
	thDate.appendChild(textD);
	thLat.appendChild(textLat);
	thLon.appendChild(textLon);
	document.body.appendChild(table);

	
	console.log(sData);
	
	var hash = JSON.parse(sData);
	var c=hash['smokes'].length;
	console.log(hash['name']);
	console.log(hash['smokes'].length);
	for (var i=0; i<c; i++){
	console.log(i);
	var trB = document.createElement('tr'),
	tDate= document.createElement('th'),
	tLat= document.createElement('th'),
	tLon= document.createElement('th'),
	BDate = document.createTextNode(Date(hash['smokes'][i]['smoke_date'])),
	BLat = document.createTextNode(hash['smokes'][i]['smoke_latitude']),
	BLon = document.createTextNode(hash['smokes'][i]['smoke_longitude']);

	trB.appendChild(tDate);
	trB.appendChild(tLat);
	trB.appendChild(tLon);
	tDate.appendChild(BDate);
	tLat.appendChild(BLat);
	tLon.appendChild(BLon);
	table.appendChild(trB);
	}
		

}

// Convert a string to XML Node Structure
// Returns null on failure
//Sert parce que la réponse est une string de HTML
function textToXML ( text ) {
      try {
        var xml = null;

        if ( window.DOMParser ) {

          var parser = new DOMParser();
          xml = parser.parseFromString( text, "text/xml" );

          var found = xml.getElementsByTagName( "parsererror" );

          if ( !found || !found.length || !found[ 0 ].childNodes.length ) {
            return xml;
          }

          return null;
        } else {

          xml = new ActiveXObject( "Microsoft.XMLDOM" );
          xml.async = false;
          xml.loadXML( text );
          return xml;
        }
      } catch ( e ) {
        // suppress
      }
    }


