var APP = (function($) {
    var app = {};
    app.init = function() {
        $.htmlhistory.init();
        $.htmlhistory.changeTo('/test/');
    };
    return app;
} (jQuery));

$(function() {
    APP.init();
});