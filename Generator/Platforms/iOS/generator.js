/**
 * Generator - The highest abstraction layer of the platform
 * Performs the call to generate code templates and the application
 */
"use strict";
exports.inject = function ( fs, eHandler ) {
  var structure = require( "./structure" );
  var create = require( "./creator" ).inject( fs, eHandler );
  var success = true;
  var storyboard = require( "./Modules/Storyboard/generate" ).inject( eHandler );
  var controller = require( "./Modules/Controller/generate" ).inject( eHandler );
  var infoPlist = require( "./Modules/InformationPropertyList/generate" );
  var appDelegate = require( "./Modules/AppDelegate/generate" );
  var app = {}; // Saves the created templates
  /**
    * Creates iOS code
    * @param {object} dataJson   structured data
    */
  function _codeGenerator ( dataJson ) {
    structure.create( dataJson );
    var mainStoryBoard =  storyboard.generate( // Storyboard template
      structure.iosApp.storyBoards[0].scenes, structure.iosApp.appName );
    if ( mainStoryBoard.state ) { // If no errors then save
      app.mainStoryBoard = mainStoryBoard.data;
    }
    var controllerList = []; // Controller templates
    for ( var s = 0; s < structure.iosApp.storyBoards[0].scenes.length; s++ ) {
      controllerList.push({ // Create controller
        "name" : structure.iosApp.storyBoards[0].scenes[s].controller,
        "data" : controller.generate( structure.iosApp.storyBoards[0].scenes[s] )
      });
    }
    app.controllers = controllerList; // Save controllers
    app.infoPlist = infoPlist.generate();
    app.appDelegate = appDelegate.generate();
    app.launchScreen = storyboard.generateLaunchScreen();
    app.path = dataJson.savePath;
    create.build( app ); // Create application
    return success; // Return success
  }
  return {
    codeGenerator : _codeGenerator
  };
};
