;(function($) {

  function init() {
    console.log('init!');

    // initialize the plugin
    $.htmlhistory.init({
      useHistory: true,
      useHashchange: true,
      poll: 250,
      interceptLinks: true,
      disableHashLinks: true,
      triggerOnLoad: true,
      hash: '#!'
    });

    // bind the 'htmlhistory' event to the window
    $(window).bind('htmlhistory', onURL);
  }

  function onURL() {
    var path = $.htmlhistory.url();
    // respond to the url however you would like
    console.log('respond to url', path);
  }

  // Initialize our app on load
  $(init);
} (jQuery));
