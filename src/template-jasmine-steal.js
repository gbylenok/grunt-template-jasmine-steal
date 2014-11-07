
"use strict";

var template = __dirname + '/templates/jasmine-steal.html';

exports.process = function(grunt, task, context) {
  context.options.stealOptions = context.options.stealOptions || {};

  var stealUrl = context.options.steal.url;

  // find the latest version if none given
  if (!stealUrl) {
    stealUrl = '.grunt/grunt-contrib-jasmine/steal/steal.js';
  }

  var stealRoot = stealUrl.substring(0, stealUrl.indexOf('steal/steal.js'));

  context.options.steal.url = stealUrl;

  context.fn = {
    pathify: function(s) {
      var stealRel = new RegExp('^.*' + stealRoot),
          baseRel = /^\.\//,
          supportRel = /^\.grunt\//,
          absBase = '';

      if(s.indexOf(stealRoot) === -1 && s.indexOf('.grunt') === -1) {
        absBase = '/';
      }

    var result = absBase + s.replace(stealRel, '').replace(baseRel, '').replace(supportRel, '/.grunt/');
    grunt.verbose.write('pathify: '+s+' to '+result+ ' absBase: '+absBase+ ' stealRel: '+stealRel+' baseRel: '+baseRel+' stealRoot: '+stealRoot);
    return result;
    }
  };

  var source = grunt.file.read(template);
  return grunt.util._.template(source, context);
};

