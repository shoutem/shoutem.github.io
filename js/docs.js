$(function() {
    showMenuItems();
    showNavButtons();
    prepareCodeblocks();
    Prism.highlightAll();

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

function showMenuItems() {
  var location = window.location.href;
  
  // Show section with links
  var startingIndexSection = location.indexOf('/docs/') + 6;
  var endIndexSection = location.slice(startingIndexSection).indexOf('/') + startingIndexSection;
  var section = location.slice(startingIndexSection, endIndexSection);
  $('#' + section).show();

  // Show active menu item
  var path = location.slice(location.indexOf('/docs/'));
  $('.menu-group-wrapper a[href$="' + path + '"]').parent().addClass('active');

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
};
