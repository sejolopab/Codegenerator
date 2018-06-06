"use strict";
describe( "Button", function () {
  var button;
  var expected;
  var dataBtn, dataCon;
  beforeEach( function () {
    dataBtn = {
      "name" : "btn1",
      "type" : "button",
      "text" : "Log in",
      "position" : { "height" : "47", "width" : "160", "x" : "26", "y" : "47" },
      "font" : { "font" : "default", "fontStyle" : "bold", "fontSize" : "22", "fontColor" : ["200","200","200"] },
      "style" : { "background" : ["200","200","200"] },
      "onTab" : "something"
    };
    dataCon = [{
      "name": "btn1",
      "type": "button",
      "data":
      {
        "name": "gotoHomeView",
        "origin": "loginController",
        "destiny": "homeController"
      }
    }];
    button = require( "./generate" ).inject({});
  });
  it( "should be able to create button without connections", function () {
    delete dataBtn.onTab;
    delete dataBtn.style;
    dataBtn.font = {};
    expected =
      "<button opaque=\"NO\" contentMode=\"scaleToFill\" fixedFrame=\"YES\" "+
      "contentHorizontalAlignment=\"center\" contentVerticalAlignment=\"center\" "+
      "buttonType=\"roundedRect\" lineBreakMode=\"middleTruncation\" "+
      "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"btn1\">\n"+
      "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
      "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
      "\t<fontDescription key=\"fontDescription\" type=\"system\" pointSize=\"17\"/>\n" +
      "\t<state key=\"normal\" title=\"Log in\"/>\n"+
      "</button>\n";
    var result = button.generate( dataBtn, [], 0 );
    expect( result ).toEqual( expected );
  });
  it( "should be able to create a button with connections", function () {
    delete dataBtn.style;
    dataBtn.font = {};
    expected =
      "<button opaque=\"NO\" contentMode=\"scaleToFill\" fixedFrame=\"YES\" "+
        "contentHorizontalAlignment=\"center\" contentVerticalAlignment=\"center\" "+
        "buttonType=\"roundedRect\" lineBreakMode=\"middleTruncation\" "+
        "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"btn1\">\n"+
      "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
      "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" "+
        "flexibleMaxY=\"YES\"/>\n"+
      "\t<fontDescription key=\"fontDescription\" type=\"system\" pointSize=\"17\"/>\n"+
      "\t<state key=\"normal\" title=\"Log in\"/>\n"+
      "\t<connections>\n"+
      "\t\t<action selector=\"gotoHomeView:\" destination=\"loginController\" "+
        "eventType=\"touchUpInside\" id=\"btn1action\"/>\n"+
      "\t</connections>\n"+
      "</button>\n";
    var result = button.generate( dataBtn, dataCon, 0 );
    expect( result ).toEqual( expected );
  });
  it( "should be able to set a background color", function () {
    delete dataBtn.onTab;
    dataBtn.font = {};
    expected =
      "<button opaque=\"NO\" contentMode=\"scaleToFill\" fixedFrame=\"YES\" "+
      "contentHorizontalAlignment=\"center\" contentVerticalAlignment=\"center\" "+
      "buttonType=\"roundedRect\" lineBreakMode=\"middleTruncation\" "+
      "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"btn1\">\n"+
      "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
      "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
      "\t<color key=\"backgroundColor\" red=\"0.7843137254901961\" green=\"0.7843137254901961\" blue=\"0.7843137254901961\" "+
      "alpha=\"1\" colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n"+
      "\t<fontDescription key=\"fontDescription\" type=\"system\" pointSize=\"17\"/>\n" +
      "\t<state key=\"normal\" title=\"Log in\"/>\n"+
      "</button>\n";
    var result = button.generate( dataBtn, [], 0 );
    expect( result ).toEqual( expected );
  });
  it( "should be able to set a font to the text", function () {
    delete dataBtn.style;
    delete dataBtn.font.fontColor;
    expected =
      "<button opaque=\"NO\" contentMode=\"scaleToFill\" fixedFrame=\"YES\" "+
      "contentHorizontalAlignment=\"center\" contentVerticalAlignment=\"center\" "+
      "buttonType=\"roundedRect\" lineBreakMode=\"middleTruncation\" "+
      "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"btn1\">\n"+
      "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
      "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
      "\t<fontDescription key=\"fontDescription\" name=\"HelveticaNeue-Bold\" "+
      "family=\"Helvetica Neue\" pointSize=\"22\"/>\n"+
      "\t<state key=\"normal\" title=\"Log in\"/>\n"+
      "</button>\n";
    var result = button.generate( dataBtn, [], 0 );
    expect( result ).toEqual( expected );
  });
  it( "should be able to set a font color", function () {
    delete dataBtn.style;
    delete dataBtn.font.font;
    delete dataBtn.font.fontStyle;
    delete dataBtn.font.fontSize;
    expected =
      "<button opaque=\"NO\" contentMode=\"scaleToFill\" fixedFrame=\"YES\" "+
        "contentHorizontalAlignment=\"center\" contentVerticalAlignment=\"center\" "+
        "buttonType=\"roundedRect\" lineBreakMode=\"middleTruncation\" "+
        "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"btn1\">\n"+
      "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
      "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" "+
        "flexibleMaxY=\"YES\"/>\n"+
      "\t<fontDescription key=\"fontDescription\" type=\"system\" pointSize=\"17\"/>\n"+
      "\t<state key=\"normal\" title=\"Log in\">\n"+
      "\t\t<color key=\"titleColor\" red=\"0.7843137254901961\" green=\"0.7843137254901961\" blue=\"0.7843137254901961\" "+
      "alpha=\"1\" colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n"+
      "\t</state>\n"+
      "\t<connections>\n"+
      "\t\t<action selector=\"gotoHomeView:\" destination=\"loginController\" "+
        "eventType=\"touchUpInside\" id=\"btn1action\"/>\n"+
      "\t</connections>\n"+
      "</button>\n";
    var result = button.generate( dataBtn, dataCon, 0 );
    expect( result ).toEqual( expected );
  });
});
