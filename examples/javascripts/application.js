var APP = (function($) {
    var app = {};
    app.init = function() {
        $.htmlhistory.init();
        $(window).bind('htmlhistory', respondToUrl);
    };
    function respondToUrl() {
        console.log('respond to url');
    }
    return app;
} (jQuery));

$(function() {
    APP.init();
});