/**
 * Manages the construction and validation of the controller of the application
 */
"use strict";
var template = require( "./template" );
var error = "Android codeGenerator failed";
var iChars = " ~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
exports.inject = function ( eHandler ) {
  function _generate ( controller, appName ) {
    var stream;
    var listStreams = [];
    if ( _isValid( controller ) ) {
      stream = template.generate( controller, appName );
      return stream;
    }
    return listStreams;
  }
  /**
   * Validates the controller
   * @param  {object} controller Input controller
   * @return {object} Error if the controller is invalid and true if it's valid
   */
  function _isValid ( controller ) {
      var variablesNameList = [];
      for ( var m = 0; m < controller.methods.length; m++ ) {
        for ( var c = 0; c < controller.methods[m].calls.length; c++ ) {
          var elmntName = controller.methods[m].calls[c].elementName;
          for ( var f = 0; f < elmntName.length; f++ ) {
             if ( iChars.indexOf( elmntName.charAt ( f ) ) !== -1 ) {
               eHandler.error({
                 "name" : error,
                 "description" : "Variable name has special characters"
               });
               return false;
             }
          }
          if ( variablesNameList.indexOf( elmntName ) === -1 ) {
            variablesNameList.push( elmntName );
          } else {
            eHandler.error({
              "name" : error,
              "description" : "A variable (" + elmntName + ") is repeated"
            });
            return false;
          }
        }
      }
      return true;
  }
  return {
    generate : _generate,
    isValid : _isValid
  };
};
