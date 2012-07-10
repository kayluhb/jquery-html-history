jQuery HTML5 History Plugin
===========================

Plugin that provides an "htmlhistory" event on the window object, notifying an application when the URL changes.  
This is accomplished by watching the hash, using the hashchange event from HTML5 or a polling interval in older browsers.  
In addition, in some modern browsers, HTML5 History Management is used to support changing the URL's path without reloading the page.  
This plugin also provides a method to navigate to a URL safely, that will use HTML5 History Management to avoid a page load.
Everything degrades gracefully, and supports RESTful client development.

Browser Support:
----------------

    Chrome  - Any recent version of Chrome supports everything.
    Safari  - Any recent version of Safari supports everything.
    Firefox - Newer versions of Firefox support the hashchange event
              Firefox 4 betas also support HTML5 History Management
    Internet Explorer - IE8 supports hashchange
              IE6 and 7 receive inferior hashchange support through a polling interval.
    Others  - Other modern browsers probably support some subset of features.


Use:
----

include jquery  
include the request-interval.js  
include the modernizr.min.js  
include the jquery-html-history.min.js  

onload call:

    $(function() {
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
    });

    function onURL() {
        var path = $.htmlhistory.url();
        // respond to the url however you would like
        console.log('respond to url', path);
    }


Options:
--------

    options: {
        useHistory: true, // whether we use HTML5 History Management to change the current path
        useHashchange: true, // whether we use HTML5 Hashchange to listen to the URL hash
        poll: 250, // when using Hashchange in browsers without it, how often to poll the hash (in ms)
        interceptLinks: true, // do we intercept all relative links to avoid some page reloads?
        disableHashLinks: true, // do we ensure all links with href=# are not followed (this would mess with our history)?
        triggerOnLoad: true, // send the hash event on load
        hash: '#!' // the hash to add if using hashes
    },


This script must be used on a server for testing, local or otherwise.  I need to figure out a way to make it work from the file system.

License:
--------

This plugin was originally authored by Ben Cherry (bcherry@gmail.com), and is released under an MIT License (do what you want with it).  
Modifications made by Caleb Brown (twitter.com/kayluhb)  
