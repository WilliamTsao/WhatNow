function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

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
			if( /[^\s]/.test($(this).val()) ){
				const text = $(this).val();
				const q = $(this).siblings('.q').val();
				$.ajax({
					url: '/comment',
					type: 'POST',
					data: { text: text, q: q},
					success: function(data) {
						if(data.status >= 200 && data.status < 300){
							let safeTxt = escapeHtml(text);
						    $( `<div class="comment_wrapper">
									<a>@${data.username}</a>
									<span class=comment>
											${safeTxt}
									</span>
									<div>
										<span><i class="fa fa-heart" aria-hidden="true" id=${data.id} liked="false"></i>
										<span class="number">0</span> Likes</span>
										<span class="timestamp">Just Now</span>
									</div>
								</div>` ).insertBefore($(e.target).parent().parent());
						    $(e.target).val("");
						}else{
							window.location.href = data.location;
						}
					}
				});
			}else{
				e.preventDefault();
				console.log('empty comment');
			}
		}
	});

	$(document).on('click', '.fa-heart', (event)=> {
		console.log(event.target);
		if(event.target.getAttribute('liked') === undefined || event.target.getAttribute('liked') !== 'true'){
			console.log('like')
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

	$('.postQ').on('keypress', 'input, select', function (e) {
		alert('hi');
	}
	//TODO: implement form validations
	$('.postQ').submit(function( event ) {
		console.log(event.target.child("input[type=text]").val())
		if ( /^\s*$/.test(event.target.child("input[type=text]").val()) ) {
			console.log('Empty input');
			event.preventDefault();
			return false;
		}
	});

	$('.search').submit(function( event ) {
		// console.log(event.target)
		if ( /^\s*$/.test(event.target.child("input[type=text]").val()) ) {
			console.log('Empty search');
			event.preventDefault();
			return;
		}
	});

});

