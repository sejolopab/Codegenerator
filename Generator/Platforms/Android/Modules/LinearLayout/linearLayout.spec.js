"use strict";
describe( "LinearLayout", function () {
    var activity;
    var eHandler;
    var data;
    var expected;
    beforeEach( function () {
      data = {
        "height" : "wrap_parent",
        "width" : "match_parent",
        "orientation" : "horizontal",
        "marginTop" : "15dp",
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
      var result = activity.generate ( data, 1 );
      expected =
        "\t<LinearLayout\n" +
        "\t\tandroid:layout_width=" + "match_parent" + "\n" +
        "\t\tandroid:layout_height=" + "wrap_parent" + "\n" +
        "\t\tandroid:orientation=" + "horizontal" + "\n" +
        "\t\tandroid:layout_marginTop= " + "15dp" + ">\n" +
        "\t</LinearLayout>\n";
      expect( result ).toEqual( expected );
    });
});
