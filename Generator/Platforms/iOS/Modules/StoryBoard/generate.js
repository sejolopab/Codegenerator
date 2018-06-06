/**
 * Manages the construction and validation of a storyboard
 */
"use strict";
var _ = require( "lodash" );
exports.inject = function ( eHandler ) {
  var scene = require( "../Scene/generate" ).inject( eHandler );
  var template = require( "./template" );
  var error = false;
  var success = true;
  var tabsCounter = 2;
  /** Generates the code for a storyboard
    * @param {array} scenes list of scenes
    * @param {object} appName the name of the application
    */
  function _generate ( scenes, appName ) {
    var launcher = this.getLauncher( scenes );
    if ( launcher === "" ) {
      eHandler.error({
        "name" : "IOS code generator failed",
        "description" : "No launch sreen identified"
      });
      return error;
    }
    var storyBoardTemplate = template.create( launcher );
    var sceneTemplate = scene.generate( scenes, appName, tabsCounter );
    if ( sceneTemplate.state === error ) {
      return {
        "state" : error
      };
    } else {
      storyBoardTemplate.body = sceneTemplate.data;
    }
    return {
      "state" : success,
      "data" : storyBoardTemplate.open + storyBoardTemplate.body + storyBoardTemplate.close
    };
  }
  /**
    * Generates the code for a LaunchScreeen
    */
  function _generateLaunchScreen () {
    return template.launchScreen();
  }
  /**
    * Finds the launcher scene on a list
    * @param {array} scenes list of scenes
    */
  function _getLauncher ( scenes ) {
    for ( var i = 0; i < scenes.length; i++ ) {
      if ( scenes[i].launcher ) {
        return scenes[i].controller;
      }
    }
    return "";
  }
  return {
    generate : _generate,
    generateLaunchScreen : _generateLaunchScreen,
    getLauncher : _getLauncher
  };
};
