"use strict";
describe( "Button", function () {
  var button;
  var expected;
  var data;
  beforeEach( function () {
    data = {
      "name": "lbl_2",
      "type": "button",
      "skip": true,
      "marginTop" : "\"10dp\"",
      "marginLeft": "\"10dp\"",
      "marginRight": "\"10dp\"",
      "width": "\"50dp\"",
      "height": "\"wrap_content\"",
    };
    button = require( "./generate" );
  });
  it( "should create the button template correctly", function () {
    expected =
      "\t\t<Button" +
      "\n\t\t\tandroid:layout_width=\"50dp\"" +
      "\n\t\t\tandroid:layout_height=\"wrap_content\"" +
      "\n\t\t\tandroid:id=\"@+id/lbl_2\"" +
      "\n\t\t\tandroid:layout_marginTop=\"10dp\"" +
      "\n\t\t\tandroid:layout_marginLeft=\"10dp\"" +
      "\n\t\t\tandroid:layout_marginRight=" + "\"10dp\"" +
      "/>\n";
    var result = button.generate( data, 2 );
    expect ( result ).toEqual( expected );
  });
});
