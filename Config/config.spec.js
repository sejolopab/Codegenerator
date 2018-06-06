"use strict";
describe ( "Configuration", function () {
  var fs;
  var path;
  var config;
  var errorHandler;
  var undefinedError = "Undefined command";
  var undefinedPlatError = "Undefined platform";
  var notFoundError = " was not found";
  var stateError = "Could not change platform state";
  var expectedError;
  beforeEach( function () {
    fs = {
      readFileSync : function () {
        return "{ \"platforms\":[{\"name\":\"android\",\"state\":true,\"url\":\"./Platforms/Android/generator\"},{\"name\":\"ios\",\"state\":true,\"url\":\"./Platforms/ios/generator\"}]}";
      },
      writeFile : function ( path , encoding ,done ) { done(); }
    };
    path = { join : function () {} };
    errorHandler = {
      savedError : {},
      error : function ( error ) { this.savedError = error; }
    };
    config  = require( "./config" ).inject( fs, path, errorHandler );
  });
  // *****************************   ConfigMe   ********************************
  describe( "configMe", function () {
    var command;
    it( "should call add function if the second command element is add", function () {
      command = ["config" , "add", "ios"];
      spyOn( config, "add" );
      spyOn( config, "remove" );
      spyOn( config, "show" );
      config.configMe( command );
      expect( config.add ).toHaveBeenCalled();
      expect( config.remove ).not.toHaveBeenCalled();
      expect( config.show ).not.toHaveBeenCalled();
    });
    it( "should call remove function if the second command element is remove", function () {
      command = ["config" , "remove", "ios"];
      spyOn( config, "add" );
      spyOn( config, "remove" );
      spyOn( config, "show" );
      config.configMe( command );
      expect( config.add ).not.toHaveBeenCalled();
      expect( config.remove ).toHaveBeenCalled();
      expect( config.show ).not.toHaveBeenCalled();
    });
    it( "should call show function if the second command element is show", function () {
      command = ["config" , "remove", "ios"];
      spyOn( config, "add" );
      spyOn( config, "remove" );
      spyOn( config, "show" );
      config.configMe( command );
      expect( config.add ).not.toHaveBeenCalled();
      expect( config.remove ).toHaveBeenCalled();
      expect( config.show ).not.toHaveBeenCalled();
    });
    it( "should throw error if the second command element is not regnized 2 elements", function () {
      command = ["config", "something","android"];
      expectedError = {
        "name" : undefinedError,
        "description" : "\"" + command[1] + "\" command was not recognized"
      };
      config.configMe( command );
      expect( errorHandler.savedError ).toEqual( expectedError );
    });
    it( "should throw error if the second command element is not regnized 3 elements", function () {
      command = ["config", "something"];
      expectedError = {
        "name" : undefinedError,
        "description" : "\"" + command[1] + "\" command was not recognized"
      };
      config.configMe( command );
      expect( errorHandler.savedError ).toEqual( expectedError );
    });
  });
  // *****************************     Add     *********************************
  describe( "add", function () {
    it( "should call writeFile if the add check is correct", function () {
      fs = {
        readFileSync : function () {
          return "{ \"platforms\":[{\"name\":\"android\",\"state\":false,\"url\":\"./Platforms/Android/generator\"},{\"name\":\"ios\",\"state\":true,\"url\":\"./Platforms/ios/generator\"}]}";
        },
        writeFile : function ( path , encoding , done ) { done(); }
      };
      path = { join : function () {} };
      config  = require( "./config" ).inject( fs, path, errorHandler );
      spyOn( fs, "writeFile" );
      config.add( "android" );
      expect( fs.writeFile ).toHaveBeenCalled();
    });
    it( "should throw error if platform os not found", function () {
      var platform = "blablabla";
      expectedError = {
        "name" : undefinedPlatError,
        "description" : platform + notFoundError
      };
      config.add( platform );
      expect( errorHandler.savedError ).toEqual( expectedError );
    });
    it( "should throw error if platform is already enabled", function () {
      fs = {
        readFileSync : function () {
          return "{ \"platforms\":[{\"name\":\"android\",\"state\":true,\"url\":\"./Platforms/Android/generator\"},{\"name\":\"ios\",\"state\":true,\"url\":\"./Platforms/ios/generator\"}]}";
        },
        writeFile : function ( path , encoding , done ) { done(); }
      };
      config  = require( "./config" ).inject( fs, path, errorHandler );
      var platform = "android";
      expectedError = {
        "name" : stateError,
        "description" : platform + " platform is already enabled"
      };
      config.add( platform );
      expect( errorHandler.savedError ).toEqual( expectedError );
    });
  });
  // ******************************   Remove   *********************************
  describe( "remove", function () {
    it( "should call writeFile if the remove check is correct", function () {
      fs = {
        readFileSync : function () {
          return "{ \"platforms\":[{\"name\":\"android\",\"state\":true,\"url\":\"./Platforms/Android/generator\"},{\"name\":\"ios\",\"state\":true,\"url\":\"./Platforms/ios/generator\"}]}";
        },
        writeFile : function ( path , encoding , done ) { done(); }
      };
      path = { join : function () {} };
      config  = require( "./config" ).inject( fs, path, errorHandler );
      spyOn( fs, "writeFile" );
      config.remove( "android" );
      expect( fs.writeFile ).toHaveBeenCalled();
    });
    it( "should throw error if platform os not found on remove", function () {
      var platform = "blablabla";
      expectedError = {
        "name" : undefinedPlatError,
        "description" : platform + notFoundError
      };
      config.remove( platform );
      expect( errorHandler.savedError ).toEqual( expectedError );
    });
    it( "should throw error if platform is already disabled", function () {
      fs = {
        readFileSync : function () {
          return "{ \"platforms\":[{\"name\":\"android\",\"state\":true,\"url\":\"./Platforms/Android/generator\"},{\"name\":\"ios\",\"state\":false,\"url\":\"./Platforms/ios/generator\"}]}";
        },
        writeFile : function ( done ) { done(); }
      };
      config  = require( "./config" ).inject( fs, path, errorHandler );
      var platform = "ios";
      expectedError = {
        "name" : stateError,
        "description" : platform + " platform is already disabled"
      };
      config.remove( platform );
      expect( errorHandler.savedError ).toEqual( expectedError );
    });
  });
  // **********************   checkPlatformAvailable   *************************
  describe( "checkPlatformAvailable", function () {
    it( "should show an error if the platform does not exist", function () {
      expectedError = {
        "name" : undefinedPlatError,
        "description" : "blablabla" + notFoundError
      };
      config.checkPlatformAvailable( "blablabla" );
      expect( errorHandler.savedError ).toEqual( expectedError );
    });
    it( "should return false if the platform is not available", function () {
      fs = {
        readFileSync : function () {
          return "{ \"platforms\":[{\"name\":\"android\",\"state\":false,\"url\":\"./Platforms/Android/generator\"},{\"name\":\"ios\",\"state\":true,\"url\":\"./Platforms/ios/generator\"}]}";
        },
        writeFile : function ( path , encoding , done ) { done(); }
      };
      config  = require( "./config" ).inject( fs, path, errorHandler );
      var result = config.checkPlatformAvailable( "android" );
      expect( result ).toBe( false );
    });
    it( "should return true if the platform is available", function () {
      fs = {
        readFileSync : function () {
          return "{ \"platforms\":[{\"name\":\"android\",\"state\":true,\"url\":\"./Platforms/Android/generator\"},{\"name\":\"ios\",\"state\":true,\"url\":\"./Platforms/ios/generator\"}]}";
        },
        writeFile : function ( path , encoding , done ) { done(); }
      };
      config  = require( "./config" ).inject( fs, path, errorHandler );
      var result = config.checkPlatformAvailable( "android" );
      expect( result ).toBe( true );
    });
  });
  // ****************************  getPlatform   *******************************
  describe( "getPlatform", function () {
    it( "should return null if the platform was not found", function () {
      var result = config.getPlatform( "blablabla" );
      expect( result ).toEqual( null );
    });
    it( "should return the url of the platform required", function () {
      var result = config.getPlatform( "android" );
      expect( result ).toEqual( "./Platforms/Android/generator" );
    });
  });
});
