/*
 * grunt-liquibase
 * https://github.com/chrisgreening/grunt-liquibase
 *
 * Copyright (c) 2014 Chris Greening
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    liquibase: {
      version : {
        options: {
        },
        command : 'version'
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // load up jslint
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['liquibase']);

  grunt.registerTask('default', ['jshint', 'test']);
};
