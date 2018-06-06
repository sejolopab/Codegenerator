"use strict";
var _ = require ( "lodash" );
var txtError = "\nError: ";
var txtDescription = "Description: ";
module.exports = {
  /**
   * Prints an error message
   * @param {object} error Object with a name and description
   */
  error: function ( error ) {
    console.log( txtError + error.name );
    if ( !_.isNil( error.description ) ) {
      console.log( txtDescription + error.description );
    }
    console.log();
  }
};
