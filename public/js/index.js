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
										<span><i class="fa fa-heart" aria-hidden="true" id=${data.id}></i>
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
		console.log(event.target);
		if(event.target.getAttribute('liked') === undefined || event.target.getAttribute('liked') !== 'true'){
			$.ajax({
				url: '/like',
				type: 'POST',
				data: { id: event.target.id },
				success: function() {
					$(event.target).parent().children('.number').text((parseInt($(event.target).parent().children('.number').text()) + 1));			
					$(event.target).attr({ liked: 'true' });
					$(event.target).css('color', '#ed4956');
						$(event.target).hover(function() {
							/* Stuff to do when the mouse enters the element */
							$(this).css('color', '#787878');
						}, function() {
							/* Stuff to do when the mouse leaves the element */
							$(this).css('color', '#ed4956');
						});		
				}
			});
		}else{
			console.log("unlike");
			$.ajax({
				url: '/unlike',
				type: 'POST',
				data: { id: event.target.id },
				success: function() {					
						$(event.target).parent().children('.number').text((parseInt($(event.target).parent().children('.number').text()) - 1));
						$(event.target).css('color', '#787878');
						$(event.target).attr({ liked: 'false' });
						$(event.target).hover(function() {
							/* Stuff to do when the mouse enters the element */
							$(this).css('color', '#ed4956');
						}, function() {
							/* Stuff to do when the mouse leaves the element */
							$(this).css('color', '#787878');
						});
								
				}
			});
		}
	});
	
	

});

