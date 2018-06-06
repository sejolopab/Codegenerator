"use strict";
describe( "Creator", function () {
  var expected;
  var fs, eHandler;
  var creator;
  beforeEach( function () {
    fs = {
      "createReadStreamStack" : "",
      createReadStream : function ( path ) {
        this.createReadStreamStack = path;
      },
      "createWriteStreamStack" : "",
      createWriteStream : function ( path ) {
        this.createWriteStreamStack = path;
      },
      "mkdirSyncStack" : [],
      mkdirSync : function ( data ) {
        this.mkdirSyncStack.push( data );
      }
    };
    eHandler = {
      "recievedError" : "",
      "error" : function ( error ) {
        this.recievedError =  error;
      }
    };
    creator = require ( "./creator" ).inject( fs, eHandler );
  });
  it( "should create the directories of the new application", function () {
    creator.makeDirectories( "path" );
    expected = ["path","path/Assets.xcassets/","path/Assets.xcassets/AppIcon.appiconset/"];
    expect( fs.mkdirSyncStack ).toEqual( expected );
  });
  it( "should add LaunchImage to the application created", function () {
    creator.loadImages( "path" );
    var expect1 = "./Templates/Icons/mdpi/ic_launcher.png";
    var expect2 = "path/LaunchImage.png";
    expect( fs.createReadStreamStack ).toEqual( expect1 );
    expect( fs.createWriteStreamStack ).toEqual( expect2 );
  });
});
