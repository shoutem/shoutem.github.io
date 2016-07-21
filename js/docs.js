$(function() {
  var currentLocation = getLocation();

  showMenuItems();
  showNavButtons();
  prepareCodeblocks();
  Prism.highlightAll();

  /* Ajax loading */
  jQuery(window).on("popstate", ajaxLoadLink);

  $("body").on("click", "a:not(#signup-modal)", ajaxLoadLink);

  var animationTime = 200;
  var docsLinkRx = new RegExp(/\/docs\//);
  var flourish = new Flourish({
    extractSelector: "#documentation",
    replaceSelector: "#documentation",
    bodyTransitionClass: " loading ",
    replaceDelay: animationTime
  });

  flourish.on("post_fetch", function( options, output, self )
  {
    setTimeout(function () {
      jQuery("body").removeClass("loading");
    }, animationTime * 1.5);
  });

  flourish.on("post_replace", function ()
  {
    var loc = currentLocation = getLocation();

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
  });

  var $signupModal = $("#signup-modal");

  $("#signup-button").on("click", function(e) {
    $signupModal.addClass("active");
  });

  $signupModal.on("click", function(e) {
    if( e.toElement.id === $signupModal[0].id ) {
      $signupModal.removeClass("active");
    }
  });

  // CodeMirror(document.getElementsByTagName("ptrk")[0], {
  //   mode: 'jsx',
  //   lineNumbers: 23,
  //   // lineWrapping: true,
  //   smartIndent: false, // javascript mode does bad things with jsx indents
  //   matchBrackets: true,
  //   theme: 'solarized-light',
  //   readOnly: false,
  // });

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
      var prevUrl = $('a', $activeLink.prev()).attr('href');
      var nextUrl = $('a', $activeLink.next()).attr('href');
      
      prevUrl && $('#pager-wrapper .previous a').attr('href', prevUrl).parent().removeClass('inactive');
      nextUrl && $('#pager-wrapper .next a').attr('href', nextUrl).parent().removeClass('inactive');
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
        onerror: function( request, options, self )
        {
          jQuery("body").removeClass("loading");
          jQuery("body").removeClass("overhide");
        }
      });
    }
  }
});