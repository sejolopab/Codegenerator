"use strict";
describe( "storyboard", function () {
  var storyboard;
  var expected;
  var data;
  beforeEach( function () {
    data = [
       {
         "name" : "loginView",
         "controller" : "loginController",
         "type" : "view",
         "position" : { "height" : "575", "width" : "375", "x" : "0", "y" : "0" },
         "style" : { "background": [] },
         "content" : [],
         "connections" : []
       },{
         "name" : "homeView",
         "type" : "view",
         "launcher" : true,
         "controller" : "homeController",
         "position": { "height" : "575", "width" : "375", "x" : "0", "y": "0" },
         "style" : { "background" : [] },
         "content" : [],
         "connections" : []
       }
    ];
    storyboard = require( "./generate" ).inject({});
  });
  it( "should be able to identify the launch scene", function () {
    var result = storyboard.getLauncher( data );
    expect ( result ).toEqual( data[1].controller );
  });
  it( "should create a launch screen", function () {
    expected =
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n"+
      "<document type=\"com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB\" version=\"3.0\" toolsVersion=\"11134\" systemVersion=\"15F34\" targetRuntime=\"iOS.CocoaTouch\" propertyAccessControl=\"none\" useAutolayout=\"YES\" launchScreen=\"YES\" useTraitCollections=\"YES\" colorMatched=\"YES\" initialViewController=\"01J-lp-oVM\">\n"+
      "\t<dependencies>\n"+
      "\t\t<plugIn identifier=\"com.apple.InterfaceBuilder.IBCocoaTouchPlugin\" version=\"11106\"/>\n"+
      "\t\t<capability name=\"documents saved in the Xcode 8 format\" minToolsVersion=\"8.0\"/>\n"+
      "\t</dependencies>\n"+
      "\t<scenes>\n"+
      "\t\t<!--View Controller-->\n"+
      "\t\t<scene sceneID=\"EHf-IW-A2E\">\n"+
      "\t\t\t<objects>\n"+
      "\t\t\t\t<viewController id=\"01J-lp-oVM\" sceneMemberID=\"viewController\">\n"+
      "\t\t\t\t\t<layoutGuides>\n"+
      "\t\t\t\t\t\t<viewControllerLayoutGuide type=\"top\" id=\"Llm-lL-Icb\"/>\n"+
      "\t\t\t\t\t\t<viewControllerLayoutGuide type=\"bottom\" id=\"xb3-aO-Qok\"/>\n"+
      "\t\t\t\t\t</layoutGuides>\n"+
      "\t\t\t\t\t<view key=\"view\" contentMode=\"scaleToFill\" id=\"Ze5-6b-2t3\">\n"+
      "\t\t\t\t\t\t<rect key=\"frame\" x=\"0.0\" y=\"0.0\" width=\"375\" height=\"667\"/>\n"+
      "\t\t\t\t\t\t<autoresizingMask key=\"autoresizingMask\" widthSizable=\"YES\" heightSizable=\"YES\"/>\n"+
      "\t\t\t\t\t\t<color key=\"backgroundColor\" red=\"1\" green=\"1\" blue=\"1\" alpha=\"1\" colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n"+
      "\t\t\t\t\t</view>\n"+
      "\t\t\t\t</viewController>\n"+
      "\t\t\t\t<placeholder placeholderIdentifier=\"IBFirstResponder\" id=\"iYj-Kq-Ea1\" userLabel=\"First Responder\" sceneMemberID=\"firstResponder\"/>\n"+
      "\t\t\t</objects>\n"+
      "\t\t\t<point key=\"canvasLocation\" x=\"53\" y=\"375\"/>\n"+
      "\t\t</scene>\n"+
      "\t</scenes>\n"+
      "</document>";
    var result = storyboard.generateLaunchScreen();
    expect( result ).toEqual( expected );
  });
  it( "should create a storyboard template correctly", function () {
    expected = {
      "open" : "",
      "body" : [],
      "close" : "",
    };
    expected.open =
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+
      "<document type=\"com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB\" version=\"3.0\" toolsVersion=\"11134\" " +
        "systemVersion=\"15F34\" targetRuntime=\"iOS.CocoaTouch\" propertyAccessControl=\"none\" useAutolayout=\"YES\" " +
        "useTraitCollections=\"YES\" colorMatched=\"YES\" initialViewController=\"loginController\">\n"+
      "\t<device id=\"retina4_7\" orientation=\"portrait\">\n"+
      "\t\t<adaptation id=\"fullscreen\"/>\n"+
      "\t</device>\n"+
      "\t<dependencies>\n"+
      "\t\t<deployment identifier=\"iOS\"/>\n"+
      "\t\t<plugIn identifier=\"com.apple.InterfaceBuilder.IBCocoaTouchPlugin\" version=\"11106\"/>\n"+
      "\t\t<capability name=\"documents saved in the Xcode 8 format\" minToolsVersion=\"8.0\"/>\n"+
      "\t</dependencies>\n"+
      "\t<scenes>\n";
    expected.close =
      "\t</scenes>\n"+
      "</document>";
    expected.body = [];
    var storyBoardTemplate = require( "./template" );
    var result = storyBoardTemplate.create( "loginController" );
    expect( result ).toEqual( expected );
  });
});
