"use strict";
describe( "Label", function () {
  var label;
  var expected;
  var data;
  beforeEach( function () {
    data = {
      "name" : "lbl1",
      "type" : "label",
      "text" : "Log in",
      "position" : { "height" : "47", "width" : "160", "x" : "26", "y" : "47" },
      "font" : { "font" : "default", "fontStyle" : "bold", "fontSize" : "22", "fontColor" : ["200","200","200"] },
      "style" : { "background" : ["200","200","200"] }
    };
    label = require( "./generate" ).inject({});
  });
  it( "should create the label template correctly with only the position data", function () {
    delete data.style;
    data.font = {};
    expected =
    "<label opaque=\"NO\" userInteractionEnabled=\"NO\" "+
       "contentMode=\"left\" horizontalHuggingPriority=\"251\" "+
       "verticalHuggingPriority=\"251\" fixedFrame=\"YES\" text=\"Log in\" "+
       "textAlignment=\"natural\" lineBreakMode=\"tailTruncation\" "+
       "baselineAdjustment=\"alignBaselines\" adjustsFontSizeToFit=\"NO\" "+
       "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"lbl1\">\n"+
       "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
       "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
       "\t<fontDescription key=\"fontDescription\" type=\"system\" pointSize=\"17\"/>\n" +
       "\t<nil key=\"textColor\"/>\n"+
       "\t<nil key=\"highlightedColor\"/>\n"+
       "</label>\n";
    var result = label.generate( data, 0 );
    expect( result ).toEqual( expected );
  });
  it( "should create the label template correctly if there is font data", function () {
    delete data.style;
    delete data.font.fontColor;
    expected =
    "<label opaque=\"NO\" userInteractionEnabled=\"NO\" "+
       "contentMode=\"left\" horizontalHuggingPriority=\"251\" "+
       "verticalHuggingPriority=\"251\" fixedFrame=\"YES\" text=\"Log in\" "+
       "textAlignment=\"natural\" lineBreakMode=\"tailTruncation\" "+
       "baselineAdjustment=\"alignBaselines\" adjustsFontSizeToFit=\"NO\" "+
       "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"lbl1\">\n"+
       "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
       "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
       "\t<fontDescription key=\"fontDescription\" name=\"HelveticaNeue-Bold\" family=\"Helvetica Neue\" pointSize=\"22\"/>\n" +
       "\t<nil key=\"textColor\"/>\n"+
       "\t<nil key=\"highlightedColor\"/>\n"+
       "</label>\n";
    var result = label.generate( data, 0 );
    expect( result ).toEqual( expected );
  });
  it( "should create the label template correctly if there is style data", function () {
    data.font = {};
    expected =
    "<label opaque=\"NO\" userInteractionEnabled=\"NO\" "+
       "contentMode=\"left\" horizontalHuggingPriority=\"251\" "+
       "verticalHuggingPriority=\"251\" fixedFrame=\"YES\" text=\"Log in\" "+
       "textAlignment=\"natural\" lineBreakMode=\"tailTruncation\" "+
       "baselineAdjustment=\"alignBaselines\" adjustsFontSizeToFit=\"NO\" "+
       "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"lbl1\">\n"+
       "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
       "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
       "\t<color key=\"backgroundColor\" red=\"0.7843137254901961\" green=\"0.7843137254901961\" blue=\"0.7843137254901961\" alpha=\"1\" colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n"+
       "\t<fontDescription key=\"fontDescription\" type=\"system\" pointSize=\"17\"/>\n" +
       "\t<nil key=\"textColor\"/>\n"+
       "\t<nil key=\"highlightedColor\"/>\n"+
       "</label>\n";
    var result = label.generate( data, 0 );
    expect( result ).toEqual( expected );
  });
  it( "should create the label template correctly if the label has the font color attribute", function () {
    delete data.style;
    delete data.font.font;
    delete data.font.fontStyle;
    delete data.font.fontSize;
    expected =
    "<label opaque=\"NO\" userInteractionEnabled=\"NO\" "+
       "contentMode=\"left\" horizontalHuggingPriority=\"251\" "+
       "verticalHuggingPriority=\"251\" fixedFrame=\"YES\" text=\"Log in\" "+
       "textAlignment=\"natural\" lineBreakMode=\"tailTruncation\" "+
       "baselineAdjustment=\"alignBaselines\" adjustsFontSizeToFit=\"NO\" "+
       "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"lbl1\">\n"+
       "\t<rect key=\"frame\" x=\"26\" y=\"47\" width=\"160\" height=\"47\"/>\n"+
       "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
       "\t<fontDescription key=\"fontDescription\" type=\"system\" pointSize=\"17\"/>\n" +
       "\t<color key=\"textColor\" red=\"0.7843137254901961\" green=\"0.7843137254901961\" blue=\"0.7843137254901961\" alpha=\"1\" colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n"+
       "\t<nil key=\"highlightedColor\"/>\n"+
       "</label>\n";
    var result = label.generate( data, 0 );
    expect( result ).toEqual( expected );
  });
});
