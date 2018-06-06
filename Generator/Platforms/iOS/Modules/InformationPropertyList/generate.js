/**
 * Manages the construction and validation of the Information property list file
 */
"use strict";
var template = require( "./template" );
module.exports = {
  generate : function () {
    return template.createTemplate();
  }
};
