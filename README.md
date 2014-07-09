# grunt-liquibase

> Simple integration of liquibase with grunt - specifically for postgresql (the postgresql jdbc driver is bundled as part of the module - if you want to add more support then feel free to fork)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-liquibase --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-liquibase');
```

## The "liquibase" task

### Overview
In your project's Gruntfile, add a section named `liquibase` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  liquibase : {
    options: {
      username : 'DB_USERNAME',
      password : 'DB_PASSWORD',
      url : 'jdbc:postgresql://DB_HOST:DB_PORT/DB_NAME'
    },
    update: {
      command: 'update'
    },
    dropAll: {
      command: 'dropAll'
    },
    version : {
      command: 'version'
    }
  },
});
```

### Options

#### options.username
Type: `String`
Default value: `NONE - required`

Database user - passed into the `--username` argument to liquibase.

#### options.password
Type: `String`
Default value: `NONE - required`

Database password - passed into the `--password` argument to liquibase.

#### options.url
Type: `String`
Default value: `NONE - required`

JDBC url - passed into the `--url` argument to liquibase.


#### options.changeLogFile
Type: `String`
Default value: `changelog.xml`

Path to the changelog file for liquibase.

#### options.classpath
Type: `String`
Default value: `postgresql-9.3-1100.jdbc41.jar`

Path to the jar file containing the jdbc driver. The module contains this jar file so you don't need it if you are talking to a postgresql database. Passed into the `--classpath` argument to liquibase.

#### options.driver
Type: `String`
Default value: `org.postgresql.Driver`

JDBC driver class. Passed into the `--driver` argument to liquibase.

#### options.defaultSchemaName
Type: `String`
Default value: `null`

Default schema name

#### options.defaultsFile
Type: `String`
Default value: `null`

Liquibase properties file path

### Supported Commands

#### update
Runs all changesets in the changeLogFile

#### dropAll
Drops all database objects owned by the user. Note that functions, procedures and packages are not dropped

#### rollback
Rollback changesets in the changeLogFile to a specific tag. Must also supply the target tag as the commandAttr.

##### Example
Rollback to version 0.0.1

```js
grunt.initConfig({
  liquibase: {
    options: {
      username : 'dbuser',
      password : 'passwd',
      url : 'jdbc:postgresql://localhost:5432/test_db'
    },
    rollback: {
      command: 'rollback',
      commandAttr: 'v0.0.1'
    }
  },
});
```

#### rollbackCount
Rollback up to N changesets in the changeLogFile. Must also supply the number of changesets to rollback in the commandAttr.

##### Example
Rollback the last 3 changesets

```js
grunt.initConfig({
  liquibase: {
    options: {
      username : 'dbuser',
      password : 'passwd',
      url : 'jdbc:postgresql://localhost:5432/test_db'
    },
    rollback: {
      command: 'rollbackCount',
      commandAttr: '3'
    }
  },
});
```

#### tag
"Tags" the current database state for future rollback. Must also supply the desired tag name in the commadAttr.

##### Example
Tag the current DB with `v0.1.2`.

```js
grunt.initConfig({
  liquibase: {
    options: {
      username : 'dbuser',
      password : 'passwd',
      url : 'jdbc:postgresql://localhost:5432/test_db'
    },
    tag: {
      command: 'tag',
      commandAttr: 'v0.1.2'
    }
  },
});
```

### Usage Examples

#### Default Options
In this example, the default options are used to update a postgresql database called test_db running on localhost at port 5432 using the user dbuser with password passwd with the contents of changelog.xml

```js
grunt.initConfig({
  liquibase: {
    options: {
      username : 'dbuser',
      password : 'passwd',
      url : 'jdbc:postgresql://localhost:5432/test_db'
    },
    command: 'update'
  },
});
```

#### Custom Options
In this example, the location of the changelog file is modified.

```js
grunt.initConfig({
  liquibase: {
    options: {
      username : 'dbuser',
      password : 'passwd',
      url : 'jdbc:postgresql://localhost:5432/test_db',
      changelog : 'src/database/dbchangelog.xml'
    },
    command: 'update'
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
