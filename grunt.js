/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      build: { all: [] },
      pwd: { all: [] }
  });

    grunt.registerHelper('build', function() {
        var sys = require('sys')
        var exec = require('child_process').exec;
        function puts(error, stdout, stderr) { sys.puts(stdout) }
        exec("node lib/requirejs/bin/r.js -o app.build.js", puts);
    });

    grunt.registerHelper('pwd', function() {
//        var sys = require('sys')
//        var exec = require('child_process').exec;
//        function puts(error, stdout, stderr) { sys.puts(stdout) }
//        exec("pwd", puts);
        console.log('asdf');

    });

    // Default task.
  grunt.registerTask('default', 'pwd');

};
