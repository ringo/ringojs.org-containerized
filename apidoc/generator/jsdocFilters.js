var log = require("ringo/logging").getLogger(module.id);

var {markSafe} = require('reinhardt/utils');
var markdown = require('ringo-commonmark');

exports.paramTypeList = function(params) {
   if (params && params.length > 0) {
      return params.map(function(param) {
         // A simple check to improve jsdoc
         if (!param.type) {
            log.warn("No parameter name for", param.toSource());
         }
         return param.name;
      }).join(", ");
   }

   return '';
};

exports.limit = function(value) {
   return value ? value.substr(0, 100) + '…' : '';
};

exports.markdown = function(value) {
   return value ? markSafe(markdown.process(value)) : '';
};

exports.newLineList = function(value) {
   return value && value.length ? markSafe(value.join('<br />')) : '';
};