module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			build: {
				src: 'js/app.js',
				dest: 'js/app.min.js'
			}
		},
		watch: {
			scripts: {
				files: ['js/app.js', 'scss/*.scss'],
				tasks: ['uglify', 'sass'],
				options: {
					spawn: false
				}
			}
		},
		sass: {
			dist: {
				options: {
					style: 'nested'
				},
				files: {
					'css/style.css': 'scss/*.scss'
				}
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'index.html',
						'scss/*.scss',
						'js/app.js'
					]
				},
				options: {
					server: {
						baseDir: './'
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['uglify', 'watch', 'sass', 'browserSync']);
}
