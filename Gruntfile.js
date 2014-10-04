module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dir: {
            scripts: 'assets/scripts',
            styles: 'assets/styles'
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= dir.scripts %>',
                    mainConfigFile: '<%= dir.scripts %>/main.js',
                    name: 'main',
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    out: 'main-built.js'
                }
            }
        },
        less: {
            production: {
                options: {
                    paths: ['<%= dir.styles %>'],
                    compress: true
                },
                files: {
                    'site.css': '<%= dir.styles %>/site.less'
                }
            }
        },
        jshint: {
            options: {
                ignores: ['<%= dir.scripts %>/lib/*.js']
            },
            all: ['Gruntfile.js', '<%= dir.scripts %>/**/*.js'],
        },
        watch: {
            config: {
                files: ['Gruntfile.js'],
                tasks: ['jshint']
            },
            scripts: {
                files: ['<%= dir.scripts %>/**/*.js'],
                tasks: ['jshint', 'requirejs']
            },
            styles: {
                files: ['<%= dir.styles %>/*.less'],
                tasks: ['less']
            }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register tasks.
    grunt.registerTask('default', ['requirejs']);
};
