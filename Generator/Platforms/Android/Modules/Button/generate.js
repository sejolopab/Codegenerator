/**
 * Manages the construction and validation of the Button templates
 */
"use strict";
var template = require( "./template" );
var utils = require( "../../../../utils" );
module.exports = {
  generate : function ( button, tabs ) {
    return template.createTemplate( button, utils.getTabs( tabs ) );
  }
};
