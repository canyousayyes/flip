module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dir: {
            scripts: 'assets/scripts',
            styles: 'assets/styles'
        },
        jshint: {
            options: {
                ignores: ['<%= dir.scripts %>/lib/*.js']
            },
            scripts: ['<%= dir.scripts %>/**/*.js'],
            grunt: ['Gruntfile.js']
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= dir.scripts %>',
                    mainConfigFile: '<%= dir.scripts %>/main.js',
                    name: 'main',
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    out: 'main_built.js'
                }
            }
        },
        less: {
            options: {
                paths: ['<%= dir.styles %>'],
                compress: true
            },
            files: {
                src: '<%= dir.styles %>/site.less',
                dest: '<%= dir.styles %>/site.css'
            }
        },
        autoprefixer: {
            options: {
                cascade: false,
                browsers: ['last 2 versions']
            },
            files: {
                src: '<%= dir.styles %>/site.css',
                dest: 'site_built.css'
            }
        },
        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:grunt']
            },
            scripts: {
                files: ['<%= dir.scripts %>/**/*.js'],
                tasks: ['jshint:scripts', 'requirejs']
            },
            styles: {
                files: ['<%= dir.styles %>/*.less'],
                tasks: ['less', 'autoprefixer']
            }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register tasks.
    grunt.registerTask('default', ['requirejs']);
};
