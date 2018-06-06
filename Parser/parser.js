"use strict";
exports.inject = function ( fs, path, masterGenerator, validator, eHandler ) {
  var _ = require( "lodash" );
  var filePath = path.join( __dirname, "../" );
  var systaxError = "The syntax of the command is incorrect";
  var undefinedError = "Undefined command";
  var filePathNotFound = "path could not be found";
  /**
   * Receives the command and fills the origin or destination if required to execute it
   * @param {array} command description
   */
  function _parseMe ( command ) {
    var path;
    var destination;
    if ( !_.isUndefined( command ) && !_.isEmpty( command[1] ) ) {
      if ( command.length ===  5 ) {
        if ( command[1] === "template" ) {
          //  generate  template [templateName] [destiny] [appname]
          path = filePath + "Templates/" + command[2];
          this.parse( path, command[3], command[4] );
        } else {
          eHandler.error({
            "name" : undefinedError,
            "description" : "\"" + command[1] + "\" command was not recognized"
          });
        }
      } else if ( command.length === 4 ) {
        if ( command[1] === "template" ) {
          //  generate  template [templateName] [appname]
          path = filePath + "Templates/" + command[2];
          if ( !fs.existsSync( filePath + "Output/" ) ) {
            fs.mkdirSync( filePath + "Output/" );
          }
          destination = filePath + "Output/";
          this.parse( path, destination, command[3] );
        } else {
          //  generate  [origin] [destiny] [appname]
          this.parse( command[1], command[2], command[3] );
          return true;
        }
      } else if ( command.length === 3 ) {
        //  generate [origin] [appname]
        if ( !fs.existsSync( filePath + "Output/" ) ) {
          fs.mkdirSync( filePath + "Output/" );
        }
        destination = filePath + "/Output/";
        this.parse( command[1], destination, command[2] );
      } else {
        eHandler.error({
          "name" : systaxError,
          "description" : "The command could not be executed"
        });
      }
    }
  }
  /**
   * Parses the Input Json file and verifies it
   * @param {string} origin Location of the Json file
   * @param {string} destination Saving destination of the generated code
   * @param {string} appName Name of the aplication
   */
  function _parse ( origin, destination, appName ) {
    if ( !fs.existsSync( origin ) ) {
      eHandler.error({
        "name" : "Origin " + filePathNotFound,
        "description" : "The recieved origin path does not exist, please check and try again"
      });
      return null;
    }
    if ( !fs.existsSync( destination ) ) {
      eHandler.error({
        "name" : "Save directory does not exist ",
        "description" : "The save path does not exist, please check and try again"
      });
      return null;
    }
    var parsedData = JSON.parse( fs.readFileSync( origin, "utf8" ) );
    parsedData.appName = appName;
    parsedData.savePath = destination;
    if ( validator.checkMe( parsedData ) ) {
      masterGenerator.generateApplication( parsedData );
    }
  }
  return {
    parseMe : _parseMe,
    parse : _parse
  };
};
