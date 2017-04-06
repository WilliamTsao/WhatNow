$(document).ready(function() {
		
	$('.bottom').on('click', (event)=> {
		event.preventDefault();
		/* Act on the event */
		$(event.target).parent().find($('.comments').toggle());
	});

	

});