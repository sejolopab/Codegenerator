"use strict";
var utils = require( "../../../../utils" );
module.exports = {
  generate : function ( view ) {
    var layoutInit =
      "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
      "<LinearLayout\n" +
      "\txmlns:android=\"http://schemas.android.com/apk/res/android\"\n" +
      "\txmlns:tools=\"http://schemas.android.com/tools\"\n"+
      "\tandroid:layout_width=\"match_parent\"\n" +
      "\tandroid:layout_height=\"match_parent\"\n" +
      "\tandroid:orientation=\"vertical\"";
      if ( view.style ) {
        if ( view.style.background ) {
          layoutInit +=
            "\n\tandroid:background=\"" + utils.rgbToHex( view.style.background ) + "\"";
        }
      }
    layoutInit += ">\n";
    var layoutClose =  "</LinearLayout>";
    return {
      "name" : view.name,
      "open" : layoutInit,
      "content" : "",
      "close" : layoutClose
    };
  }
};
