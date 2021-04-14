/*================================================================================
	Item Name: Materialize - Material Design Admin Template
	Version: 5.0
	Author: PIXINVENT
	Author URL: https://themeforest.net/user/pixinvent/portfolio
================================================================================

NOTE:
------
PLACE HERE YOUR OWN JS CODES AND IF NEEDED.
WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR CUSTOM SCRIPT IT'S BETTER LIKE THIS. */
$(document).ready(function() {
	$(".sidenav-main .sidenav li.bold a").on("active", function() {
		$(".sidenav-main .sidenav li.bold a").removeClass("active");
		$(this).addClass("active");
	});
	    //hide the ans when entering a number
		$('input').on('focus', ()=>{
			
			document.getElementById('ansPreamble').innerHTML = "<a class = \"grey-text\" >The Root is equal to</a>";
			lblAns.textContent = null;
			divAns.style.display = 'none'; 
		});
		    //hide the ans when entering a number
			$('textarea').on('focus', ()=>{
			
				document.getElementById('ansPreamble').innerHTML = "<a class = \"grey-text\" >Solution matrix is:</a>";
				lblAns.textContent = null;
				divAns.style.display = 'none'; 
			});
});


function close_window() {
	if (confirm("Close Window ?")) {
		window.close();
	}
	return false;
  }