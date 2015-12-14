/*
 * grunt-liquibase
 * https://github.com/chrisgreening/grunt-liquibase
 *
 * Copyright (c) 2014 Chris Greening
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    liquibase: {
      version: {
        options: {
        },
        command: 'version'
      },
      update: {
        options: {
          classpath: path.join(__dirname, 'test', 'hsqldb-2.3.3.jar'),
          url: 'jdbc:hsqldb:mem:testdb',
          username: 'sa',
          password: '',
          changeLogFile: path.join(__dirname, 'test/fixtures', 'changelog.xml'),
          driver: 'org.hsqldb.jdbcDriver'
        },
        command: 'update'
      },
      dropAll: {
        options: {
          classpath: path.join(__dirname, 'test', 'hsqldb-2.3.3.jar'),
          url: 'jdbc:hsqldb:mem:testdb',
          username: 'sa',
          password: '',
          changeLogFile: path.join(__dirname, 'test/fixtures', 'changelog.xml'),
          driver: 'org.hsqldb.jdbcDriver'
        },
        command: 'dropAll'
      },
      changelogSync: {
        options: {
          classpath: path.join(__dirname, 'test', 'hsqldb-2.3.3.jar'),
          url: 'jdbc:hsqldb:mem:testdb',
          username: 'sa',
          password: '',
          changeLogFile: path.join(__dirname, 'test/fixtures', 'changelog.xml'),
          driver: 'org.hsqldb.jdbcDriver'
        },
        command: 'changelogSync'
      },
      changelogSyncSQL: {
        options: {
          classpath: path.join(__dirname, 'test', 'hsqldb-2.3.3.jar'),
          url: 'jdbc:hsqldb:mem:testdb',
          username: 'sa',
          password: '',
          changeLogFile: path.join(__dirname, 'test/fixtures', 'changelog.xml'),
          driver: 'org.hsqldb.jdbcDriver'
        },
        command: 'changelogSyncSQL'
      },
      tag: {
        options: {
          classpath: path.join(__dirname, 'test', 'hsqldb-2.3.3.jar'),
          url: 'jdbc:hsqldb:mem:testdb',
          username: 'sa',
          password: '',
          changeLogFile: path.join(__dirname, 'test/fixtures', 'changelog.xml'),
          driver: 'org.hsqldb.jdbcDriver'
        },
        command: 'tag',
        commandAttr: 'v1'
      },
      clearCheckSums: {
        options: {
          classpath: path.join(__dirname, 'test', 'hsqldb-2.3.3.jar'),
          url: 'jdbc:hsqldb:mem:testdb',
          username: 'sa',
          password: '',
          changeLogFile: path.join(__dirname, 'test/fixtures', 'changelog.xml'),
          driver: 'org.hsqldb.jdbcDriver'
        },
        command: 'clearCheckSums'
      },
      rollbackCount: {
        options: {
          classpath: path.join(__dirname, 'test', 'hsqldb-2.3.3.jar'),
          url: 'jdbc:hsqldb:mem:testdb',
          username: 'sa',
          password: '',
          changeLogFile: path.join(__dirname, 'test/fixtures', 'changelog.xml'),
          driver: 'org.hsqldb.jdbcDriver'
        },
        command: 'rollbackCount',
        commandAttr: '1'
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
