"use strict";
describe( "Scene", function () {
  var scene;
  var sceneTemplate;
  var expected;
  var data;
  beforeEach( function () {
    data = [
       {
         "name" : "loginView",
         "controller" : "loginController",
         "type" : "view",
         "position" : { "height" : "575", "width" : "375", "x" : "0", "y" : "0" },
         "style" : { "background": ["200","200","200"] },
         "content" : [],
         "connections" : [
          { "name" : "lblten", "type" : "label" },
          { "name" : "edtone", "type" : "textField" },
          { "name" : "edt2"  , "type" : "textField" },
          { "name" : "btn1"  , "type" : "button", "data":
            {
              "name" : "gotoHomeView",
              "origin" : "loginController",
              "destiny" : "homeController"
            }
          }
        ]
       },{
         "name" : "homeView",
         "type" : "view",
         "launcher" : true,
         "controller" : "homeController",
         "position": { "height" : "575", "width" : "375", "x" : "0", "y": "0" },
         "style" : { "background" : ["200","200","200"] },
         "content" : [],
         "connections" : []
       }
    ];
    scene = require( "./generate" ).inject({});
    sceneTemplate = require( "./template" );
  });
  it( "should be able to create a simple scene without connections or a defined background color", function () {
    delete data[1].style;
    expected = {
      "open" : "",
      "body" : [],
      "close" : ""
    };
    expected.open =
      "<!--homeView-->\n"+
      "<scene sceneID=\"homeView\">\n" +
      "\t<objects>\n"+
      "\t\t<viewController id=\"homeController\" customClass=\"homeController\" "+
        "customModule=\"test\" customModuleProvider=\"target\" "+
        "sceneMemberID=\"viewController\">\n"+
      "\t\t\t<layoutGuides>\n"+
      "\t\t\t\t<viewControllerLayoutGuide type=\"top\" id=\"homeViewTopGuide\"/>\n"+
      "\t\t\t\t<viewControllerLayoutGuide type=\"bottom\" id=\"homeViewBotGuide\"/>\n"+
      "\t\t\t</layoutGuides>\n"+
      "\t\t\t<view key=\"view\" contentMode=\"scaleToFill\" id=\"homeViewView\">\n"+
      "\t\t\t\t<rect key=\"frame\" x=\"0.0\" y=\"0.0\" width=\"375\" height=\"667\"/>\n"+
      "\t\t\t\t<autoresizingMask key=\"autoresizingMask\" widthSizable=\"YES\" "+
        "heightSizable=\"YES\"/>\n"+
      "\t\t\t\t<subviews>\n";
    expected.close =
      "\t\t\t\t</subviews>\n"+
      "\t\t\t\t<color key=\"backgroundColor\" red=\"1\" green=\"1\" "+
          "blue=\"1\" alpha=\"1\" colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n"+
      "\t\t\t</view>\n"+
      "\t\t</viewController>\n"+
      "\t\t<placeholder placeholderIdentifier=\"IBFirstResponder\" "+
        "id=\"homeViewPlaceHolder" + "\" sceneMemberID=\"firstResponder\"/>\n"+
      "\t</objects>\n"+
      "\t<point key=\"canvasLocation\" x=\"0\" y=\"0\"/>\n"+
      "</scene>\n";
    var result = sceneTemplate.create( data[1], "test", 0, 0, "" );
    expect( result ).toEqual( expected );
  });
  it ( "should be able to create a scene with connections", function () {
    data[0].connections = [];
    expected = {
      "open" : "",
      "body" : [],
      "close" : ""
    };
    expected.open =
      "<!--loginView-->\n"+
      "<scene sceneID=\"loginView\">\n" +
      "\t<objects>\n"+
      "\t\t<viewController id=\"loginController\" customClass=\"loginController\" "+
        "customModule=\"test\" customModuleProvider=\"target\" "+
        "sceneMemberID=\"viewController\">\n"+
      "\t\t\t<layoutGuides>\n"+
      "\t\t\t\t<viewControllerLayoutGuide type=\"top\" id=\"loginViewTopGuide\"/>\n"+
      "\t\t\t\t<viewControllerLayoutGuide type=\"bottom\" id=\"loginViewBotGuide\"/>\n"+
      "\t\t\t</layoutGuides>\n"+
      "\t\t\t<view key=\"view\" contentMode=\"scaleToFill\" id=\"loginViewView\">\n"+
      "\t\t\t\t<rect key=\"frame\" x=\"0.0\" y=\"0.0\" width=\"375\" height=\"667\"/>\n"+
      "\t\t\t\t<autoresizingMask key=\"autoresizingMask\" widthSizable=\"YES\" "+
        "heightSizable=\"YES\"/>\n"+
      "\t\t\t\t<subviews>\n";
    expected.close =
      "\t\t\t\t</subviews>\n"+
      "\t\t\t\t<color key=\"backgroundColor\" red=\"0.7843137254901961\" green=\"0.7843137254901961\" "+
          "blue=\"0.7843137254901961\" alpha=\"1\" colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n"+
      "\t\t\t</view>\n"+
      "\t\t</viewController>\n"+
      "\t\t<placeholder placeholderIdentifier=\"IBFirstResponder\" "+
        "id=\"loginViewPlaceHolder" + "\" sceneMemberID=\"firstResponder\"/>\n"+
      "\t</objects>\n"+
      "\t<point key=\"canvasLocation\" x=\"0\" y=\"0\"/>\n"+
      "</scene>\n";
    var result = sceneTemplate.create( data[0], "test", 0, 0, "" );
    expect( result ).toEqual( expected );
  });
  it( " should be able to create a scene with a defined background color", function () {
    delete data[0].style;
    expected = {
      "open" : "",
      "body" : [],
      "close" : ""
    };
    expected.open =
      "<!--loginView-->\n"+
      "<scene sceneID=\"loginView\">\n" +
      "\t<objects>\n"+
      "\t\t<viewController id=\"loginController\" customClass=\"loginController\" "+
        "customModule=\"test\" customModuleProvider=\"target\" "+
        "sceneMemberID=\"viewController\">\n"+
      "\t\t\t<layoutGuides>\n"+
      "\t\t\t\t<viewControllerLayoutGuide type=\"top\" id=\"loginViewTopGuide\"/>\n"+
      "\t\t\t\t<viewControllerLayoutGuide type=\"bottom\" id=\"loginViewBotGuide\"/>\n"+
      "\t\t\t</layoutGuides>\n"+
      "\t\t\t<view key=\"view\" contentMode=\"scaleToFill\" id=\"loginViewView\">\n"+
      "\t\t\t\t<rect key=\"frame\" x=\"0.0\" y=\"0.0\" width=\"375\" height=\"667\"/>\n"+
      "\t\t\t\t<autoresizingMask key=\"autoresizingMask\" widthSizable=\"YES\" "+
        "heightSizable=\"YES\"/>\n"+
      "\t\t\t\t<subviews>\n";
    expected.close =
      "\t\t\t\t</subviews>\n"+
      "\t\t\t\t<color key=\"backgroundColor\" red=\"1\" green=\"1\" "+
          "blue=\"1\" alpha=\"1\" colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n"+
      "\t\t\t</view>\n"+
      "\t\t\t<connections>\n"+
      "\t\t\t\t<outlet property=\"lblten\" destination=\"lblten\" id=\"lbltenCon\"/>\n"+
      "\t\t\t\t<outlet property=\"edtone\" destination=\"edtone\" id=\"edtoneCon\"/>\n"+
      "\t\t\t\t<outlet property=\"edt2\" destination=\"edt2\" id=\"edt2Con\"/>\n"+
      "\t\t\t\t<segue destination=\"homeController\" kind=\"show\" "+
        "identifier=\"gotoHomeView\" id=\"gotoHomeViewCon\"/>\n"+
      "\t\t\t</connections>\n"+
      "\t\t</viewController>\n"+
      "\t\t<placeholder placeholderIdentifier=\"IBFirstResponder\" "+
        "id=\"loginViewPlaceHolder" + "\" sceneMemberID=\"firstResponder\"/>\n"+
      "\t</objects>\n"+
      "\t<point key=\"canvasLocation\" x=\"0\" y=\"0\"/>\n"+
      "</scene>\n";
    var result = sceneTemplate.create( data[0], "test", 0, 0, "" );
    expect( result ).toEqual( expected );
  });
});
