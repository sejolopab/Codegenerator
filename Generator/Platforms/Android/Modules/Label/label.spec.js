"use strict";
describe( "Label", function () {
  var label;
  var expected;
  var data;
  beforeEach( function () {
    data = {
      "name": "lbl_2",
      "type": "label",
      "skip": true,
      "marginTop" : "\"10dp\"",
      "marginLeft": "\"10dp\"",
      "marginRight": "\"10dp\"",
      "width": "\"50dp\"",
      "height": "\"wrap_content\"",
    };
    label = require( "./generate" );
  });
  it( "should create the label template correctly", function () {
  });
});
