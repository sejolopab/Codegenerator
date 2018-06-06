"use strict";
var fse = require( "fs-extra" );
var _ = require( "lodash" );
exports.inject = function ( fs, path, config, eHandler ) {
   /**
   * Creates the application folder and imports the required platforms
   * @param {object} parsedJson Input data
   */
  function _generateApplication ( parsedJson ) {
    var path = parsedJson.savePath + parsedJson.appName + "/";
    var platformGenerator;
    fs.mkdirSync( path );
    for ( var i = 0; i < parsedJson.platforms.length; i++ ) {
      var available = config.checkPlatformAvailable( parsedJson.platforms[i] );
      if ( available ) {
        var jsonPlatform = _.cloneDeep( parsedJson );
        jsonPlatform.savePath = path + parsedJson.platforms[i];
        var uri = config.getPlatform( parsedJson.platforms[i] ); // Fetch platform location
        platformGenerator = require( uri ).inject( fs, eHandler );   // Import platform
        var generated = platformGenerator.codeGenerator( jsonPlatform ); // Generate
        if ( !generated ) { // If error on platform generator then delete folder
          fse.removeSync( jsonPlatform.savePath );
        }
      } else {
        eHandler.error({
          "name" : "The code could not be generated",
          "description" : "Platform " + parsedJson.platforms[i] + " is not available."
        });
      }
    }
    fs.readdir( path, function ( err, files ) { 
      if ( err ) {
        eHandler.error({
          "name" : "Unexpected error",
          "description" : err
        });
      } else {
          if ( !files.length ) { // If nothing generated then remove remaining garbage
              fse.removeSync( path );
          }
      }
    });
  }
  return {
    generateApplication : _generateApplication
  };
};
