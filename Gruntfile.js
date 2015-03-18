module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            styles: {
                files: [
                    'resources/styles.less'
                ],
                tasks: [
                    'less:styles',
                    'autoprefixer:styles'
                ]
            }
        },
        less: {
            styles: {
                files: {
                    'tmp/styles.css': 'resources/styles.less'
                }
            }
        },
        autoprefixer: {
            styles: {
                files: {
                    'build/styles.css': 'tmp/styles.css'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
};