"use strict";
describe( "parser validator", function () {

  var fs = require( "fs" );
  var path = require( "path" );
  var testPath = path.join( __dirname, "../spec/tests/" );
  var fakeErrorHandler;
  var validator;
  var parsedData;

  var expectedError = {};
  var undefinedError = " is undefined";
  var missingError = "A required parameter is missing";
  var result;
  beforeEach ( function () {
    fakeErrorHandler = {
      recievedData : {},
      error : function ( error ) { this.recievedData = error; }
    };
    validator = require( "./parserValidator" ).inject( fakeErrorHandler );
  });
  // *****************************   checkMe   ********************************
  describe( "checkMe", function () {
    it( "should check if parsedJson has an appName", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test1.json", "utf8" ) );
      parsedData.savePath = "destination";
      expectedError = {
        "name" : "appName" + undefinedError,
        "description" : "request does not have an appName"
      };
      result = validator.checkMe( parsedData );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
      expect( result ).toBe( false );
    });
    it( "should check if parsedJson has a save path", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test1.json", "utf8" ) );
      parsedData.appName = "appName";
      expectedError = {
        "name" : "savePath" + undefinedError,
        "description" : "request does not have a save destination"
      };
      result = validator.checkMe( parsedData );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
      expect( result ).toBe( false );
    });
    it( "should check if parsedJson has views", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-views.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : "views" + undefinedError,
        "description" : "request does not have views in it"
      };
      result = validator.checkMe( parsedData );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
      expect( result ).toBe( false );
    });
    it( "should return false if check is correct", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test1.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      result = validator.checkMe( parsedData );
      expect( result ).toBe( true );
    });
    it( "should return false if check is incorrect on a view", function () {//view
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-view-controller.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      result = validator.checkMe( parsedData );
      expect( result ).toBe( false );
    });
    it( "should return false if check is incorrect on a viewElement", function () { //viewElement
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-vElement-x.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      result = validator.checkMe( parsedData );
      expect( result ).toBe( false );
    });
  });
  // ******************************   check   **********************************
  describe( "check", function () {
    it( "should call the checkView method if the object recieved is type view", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test1.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      spyOn( validator, "checkView" );
      spyOn( validator, "checkViewElement" );
      validator.check( parsedData.views[0] );
      expect( validator.checkView ).toHaveBeenCalled();
      expect( validator.checkViewElement ).not.toHaveBeenCalled();
    });
    it( "should call the checkViewElement method if the object recieved is not type view", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test1.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      spyOn( validator, "checkView" );
      spyOn( validator, "checkViewElement" );
      validator.check( parsedData.views[0].content[0] );
      expect( validator.checkView ).not.toHaveBeenCalled();
      expect( validator.checkViewElement ).toHaveBeenCalled();
    });
    it( "should show an error if the object recieved does not have a type", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-view-type.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "loginView" + " needs a type value"
      };
      validator.check( parsedData.views[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
  });
  // ****************************   checkView   ********************************
  describe( "checkView", function () {
    it( "should check if the view recieved has height", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-view-height.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "loginView view needs a height"
      };
      validator.checkView( parsedData.views[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
    it( "should check if the view recieved has width",function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-view-width.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "loginView view needs a width"
      };
      validator.checkView( parsedData.views[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
    it( "should check if the view recieved has a controller", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-view-controller.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "loginView view needs a controller"
      };
      validator.checkView( parsedData.views[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
  });
  //**************************   checkViewElement   ****************************
  describe( "checkViewElement", function () {
    it( "should check if the viewElement recieved has the position parameter", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-vElement-position.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "lbl_1 needs a position"
      };
      validator.checkViewElement( parsedData.views[0].content[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
    it( "should check if the viewElement recieved has the x position parameter", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-vElement-x.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "lbl_1 needs position x"
      };
      validator.checkViewElement( parsedData.views[0].content[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
    it( "should check if the viewElement recieved has the y position parameter", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-vElement-y.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "lbl_1 needs position y"
      };
      validator.checkViewElement( parsedData.views[0].content[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
    it( "should check if the viewElement recieved has a height", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-vElement-height.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "lbl_1 needs a height"
      };
      validator.checkViewElement( parsedData.views[0].content[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
    it( "should check if the viewElement recieved has a width", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-vElement-width.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "lbl_1 needs a width"
      };
      validator.checkViewElement( parsedData.views[0].content[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
    it( "should check if the viewElement recieved has a type", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-vElement-type.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "lbl_1 needs a type"
      };
      validator.checkViewElement( parsedData.views[0].content[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
  });
  //**************************   checkTransition   *****************************
  describe( "checkTransition", function () {
    it( "should check that the transition has a name", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-transition-name.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" :  "Transition name is required"
      };
      validator.checkTransition( parsedData.transitions[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
    it( "should check that the transition has a destiny", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-transition-destiny.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "Transition destiny is required"
      };
      validator.checkTransition( parsedData.transitions[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
    it( "should check that the transition has an origin", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-transition-origin.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : missingError,
        "description" : "Transition origin is required"
      };
      validator.checkTransition( parsedData.transitions[0] );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
  });
  //***********************   checkTransitionCalls   ***************************
  describe( "checkTransitionCalls", function () {
    it( "should return true if the all the transitions calls are correct", function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test1.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      var result = validator.checkMe( parsedData );
      expect( result ).toBe( true );
    });
    it( "should return false if a transition call is undefined" , function () {
      parsedData = JSON.parse( fs.readFileSync( testPath + "test-undefined-transition.json", "utf8" ) );
      parsedData.appName = "appName";
      parsedData.savePath = "destination";
      expectedError = {
        "name" : "transition" + undefinedError,
        "description" : "view element calls an undefined transition"
      };
      validator.checkMe( parsedData );
      expect( fakeErrorHandler.recievedData ).toEqual( expectedError );
    });
  });
});
