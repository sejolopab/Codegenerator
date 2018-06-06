"use strict";
var _ = require( "lodash" );
var utils = require( "../../../../utils" );
exports.inject = function ( eHandler ) {
  var template = require( "./template" );
  function _generate ( textField, tabCounter ) {
    return template.create( textField, utils.getTabs( tabCounter ) );
  }
  return {
    generate : _generate
  };
};
