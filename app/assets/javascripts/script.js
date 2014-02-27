//Attend le chargement du DOM que ce soit en Ruby (page load)
	var username='';
var ready = function(){
	//Réglage de la page au début : déclaration variable globale et cachage de connecté et stats voir plus bas 
	$(".connected").hide();
	$(".stats").hide();

	//Réglage de ce qu'on accepte comme input grace au plugin jquery alphanum(). Evite création d'utilisateurs aux noms mauvais pour les requetes. A COMPLETER DANS LE BACKEND
	$(".restricted_input").alphanum();


	//Quand on clique sur le bouton d'id 'Connect'
	$('#connect').click(function() {
		//On prend la variable username dans l'input "Connect"
		username=$('#username_connect').val();
		//on fait la requete GET correspondante
		$.ajax({
			url: "/users/name/"+username+".json",
			dataType: "json",
			type: "get",
			success: function(donnees){
				Connection_success(donnees);
			},
			error: function(xhr,textStatus,errorThrown){
				Connection_failure(textStatus,errorThrown,false);
			}
		});

	});

	//Quand on clique sur le bouton d'id 'Nouvel utilisateur'
	$('#create').click(function() {
		//On prend la variable username dans l'input de texte "Nouvel util"
		username=$('#username_create').val();
		//on fait la requete POST correspondante
		$.ajax({
			url: "/users",
			type: "post",
			dataType: "json",
			data: {"authenticity_token":"WE9L/lhK8otgTy/+UZd8jOjGYBnRMs2I37JUL3v3tjQ=", "user[name]":username},
			success: function(donnees){
				//Création réussie ! Ici on va écrire les modifications pour passer de non connecté à connecté dans le DOM
				Connection_success(donnees);
			},
			error: function(xhr,textStatus,errorThrown){
				Connection_failure(textStatus, errorThrown, true)
			}
		});

	});

	//Quand on clique sur le bouton d'id 'Nouvel utilisateur'
	$('#smoke').click(function() {
		//On prend la variable username la où elle est ! C'est à dire déja bien réglée
		//on fait la requete POST correspondante
		$.ajax({
			url: "/newsmoke",
			type: "post",
			dataType: "json",
			data: {"authenticity_token":"WE9L/lhK8otgTy/+UZd8jOjGYBnRMs2I37JUL3v3tjQ=",
 				"user[name]":username,
				"smoke[smoke_latitude]":1,
				"smoke[smoke_longitude]":2,
				"smoke[smoke_date]":new Date()
			},
			success: function(donnees){
				Smoke_success(donnees);
			},
			error: function(xhr,textStatus,errorThrown){
				Smoke_failure(textStatus,errorThrown);
			}
		});

	});

	//Quand on clique sur le bouton go_smoke -> stats
	$('#go_smoke_stats').click(function() {
	//Remet à zéro les stats et affiche l'écran
		$(".smoke_list").remove();
		$(".connected").hide();
		$(".stats").show();
		$("#title_stats").text("Tes stats, "+username+" !");
	//requete ajax pour  remplir le tableau joli !
		$.ajax({
		url: "/users/name/"+username+".json",
		dataType: "json",
		type: "get",
		success: function(donnees){
			//Ca a marché, on va afficher bien les données dans le DOM .stats
			var l = donnees['smokes'].length;
			console.log(l);
			//Parcours à refaire pour une meilleure présentation
			$.each(donnees['smokes'],function(){
				$("#stat_table").append("<tr class='smoke_list'><th>"+this.smoke_date+
				"</th><th>"+this.smoke_latitude+
				"</th><th>"+this.smoke_longitude+
				"</th></tr>");
			});

		},
		error: function(xhr,textStatus,errorThrown){
			//Ca a raté, message d'erreur
			console.log(textStatus);
			console.log(errorThrown);
			alert('impossible de récupérer les stats...');
			}
		});

	});
	//Quand on clique sur le bouton go_stats->smoke
	$('#go_stats_smoke').click(function() {
		$(".connected").show();
		$(".stats").hide();
		$("#title_stats").text("Tes stats, "+username+" !");
	});

	//Quand on clique sur le bouton go_smoke->home
	$('#go_smoke_home').click(function() {
		username='';
		$(".disconnected").show();
		$(".connected").hide();
	});
};

//Vérifie si le reload de la page provient de rails, ou est normal, pour bien gérer le reload du javascript sur la page home
$(document).ready(ready);
$(document).on('page:load', ready);


//Les différentes fonctions si requete réussies ou ratées pour différencier les requetes et les modifs dy code client et serveur

var Connection_success = function($donnees) {
	//Connection réussie ! Ici on va écrire les modifications pour passer de non connecté à connecté dans le DOM
		$(".connected").show();
		$(".disconnected").hide();
		$("#title_smoke").text("Smok'it, "+username+" !");
};
var Connection_failure = function($textStatus,$errorThrown,$creation) {
	//Connection ou création ratée, on affiche un message d'erreur
	console.log($textStatus);
	console.log($errorThrown);
	if ($creation) {
		$('#error2').show();
		$('#username_create').css("border-color","red");
	}
	else {
		$('#error1').show();
		$('#username_connect').css("border-color","red");	
	}
};

var Smoke_success = function($donnees) {
	//Création de smoke réussie, petite animation
	alert('Smoke créée... !');
};

var Smoke_failure = function($textStatus, $errorThrown) {
	//Création de smoke ratée, message d'erreur !
	console.log(textStatus);
	console.log(errorThrown);
	alert("La connexion au server n'a pas réussi, réessaie !");
};

