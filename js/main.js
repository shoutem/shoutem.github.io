function openMenu() {
    var overlay = document.querySelector('#mobile-menu-overlay');
    
    overlay.classList.add('open');
}

function closeMenu() {
    var overlay = document.querySelector('#mobile-menu-overlay');
    if (window.event.target.nodeName !== 'A')
        overlay.classList.remove('open');
}

// https://github.com/benlister/utilities/tree/master/Modernizr%20Retina%20:%20HiDPI%20test
function isHiPDI ()
{
	if (window.matchMedia) { 
		var mq = window.matchMedia("only screen and (-moz-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
		
		if(mq && mq.matches) {
			return true;
		} 
	}

	return false;
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
