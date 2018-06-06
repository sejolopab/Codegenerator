"use strict";
var utils = require( "../../../../utils" );
function _generate ( view, tabs ) {
  var layoutInit =
    tabs + "<LinearLayout\n" +
    tabs + "\tandroid:layout_width=" + view.width + "\n" +
    tabs + "\tandroid:layout_height=" + view.height + "\n" +
    tabs + "\tandroid:orientation=" + view.orientation;
  if ( view.marginTop ) {
    layoutInit += "\n" + tabs + "\tandroid:layout_marginTop= " + view.marginTop;
  }
  if ( view.style ) {
    if ( view.style.background ) {
      layoutInit +=
        "\n" + tabs + "\tandroid:background=\"" + utils.rgbToHex( view.style.background ) + "\"";
    }
  }
  layoutInit += ">\n";

  var layoutClose =  tabs + "</LinearLayout>\n";
  return {
    "name" : view.name,
    "open" : layoutInit,
    "content" : "",
    "close" : layoutClose
  };
}
module.exports = {
  generate : _generate
};
