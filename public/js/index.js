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

	$('.newComment').keypress(function (e) {
		var key = e.which || e.keyCode;
		if (key === 13) { // 13 is enter
			if($(this).val() != ""){
				const text = $(this).val();
				const q = $(this).siblings('.q').val();
				$.ajax({
					url: '/comment',
					type: 'POST', 
					data: { text: text, q: q},
					success: function(data) {
						if(data.status >= 200 && data.status < 300){
						    $( `<div class="comment_wrapper">
									<img src="/images/${data.pic}">
									<a>@${data.username}</a>
									<span class=comment>${text}</span>
									<div>
										<span><i class="fa fa-heart" aria-hidden="true"></i>
										0 Likes</span>
										<span class="timestamp">Just Now</span>
									</div>
								</div>` ).insertBefore($(e.target).parent().parent());
						    $(e.target).val("");
						}else{
							window.location.href = data.location;
						}
					}
				});
			}
		}
	});

	$('.fa-heart').on('click', (event)=> {	
		$.ajax({
			url: '/like',
			type: 'POST', 
			data: { id: event.target.id },
			success: function(data) {
				if(data.status >= 200 && data.status < 300) {
					$(event.target).parent().children('.number').text((parseInt($(event.target).parent().children('.number').text()) + 1));
				}else{
					console.log("Double liked");
				}
			}
		});
	});
	
	

});

