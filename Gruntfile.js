module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Directory settings
    DIRS: {
      build: 'build/',
      src: 'src/'
    },

    // Combine and compress our JavaScript with uglify
    uglify: {
      options: {
        compress: {
          drop_console: true
        },
        sourceMap: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      javascripts: {
        files: {
          '<%= DIRS.build %>jquery-html-history.min.js': [
            // Our Modernizr file
            '<%= DIRS.src %>modernizr.js',
            // Our files
            '<%= DIRS.src %>request-interval.js',
            '<%= DIRS.src %>jquery-html-history.js',
          ],
          '<%= DIRS.build %>jquery-html-history.sans-modern.js': [
            // Our files
            '<%= DIRS.src %>request-interval.js',
            '<%= DIRS.src %>jquery-html-history.js',
          ],
        }
      }
    },

    // Continuously watch our grunt settings, JavaScript files to run grunt tasks
    watch: {
      scripts: {
        files: [
          '<%= DIRS.src %>*.js',
        ],
        tasks: ['uglify'],
        options: {
          interrupt: true,
        },
      },
      config: {
        files: [
          'Gruntfile.js',
        ],
        tasks: ['uglify',],
        options: {
          interrupt: true,
        },
      },
    },

  });

  // Load the plugins that provide the tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'watch']);

};
