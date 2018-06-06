/**
 * Generator - The highest abstraction layer of the platform
 * Performs the call to methods like directory creation,
 * data import, code generation and does some validations to the received data
 */
"use strict";
exports.inject = function ( fs, eHandler ) {
  var struc = require( "./structure" );
  var create = require ( "./creator" ).inject( fs, eHandler );
  var iChars = " ~`!#$%^@&*+=-[]/\';,/{}|\":<>?";
  var error = "Android codeGenerator failed";
  function _codeGenerator ( dataJson ) {
    try {
      struc.create( dataJson ); // Create app structure
      if ( this.isValid( struc.androidApp ) === true ) {
        create.makeDirectories( dataJson.savePath, dataJson.appName ); // Create app directories
        create.loadImages( dataJson ); // Load data ( images , icons )
        create.build( struc.androidApp ); // Create app files
        return true;
      }
    } catch ( err ) {
      eHandler.error({
        "name" : "Android codeGenerator failed",
        "description" : err.message
      });
    }
    return false;
  }
  /**
   * Last validation of the project structure before generating it
   * @param {object} structure
   */
  function _isValid ( structure ) {
    var classList = [];
    // Validate the names of the controllers
    for ( var c = 0; c < structure.java.files.length; c++ ) {
      var className = structure.java.files[c].className;
      for ( var f = 0; f < className.length; f++ ) {
         if ( iChars.indexOf( className.charAt ( f ) ) !== -1 ) {
           eHandler.error({
             "name" : error,
             "description" : "Variable name has special characters"
           });
           return false;
         }
      }
      if ( classList.indexOf( className ) === -1 ) {
        classList.push( className );
      } else {
        eHandler.error({
          "name" : error,
          "description" : "Class (" + className + ") is repeated"
        });
        return false;
      }
    }
    // Validate the names of the layout elements
    for ( var lyt = 0; lyt < structure.res.files.layout.length; lyt++ ) {
      for ( var cntt = 0; cntt < structure.res.files.layout[lyt].content.length; cntt++ ) {
        if ( structure.res.files.layout[lyt].content[cntt].name ) {
          for ( f = 0; f < structure.res.files.layout[lyt].content[cntt].name.length; f++ ) {
             if ( iChars.indexOf( structure.res.files.layout[lyt].content[cntt].name.charAt ( f ) ) !== -1 ) {
               eHandler.error({
                 "name" : error,
                 "description" : "ID name (" + structure.res.files.layout[lyt].content[cntt].name + ") has special characters"
               });
               return false;
             }
          }
        }
        var isRepeated = repeatedObject(
          structure.res.files.layout[lyt].content[cntt],
          structure.res.files.layout[lyt].content );
        if ( isRepeated === true ) {
          eHandler.error({
            "name" : error,
            "description" : "ID (" + structure.res.files.layout[lyt].content[cntt].name + ") is repeated"
          });
          return false;
        }
      }
    }
    return true;
  }
  function repeatedObject ( obj, list ) {
    var repetitions = 0;
    for ( var i = 0; i < list.length; i++ ) {
      if ( list[i].name === obj.name ) {
        repetitions++;
      }
    }
    if ( repetitions === 1 ) {
      return false;
    } else {
      return true;
    }
  }
  return {
    codeGenerator : _codeGenerator,
    isValid : _isValid
  };
};
