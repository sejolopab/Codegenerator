/**
 * Manages the construction and validation of the manifest template
 */
"use strict";
var _ = require( "lodash" );
var template = require( "./template" );
var iChars = " ~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
var error = "Android codeGenerator failure";
exports.inject = function ( eHandler ) {
  function _generate ( manifest ) {
    var stream;
    if ( _isValid( manifest ) ) {
      stream = template.generate( manifest );
      return stream;
    }
  }
  /**
   * Validates the manifest
   * @param  {object} manifest Input manifest
   * @return {object} Error if the manifest is invalid and true if it's valid
   */
  function _isValid ( manifest ) {
    var activityNameList = [];
    for ( var v = 0; v < manifest.application.views.length; v++ ) {
      var name = manifest.application.views[v].name;
      if ( activityNameList.indexOf( name ) === -1 ) {
        activityNameList.push( name );
      } else {
        eHandler.error({
          "name" : error,
          "description" : "activity name (" + name + ") is repeated"
        });
        return false;
      }
      if ( _.isNil( manifest.application.views[v].launcher ) ) {
        eHandler.error({
          "name" : error,
          "description" : "Unexpected error on manifest"
        });
        return false;
      }
      for ( var i = 0; i < name.length; i++ ) {
         if ( iChars.indexOf( name.charAt ( i ) ) !== -1 ) {
           eHandler.error({
             "name" : error,
             "description" : "Activity name has special characters"
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
