"use strict";
describe( "TextField", function () {
  var textField;
  var expected;
  var data;
  beforeEach( function () {
    data = {
      "name" : "txt1",
      "type" : "textField",
      "position" : { "height" : "47", "width" : "160", "x" : "26", "y" : "47" },
      "font" : { "font" : "default", "fontStyle" : "bold", "fontSize" : "22", "fontColor" : ["200","200","200"] },
      "style" : { "background" : ["200","200","200"] }
    };
    textField = require( "./generate" ).inject({});
  });
  it( "should create the textField template correctly with only the position data", function () {
    delete data.style;
    data.font = {};
    expected =
       "<textField opaque=\"NO\" clipsSubviews=\"YES\" contentMode=\"scaleToFill\" "+
       "fixedFrame=\"YES\" contentHorizontalAlignment=\"left\" "+
       "contentVerticalAlignment=\"center\" borderStyle=\"roundedRect\" "+
       "textAlignment=\"natural\" minimumFontSize=\"17\" "+
       "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"txt1\">\n"+
       "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
       "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
       "\t<nil key=\"textColor\"/>\n"+
       "\t<fontDescription key=\"fontDescription\" type=\"system\" pointSize=\"14\"/>\n" +
       "\t<textInputTraits key=\"textInputTraits\"/>\n"+
       "</textField>\n";
    var result = textField.generate( data, 0 );
    expect( result ).toEqual( expected );
  });
  it( "should create the textField template correctly if there is font data", function () {
    delete data.style;
    delete data.font.fontColor;
    expected =
      "<textField opaque=\"NO\" clipsSubviews=\"YES\" contentMode=\"scaleToFill\" "+
      "fixedFrame=\"YES\" contentHorizontalAlignment=\"left\" "+
      "contentVerticalAlignment=\"center\" borderStyle=\"roundedRect\" "+
      "textAlignment=\"natural\" minimumFontSize=\"17\" "+
      "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"txt1\">\n"+
       "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
       "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
       "\t<nil key=\"textColor\"/>\n"+
       "\t<fontDescription key=\"fontDescription\" name=\"HelveticaNeue-Bold\" family=\"Helvetica Neue\" pointSize=\"22\"/>\n" +
       "\t<textInputTraits key=\"textInputTraits\"/>\n"+
       "</textField>\n";
    var result = textField.generate( data, 0 );
    expect( result ).toEqual( expected );
  });
  it( "should create the textField template correctly if there is style data", function () {
    data.font = {};
    expected =
      "<textField opaque=\"NO\" clipsSubviews=\"YES\" contentMode=\"scaleToFill\" "+
      "fixedFrame=\"YES\" contentHorizontalAlignment=\"left\" "+
      "contentVerticalAlignment=\"center\" borderStyle=\"roundedRect\" "+
      "textAlignment=\"natural\" minimumFontSize=\"17\" "+
      "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"txt1\">\n"+
       "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
       "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
       "\t<color key=\"backgroundColor\" red=\"0.7843137254901961\" green=\"0.7843137254901961\" blue=\"0.7843137254901961\" alpha=\"1\" colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n"+
       "\t<nil key=\"textColor\"/>\n"+
       "\t<fontDescription key=\"fontDescription\" type=\"system\" pointSize=\"14\"/>\n" +
       "\t<textInputTraits key=\"textInputTraits\"/>\n"+
       "</textField>\n";
    var result = textField.generate( data, 0 );
    expect( result ).toEqual( expected );
  });
  it( "should create the textField template correctly if the textField has the font color attribute", function () {
    delete data.style;
    delete data.font.font;
    delete data.font.fontStyle;
    delete data.font.fontSize;
    expected =
      "<textField opaque=\"NO\" clipsSubviews=\"YES\" contentMode=\"scaleToFill\" "+
      "fixedFrame=\"YES\" contentHorizontalAlignment=\"left\" "+
      "contentVerticalAlignment=\"center\" borderStyle=\"roundedRect\" "+
      "textAlignment=\"natural\" minimumFontSize=\"17\" "+
      "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"txt1\">\n"+
       "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
       "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
       "\t<color key=\"textColor\" red=\"0.7843137254901961\" green=\"0.7843137254901961\" blue=\"0.7843137254901961\" alpha=\"1\" colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n"+
       "\t<fontDescription key=\"fontDescription\" type=\"system\" pointSize=\"14\"/>\n" +
       "\t<textInputTraits key=\"textInputTraits\"/>\n"+
       "</textField>\n";
    var result = textField.generate( data, 0 );
    expect( result ).toEqual( expected );
  });
});
