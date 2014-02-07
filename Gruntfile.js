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
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('test', ['liquibase']);

};
