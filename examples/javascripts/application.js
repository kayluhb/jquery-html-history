var APP = (function($) {
    var app = {};
    app.init = function() {
        // initialize the plugin
        $.htmlhistory.init({
            useHistory: true,
            useHashchange: true,
            poll: 250,
            interceptLinks: true,
            disableHashLinks: true
        });
        // bind the 'htmlhistory' event to the window
        $(window).bind('htmlhistory', respondToUrl);
    };
    function extract(s) {
        return s.split("#").join("/").split("/").pop();
    }
    function respondToUrl() {
        var section = extract(window.location.hash) || extract(window.location.pathname),
        path = window.location.href.split("#").join("/");
        // respond to the url however you would like
        console.log('respond to url', section, path);
    }
    $(app.init);
    return app;
} (jQuery));
