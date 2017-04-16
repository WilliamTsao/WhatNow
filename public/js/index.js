$(document).ready(function() {
	
	//toggle comment box
	$('.bottom').on('click', (event)=> {
		event.preventDefault();
		/* Act on the event */
		$(event.target).parent().find($('.comments')).toggle();
	});
	$('.bottom .fa').on('click', (event)=> {
		event.preventDefault();
		/* Act on the event */
		$(event.target).parent().parent().find($('.comments')).toggle();
	});
	$('.newComment').on('keypress', function (e) {
		var key = e.which || e.keyCode;
		if (key === 13) { // 13 is enter
		// code for enter
			const text = $(this).val();
			const q = $(this).siblings('.q').val();
			$.ajax({
				url: '/comment',
				type: 'POST', 
				data: { text: text, q: q},
				success: function(data) {
				    console.log(data);
				}
			});
		
		}
	});

	
	

});

