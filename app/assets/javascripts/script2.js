//Attend le chargement du DOM
$(function(){
	//Réglage de la page au début
	var username='';
	$(".connected").hide();

	//Quand on clique sur le bouton d'id 'Connect'
	$('#connect').click(function() {
		//On prend la variable dans l'input de texte en question
		username=$('#username_connect').val();
		//on fait la requete GET correspondante
		$.ajax({
			url: "/users/name/"+username+".json",
			dataType: "json",
			type: "get",
			success: function(donnees){
				//Connection réussie ! Ici on va écrire les modifications pour passer de non connecté à connecté dans le DOM

				$(".connected").show();
				$(".disconnected").hide();
				var l = donnees['smokes'].length;
				console.log(l);
			},
			error: function(xhr,textStatus,errorThrown){
				//Connection ratée... On rajoute l'erreur dans le DOM
				console.log(textStatus);
				console.log(errorThrown);
				$('#error1').show();
				$('#username_connect').css("border-color","red");
			}
		});

	});

	//Quand on clique sur le bouton d'id 'Nouvel utilisateur'
	$('#create').click(function() {
		//On prend la variable dans l'input de texte en question
		username=$('#username_create').val();
		//on fait la requete GET correspondante
		$.ajax({
			url: "/users",
			type: "post",
			dataType: "json",
			data: {"authenticity_token":"WE9L/lhK8otgTy/+UZd8jOjGYBnRMs2I37JUL3v3tjQ=", "user[name]":username},
			success: function(donnees){
				//Création réussie ! Ici on va écrire les modifications pour passer de non connecté à connecté dans le DOM
				$(".connected").show();
				$(".disconnected").hide();
				//var l = donnees['smokes'].length;

			},
			error: function(xhr,textStatus,errorThrown){
				//Connection ratée... On rajoute l'erreur dans le DOM
				console.log(textStatus);
				console.log(errorThrown);
				$('#error2').show();
				$('#username_create').css("border-color","red");
			}
		});

	});
});
