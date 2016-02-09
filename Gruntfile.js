/*
 * grunt-liquibase
 * https://github.com/chrisgreening/grunt-liquibase
 *
 * Copyright (c) 2014 Chris Greening
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    liquibase: {
      // Common options to be used for testing all commands
      options: {
        classpath: path.join(__dirname, 'test', 'hsqldb-2.3.3.jar'),
        url: 'jdbc:hsqldb:mem:testdb',
        username: 'sa',
        password: '',
        changeLogFile: path.join(__dirname, 'test/fixtures', 'changelog.xml'),
        driver: 'org.hsqldb.jdbcDriver'
      },
      version: {
        options: {
        },
        command: 'version'
      },
      update: {
        command: 'update'
      },
      dropAll: {
        command: 'dropAll'
      },
      changelogSync: {
        command: 'changelogSync'
      },
      changelogSyncSQL: {
        command: 'changelogSyncSQL'
      },
      tag: {
        command: 'tag',
        commandAttr: 'v1'
      },
      clearCheckSums: {
        command: 'clearCheckSums'
      },
      rollbackCount: {
        command: 'rollbackCount',
        commandAttr: '1'
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // load up jslint
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['liquibase']);

  grunt.registerTask('default', ['jshint', 'test']);
};
