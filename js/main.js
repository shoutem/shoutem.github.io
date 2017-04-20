// requestAnimFrame  pseudo-polyfill
window.requestAnimFrame = (function(){
return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60); };
})();

var isHome = $("body").hasClass("home");
var isTouchDevice = "ontouchstart" in document.documentElement;

if( isHome )
{
	var shoutemAni = new ShoutemAnimation(".shoutem-ani");
	var headroom = new Headroom($("nav.headroom").get(0), {
		offset: 81,
		tolerance: {
			down : 10,
			up : 20
		}
	});

	headroom.init();

	$('a[href="#signup"]').on("click", function(e) {
		e.preventDefault();

		$("html, body").animate({
			scrollTop: $(document).height()
		}, "slow");	
	});

	$(window).on("resize", onFooterResize);

	onFooterResize();
}

$(".close-menu-overlay").on("click", function () {
	$(".mobile-menu-overlay, #sidebar-wrapper").removeClass("open");
});

$(".navbar-toggle").on("click", function () {
	$(".mobile-menu-overlay, #sidebar-wrapper").addClass("open");
});

// http://stackoverflow.com/a/3369743
jQuery(document).on("keydown", function(evt)
{
	evt = evt || window.event;

	var isEscape = false;

	if ("key" in evt) {
		isEscape = evt.key == "Escape";
	} else {
		isEscape = evt.keyCode == 27;
	}

	if (isEscape) {
		$(".mobile-menu-overlay, #sidebar-wrapper, #signup-modal").removeClass("open");
	}
});

if( typeof Dragdealer !== "undefined" )
{
	var ddOptions = {
		speed: 0.2,
		loose: true,
	 	requestAnimationFrame: true
	};
	var dragDealers = {
		screens: new Dragdealer('screen-type-cards', ddOptions),
		layouts: new Dragdealer('layout-cards', ddOptions),
		styles: new Dragdealer('visual-style-cards', ddOptions)
	};

	if( ! isTouchDevice ) {
		animateDragdealerOnHover(dragDealers.screens);
		animateDragdealerOnHover(dragDealers.layouts);
		animateDragdealerOnHover(dragDealers.styles);
	}
}

function animateDragdealerOnHover( dealer ) {
	var wrapper = dealer.wrapper;
	var handle = dealer.handle;

	if( ! wrapper || ! handle ) {
		return false;
	}

	var wrapperDims = wrapper.getBoundingClientRect();
	var handleDims = handle.getBoundingClientRect();
	var hw = handleDims.width;
	var ww = wrapperDims.width;
	var center = hw/2 - ww/2;
	var lastMove = Date.now();
	var animationTriggerTime = 100; //ms

	handle.style.transform = "translateX(-" + center + "px)";

	function mouseMove () {

		if( Date.now() - lastMove < animationTriggerTime ) {
			return false;
		}

		var x = this.pageX - wrapperDims.left;
		var perc = x / ww;
		var left = perc < 0.5;

		if( left ) {
			perc = 0.5 - perc;
		} else {
			perc = perc - 0.5;
		}

		perc = perc*2;
		
		var pixDiff = center * Math.min(1.0, Math.asin(perc));

		if( left ) {
			offset = center - pixDiff;
		} else {
			offset = center + pixDiff;
		}

		offset = parseInt(offset, 10);
		handle.style.transform = "translateX(-" + offset + "px)";

		lastMove = Date.now();
	}

	function windowResize () {
		wrapperDims = wrapper.getBoundingClientRect();
		handleDims = handle.getBoundingClientRect();
		hw = handleDims.width;
		ww = wrapperDims.width;
		center = hw/2 - ww/2;
		handle.style.transform = "translateX(-" + center + "px)";
	}

	window.addEventListener("resize", function(event) {
		requestAnimationFrame(windowResize);
	});

	wrapper.addEventListener("mousemove", function(event) {
		requestAnimationFrame(mouseMove.bind(event));
	});
}

function onFooterResize() {

	if( window.outerWidth <= 640 ) {
		return;
	}

	// throttle
	setTimeout(function() {
		$("#wrapper").css({ marginBottom: ($(".footer").height() + $(".pager").outerHeight()) + "px" });
	}, 300);
}
