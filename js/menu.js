function showMenuItems() {
  var location = window.location.href;
  var startingIndex = location.indexOf('/docs/') + 6;
  var endIndex = location.slice(startingIndex).indexOf('/') + startingIndex;
  var section = location.slice(startingIndex, endIndex);

  var path = location.slice(endIndex).slice(0, -1);

  $('#' + section).show();
  // Make active parent <li> of <a>
  // Select last matched link, because sections also have links

  $('#documentationTab').addClass('active');

  $('a[href$="' + path + '"]:last').parent().addClass('active');
};
