/**
 * Manages the construction and validation of scenes
 */
"use strict";
var _ = require( "lodash" );
var utils = require( "../../../../utils" );
exports.inject = function ( eHandler ) {
  var label = require ( "../Label/generate" ).inject( eHandler );
  var button = require ( "../Button/generate" ).inject( eHandler );
  var textField = require ( "../TextField/generate" ).inject( eHandler );
  var view = require ( "../View/generate" ).inject( eHandler );
  var template = require( "./template" );
  var scenesTemplates = "";
  /**
   * Generates the code of a list of scenes
   * @param  {array} scenes      storyboad views
   * @param  {string} appName     application name
   * @param  {int} tabsCounter tabs in code counter
   */
  function _generate ( scenes, appName, tabsCounter ) {
    var scenesTabs = utils.getTabs( tabsCounter );
    var subviewsTabsCounter =  tabsCounter + 4; // The accumulated tabs plus the added tabs of the storyboard
    var canvasX = 0; // Pisition x of the view on the storyboard
    var canvasY = 0; // Pisition y of the view on the storyboard
    var newScene;
    for ( var s = 0; s < scenes.length; s+=2 ) {
      newScene = {};
      newScene = template.create( scenes[s], appName, canvasX, canvasY, scenesTabs );
      var subviews = "";
      for ( var c1 = 0; c1 < scenes[s].content.length; c1++ ) {
        subviews += this.identifyAndGenerate( scenes[s].content[c1], subviewsTabsCounter, scenes[s].connections );
      }
      newScene.body = subviews;
      this.saveScene( newScene );
      canvasY += 700;

      newScene = {};
      newScene = template.create( scenes[s+1], appName, canvasX, canvasY, scenesTabs );
      var subviews = "";
      for ( var c2 = 0; c2 < scenes[s+1].content.length; c2++ ) {
        subviews += this.identifyAndGenerate( scenes[s+1].content[c2], subviewsTabsCounter, scenes[s].connections );
      }
      newScene.body = subviews;
      this.saveScene( newScene );
      canvasX += 800;
    }
    return {
      "state" : true,
      "data" : scenesTemplates
    };
  }
  /**
    * Recieves a scene object and returns a string
    * @param {object} newScene object with the code generated
    */
  function _saveScene ( newScene ) {
    var concatScene =
      newScene.open +
      newScene.body +
      newScene.close;
    scenesTemplates += concatScene;
  }
  /**
    * Recieves a view element and call the corresponding generator
    * @param {object} element view element
    * @param {int} tabsCounter number of tabs accumulated
    * @param {array} connections complete list of connections of a scene
    */
  function _identifyAndGenerate ( element, tabsCounter, connections ) {
    switch ( element.type ) {
      case "button":
        return button.generate( element, connections, tabsCounter );
      case "label":
        return label.generate( element, tabsCounter );
      case "textField":
        return textField.generate( element, tabsCounter );
      case "view":
        return view.generate( element, tabsCounter, connections );
      default:
        eHandler.error({
          "name" : "IOS code generator failed",
          "description" : "Unrecognized type element"
        });
    }
  }
  return {
    generate : _generate,
    saveScene : _saveScene,
    identifyAndGenerate : _identifyAndGenerate
  };
};
