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
  var template = require( "./template" );

  /**
   * Generates the code for a view
   * @param  {array} view      description
   * @param  {string} tabs     description
   * @param  {int} connections description
   */
  function _generate ( view, tabs, connections ) {
    var result = template.create( view, utils.getTabs( tabs ) );
    for ( var c = 0; c < view.content.length; c++ ) {
      result.body += this.identifyAndGenerate( view.content[c], tabs + 1, connections );
    }
    return result.open + result.body + result.close;
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
        return this.generate( element, tabsCounter, connections );
      default:
        eHandler.error({
          "name" : "IOS code generator failed",
          "description" : "Unrecognized type element"
        });
    }
  }
  return {
    generate : _generate,
    identifyAndGenerate : _identifyAndGenerate
  };
};
