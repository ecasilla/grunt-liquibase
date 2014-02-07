/*
* grunt-liquibase
* https://github.com/chrisgreening/grunt-liquibase
*
* Copyright (c) 2014 Chris Greening
* Licensed under the MIT license.
*/

'use strict';

var path = require('path');
var chalk = require('chalk');
var exec = require('child_process').exec;

module.exports = function(grunt) {

// Please see the Grunt documentation for more information regarding task
// creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('liquibase', 'Simple integration of liquibase with grunt - specifically for postgresql', function() {
    var cb = this.async();
    // merge defaults with the passed in options
    var options = this.options({
      changeLogFile : 'changelog.xml',
      classpath : path.join(__dirname, '..', 'lib', 'postgresql-9.3-1100.jdbc41.jar'),
      driver : 'org.postgresql.Driver',
    });
    var cmd = this.data.command;

    var liquibaseJarLocation = path.join(__dirname, '..', 'lib', 'liquibase.jar');
    var liquibaseCommand = 'java -jar ' + liquibaseJarLocation;

    grunt.verbose.writeln("Will excecute:" + cmd);

    if (cmd == 'update') {
      if(options.username === undefined) {
        throw new Error('`username` must be specified');
      }
      if(options.password === undefined) {
        throw new Error('`password` must be specified');
      }
      if(options.url === undefined) {
        throw new Error('`url` must be specified');
      }

      // this is the command we need to run
      liquibaseCommand += ' --changeLogFile ' + options.changeLogFile +
                          ' --username ' + options.username +
                          ' --password ' + options.password +
                          ' --url ' + options.url +
                          ' --driver ' + options.driver +
                          ' --classpath ' + options.classpath +
                          ' update'
    } else if(cmd == 'version') {
      // this is the command we need to run
      liquibaseCommand += ' --version';
    } else {
      throw new Error('`command` must be either update or version')
    }

    grunt.verbose.writeln('Command:', chalk.yellow(liquibaseCommand));

    // spawn the process
    var cp = exec(liquibaseCommand, options.execOptions, function (err, stdout, stderr) {
      if (err) {
        grunt.warn(err);
      }
      cb();
    }.bind(this));

    var captureOutput = function (child, output) {
      if (grunt.option('color') === false) {
        child.on('data', function (data) {
          output.write(chalk.stripColor(data));
        });
      } else {
        child.pipe(output);
      }
    };

    // capture the output from liquibase and piipe it out
    captureOutput(cp.stdout, process.stdout);
    captureOutput(cp.stderr, process.stderr);

  });
};
