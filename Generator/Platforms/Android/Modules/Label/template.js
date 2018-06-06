"use strict";
var _ = require( "lodash" );
var utils = require( "../../../../utils" );
module.exports = {
  createTemplate : function ( textView, tabs ) {
    var template =
      tabs + "<TextView" +
      "\n" + tabs + "\tandroid:layout_width=" + textView.width +
      "\n" + tabs + "\tandroid:layout_height=" + textView.height;
    if ( !_.isNil( textView.name ) ) {
      template +=
        "\n" + tabs + "\tandroid:id=\"@+id/" + textView.name + "\"";
    }
    if ( !_.isNil( textView.marginTop ) ) {
      template +=
        "\n" + tabs + "\tandroid:layout_marginTop=" + textView.marginTop;
    }
    if ( !_.isNil( textView.marginLeft ) ) {
      template +=
        "\n" + tabs + "\tandroid:layout_marginLeft=" + textView.marginLeft;
    }
    if ( !_.isNil( textView.marginRight ) ) {
      template +=
        "\n" + tabs + "\tandroid:layout_marginRight=" + textView.marginRight;
    }
    if ( !_.isNil( textView.text ) ) {
      template +=
        "\n" + tabs + "\tandroid:text=\"" + textView.text + "\"";
    }
    if ( textView.font ) {
      if ( !_.isNil( textView.font.fontStyle ) ) {
        template +=
          "\n" + tabs + "\tandroid:textStyle=\"" + textView.font.fontStyle + "\"";
      }
      if ( !_.isNil( textView.font.fontSize ) ) {
        template +=
          "\n" + tabs + "\tandroid:textSize=\"" + textView.font.fontSize + "dp\"";
      }
      if ( !_.isNil( textView.font.fontColor ) ) {
        template +=
          "\n" + tabs + "\tandroid:textColor=\"" + utils.rgbToHex( textView.font.fontColor ) + "\"";
      }
    }
    if ( textView.style ) {
      if ( textView.style.background ) {
        template +=
          "\n" + tabs + "\tandroid:background=\"" + utils.rgbToHex( textView.style.background ) + "\"";
      }
    }
    return template + "/>\n";
  }
};
