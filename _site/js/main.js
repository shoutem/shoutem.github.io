$(function() {
	
	function onFooterResize() {

		if( window.outerWidth <= 640 ) {
			return;
		}

		// throttle
		setTimeout(function() {
			$("#wrapper").css({ marginBottom: ($(".footer").height() + $(".pager").outerHeight()) + "px" });
		}, 300);
	}
	
	if( $("body").hasClass("home") )
	{
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
});
