/**
 * Manages the construction and validation of buttons
 */
"use strict";
var _ = require( "lodash" );
var utils = require( "../../../../utils" );
exports.inject = function ( eHandler ) {
  var template = require( "./template" );
  /**
    * Generates a button that has connections
    * @param {object} button object with the necesary properties
    * @param {array}  connections complete list of the connections of a scene
    */
  function _generate ( button, connections, tabCounter ) {
    var tabs = utils.getTabs( tabCounter );
    var connection = this.getConnection( button, connections );
    if ( !_.isNil( connection ) ) {
      return template.create(
        button, connection,  tabs );
    } else {
      return template.createSimple(
        button, tabs );
    }
  }
  /**
    * Finds the connection of a button
    * @param {object} button the button that has a connection we need to find
    * @param {array} connections list of connections that contains the connection needed
    */
  function _getConnection ( button, connections ) {
    for ( var i = 0; i < connections.length; i++ ) {
      if ( button.name === connections[i].name ) {
        return connections[i];
      }
    }
    return null;
  }
  return {
    generate : _generate,
    getConnection : _getConnection
  };
};
