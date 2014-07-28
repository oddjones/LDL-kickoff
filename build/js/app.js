// Custom JS Application Code

// If using JSLint for syntax debugging, include the following
//global $, console, alert, App

$(function() { 
	App.init();
});

var App = (function() { 

	var settings = { 
		"name": "My Application",	
		"url": "application_url.com",
		"version": "1.0.0"	
	};

	var listen = function() { 
		// Application Listeners can be loaded here for easy configuration	

		//Feel free to remove below functions (to line) - they're mockup/documentation specific

		//Documentation Specific Nav handling
		var dna = $('#dNavAcc').val();
		var dni = $('#dNavItem').val();
		console.log('dna:'+dna);
		console.log('dni:'+dni);
		$('#collapse-'+dna).addClass('in');
		$('#collapse-'+dna+" .item-"+dni).addClass('active');

		//Fake up Nav highlighting for mockup only

		var thisPage = "home.html";
		if(document.location.pathname.length >1){
			thisPage = document.location.pathname.match(/[^\/]+$/)[0];
		}
			thisPage = thisPage.replace('.html','');
			if(thisPage.substring(0,5)=="docs-"){
			$('#li-documentation').addClass('active');
			}
			else
			{
			$('#li-'+thisPage).addClass('active');
			}
			
		//---------------------------------------
		
	
		//console.log("Ready and Listening captain!");
	};	

	var init = function() {
		// Kick off the listeners
		listen();
		// Application has been initalized
		//console.log(settings.name + "(v" + settings.version + ") Started");	
	};
		
	return {
		init: init
	};
	
}());