/**
 * Manages the construction and validation of the TextViews templates
 */
"use strict";
var template = require( "./template" );
var utils = require( "../../../../utils" );
module.exports = {
  generate : function ( label, tabs ) {
    return template.createTemplate( label, utils.getTabs( tabs ) );
  }
};
