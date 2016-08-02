function openMenu() {
	$('#mobile-menu-overlay').addClass("open");
}

function closeMenu() {
    $('#mobile-menu-overlay').removeClass("open");
}

$(function() {
	
	function onFooterResize() {
		// throttle
		setTimeout(function() {
			$("#wrapper").css({ marginBottom: ($(".footer").height() + $('.pager').outerHeight()) + "px" });
		}, 300);
	}
	
	$(window).on("resize", onFooterResize);
	onFooterResize();
	
	// header
	
	var headroom  = new Headroom($("nav.headroom").get(0), 
		{
			tolerance: {
				down : 10, up : 20
			},
			offset : 81
		}	
	);
	headroom.init();
	
	// navbar
	
	function scrollTo(p_y) {
		$('html, body').animate({
			scrollTop: p_y
		}, 'slow');			
	}

	$('.home a[href="#signup"]').on("click", function(e) {
		
		e.preventDefault();
		$this = $(this);
		
		scrollTo($(document).height());
		
	});

	$(".close-menu-overlay").on("click", closeMenu);
});
