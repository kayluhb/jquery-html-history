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

    $(function() {
        $.htmlhistory.init();
        $(window).bind('htmlhistory', respondToUrl);
    });
    function respondToUrl() {
        console.log('respond to url');
    }

This script must be used on a server for testing, local or otherwise.  I need to figure out a way to make it work locally.

This plugin was originally authored by Ben Cherry (bcherry@gmail.com), and is released under an MIT License (do what you want with it).  
Modifications made by Caleb Brown (twitter.com/kayluhb)  
Some of the code in this plugin was adapted from Modernizr, which is also available under an MIT License.