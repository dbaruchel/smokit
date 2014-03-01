//Attend le chargement du DOM que ce soit en Ruby (page load) et regarde les cookies ATTENTION LE COOKIE avec token propre crypté etc... n'est PAS IMPLEMENTE

var username=''


//Execute après le chargement du DOM
var ready = function(){

if($.cookie('username')!=null){
//Si on est déja connecté, on triche (haha)
	Connect(true);
}
else {
//Accueil
	$(".disconnected").show();
}
//Réglage de ce qu'on accepte comme input grace au plugin jquery alphanum(). Evite création d'utilisateurs aux noms mauvais pour les requetes. A COMPLETER DANS LE BACKEND
	$(".restricted_input").alphanum();

//Quand on clique sur le bouton d'id 'Connect'
	$('#connect').click(function() {
		Connect(false);
	});

//Quand on clique sur le bouton d'id 'Nouvel utilisateur'
	$('#create').click(function() {
		Create();
	});

//Quand on clique sur le bouton d'id 'Nouvelle smoke'
	$('#smoke').click(function() {
		Smoke();
	});

//Quand on clique sur le bouton go_smoke -> stats
	$('#go_smoke_stats').click(function() {
		Stats();
	});

//Quand on clique sur le bouton go_stats->smoke
	$('#go_stats_smoke').click(function(){
		go_stats_smoke();
	});

//Quand on clique sur le bouton go_smoke->home
	$('#go_smoke_home').click(function() {
		go_smoke_home(); 
	});
};

//Vérifie si le reload de la page provient de rails, ou est normal, pour bien gérer le reload du javascript sur la page home
$(document).ready(ready);
$(document).on('page:load', ready);


