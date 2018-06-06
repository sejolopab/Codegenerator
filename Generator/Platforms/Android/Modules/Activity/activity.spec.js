"use strict";
describe( "Activity", function () {
    var activity;
    var eHandler;
    var data;
    var expected;
    beforeEach( function () {
      data = {
        "path" : "path",
        "name" : "name",
        "height" : "androidHeight",
        "width" : "androidWidth",
        "controller" : "",
        "content" : []
      };
      eHandler = {
        recievedError : {},
        error : function ( error ) { this.recievedError = error; }
      };
      activity = require( "./generate" ).inject( eHandler );
    });
    it( "should throw an error if the element on the activity is undefined", function () {
      data.content = [{
        "name": "lbl_2",
        "type": "blablabla",
        "skip": true,
        "marginLeft": "\"10dp\"",
        "width": "\"50dp\"",
        "height": "\"wrap_content\""
      }];
      activity.generate( data );
      expected = {
        "name" : "Android codeGenerator failed",
        "description" : "Type element undefined"
      };
      expect( eHandler.recievedError ).toEqual( expected );
    });
    it( "shold check that the template is generated correctly", function () {
      var result = activity.generate ( data );
      expected =
        "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<LinearLayout\n" +
        "\txmlns:android=\"http://schemas.android.com/apk/res/android\"\n" +
        "\txmlns:tools=\"http://schemas.android.com/tools\"\n"+
        "\tandroid:layout_width=\"match_parent\"\n" +
        "\tandroid:layout_height=\"match_parent\"\n" +
        "\tandroid:orientation=\"vertical\">\n" +
        "</LinearLayout>";
      expect( result ).toEqual( expected );
    });
});
