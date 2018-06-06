"use strict";
var utils = require( "../../../../utils" );
module.exports = {
  create : function ( button, connection, tabs ) {
     var template =
      tabs + "<button opaque=\"NO\" contentMode=\"scaleToFill\" fixedFrame=\"YES\" "+
          "contentHorizontalAlignment=\"center\" contentVerticalAlignment=\"center\" "+
          "buttonType=\"roundedRect\" lineBreakMode=\"middleTruncation\" "+
          "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\""+ button.name +"\">\n"+
      tabs + "\t<rect key=\"frame\" x=\"" + button.position.x + "\" y=\"" +
          button.position.y + "\" width=\"" + button.position.width +
          "\" height=\"" + button.position.height+ "\"/>\n"+
      tabs + "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
      utils.getBackground( button, tabs ) +
      this.getFont( button, tabs ) +
      this.getState( button, tabs ) +
      tabs + "\t<connections>\n"+
      tabs + "\t\t<action selector=\"" + connection.data.name + ":\" " +
          "destination=\"" + connection.data.origin + "\" "+
          "eventType=\"touchUpInside\" id=\"" + button.name + "action\"/>\n"+
      tabs + "\t</connections>\n"+
      tabs + "</button>\n";
     return template;
  },
  createSimple : function ( button, tabs ) {
     var template =
      tabs + "<button opaque=\"NO\" contentMode=\"scaleToFill\" fixedFrame=\"YES\" "+
          "contentHorizontalAlignment=\"center\" contentVerticalAlignment=\"center\" "+
          "buttonType=\"roundedRect\" lineBreakMode=\"middleTruncation\" "+
          "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\""+ button.name +"\">\n"+
      tabs + "\t<rect key=\"frame\" x=\"" + button.position.x + "\" y=\"" +
          button.position.y + "\" width=\"" + button.position.width +
          "\" height=\"" + button.position.height+ "\"/>\n"+
      tabs + "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
      utils.getBackground( button, tabs ) +
      this.getFont( button, tabs ) +
      this.getState( button, tabs ) +
      tabs + "</button>\n";
     return template;
  },
  getState : function ( button, tabs ) {
    var result = "";
    if ( !button.font.fontColor ) {
      result += tabs + "\t<state key=\"normal\" title=\"" + this.getText( button ) + "\"/>\n";
    } else {
      result +=
        tabs + "\t<state key=\"normal\" title=\"" + this.getText( button ) + "\">\n"+
        tabs + "\t\t<color key=\"titleColor\" red=\"" + button.font.fontColor[0]/255 +
            "\" green=\"" + button.font.fontColor[1]/255 + "\" blue=\"" +
            button.font.fontColor[2]/255 + "\" alpha=\"1\" colorSpace=\"custom\" "+
            "customColorSpace=\"sRGB\"/>\n"+
        tabs + "\t</state>\n";
    }
    return result;
  },
  getText : function ( button ) {
    if ( button.text ) {
      return button.text;
    } else {
      return "Button";
    }
  },
  getFont : function ( button, tabs ) {
    var result = tabs + "\t<fontDescription key=\"fontDescription\" ";
    if ( !button.font.fontStyle ) {
      result += "type=\"system\" ";
    } else {
      var styles = button.font.fontStyle.split( "|" );
      if ( styles.indexOf( "bold" ) > -1 && styles.indexOf( "italic" ) > -1 ) {
        result += "name=\"HelveticaNeue-BoldItalic\" family=\"Helvetica Neue\" ";
      } else if ( styles.indexOf( "italic" ) > -1 ) {
        result += "name=\"HelveticaNeue-Italic\" family=\"Helvetica Neue\" ";
      } else if ( styles.indexOf( "bold" ) > -1 ) {
        result += "name=\"HelveticaNeue-Bold\" family=\"Helvetica Neue\" ";
      }
    }
    if ( !button.font.fontSize ) {
      result += "pointSize=\"17\"/>\n";
    } else {
      result += "pointSize=\"" + button.font.fontSize + "\"/>\n";
    }
    return result;
  }
};
