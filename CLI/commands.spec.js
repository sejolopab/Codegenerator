"use strict";
// Commands tests
describe( "CLI", function () {
  var command;
  var fakeConfig;
  var fakeParser;
  var fakeHandler;
  beforeEach( function () {
    command = [];
    fakeConfig = {};
    fakeParser = {};
    fakeHandler = {};
  });
  // *****************************   Read   ***********************************
  // Check first command element is correct
  it( "should be able to validate  if the command exist", function () {
    fakeHandler = {
      functionWasCalled : false,
      error : function () {
        this.functionWasCalled = true;
      }
    };
    var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
    command = ["dsfsdfa" , "template", "appname"];
    commands.read( command );
    expect( fakeHandler.functionWasCalled ).toBe( true );
  });
  // Indentify generate is correct
  it( "should be able to indentify the generate", function () {
    var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
    command = ["generate" , "template", "test1.json","appname"];
    spyOn( commands, "config" );
    spyOn( commands, "generate" );
    spyOn( commands, "help" );
    commands.read( command );
    expect( commands.config ).not.toHaveBeenCalled();
    expect( commands.generate ).toHaveBeenCalled();
    expect( commands.help ).not.toHaveBeenCalled();
  });
  // Indentify config is correct
  it( "should be able to indentify the config command", function () {
    var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
    command = ["config" , "show"];
    spyOn( commands, "config" );
    spyOn( commands, "generate" );
    spyOn( commands, "help" );
    commands.read( command );
    expect( commands.config ).toHaveBeenCalled();
    expect( commands.generate ).not.toHaveBeenCalled();
    expect( commands.help ).not.toHaveBeenCalled();
  });
  // Indentify help is correct
  it( "should be able to indentify the help", function () {
    var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
    command = ["help" , "config"];
    spyOn( commands, "config" );
    spyOn( commands, "generate" );
    spyOn( commands, "help" );
    commands.read( command );
    expect( commands.config ).not.toHaveBeenCalled();
    expect( commands.generate ).not.toHaveBeenCalled();
    expect( commands.help ).toHaveBeenCalled();
  });
  // *****************************   Generate   ********************************
  describe( "generate", function () {
    // Too many command elements
    it( "should be able to validate if the command recieved is not too long", function () {
      fakeHandler = {
        functionWasCalled : false,
        error : function () {
          this.functionWasCalled = true;
        }
      };
      var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
      command = ["generated" , "", "","","","",""];
      commands.generate( command );
      expect( fakeHandler.functionWasCalled ).toBe( true );
    });
    // Too few command elements
    it( "should be able to validate if the command recieved is not too short", function () {
      fakeHandler = {
        functionWasCalled : false,
        error : function () {
          this.functionWasCalled = true;
        }
      };
      var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
      command = ["generated"];
      commands.generate( command );
      expect( fakeHandler.functionWasCalled ).toBe( true );
    });
    //  Generate template with save path
    it( "should call parseMe function if the syntax check is correct", function () {
      fakeParser = {
        functionWasCalled : false,
        parseMe : function () {
          this.functionWasCalled = true;
        }
      };
      var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
      command = ["generate","template","test1.json","C:\Users\jpgamboa-as\Documents","appname"];
      commands.generate( command );
      expect( fakeParser.functionWasCalled ).toBe( true );
    });
  });
  // ******************************   Config   *********************************
  describe( "config", function () {
    //  Syntax error 1
    it( "should be able to validate if the configuration command recieved is not too long", function () {
      fakeHandler = {
        functionWasCalled : false,
        error : function () {
          this.functionWasCalled = true;
        }
      };
      var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
      command = ["config" , "", "","","","",""];
      commands.config( command );
      expect( fakeHandler.functionWasCalled ).toBe( true );
    });//  Syntax error 1
    it( "should be able to validate if the configuration command recieved is not too short", function () {
        fakeHandler = {
        functionWasCalled : false,
        error : function () {
          this.functionWasCalled = true;
        }
      };
      var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
      command = ["config"];
      commands.config( command );
      expect( fakeHandler.functionWasCalled ).toBe( true );
    });
    //  Syntax is correct
    it( "should call configMe if the syntax check is correct", function () {
      fakeConfig = {
        functionWasCalled : false,
        configMe : function () {
          this.functionWasCalled = true;
        }
      };
      var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
      command = ["config","add","ios"];
      commands.config( command );
      expect( fakeConfig.functionWasCalled ).toBe( true );
    });
  });
  // ******************************   Help   ***********************************
  describe( "help", function () {
    //  Syntax error
    it( "shouldn't throw an error if command is recognized", function () {
      var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
      command = ["help", "config"];
      expect( function () { commands.help( command ); }).not.toThrow( new Error( "Command does not exist" ) );
    });
    //  Syntax error
    it( "should be able to identify systax errors on the help options", function () {
      fakeHandler = {
        functionWasCalled : false,
        error : function () {
          this.functionWasCalled = true;
        }
      };
      var commands = require( "./commands" ).inject( fakeParser, fakeConfig, fakeHandler );
      command = ["help", "remove"];
      commands.help( command );
      expect( fakeHandler.functionWasCalled ).toBe( true );
    });
  });
});
