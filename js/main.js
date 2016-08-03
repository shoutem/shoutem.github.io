$(function() {
	
	function onFooterResize() {
		// throttle
		setTimeout(function() {
			$("#wrapper").css({ marginBottom: ($(".footer").height() + $(".pager").outerHeight()) + "px" });
		}, 300);
	}
	
	if( $("body").hasClass("home") )
	{
		$(window).on("resize", onFooterResize);
		
		onFooterResize();

		$('a[href="#signup"]').on("click", function(e) {
			e.preventDefault();

			$("html, body").animate({
				scrollTop: $(document).height()
			}, "slow");	
		});
	}

	$(".close-menu-overlay").on("click", function () {
	    $(".mobile-menu-overlay, #sidebar-wrapper").removeClass("open");
	});

	$(".navbar-toggle").on("click", function () {
	    $(".mobile-menu-overlay, #sidebar-wrapper").addClass("open");
	});
});
