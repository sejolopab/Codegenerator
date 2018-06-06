"use strict";
describe ( "masterGenerator", function () {
  var fs = require( "fs" );
  var path = require( "path" );
  var testPath = path.join( __dirname, "../spec/" );
  var rimraf = require( "rimraf" );
  var fakeFs;
  var fakePath;
  var fakeConfig;
  var fakeErrorHandler;
  var masterGenerator;
  var expectedError;
  var testName = "testName";
  beforeEach( function () {
      fakeFs = {
        generatedDirs : [],
        existsSync : function () { return false; },
        mkdirSync : function ( dir ) { this.generatedDirs.push( dir ); },
        readdir : function () {}
      };
      fakePath = { join : function () {} };
      fakeConfig = {
        generateCalled : false,
        checkPlatformAvailable : function ( platform ) {
          return platform;
        },
        getPlatform : function () {
          return {
            codeGenerator : function () { this.generateCalled = true; }
          };
        }
      };
      fakeErrorHandler = {
        recievedError : {},
        error : function ( error ) { this.recievedError = error; }
      };
      masterGenerator = require( "./masterGenerator" ).inject( fakeFs, fakePath, fakeConfig, fakeErrorHandler );
  });
  it( "should show an error if the application already exist on the selected directory", function () {
    fakeFs = {
      existsSync : function () { return true; },
      mkdirSync : function () {}
    };
    masterGenerator = require( "./masterGenerator" ).inject( fakeFs, fakePath, fakeConfig, fakeErrorHandler );
    expectedError = {
      "name" : "The code could not be generated",
      "description" : "Application name already exist on the destination save path"
    };
    masterGenerator.generateApplication({
       "savePath" : testPath,
       "appName" : testName
    });
    expect( fakeErrorHandler.recievedError ).toEqual( expectedError );
    rimraf( testPath + testName, function () {});
  });

  it( "should show an error if a platform is not available", function () {
    expectedError = {
      "name" : "The code could not be generated",
      "description" : "Platform "+ false + " is not available."
    };
    masterGenerator.generateApplication({
       "savePath" : testPath,
       "appName" : testName,
       "platforms" : [false]
    });
    expect( fakeErrorHandler.recievedError ).toEqual( expectedError );
  });
  it( "should create a directory on the recieved path", function () {
    masterGenerator.generateApplication({
       "savePath" : testPath,
       "appName" : testName,
       "platforms" : [false]
    });
    expect( fakeFs.generatedDirs[0] ).toEqual( testPath + testName + "/" );
  });
});
