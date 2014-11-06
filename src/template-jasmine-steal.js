
"use strict";

var template = __dirname + '/templates/jasmine-steal.html';

exports.process = function(grunt, task, context) {
  context.options.stealOptions = context.options.stealOptions || {};

  var stealUrl = context.options.steal.url;

  // find the latest version if none given
  if (!stealUrl) {
    stealUrl = _dirname + '/steal/steal.js';
  }

  var stealRoot = stealUrl.substring(0, stealUrl.indexOf('steal/steal.js'));

  context.options.steal.url = stealUrl;

  context.fn = {
    pathify: function(s) {
      var stealRel = new RegExp('^.*' + stealRoot),
          baseRel = /^\.\//,
          supportRel = /^\.grunt\//,
          absBase = '';

      if(s.indexOf(stealRoot) === -1 && s.indexOf('node_modules') === -1) {
        absBase = '/';
      }

      var result = absBase + s.replace(stealRel, '').replace(baseRel, '').replace(supportRel, '/node_modules/');
      console.log('pathify: '+s+' to '+result+ ' absBase: '+absBase+ ' stealRel: '+stealRel+' baseRel: '+baseRel+' stealRoot'+stealRoot);
      return result;
    }
  };

  var source = grunt.file.read(template);
  return grunt.util._.template(source, context);
};

