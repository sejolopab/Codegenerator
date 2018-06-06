"use strict";
describe( "structure", function () {
  var fs = require( "fs" );
  var path = require( "path" );
  var testPath = path.join( __dirname, "../../../spec/tests/" );
  var parsedData = JSON.parse( fs.readFileSync( testPath + "test2.json", "utf8" ) );
  parsedData.appName = "test";
  parsedData.savePath = "destination";
  var structure;
  var expected;
  var values = {
    "colors" : [
      {
        "name" : "colorPrimary",
        "color" : "#3F51B5"
      },
      {
        "name" : "colorPrimaryDark",
        "color" : "#303F9F"
      },
      {
        "name" : "colorAccent",
        "color" : "#FF4081"
      }
    ],
    "dimens" : [
      {
        "name" : "activity_horizontal_margin",
        "dimen" : "16dp"
      },
      {
        "name" : "activity_vertical_margin",
        "dimen" : "16dp"
      }
    ],
    "strings" : [
      {
        "name" : "app_name",
        "value" : "test"
      }
    ],
    "styles" : [
      {
        "name" : "AppTheme",
        "parent" : "Theme.AppCompat.Light.DarkActionBar",
        "items" : [
          {
            "name" : "colorPrimary",
            "color" : "@color/colorPrimary"
          },
          {
            "name" : "colorPrimaryDark",
            "color" : "@color/colorPrimaryDark"
          },
          {
            "name" : "colorAccent",
            "color" : "@color/colorAccent"
          }
        ]
      }
    ]
  };
  var baseStructure = {
    "appName" : "test",
    "path" : "savePath",
    "java" : {
      "path" : "path_1/",
      "files" : []
    },
    "res" : {
      "path" : "path_2/",
      "files" : {
        "layout" : [],
        "values" : {}
      }
    },
    "manifest" : { // add manifest
      "path" : "savePath/main/AndroidManifest.xml",
      "package" : "com.codeGenerator.test",
      "application" : {
        "allowBackup" : true,
        "icon" : "@mipmap/ic_launcher",
        "label" : "@string/app_name",
        "supportsRtl" : "true",
        "theme" : "@style/AppTheme",
        "views" : [] // activities
      }
    }
  };
  beforeEach( function () {
    expected = baseStructure;
    structure = require( "./structure" );
    structure.androidApp = baseStructure;
  });
  it( "should add layout and the required string values correctly", function () {
    expected.res.files.layout = [
      {
        "path" : "path_2/layout/activity_loginview.xml",
        "name" : "activity_loginview",
        "height" : 480,
        "width" : 320,
        "x"      : 0,
        "y"      : 0,
        "controller" : "loginController",
        "content" : [
          {
            "name" : "lbl_1",
            "type" : "label",
            "text" : "@string/Log_in",
            "position" : {
              "x" : ~~( 25 * 480 / 600 ),
              "y" : ~~( 50 * 320 / 350 ),
              "width" : ~~( 150 * 320 / 350 ),
              "height" : ~~( 50 * 480 / 600 )
            },
            "font" : {
              "font" : "default",
              "fontStyle" : "bold",
              "fontSize" : "22"
            }
          },{
            "name" : "edt_1",
            "type" : "editText",
            "position" : {
              "x" : ~~( 25 * 480 / 600 ),
              "y" : ~~( 100 * 320 / 350 ),
              "width" : ~~( 150 * 320 / 350 ),
              "height" : ~~( 50 * 480 / 600 )
            },
            "font" : {
              "font" : "default",
              "fontType" : "email",
              "fontStyle" : "plain",
              "fontSize" : "12"
            }
          },{
            "name" : "btn1",
            "type" : "button",
            "text" : "@string/My_Button",
            "position" : {
              "x" : ~~( 25 * 480 / 600 ),
              "y" : ~~( 250 * 320 / 350 ),
              "width" : ~~( 150 * 320 / 350 ),
              "height" : ~~( 50 * 480 / 600 )
            },
            "font" : {
              "font" : "default",
              "fontStyle" : "bold",
              "fontSize" : "12"
            },
            "onTap" : "gotoHomeView"
          }
        ]
      },{
        "path" : "path_2/layout/activity_homeview.xml",
        "name" : "activity_homeview",
        "height" : 480,
        "width" : 320,
        "x"      : 0,
        "y"      : 0,
        "controller" : "homeController",
        "content" : [{
          "name" : "lbl_1",
          "type" : "label",
          "text" : "@string/Home",
          "position" : {
            "x" : ~~( 25 * 480 / 600 ),
            "y" : ~~( 100 * 320 / 350 ),
            "width" : ~~( 75 * 320 / 350 ),
            "height" : ~~( 50 * 480 / 600 )
          },
          "font" : {
            "font" : "default",
            "fontStyle" : "bold",
            "fontSize" : "22"
          }
        }]
      }
    ];
    expected.res.files.values = values;
    structure.addValues ( parsedData );
    structure.addLayouts ( parsedData );
    expect( structure.androidApp ).toEqual( expected );
  });
  it( "slould add controllers correctly" , function () {
    expected.java.files = [
      {
        "path" : "path_1/LoginView.java",
        "methods" : [
          {
          "name" : "gotoHomeView",
          "calls" : [{
            "elementName" : "btn1",
            "elementType" : "button"
          }],
          "destiny" : "HomeView"
        }],
        "className" : "LoginView"
      },{
        "path" : "path_1/HomeView.java",
        "methods" : [],
        "className" : "HomeView"
      }
    ];
    structure.addControllers ( parsedData );
    expect( structure.androidApp ).toEqual( expected );
  });
  it( "should add standard values", function () {
    expected.res.files.values = values;
    structure.addValues( parsedData );
    expect( structure.androidApp ).toEqual( expected );
  });
  it( "should add manifest and the activities", function () {
    expected.manifest.application.views = [
      {
        "name" : "LoginView",
        "launcher" : true
      },{
        "name" : "HomeView",
        "launcher" : false
      }
    ];
    structure.addManifest ( parsedData.views );
    expect( structure.androidApp ).toEqual( expected );
  });
});
