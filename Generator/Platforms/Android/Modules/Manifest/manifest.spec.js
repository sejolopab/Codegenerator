"use strict";
describe ( "Manifest generator", function () {
  var manifest;
  var template;
  var generator;
  var errorHandler;
  var error = "Android codeGenerator failure";
  beforeEach( function () {
    manifest = {
      "path" : "",
      "package" : "",
      "application" : {
        "allowBackup" : true,
        "icon" : "@mipmap/ic_launcher",
        "label" : "@string/app_name",
        "supportsRtl" : "true",
        "theme" : "@style/AppTheme",
        "views" : [
          { "name": "LoginView", "launcher": true },
          { "name": "HomeView", "launcher": false }
        ]
      }
    };
    errorHandler = {
      savedError : {},
      error : function ( error ) { this.savedError = error; }
    };
    template = require( "./template" );
    generator = require( "./generate" ).inject( errorHandler );
  });
  it( "sould show an error if the activity name is repeated", function () {
    var test = "HomeView";
    manifest.application.views[0].name = test;
    generator.isValid( manifest );
    expect( errorHandler.savedError ).toEqual({
      "name" : error,
      "description" : "activity name (" + test + ") is repeated"
    });
  });
  it( "should show an error if the launcher parameter was not defined", function () {
    delete manifest.application.views[1].launcher;
    generator.isValid( manifest );
    expect( errorHandler.savedError ).toEqual({
      "name" : error,
      "description" : "Unexpected error on manifest"
    });
  });
  it( "should show an error if the activity name has special characters", function () {
    var test = "Home'#s View";
    manifest.application.views[1].name = test;
    generator.isValid( manifest );
    expect( errorHandler.savedError ).toEqual({
      "name" : error,
      "description" : "Activity name has special characters"
    });
  });
  it( "should return de expected data correctly", function () {
    var expectedResult =
    "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
    "<manifest \n" +
    "\txmlns:android=\"http://schemas.android.com/apk/res/android\" \n" +
    "\tpackage=\"\"> \n" +
    "\t<application\n" +
    "\t\tandroid:allowBackup=\"true\"\n" +
    "\t\tandroid:icon=\"@mipmap/ic_launcher\"\n" +
    "\t\tandroid:label=\"@string/app_name\"\n" +
    "\t\tandroid:supportsRtl=\"true\"\n" +
    "\t\tandroid:theme=\"@style/AppTheme\">\n" +
    "\t\t<activity android:name=\".LoginView\">\n" +
    "\t\t\t<intent-filter>\n" +
    "\t\t\t\t<action android:name=\"android.intent.action.MAIN\" />\n" +
    "\t\t\t\t<category android:name=\"android.intent.category.LAUNCHER\" />\n" +
    "\t\t\t</intent-filter>\n" +
    "\t\t</activity>\n" +
    "\t\t<activity android:name=\".HomeView\">" +
    "</activity>\n" +
    "\t</application>\n</manifest>";
    var result = template.generate( manifest );
    expect( result ).toEqual( expectedResult );
  });
});
