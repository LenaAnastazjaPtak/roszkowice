/*
	Project Name : History
	Navigation, slider, map, loader, form, back-to-top are handled in React only.

	## Document Ready
		- Portfolio Section
		- Lightbox for Highlights Video

	## Window Load
		- Portfolio Section (isotope)
*/

(function($) {

	"use strict"

	$(document).on("ready",function() {

		if($(".portfolio-section").length){
			$(".portfolio-section .portfolio-box").magnificPopup({
				delegate: "a",
				type: "image",
				tLoading: "Loading image #%curr%...",
				mainClass: "mfp-img-mobile",
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					preload: [0,1]
				},
				image: {
					tError: "<a href=\"%url%\">The image #%curr%</a> could not be loaded.",
				}
			});
		}

		$('.video-section a').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});

	});

	$(window).on("load",function() {
		var $container = $(".portfolio-section .portfolio-list");
		if ($container.length) {
			$container.isotope({
				layoutMode: 'fitRows',
				itemSelector: ".portfolio-box",
				gutter: 0,
				transitionDuration: "0.5s"
			});

			$("#filters a").on("click",function(){
				$('#filters a').removeClass("active");
				$(this).addClass("active");
				var selector = $(this).attr("data-filter");
				$container.isotope({ filter: selector });
				return false;
			});
		}
	});

})(jQuery);
