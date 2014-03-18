$( document ).ready(function() {
	$('.open-navigation').click(function(){
		$('body').addClass('js-navigation-is-open');
	});

	$('.close-navigation').click(function(){
		$('body').removeClass('js-navigation-is-open');
	});
});
