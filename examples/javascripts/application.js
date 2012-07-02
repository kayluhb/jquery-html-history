var APP = (function($) {
    var app = {};
    app.init = function() {
        // initialize the plugin
        $.htmlhistory.init({
            useHistory: true,
            useHashchange: true,
            poll: 250,
            interceptLinks: true,
            disableHashLinks: true,
            hash: '#!'
        });
        // bind the 'htmlhistory' event to the window
        $(window).bind('htmlhistory', onURL);
    };

    function onURL() {
        var path = $.htmlhistory.url();
        // respond to the url however you would like
        console.log('respond to url', path);
    }
    $(app.init);
    return app;
} (jQuery));
