//  https://github.com/kayluhb/jquery-html-history
//
// Plugin that provides a "htmlhistory" event on the window object, notifying an application when the URL changes
// This is accomplished by watching the hash, using the hashchange event from HTML5 or a polling interval in older browsers.
// In addition, in some modern browsers, HTML5 History Management is used to support changing the URL's path without reloading the page.
// This plugin also provides a method to navigate to a URL safely, that will use HTML5 History Management to avoid a page load.
// Everything degrades gracefully, and supports RESTful client development.

// Browser Support:
//  Chrome  - Any recent version of Chrome supports everything.
//  Safari  - Any recent version of Safari supports everything.
//  Firefox - Newer versions of Firefox support the hashchange event
//            Firefox 4 betas also support HTML5 History Management
//  Internet Explorer - IE8 supports hashchange
//                      IE6 and 7 receive inferior hashchange support through a polling interval.
//  Others  - Other modern browsers probably support some subset of features.

// This plugin was originally authored by Ben Cherry (bcherry@gmail.com), and is released under an MIT License (do what you want with it).
// Modifications made by Caleb Brown (twitter.com/kayluhb)

(function($) {
    // can use $(window).bind("htmlhistory", fn) or $(window).htmlhistory(fn)
    var evt = 'htmlhistory',
        hash = 'onhashchange',
        hashevt = 'hashchange';

    $.fn.htmlhistory = function(handler) {
        return handler ? this.bind(evt, handler) : this.trigger(evt);
    };

    var his = $.htmlhistory = {

        // default options
        options: {
            // whether we use HTML5 History Management to change the current path
            useHistory: true,
            // whether we use HTML5 Hashchange to listen to the URL hash
            useHashchange: true,
            // when using Hashchange in browsers without it, how often to poll the hash (in ms)
            poll: 250,
            // do we intercept all relative links to avoid some page reloads?
            interceptLinks: true,
            // do we ensure all links with href=# are not followed (this would mess with our history)?
            disableHashLinks: true,
            // send the hash event on load
            triggerOnLoad: true,
            hash:'#!'
        },

        // call this once when your app is ready to use htmlhistory
        init: function(options) {
            var lastHash,
                $win = $(window),
                $bod = $('body');

            $.extend(his.options, options);

            // Listen to the HTML5 "popstate" event, if supported and desired
            if (his.options.useHistory && Modernizr.history) {
                $win.bind('popstate', function(e) {
                    $win.trigger(evt);
                });
            }

            // Listen to the HTML5 "hashevent" event, if supported and desired
            if (his.options.useHashchange && !Modernizr.history) {
                $win.bind(hashevt, function(e) {
                    $win.trigger(evt);
                });
                // Hashchange support for older browsers (IE6/7)
                if (!Modernizr.hashchange) {
                    lastHash = window.location.hash;
                    requestInterval(function() {
                        if (lastHash !== window.location.hash) {
                            $win.trigger(evt);
                            lastHash = window.location.hash;
                        }
                    }, his.options.poll);
                }
                if (his.options.triggerOnLoad) { $win.trigger(evt); }
            }

            // Intercept all relative links on the page, to avoid unneccesary page refreshes
            if (his.options.interceptLinks) {
                $bod.on('a[href^="/"]', 'click', function(e) {
                    his.changeTo($(this).attr('href'));
                    e.preventDefault();
                });
            }

            // Ensure all the href=# links on the page don't mess with things
            if (his.options.disableHashLinks) {
                $bod.on('a[href=#]', 'click', function(e) {
                    e.preventDefault();
                });
            }
        },

        // Call to manually navigate the app somewhere
        changeTo: function(path) {
            var $win = $(window);
            // If we're using History Management, just push an entry
            if (his.options.useHistory && Modernizr.history) {
                window.history.pushState(null, null, path);
                $win.trigger(evt);
            } else {
                // Make sure there's a hash (going from foo.com#bar to foo.com would trigger a reload in Firefox, sadly)
                if (path.indexOf('#') < 0) {
                    path = his.options.hash + path;
                }
                // Otherwise, navigate to the new URL.  Might reload the browser.  Might trigger a hashchange.
                window.location.href = path;
            }
        },

        // Return the current url
        url: function() {
            // If we're using History Management, just push an entry
            if (his.options.useHistory && Modernizr.history) {
                return window.location.pathname;
            } else {
                return window.location.hash.split(his.options.hash).join('');
            }
        }
    };
}(jQuery));
