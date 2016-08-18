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



  /* Ajax loading */

  $window.on("popstate", ajaxLoadLink);

  $body.on("click", "a:not(#signup-modal)", ajaxLoadLink);

  var animationTime = 200;
  var docsLinkRx = new RegExp(/\/docs\//);
  var flourish = new Flourish({
    extractSelector: "#documentation",
    replaceSelector: "#documentation",
    bodyTransitionClass: " loading ",
    replaceDelay: animationTime
  });

  flourish.on("post_fetch", function( options, output )
  {
    var title = output.title.split(/\s*-\s*/);
    flourish.page_title = title[0];
    flourish.page_section = title[1];

    setTimeout(function () {
      $body.removeClass("loading");
    }, animationTime * 1.5);
  });

  flourish.on("post_replace", function ()
  {
    var loc = currentLocation = getLocation();

    $(".page-title").text(flourish.page_title);
    $(".page-section").text(flourish.page_section);

    $(".menu-group-wrapper:not(#" + loc.section + ")").removeClass("active");
    $("#" + loc.section).addClass("active");

    var selectedItem = $('.menu-group-wrapper a[href$="' + loc.path + '"]');
    $("#menu li.active").not(selectedItem).removeClass("active");
    selectedItem.addClass("active");
    $("html, body").animate({ scrollTop: 0 });
   
    showMenuItems();
    showNavButtons();
    prepareCodeblocks();
    Prism.highlightAll();
    setShell$Color();

    $(".mobile-menu-overlay, #sidebar-wrapper").removeClass("open");
    
    // remove focus from the active menu link
    document.activeElement.blur();
  });



  /* Signup modal */

  var $signupModal = $("#signup-modal");

  $("#signup-button, #signup-button-menu").on("click", function(e) {
    $(".mobile-menu-overlay, #sidebar-wrapper").removeClass("open");
    $signupModal.addClass("open");
    setTimeout(function(){
      $(".signup-email").focus();
    }, 200);
    e.preventDefault();
  });

  $signupModal.on("click", function(e) {
    if( (e.target || e.srcElement).id === $signupModal[0].id ) {
      $signupModal.removeClass("open");
      e.preventDefault();
    }
  });

  $("#mc-embedded-cancel").on("click", function(e) {
      $signupModal.removeClass("open");
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
    location = location || window.location.href;
    var startingIndexSection = location.indexOf('/docs/') + 6;
    var endIndexSection = location.slice(startingIndexSection).indexOf('/') + startingIndexSection;
    var section = location.slice(startingIndexSection, endIndexSection);
    var path = location.slice(location.indexOf('/docs/'));

    return {section: section, path: path};
  }

  function showMenuItems() {
    var loc = currentLocation;

    // Show section with links
    $('.menu-group-wrapper:not(#' + loc.section + ')').removeClass('active');
    $('#' + loc.section).addClass('active');

    // Show active menu item
    $('.menu-group-wrapper a[href$="' + loc.path + '"]').parent().addClass('active');

    // Select documentation tab
    $('#documentationTab').addClass('active');
  };

  function showNavButtons() {
      var $activeLink = $('.sidebar-nav .active');
      var $prev = $('a', $activeLink.prev());
      var $next = $('a', $activeLink.next());
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
      if( e.originalEvent.state && e.originalEvent.state.url ) {
        url = e.originalEvent.state.url
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

  // CodeMirror(document.getElementsByTagName("ptrk")[0], {
  //   mode: 'jsx',
  //   lineNumbers: 23,
  //   // lineWrapping: true,
  //   smartIndent: false, // javascript mode does bad things with jsx indents
  //   matchBrackets: true,
  //   theme: 'solarized-light',
  //   readOnly: false,
  // });
});