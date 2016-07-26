function openMenu() {
    var overlay = document.querySelector('#mobile-menu-overlay');
    
    overlay.classList.add('open');
}

function closeMenu() {
    var overlay = document.querySelector('#mobile-menu-overlay');
    if (window.event.target.nodeName !== 'A')
        overlay.classList.remove('open');
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
});
