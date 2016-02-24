// # Task automation for tweet
//
// Run various tasks when developing for and working with tweet.
//
// **Usage instructions:** can be found by running `grunt --help`.
//
// **Debug tip:** If you have any problems with any Grunt tasks, try running them with the `--verbose` command
var path = require('path'),

    escapeChar = process.platform.match(/^win/) ? '^' : '\\',
    cwd = process.cwd().replace(/( |\(|\))/g, escapeChar + '$1'),
    buildDirectory = path.resolve(cwd, 'build'),

// ## Grunt configuration

    configureGrunt = function (grunt) {
        // #### Load all grunt tasks
        //
        // Find all of the task which start with `grunt-` and load them, rather than explicitly declaring them all
        require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

        var cfg = {
            // #### Common paths used by tasks
            paths: {
                build: buildDirectory
            },
            // Standard build type, for when we have nightlies again.
            buildType: 'Build',
            // Load package.json so that we can create correctly versioned releases.
            pkg: grunt.file.readJSON('package.json'),

            // ### grunt-contrib-jshint
            // Linting rules, run as part of `grunt validate`. See [grunt validate](#validate) and its subtasks for
            // more information.
            jshint: {
                options: {
                    jshintrc: true
                },

                client: [
                    'app/**/*.js',
                    'classic/src/**/*.js'
                ]
            },

            jscs: {
                options: {
                    config: true
                },

                client: {
                    options: {
                        config: '.jscsrc'
                    },

                    files: {
                        src: [
                            'app/**/*.js',
                            'classic/src/**/*.js'
                        ]
                    }
                }
            },

            // ### grunt-shell
            // Command line tools where it's easier to run a command directly than configure a grunt plugin
            shell: {
                // #### Run bower install
                // Used as part of `grunt init`. See the section on [Building Assets](#building%20assets) for more
                // information.
                bower: {
                    command: path.resolve(cwd + '/node_modules/.bin/bower --allow-root install'),
                    options: {
                        stdout: true,
                        stdin: false
                    }
                }
            },

            // ### grunt-contrib-clean
            // Clean up files as part of other tasks
            clean: {
                build: {
                    src: ['build/**']
                },
                ext_cache: {
                    src: ['bower_components/extjs/**']
                },
                dependencies: {
                    src: ['node_modules/**', 'bower_components/**', 'ext/**']
                }
            },

            // ### grunt-contrib-copy
            copy: {
                ext: {
                    files: [
                        // includes files within path and its sub-directories
                        {expand: true, cwd: 'bower_components/extjs/', src: ['**'], dest: 'ext/', dot: true}
                    ]
                }
            }
        };

        // Load the configuration
        grunt.initConfig(cfg);

        // # Custom Tasks

        // ### Lint
        //
        // `grunt lint` will run the linter and the code style checker so you can make sure your code is pretty
        grunt.registerTask('lint', 'Run the code style checks and linter',
            ['jshint', 'jscs']
        );

        // ### Init assets
        // `grunt init` - will run an initial asset build for you
        //
        // Grunt init runs `bower install` as well as the standard asset build tasks which occur when you run just
        // `grunt`. This fetches the latest client side dependencies, and moves them into their proper homes.
        //
        // This task is very important, and should always be run and when fetching down an updated code base just after
        // running `npm install`.
        //
        // `bower` does have some quirks, such as not running as root. If you have problems please try running
        // `grunt init --verbose` to see if there are any errors.
        grunt.registerTask('init', 'Prepare the project for development',
            ['shell:bower', 'copy:ext', 'clean:ext_cache']);
    };

module.exports = configureGrunt;
