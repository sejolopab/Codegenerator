"use strict";
var _ = require( "lodash" );
var utils = require( "../../../../utils" );
module.exports = {
  createTemplate : function ( button, tabs ) {
    var template =
      tabs + "<Button" +
      "\n" + tabs + "\tandroid:layout_width=" + button.width +
      "\n" + tabs + "\tandroid:layout_height=" + button.height;
    if ( !_.isNil( button.name ) ) {
      template +=
        "\n" + tabs + "\tandroid:id=\"@+id/" + button.name + "\"";
    }
    if ( !_.isNil( button.marginTop ) ) {
      template +=
        "\n" + tabs + "\tandroid:layout_marginTop=" + button.marginTop;
    }
    if ( !_.isNil( button.marginLeft ) ) {
      template +=
        "\n" + tabs + "\tandroid:layout_marginLeft=" + button.marginLeft;
    }
    if ( !_.isNil( button.marginRight ) ) {
      template +=
        "\n" + tabs + "\tandroid:layout_marginRight=" + button.marginRight;
    }
    if ( !_.isNil( button.text ) ) {
      template +=
        "\n" + tabs + "\tandroid:text=\"" + button.text + "\"";
    }
    if ( button.font ) {
      if ( !_.isNil( button.font.fontStyle ) ) {
        template +=
          "\n" + tabs + "\tandroid:textStyle=\"" + button.font.fontStyle + "\"";
      }
      if ( !_.isNil( button.font.fontSize ) ) {
        template +=
          "\n" + tabs + "\tandroid:textSize=\"" + button.font.fontSize + "dp\"";
      }
      if ( !_.isNil( button.font.fontColor ) ) {
        template +=
          "\n" + tabs + "\tandroid:textColor=\"" + utils.rgbToHex( button.font.fontColor ) + "\"";
      }
    }
    if ( button.style ) {
      if ( button.style.background ) {
        template +=
          "\n" + tabs + "\tandroid:background=\"" + utils.rgbToHex( button.style.background ) + "\"";
      }
    }
    return template + "/>\n";
  }
};
