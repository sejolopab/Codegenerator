"use strict";
var _ = require( "lodash" );
exports.inject = function ( fs, path, eHandler ) {
  var ConfigFile = path.join( __dirname, "./gConf.json" );
  var utf8 = "utf8";
  var undefinedError = "Undefined command";
  var undefinedPlatError = "Undefined platform";
  var notFoundError = " was not found";
  var stateError = "Could not change platform state";
  var systaxError = "The syntax of the command is incorrect";
  var configData = JSON.parse( fs.readFileSync( ConfigFile,utf8 ) );// read config data
  var platformCount = configData.platforms.length;
  /**
   * Checks if the requier data to execute the command was recieved and calls the corresponding method
   * @param {array} command recieved command
   */
  function _configMe ( command ) {
    if ( !_.isUndefined( command ) && !_.isEmpty( command[1] ) ) {
      if ( command.length === 3 ) {
        if ( command[1] === "add" ) {
          this.add( command[2] );
        } else if ( command[1] === "remove" ) {
          this.remove( command[2] );
        } else {
          eHandler.error({
            "name" : undefinedError,
            "description" : "\"" + command[1] + "\" command was not recognized"
          });
        }
      } else if ( command.length === 2 ) {
        if ( command[1] === "show" ) {
          this.show();
        } else {
          eHandler.error({
            "name" : undefinedError,
            "description" : "\"" + command[1] + "\" command was not recognized"
          });
        }
      } else {
        eHandler.error({
          "name" : systaxError,
          "description" : "The command could not be executed"
        });
      }
    }
  }
  /**
   * Changes the state of a platform to true
   * @param  {string} platform Recieved platform
   */
  function _add ( platform ) {
    for ( var i = 0; i < platformCount; i++ ) { // go through the platform list
      if ( configData.platforms[i].name === platform ) { // If platform was found
        if ( configData.platforms[i].state ) { // If platform is already enabled
          eHandler.error({
            "name" : stateError,
            "description" : platform + " platform is already enabled"
          });
        } else {
          configData.platforms[i].state = true; // Enable platform
          var json = JSON.stringify( configData ); //convert it back to json
          fs.writeFile( ConfigFile, json, utf8, function ( err ) {
            if ( err ) return console.log( err );
            console.log( platform + " has been enabled" );
          });
        }
        return;
      } else if ( i+1 >= platformCount ) { // if platform does not exist
        eHandler.error({
          "name" : undefinedPlatError,
          "description" : platform + notFoundError
        });
      }
    }
  }
  /**
   * Changes the state of a platform to true
   * @param  {string} platform Recieved platform
   */
  function _remove ( platform ) {
    for ( var i = 0; i < platformCount; i++ ) { // go through platform list
      if ( configData.platforms[i].name === platform ) { // if paltform was found
        if ( !configData.platforms[i].state ) {
          eHandler.error({
            "name" : stateError,
            "description" : platform + " platform is already disabled"
          });
        } else {
          configData.platforms[i].state = false;
          var json = JSON.stringify( configData ); //convert it back to json
          fs.writeFile( ConfigFile, json, utf8, function ( err ) {
            if ( err ) return console.log( err );
            console.log( platform + " has been disabled" );
          });
        }
        return;
      } else if ( i+1 >= platformCount ) { // if platform does not exist
        eHandler.error({
          "name" : undefinedPlatError,
          "description" : platform + notFoundError
        });
      }
    }
  }
  /**
   * Shows the current state of the config file
   */
  function _show () {
    console.log( "\n" );
    for ( var i = 0; i < platformCount; i++ ) {
      console.log( configData.platforms[i].name + ":  " );
      console.log( "   -> enabled: " + configData.platforms[i].state );
      console.log( "   -> url: " + configData.platforms[i].url );
    }
  }
  /**
   * Searches for the current state of a platform
   * @param  {string}   platform Required platform
   * @return {boolean}  Platform state
   */
  function _checkPlatformAvailable ( platform ) {
    for ( var i = 0; i < platformCount; i++ ) { // go through the platform list
      if ( configData.platforms[i].name === platform ) { // If platform was found
        return configData.platforms[i].state; // Return platform state
      } else if ( i+1 >= platformCount ) { // if platform does not exist
        eHandler.error({
          "name" : undefinedPlatError,
          "description" : platform + notFoundError
        });
      }
    }
    return false;
  }
  /**
   * Get the url atribute of a platform in the configuration file
   * @param  {string}   platform  Required platform
   * @return {string}   Url o the platform
   */
  function _getPlatform ( platform ) {
    for ( var i = 0; i < platformCount; i ++ ) {
      if ( configData.platforms[i].name === platform ) {
        return configData.platforms[i].url;
      }
    }
    return null;
  }
  return {
    configMe : _configMe,
    add : _add,
    remove : _remove,
    show : _show,
    checkPlatformAvailable : _checkPlatformAvailable,
    getPlatform : _getPlatform
  };
};
