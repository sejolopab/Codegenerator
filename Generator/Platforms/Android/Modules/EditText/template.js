"use strict";
var _ = require( "lodash" );
var utils = require( "../../../../utils" );
module.exports = {
  createTemplate : function ( editText, tabs ) {
    var template =
      tabs + "<EditText" +
      "\n" + tabs + "\tandroid:layout_width=" + editText.width +
      "\n" + tabs + "\tandroid:layout_height=" + editText.height;
    if ( !_.isNil( editText.name ) ) {
      template +=
        "\n" + tabs + "\tandroid:id=\"@+id/" + editText.name + "\"";
    }
    if ( !_.isNil( editText.marginTop ) ) {
      template +=
        "\n" + tabs + "\tandroid:layout_marginTop=" + editText.marginTop;
    }
    if ( !_.isNil( editText.marginLeft ) ) {
      template +=
        "\n" + tabs + "\tandroid:layout_marginLeft=" + editText.marginLeft;
    }
    if ( !_.isNil( editText.marginRight ) ) {
      template +=
        "\n" + tabs + "\tandroid:layout_marginRight=" + editText.marginRight;
    }
    if ( !_.isNil( editText.text ) ) {
      template +=
        "\n" + tabs + "\tandroid:text=\"" + editText.text + "\"";
    }
    if ( editText.font ) {
      if ( !_.isNil( editText.font.fontStyle ) ) {
        template +=
          "\n" + tabs + "\tandroid:textStyle=\"" + editText.font.fontStyle + "\"";
      }
      if ( !_.isNil( editText.font.fontSize ) ) {
        template +=
          "\n" + tabs + "\tandroid:textSize=\"" + editText.font.fontSize + "dp\"";
      }
      if ( !_.isNil( editText.font.fontColor ) ) {
        template +=
          "\n" + tabs + "\tandroid:textColor=\"" + utils.rgbToHex( editText.font.fontColor ) + "\"";
      }
    }
    if ( editText.style ) {
      if ( editText.style.background ) {
        template +=
          "\n" + tabs + "\tandroid:background=\"" + utils.rgbToHex( editText.style.background ) + "\"";
      }
    }
    return template + "/>\n";
  }
};
