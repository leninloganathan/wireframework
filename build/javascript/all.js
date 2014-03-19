$( document ).ready(function() {
	if($('.annotation').length == 0)
	{
		$(".meta-info-button").hide();
	} else {
		$(".meta-info-button a").click(function(){

			if($(this).hasClass('show-annotations')){
				$(this).removeClass('show-annotations');
				$(this).find('img').attr('src','/images/annotate-open.svg');
				$(".annotation").hide();
			} else {
				$(this).addClass('show-annotations');
				$(this).find('img').attr('src','/images/annotate-close.svg');
				$(".annotation").show();
			}

			$('html, body').animate({
				scrollTop: $(".annotation").first().offset().top + -75
			}, 400);
		});
	}
});
