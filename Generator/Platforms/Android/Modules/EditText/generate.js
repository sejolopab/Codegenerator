/**
 * Manages the construction and validation of the EditTexts templates
 */
"use strict";
var template = require( "./template" );
var utils = require( "../../../../utils" );
module.exports = {
  generate : function ( editText, tabs ) {
    return template.createTemplate( editText, utils.getTabs( tabs ) );
  }
};
