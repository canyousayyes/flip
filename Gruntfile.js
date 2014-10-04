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
                    cleancss: true
                },
                files: {
                    'site.css': '<%= dir.styles %>/site.less'
                }
            }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Register tasks.
    grunt.registerTask('default', ['requirejs']);
    grunt.registerTask('less', ['less']);
};
