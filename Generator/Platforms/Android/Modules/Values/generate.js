/**
 * Values manages the construction and validation of the values files such as
 * dimens.xml, strings.xml...
 */
"use strict";
var template = require( "./template" );
exports.inject = function () {
  /**
   * Generates colors.xml templates and makes some validations
   * @param {object} data List of colors
   */
  function _generateColors ( data ) {
    return template.generateColors( data );
  }
  /**
   * Generates dimens.xml templates and makes some validations
   * @param {object} data List of dimentios
   */
  function _generateDimens ( data ) {
    return template.generateDimens( data );
  }
  /**
   * Generates styles.xml templates and makes some validations
   * @param {object} data List of styles
   */
  function _generateStyles ( data ) {
    return template.generateStyles( data );
  }
  /**
   * Generates strings.xml templates and makes some validations
   * @param {object} data List of strings
   */
  function _generateStrings ( data ) {
    return template.generateStrings( data );
  }
  return {
    generateColors : _generateColors,
    generateDimens : _generateDimens,
    generateStyles : _generateStyles,
    generateStrings : _generateStrings
  };
};
