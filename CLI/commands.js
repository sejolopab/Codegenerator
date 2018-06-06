"use strict";
var _ = require( "lodash" );
exports.inject = function ( fs, parser, config, eHandler ) {
    var errManyElmts = "The command has too many elements";
    var errFewElmts = "Not enough command elements";
    var undefinedError = "Undefined command";
    var systaxError = "The syntax of the command is incorrect";
    /**
     * Identifies the received command and calls the corresponding method
     * @param {array} command Recieved command
     */
    function _read ( command ) {
      if ( !_.isUndefined( command ) && !_.isEmpty( command[0] ) ) { // if enter with no command
        switch ( command[0] ) {
          case "generate":
            this.generate( command );
            break;
          case "config":
            this.config( command );
            break;
          case "help":
            this.help( command );
            break;
          default:
            eHandler.error({
              "name" : undefinedError,
              "description" : "\"" + command[0] + "\" command was not recognized"
            });
            break;
        }
      }
    }
    /**
     * Does a brief verification prior send the command to the parser
     * @param {array} command Recieved command
     */
    function _generate ( command ) {
      if ( command.length <=  5  && command.length >= 3 ) {
          parser.parseMe( command );
      } else if ( command.length > 5 ) {
        eHandler.error({
          "name" : systaxError,
          "description" : errManyElmts
        });
      } else if ( command.length < 3 ) {
        eHandler.error({
          "name" : systaxError,
          "description" : errFewElmts
        });
      }
    }
    /**
     * Does a brief verification prior send the command to the configuration controller
     * @param {array} command Received command
     */
    function _config ( command ) {
      if ( command.length <= 3 && command.length > 1 ) {
        config.configMe( command );
      } else if ( command.length > 3 ) {
        eHandler.error({
          "name" : systaxError,
          "description" : errManyElmts
        });
      } else if ( command.length === 1 ) {
        eHandler.error({
          "name" : systaxError,
          "description" : errFewElmts
        });
      }
    }
    /**
     * Validates and executes the help command
     * @param {array} command Recieved command
     */
    function _help ( command ) {
      if ( command.length === 1 ) {
        console.log( " \n Commands list: " );
        console.log( " \n  - generate template [template name] [save path] [app name]" );
        console.log( " \n  - generate template [template name] [app name]" );
        console.log( " \n  - generate [Json origin path] [save path] [app name]" );
        console.log( " \n  - generate [Json origin path] [app name]\n\n" );
        console.log( " \n  - config show " );
        console.log( " \n  - config remove [android / ios] " );
        console.log( " \n  - config add  [android / ios]\n" );
        console.log( " \n  - help [command]\n");
      } else if ( command.length === 2 ) {
        if ( command[1] === "config" ) {
          console.log( "\n  - config show" );
          console.log( "\n  - config remove [android / ios]" );
          console.log( "\n  - config add  [android / ios]\n" );
        } else if ( command[1] === "generate" ) {
          console.log( "\n  - generate template [template name] [save path] [app name]" );
          console.log( "\n  - generate template [template name] [app name]" );
          console.log( "\n  - generate [Json origin path] [save path] [app name]" );
          console.log( "\n  - generate [Json origin path] [app name]\n" );
        } else if ( command[1] === "template") {
          console.log( "\n The commands for creating an app templates are: " );
          console.log( "\n  - generate template [template name] [save path] [app name]" );
          console.log( "\n  - generate template [template name] [app name]" );
          printTemplatesFileNames();
        } else {
          eHandler.error({
            "name" : undefinedError,
            "description" : "The " + command[1] + "command does not exist"
          });
        }
      } else if ( command.length === 3 ) {
        if ( command[2] === "template" ) {
          printTemplatesFileNames();
        } else {
          eHandler.error({
            "name" : undefinedError,
            "description" : "The " + command[1] + "command does not exist"
          });
        }
      }
    }
    /**
     * Prints the names of the files on the template folder
     */
    function printTemplatesFileNames () {
      console.log( "\n The templates available are: " );
      var files = fs.readdirSync('./Templates/JSON/');
      files.forEach(file => {
        console.log( "  - " + file );
      });
      console.log("");
    }
    return {
      read : _read,
      generate : _generate,
      config : _config,
      help : _help,
    };
 };
