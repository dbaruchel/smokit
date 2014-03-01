//Fichiers dépendant des repositories, car les url de requetes et les headers dépendent de si on est sur l'app/ en local/vers heroku...


//Var connection avec COOKIESSS CONNECTES (très mauvais cookies mais bon)...

var Connect =function($deja_connect) {
	//On prend la variable username dans l'input "Connect" si on est pas déja connecté
	if ($deja_connect==true) {
	username=$.cookie('username');
	}
	else
	{
	username=$('#username_connect').val();
	}
	//on fait la requete POST à Sessions correspondante
	$.ajax({
		url: "/sessions",
		data: {"authenticity_token":"WE9L/lhK8otgTy/+UZd8jOjGYBnRMs2I37JUL3v3tjQ=",
			"session[name]":username
		},
		type: "post",
		success: function(donnees){
			Connection_success(donnees);
		},
		error: function(xhr,textStatus,errorThrown){
			Connection_failure(textStatus,errorThrown,false);
		}
	});
};
//Connection création
var Create = function() {
	//On prend la variable username dans l'input de texte "Nouvel util"
	username=$('#username_create').val();
	//on fait la requete POST correspondante
	$.ajax({
		url: "/users",
		type: "post",
		dataType: "json",
		data: {"authenticity_token":"WE9L/lhK8otgTy/+UZd8jOjGYBnRMs2I37JUL3v3tjQ=", "user[name]":username},
		success: function(donnees){
			Connection_success(donnees);
		},
		error: function(xhr,textStatus,errorThrown){
			Connection_failure(textStatus, errorThrown, true)
		}
	});
};

//Connection Stats
var Stats = function() {
	//Remet à zéro les stats et affiche l'écran
	$(".smoke_list").remove();
	$(".connected").hide();
	$(".stats").show();
	$("#title_stats").text("Tes stats, "+$.cookie('username')+" !");
	//requete ajax pour  remplir le tableau joli !
	$.ajax({
	url: "/users/name/"+$.cookie('username')+".json",
	dataType: "json",
	type: "get",
	success: function(donnees){
		Stats_success(donnees);
	},
	error: function(xhr,textStatus,errorThrown){
		Stats_failure(textStatus, errorThrown);
	}
	});

};

//Création de Smoke
var Smoke = function() {
	//On prend la variable username la où elle est ! C'est à dire déja bien réglée
	//on fait la requete POST correspondante
	$.ajax({
		url: "/newsmoke",
		type: "post",
		dataType: "json",
		data: {"authenticity_token":"WE9L/lhK8otgTy/+UZd8jOjGYBnRMs2I37JUL3v3tjQ=",
			"user[name]":$.cookie('username'),
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
};
