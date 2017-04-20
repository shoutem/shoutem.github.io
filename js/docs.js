$(function() {
  var currentLocation = getLocation();
  var $window = jQuery(window);
  var $document = jQuery(document);
  var $body = jQuery("body");

  showMenuItems();
  showNavButtons();
  prepareCodeblocks();
  Prism.highlightAll();
  setShell$Color();
  setupVideos();



  /* Ajax loading */

  $window.on("popstate", ajaxLoadLink);
  $body.on("click", "a:not(#signup-modal)", ajaxLoadLink);

  var animationTime = 200;
  var hostname = window.location.host;
  var docsLinkRx = new RegExp(hostname + "/docs/", "i");
  var flourish = new Flourish({
    extractSelector: "#documentation",
    replaceSelector: "#documentation",
    bodyTransitionClass: " loading ",
    replaceDelay: animationTime
  });

  addTargetBlankToLinks();

  flourish.off("post_fetch").on("post_fetch", function( options, output )
  {
    var title = output.title.split(/\s*-\s*/);
    flourish.page_title = title[0];
    flourish.page_section = title[1];
    flourish.edit_link = output.el.querySelector(".edit-link a").href;

    setTimeout(function () {
      $body.removeClass("loading");
    }, animationTime * 1.5);
  });

  flourish.off("post_replace").on("post_replace", function ()
  {
    var loc = currentLocation = getLocation();

    $(".page-title").text(flourish.page_title);
    $(".page-section").text(flourish.page_section);
    $(".edit-link a")[0].href = flourish.edit_link;

    $("html, body").animate({ scrollTop: 0 });
   
    addTargetBlankToLinks();
    showMenuItems();
    showNavButtons();
    prepareCodeblocks();
    Prism.highlightAll();
    setShell$Color();
    setupVideos();

    $(".mobile-menu-overlay, #sidebar-wrapper").removeClass("open");
    
    // remove focus from the active menu link
    document.activeElement.blur();
  });



  /* Signup modal */

  var $signupModal = $("#signup-modal");

  $("#signup-button, #signup-button-menu").on("click", function(e) {
    $(".mobile-menu-overlay, #sidebar-wrapper").removeClass("open");
    $signupModal.focusedElBeforeOpen = document.activeElement;
    $signupModal.addClass("open");
    setTimeout(function(){
      $(".signup-email").focus();
    }, 200);
    e.preventDefault();
  });

  $signupModal.on("click", function(e) {
    if( (e.target || e.srcElement).id === $signupModal[0].id ) {
      closeSignupModal();
      e.preventDefault();
    }
  });

  $("#mc-embedded-cancel").on("click", function(e) {
      closeSignupModal();
  });

  function addTargetBlankToLinks() {
    $("a").each(function(){
      if( ! this.href.match(docsLinkRx) ) {
        this.setAttribute("target", "_blank");
      }
    });
  }

  function closeSignupModal(e)
  {
    $signupModal.removeClass("open");
    $signupModal.focusedElBeforeOpen.focus();
  }

  // https://bitsofco.de/accessible-modal-dialog/
  $signupModal.on("keydown", function(e)
  {
    var emailInput = document.querySelector("#mce-EMAIL");
    var submitButton = document.querySelector("#mc-embedded-subscribe");
    var KEY_TAB = 9;

    function handleBackwardTab() {
      if ( document.activeElement === emailInput ) {
          e.preventDefault();
          submitButton.focus();
      }
    }
    function handleForwardTab() {
      if ( document.activeElement === submitButton ) {
          e.preventDefault();
          emailInput.focus();
      }
    }

    if( e.keyCode === KEY_TAB )
    {
      if ( e.shiftKey ) {
        handleBackwardTab();
      } else {
        handleForwardTab();
      }
    }
  });

  // prevent document scrolling upon reaching sidebar menu scroll end
  // http://jsfiddle.net/troyalford/4wrxq/4/
  $("#sidebar-wrapper").on("wheel mousewheel DOMMouseScroll", function(ev)
  {
    var $this = $(this),
      scrollTop = this.scrollTop,
      scrollHeight = this.scrollHeight,
      height = $this.height(),
      delta = (ev.type == "DOMMouseScroll" ?
        ev.originalEvent.detail * -40 :
        ev.originalEvent.wheelDelta),
      up = delta > 0;

    if( ! up && -delta > scrollHeight - height - scrollTop ) {
      // Scrolling down, but this will take us past the bottom.
      $this.scrollTop(scrollHeight);
      ev.stopPropagation();
      ev.preventDefault();
      ev.returnValue = false;
      return false;
    } else if( up && delta > scrollTop ) {
      // Scrolling up, but this will take us past the top.
      $this.scrollTop(0);
      ev.stopPropagation();
      ev.preventDefault();
      ev.returnValue = false;
      return false;
    }
  });

  function getLocation( location ) {
    location = (location || window.location.href).split("?").shift();
    var startingIndexSection = location.indexOf('/docs/') + 6;
    var endIndexSection = location.slice(startingIndexSection).indexOf('/') + startingIndexSection;
    var section = location.slice(startingIndexSection, endIndexSection);
    var path = location.slice(location.indexOf('/docs/'));

    return {section: section, path: path};
  }

  function showMenuItems() {
    var loc = currentLocation;

    $('.sidebar-nav .active').removeClass("active");
    $('.sidebar-nav .open').removeClass("open");

    // Show active menu item
    $activeLinks = $('a[href$="' + loc.path + '"]');
    $activeLinks.addClass("active");
    $activeLinks.parents("ul").addClass('open');

    // Select documentation tab
    $('#documentationTab').addClass('active');
  };

  function showNavButtons() {
      var $activeLink = $('.sidebar-nav .active:not(.menu-group-title)').parent();

      var $prev = $('>a', $activeLink.prev());
      var $next = $('>a', $activeLink.next());
      var prevUrl = $prev.attr('href');
      var nextUrl = $next.attr('href');
      var $prevLink = $('#pager-wrapper .previous a');
      var $nextLink = $('#pager-wrapper .next a');
      var $prevPar = $prevLink.parent();
      var $nextPar = $nextLink.parent();
      var $prevText = $prev.text();
      var $nextText = $next.text();
      
      $prevLink.attr('href', prevUrl);
      $prevLink.html("<span>" + $prevText + "</span>");
      $prevLink.attr("title", $prevText);
      
      $nextLink.attr('href', nextUrl);
      $nextLink.html("<span>" + $nextText + "</span>");
      $nextLink.attr("title", $nextText);

      if( prevUrl ) {
        $prevPar.removeClass('inactive');
      } else {
        $prevPar.addClass('inactive');
      }

      if( nextUrl ) {
        $nextPar.removeClass('inactive');
      } else {
        $nextPar.addClass('inactive');
      }

      if( ! prevUrl && ! nextUrl ) {
        $('#pager-wrapper').addClass("hidden");
      } else {
        $('#pager-wrapper').removeClass("hidden");
      }
  }

  function prepareCodeblocks() {
      $('pre').each(function() {
          var $pre = $(this);
          var codeClass = $pre.find('code').attr('class');
          var code = $pre.html();
          var fileMatch = code.match(/#file:.+$/m);
          var lineMatch = codeClass && codeClass.match(/\{(.+)\}/);
          var fileTag;
          
          if (fileMatch) {
              fileTag = fileMatch[0];
              code = code.replace(fileTag + '\n', '');
              $pre.html(code);
              $pre.before('<div class="docs-codeblock-path">' + fileTag.substring(7) + '</div>');
          }
          
          if (lineMatch) {
              $pre.attr('data-line', lineMatch[1]);
          }
      });
  }

  function ajaxLoadLink (e) {
    if( e.ctrlKey || e.shiftKey || e.metaKey ) {
      return;
    }

    var url = false;

    if( e.type === "popstate" )
    {
      var state = e.originalEvent ? e.originalEvent.state : e.state;

      if( state && state.url ) {
        url = state.url
      }
    }
    else
    {
      if( this.href.indexOf("#") === -1 ) {
        url = this.href;
      }
    }

    if( url && url.match(docsLinkRx) )
    {
      e.preventDefault();

      var curLoc = currentLocation;
      var newLoc = getLocation(url);

      if( curLoc.section === newLoc.section && curLoc.path === newLoc.path ) {
        document.activeElement.blur();
        return;
      }

      flourish.fetch({
        url: url,
        eventType: e.type,
        onerror: function( request, options, self ) {
          $body.removeClass("loading");
        }
      });
    }
  }

  function setShell$Color()
  {
    var elements = jQuery("code.language-shellsession");

    elements.each(function(){
      this.innerHTML = this.innerHTML.replace(/^\s*\$/, "<span class='dollar-sign'>$</span>");
    });
  }


  /* Videos */
  function setupVideos()
  {
    var videos = Array.prototype.slice.call(document.querySelectorAll(".video-screen"));

    videos.forEach(function(video)
    {
      video.querySelector("video").play();
    });
  }
});