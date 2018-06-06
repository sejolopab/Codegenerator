/**
 * structure.js restructure and fills the received data into a more manageable
 * and useful structure to create the code templates and final application
 */
"use strict";
var iosWidth = 375;
var iosHeight = 575;
var codeGenWidth = 350;
var codeGenHeight = 600;
// var codeGenWidth = 450;
// var codeGenHeight = 800;
var _ = require( "lodash" );
module.exports = {
  iosApp : {},
  /**
   *  Starts the restructure process
   * @param {object} data json input
   */
  create : function ( data ) {
    this.iosApp.appName = data.appName;
    this.iosApp.path = data.savePath;
    this.iosApp.storyBoards = [];
    this.addScenes( data );
  },
  /**
   * Rebuild the views recieved and saves them
   * @param {object} data json input
   */
  addScenes : function ( data ) {
    var newStoryBoard = {
      "name"   : "Main.storyboard",
      "scenes" : []
    };
    var newScene = {};
    for ( var s = 0; s < data.views.length; s++ ) {
      newScene = _.cloneDeep( data.views[s] );
      newScene = this.updatePositioningValues( newScene, 0, 0 );
      var connections = this.getconnections(
        data.views[s].content, 
        { "add" : false, "list" : [] },
        data.transitions, 
        data.views );
      if ( connections.add = true ) { // If there are connections
        newScene.connections = connections.list; // Add them
      }
      newStoryBoard.scenes.push( newScene ); // Save scene
    }
    this.iosApp.storyBoards.push( newStoryBoard ); // Save scenes on Main.storyboard
  },
  /**
   * Searches for all possible connections within the content of a view and returns a list
   * @param {array} content content of a view
   * @param {array} connections connections found
   * @param {array} transitions transitions of json input
   * @param {array} listView list of views recieved on the json input
   */
  getconnections : function  ( content, connections, transitions, listView ) {
    for ( var c = 0; c < content.length; c++ ) {
      switch ( content[c].type.toLowerCase() ) {
        case "label":
          connections.add = true;
          connections.list.push({
            "name" : content[c].name,
            "type": "label"
          });
          break;
        case "edittext":
          connections.add = true;
          connections.list.push({
            "name" : content[c].name,
            "type" : "textField"
          });
          break;
        case "button":
          if(content[c].hasOwnProperty("'onTab'") ){
            connections.add =  true;
              connections.list.push({
                "name" : content[c].name,
                "type" : "button",
                "data" : this.getData( content[c].onTab, transitions, listView )
              });
          }
          if ( content[c].onTab ) {
          //if ( !_.isNil( content[c].onTab ) ) {
          //if ( 'onTab' in content[c] ) {
            connections.add =  true;
            connections.list.push({
              "name" : content[c].name,
              "type" : "button",
              "data" : this.getData( content[c].onTab, transitions, listView )
            });
          }
          break;
        case "view":
          connections.list.push( this.getconnections ( content[c].content, connections ) );
          break;
        default:
          eHandler.error({
            "name" : "IOS codeGenerator failed",
            "description" : "Type view undefined"
          });
      }
    }
    return connections;
  },
  /**
   * Gets the required data for a connection of a button
   * @param {array} action Name of the onTab method
   * @param {array} transitions Scene transitions
   * @param {array} listView List of views
   */
  getData : function ( action, transitions, listView ) {
    for ( var t = 0; t < transitions.length; t++ ) {
      if ( action === transitions[t].name ) {
        var origin, destiny;
        for ( var v = 0; v < listView.length; v++ ) {
          if ( transitions[t].destiny === listView[v].name ) {
            destiny = listView[v].controller;
          }
          if ( transitions[t].origin === listView[v].name ) {
            origin = listView[v].controller;
          }
        }
        return {
          "name" : transitions[t].name,
          "origin" : origin,
          "destiny" : destiny
        };
      }
    }
    return {};
  },
  /**
   * Updates the x, y, height and width to the approximate values on a ios application
   * @param  {object} view
   */
  updatePositioningValues : function ( view, parentX, parentY ) {
    codeGenHeight = view.position.height;
    codeGenWidth  = view.position.width;
    view.position = {
      "height" : iosHeight,
      "width"  : iosWidth,
      "x"      : 0,
      "y"      : 0,
    };
    for ( var c = 0; c < view.content.length; c++ ) {
      switch ( view.content[c].type ) {
        case "label":
          view.content[c].position = {
            "height" : ~~( ( parseInt( view.content[c].position.height ) * iosHeight ) / codeGenHeight ),
            "width"  : ~~( ( parseInt( view.content[c].position.width ) * iosWidth ) / codeGenWidth ),
            "x"      : ( ~~( ( parseInt( view.content[c].position.x )* iosWidth ) / codeGenWidth ) - parentX ),
            "y"      : ( ~~( ( parseInt( view.content[c].position.y )* iosHeight ) / codeGenHeight ) - parentY ),
          };
          break;
        case "editText":
          view.content[c].type = "textField";
          view.content[c].position = {
            "height" : ~~( ( parseInt( view.content[c].position.height ) * iosHeight ) / codeGenHeight ),
            "width"  : ~~( ( parseInt( view.content[c].position.width ) * iosWidth ) / codeGenWidth ),
            "x"      : ( ~~( ( parseInt( view.content[c].position.x )* iosWidth ) / codeGenWidth ) - parentX ),
            "y"      : ( ~~( ( parseInt( view.content[c].position.y )* iosHeight ) / codeGenHeight ) - parentY ),
          };
          break;
        case "button":
          view.content[c].position = {
            "height" : ~~( ( parseInt( view.content[c].position.height ) * iosHeight ) / codeGenHeight ),
            "width"  : ~~( ( parseInt( view.content[c].position.width ) * iosWidth ) / codeGenWidth ),
            "x"      : ( ~~( ( parseInt( view.content[c].position.x )* iosWidth ) / codeGenWidth ) - parentX ),
            "y"      : ( ~~( ( parseInt( view.content[c].position.y )* iosHeight ) / codeGenHeight ) - parentY ),
          };
          break;
        case "view":
          view.content[c].position = {
            "height" : ~~( ( parseInt( view.content[c].position.height ) * iosHeight ) / codeGenHeight ),
            "width"  : ~~( ( parseInt( view.content[c].position.width ) * iosWidth ) / codeGenWidth ),
            "x"      : ( ~~( ( parseInt( view.content[c].position.x ) * iosWidth ) / codeGenWidth ) - parentX ),
            "y"      : ( ~~( ( parseInt( view.content[c].position.y ) * iosHeight ) / codeGenHeight ) - parentY ),
          };
          view.content[c] = this.updatePositioningValues( view.content[c], view.content[c].position.x, view.content[c].position.y );
          break;
        default:
          eHandler.error({
            "name" : "IOS codeGenerator failed",
            "description" : "Type view undefined"
          });
      }
    }
    return view;
  }
};
