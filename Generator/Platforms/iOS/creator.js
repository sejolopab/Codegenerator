/**
 * creator.js manages the creation of the directories and code files of the
 * ios application
 */
 "use strict";
 var _ = require( "lodash" );
 exports.inject = function ( fs, eHandler ) {
   /**
    * Creates the folders and files of the applications
    * @param  {object} app data of the application
    */
   function _build ( app ) {
     this.makeDirectories( app.path );
     this.loadImages ( app.path );
     this.makeFile( app.path + "/Main.storyboard", app.mainStoryBoard );
     for ( var c = 0; c < app.controllers.length; c++ ) {
       this.makeFile( app.path + "/" + app.controllers[c].name + ".swift", app.controllers[c].data );
     }
     this.makeFile( app.path + "/LaunchScreen.storyboard", app.launchScreen ); // Create launch creen
     this.makeFile( app.path + "/Info.plist", app.infoPlist );
     this.makeFile( app.path + "/AppDelegate.swift", app.appDelegate );
     var AppIcon = require( "./appIcon" );
     this.makeFile( app.path + "/Assets.xcassets/AppIcon.appiconset/Contents.json",
     JSON.stringify( AppIcon ) );
   }
   /**
    * Creates a new file
    * @param {string} path   Save path of the file to create
    * @param {string} stream Data to write on the file
    */
    function _makeFile ( path, stream ) {
      var wstream = fs.createWriteStream( path );
      wstream.write( stream );
      wstream.end();
    }
    /**
     * Creates ios application standard app directories
     * @param {string} path Application path
     * @param {string} appName  Application name
     */
   function _makeDirectories ( path ) {
     fs.mkdirSync( path );
     fs.mkdirSync( path + "/Assets.xcassets/" );
     fs.mkdirSync( path + "/Assets.xcassets/AppIcon.appiconset/" );
   }
   /**
    * Loads all the images to use on the new application
    * @param {object} data Input data
    */
   function _loadImages ( path ) {
     try {
       var inStr = fs.createReadStream( "./Templates/Icons/mdpi/ic_launcher.png" );
       var outStr = fs.createWriteStream( path + "/LaunchImage.png" );
       inStr.pipe( outStr );
     } catch ( err ) {
       eHandler.error({
         "name" : "Unexpected error loading image files",
         "description" : err.message
       });
     }
   }
   return {
     build : _build,
     makeDirectories : _makeDirectories,
     loadImages : _loadImages,
     makeFile : _makeFile
   };
 };
