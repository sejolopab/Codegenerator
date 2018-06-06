/**
 * Manages the construction and validation of the controller of the ios application
 */
"use strict";
var template = require( "./template" );
exports.inject = function ( eHandler ) {
  function _generate ( scene ) {
    return template.create( scene.controller, scene.connections );
  }
  return {
    generate : _generate
  };
};
