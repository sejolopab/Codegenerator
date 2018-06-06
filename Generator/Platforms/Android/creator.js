/**
 * creator.js manages the creation of the directories and code files of the
 * android application
 */
"use strict";
var _ = require( "lodash" );
exports.inject = function ( fs, eHandler ) {
  var manifest = require( "./Modules/Manifest/generate" ).inject( eHandler );
  var controller = require( "./Modules/Controllers/generate" ).inject ( eHandler );
  var activity = require( "./Modules/Activity/generate" ).inject( eHandler );
  var values = require( "./Modules/Values/generate" ).inject( eHandler );
  /**
   * Creates the final android application
   * @param {object} app Android proyect structure
   */
  function _build ( app ) {
    makeFile( app.manifest.path, manifest.generate( app.manifest ) ); // Create manifest
    for ( var c = 0; c < app.java.files.length ; c++ ) { // Create java files
      makeFile( app.java.files[c].path,
        controller.generate( app.java.files[c], app.appName ) );
    }
    for ( var a = 0; a < app.res.files.layout.length; a++ ) { // Create layout files
      makeFile( app.res.files.layout[a].path,
        activity.generate( app.res.files.layout[a] ) );
    }
    // create values files
    makeFile( app.res.path + "values/colors.xml",
      values.generateColors( app.res.files.values.colors ) );
    makeFile( app.res.path + "values/dimens.xml",
      values.generateDimens( app.res.files.values.dimens ) );
    makeFile( app.res.path + "values/strings.xml",
      values.generateStrings( app.res.files.values.strings ) );
    makeFile( app.res.path + "values/styles.xml",
      values.generateStyles( app.res.files.values.styles ) );
  }
  /**
   * Creates a new file
   * @param {string} path   Save path of the file to create
   * @param {string} stream Data to write on the file
   */
  function makeFile ( path, stream ) {
    var wstream = fs.createWriteStream( path );
    wstream.write( stream );
    wstream.end();
  }
  /**
   * Loads all the images to use on the new application
   * @param {object} data Input data
   */
  function _loadImages ( data ) {
    try {
      if ( !_.isNil( data.load ) ) { // If there is external data to import
        // Load icons, images, etc (out of scope )
      } else { // load default data
        var inStr;  // input
        var outStr; // output
        inStr = fs.createReadStream( "./Templates/Icons/hdpi/ic_launcher.png" );
        outStr = fs.createWriteStream( data.savePath + "/main/res/mipmap-hdpi/ic_launcher.png" );
        inStr.pipe( outStr );
        inStr = fs.createReadStream( "./Templates/Icons/mdpi/ic_launcher.png" );
        outStr = fs.createWriteStream( data.savePath + "/main/res/mipmap-mdpi/ic_launcher.png" );
        inStr.pipe( outStr );
        inStr = fs.createReadStream( "./Templates/Icons/xhdpi/ic_launcher.png" );
        outStr = fs.createWriteStream( data.savePath + "/main/res/mipmap-xhdpi/ic_launcher.png" );
        inStr.pipe( outStr );
        inStr = fs.createReadStream( "./Templates/Icons/xxhdpi/ic_launcher.png" );
        outStr = fs.createWriteStream( data.savePath + "/main/res/mipmap-xxhdpi/ic_launcher.png" );
        inStr.pipe( outStr );
        inStr = fs.createReadStream( "./Templates/Icons/xxxhdpi/ic_launcher.png" );
        outStr = fs.createWriteStream( data.savePath + "/main/res/mipmap-xxxhdpi/ic_launcher.png" );
        inStr.pipe( outStr );
      }
    } catch ( err ) {
      eHandler.error({
        "name" : "Unexpected error loading image files",
        "description" : err.message
      });
    }
  }
  /**
   * Creates android application standard app directories
   * @param {string} path Application path
   * @param {string} appName  Application name
   */
  function _makeDirectories ( path, appName ) {
    fs.mkdirSync( path );
    fs.mkdirSync( path + "/main/" );
    fs.mkdirSync( path + "/main/java/" );
    fs.mkdirSync( path + "/main/java/com/" );
    fs.mkdirSync( path + "/main/java/com/codeGenerator/" );
    fs.mkdirSync( path + "/main/java/com/codeGenerator/" + appName + "/" );
    fs.mkdirSync( path + "/main/res/" );
    fs.mkdirSync( path + "/main/res/drawable/" );
    fs.mkdirSync( path + "/main/res/layout/" );
    fs.mkdirSync( path + "/main/res/mipmap-hdpi/" );
    fs.mkdirSync( path + "/main/res/mipmap-mdpi/" );
    fs.mkdirSync( path + "/main/res/mipmap-xhdpi/" );
    fs.mkdirSync( path + "/main/res/mipmap-xxhdpi/" );
    fs.mkdirSync( path + "/main/res/mipmap-xxxhdpi/" );
    fs.mkdirSync( path + "/main/res/values/" );
    fs.mkdirSync( path + "/main/res/values-w820dp/" );
  }
  return {
    build : _build,
    loadImages : _loadImages,
    makeDirectories : _makeDirectories
  };
};
