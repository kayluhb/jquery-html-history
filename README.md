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

All production files are located under the build/ directory
min has just jquery-html-history.min.js (assumes you have request interval and modernizr tests already loaded)
kitchen-sink has request-interval.js, modernizr.min.js, and jquery-html-history.min.js
sans-modern has request-interval.js and jquery-html-history.min.js
sans-requst has modernizr.min.js and jquery-html-history.min.js

include jquery.
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

Example:
--------

To view the example, run the following command from your terminal in the root directory of the project

    python -m SimpleHTTPServer

Navigate to [localhost:8000/examples/](http://localhost:8000/examples/) in your browser.


Build:
-------

We are compiling the JavaScript into one file with [npm](https://www.npmjs.org/) and [Grunt](http://gruntjs.com/)).  We assume you have npm installed.

Install grunt client with

    sudo npm install -g grunt-cli

***

Assuming that the Grunt CLI has been installed, it's very easy to start working with Grunt:

Change to the project's root directory.

Install project dependencies with

    npm install

Run Grunt with

    grunt

That's really all there is to it. Installed Grunt tasks can be listed by running grunt --help.


This script must be used on a server for testing, local or otherwise.  I need to figure out a way to make it work from the file system.

License:
--------

Maintained by Caleb Brown [twitter.com/kayluhb](http://twitter.com/kayluhb)

This plugin was originally authored by Ben Cherry (bcherry@gmail.com), and is released under an MIT License (do what you want with it).


***

The MIT License (MIT)

Copyright (c) 2014 @kayluhb

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
