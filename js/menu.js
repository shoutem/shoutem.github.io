function showMenuItems() {
  var location = window.location.href;
  
  // Show section with links
  var startingIndexSection = location.indexOf('/docs/') + 6;
  var endIndexSection = location.slice(startingIndexSection).indexOf('/') + startingIndexSection;
  var section = location.slice(startingIndexSection, endIndexSection);
  $('#' + section).show();

  // Show active menu item
  var path = location.slice(location.indexOf('/docs/'));
  $('a[href$="' + path + '"]:last').parent().addClass('active');

  // Select documentation tab
  $('#documentationTab').addClass('active');
};
