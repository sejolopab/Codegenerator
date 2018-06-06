/**
 * Manages the construction and validation of the labels
 */
"use strict";
var _ = require( "lodash" );
var utils = require( "../../../../utils" );
exports.inject = function ( eHandler ) {
  var template = require( "./template" );
  /**
   * Generates the code for a label
   * @param {object} label
   * @param {int} tabCounter number of accumulated tabs
   */
  function _generate ( label, tabCounter ) {
    return template.create( label, utils.getTabs( tabCounter ) );
  }
  return {
    generate : _generate
  };
};
