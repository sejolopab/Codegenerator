"use strict";
describe( "Parser", function () {
  var fs = require( "fs" );
  var path = require( "path" );
  var tempPath;
  var fakeFS;
  var fakePath;
  var fakeMasterGenerator;
  var fakeValidator;
  var parser;
  beforeEach ( function () {
    tempPath = path.join( __dirname, "../spec/tests/" );
    fakeFS = {
      readFileSync : function ( path , encoding ) {
        if ( path === "okJson" ) {
          return fs.readFileSync( tempPath + "test1.json", encoding );
        } else {
          return fs.readFileSync( tempPath + "test-syntax.json", encoding );
        }
      },
      existsSync : function () {
        return true;
      }
    };
    fakePath = { join : function () { return ""; } };
    fakeMasterGenerator = {
      parsedJson : {},
      generateApplication : function ( parsedJson ) {
        this.parsedJson = parsedJson;
      }
    };
    fakeValidator = { checkMe : function () { return true; } };
    parser = require( "./parser" ).inject( fakeFS, fakePath, fakeMasterGenerator, fakeValidator );
  });
  // ****************************  parseMe  ************************************
  describe( "parseMe", function () {
    var command;
    var origin, destiny;
    // Parse template with destiny
    it( "should send the correct data to the parse method (template with destiny)", function () {
      command = ["generate", "template", "test1.json","/destiny","appname"];
      origin  = "Templates/" + command[2];
      destiny = command[3];
      spyOn( parser, "parse" );
      parser.parseMe( command );
      expect( parser.parse ).toHaveBeenCalledWith( origin, destiny, command[4] );
    });
    // Parse template without destiny
    it( "should send the correct data to the parse method (template without destiny)", function () {
      command = ["generate", "template", "test1.json","appname"];
      origin  = "Templates/" + command[2];
      destiny = "Output/";
      spyOn( parser, "parse" );
      parser.parseMe( command );
      expect( parser.parse ).toHaveBeenCalledWith( origin, destiny, command[3] );
    });
    // Parse app with  destiny
    it ( "should send the correct data to the parse method (app with destiny)", function () {
      command = ["generate", "/origin","/destiny", "appname"];
      origin = command[1];
      destiny = command[2];
      spyOn( parser, "parse" );
      parser.parseMe( command );
      expect( parser.parse ).toHaveBeenCalledWith( origin, destiny, command[3] );
    });
    // Parse app without destiny
    it( "should send the correct data to the parse method (app without destiny)", function () {
      command = ["generate", "/origin", "appname"];
      origin = command[1];
      destiny = "/Output/";
      spyOn( parser, "parse" );
      parser.parseMe( command );
      expect( parser.parse ).toHaveBeenCalledWith( origin, destiny, command[2] );
    });
  });
  // *****************************  parse  *************************************
  describe( "parse", function () {
    var appName = "testName";
    var savePath = "testDestination";
    it( "should detect syntax errors on the json file", function () {
      expect( function () {
        parser.parse( "syntaxError-Json", savePath, appName );
      }).toThrow();
    });
    it( "should send the correct data to the masterGenerator", function () {
      var expectedData = JSON.parse( fs.readFileSync( tempPath + "test1.json","utf8" ) );
      expectedData.appName = "appName";
      expectedData.savePath = "savePath";
      parser.parse( "okJson", "savePath", "appName" );
      expect( fakeMasterGenerator.parsedJson ).toEqual( expectedData );
    });
  });
});
