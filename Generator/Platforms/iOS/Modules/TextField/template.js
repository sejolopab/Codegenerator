"use strict";
var utils = require( "../../../../utils" );
module.exports = {
  create : function ( textField, tabs ) {
     var template =
       tabs + "<textField opaque=\"NO\" clipsSubviews=\"YES\" contentMode=\"scaleToFill\" "+
          "fixedFrame=\"YES\" contentHorizontalAlignment=\"left\" "+
          "contentVerticalAlignment=\"center\" borderStyle=\"roundedRect\" "+
          "textAlignment=\"natural\" minimumFontSize=\"17\" "+
          "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"" + textField.name + "\">\n"+
       tabs + "\t<rect key=\"frame\" x=\"" + textField.position.x + "\" y=\"" +
          textField.position.y + "\" width=\"" + textField.position.width +
          "\" height=\"" + textField.position.height + "\"/>\n"+
       tabs + "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
       utils.getBackground( textField, tabs ) +
       this.getColor( textField, tabs )+
       this.getFont( textField, tabs ) +
       tabs + "\t<textInputTraits key=\"textInputTraits\"/>\n"+
       tabs + "</textField>\n";
     return template;
  },
  getColor : function ( textField, tabs ) {
    var result = "";
    if ( !textField.font.fontColor ) {
      result += tabs + "\t<nil key=\"textColor\"/>\n";
    } else {
      result += tabs + "\t<color key=\"textColor\" "+
          "red=\"" + textField.font.fontColor[0]/255 + "\" "+
          "green=\"" + textField.font.fontColor[1]/255 + "\" "+
          "blue=\"" + textField.font.fontColor[2]/255 + "\" alpha=\"1\" "+
          "colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n";
    }
    return result;
  },
  getFont : function ( textField, tabs ) {
    var result = tabs + "\t<fontDescription key=\"fontDescription\" ";
    if ( !textField.font.fontStyle || textField.font.fontStyle === "normal" ) {
      result += "type=\"system\" ";
    } else {
      var styles = textField.font.fontStyle.split( "|" );
      if ( styles.indexOf( "bold" ) > -1 && styles.indexOf( "italic" ) > -1 ) {
        result += "name=\"HelveticaNeue-BoldItalic\" family=\"Helvetica Neue\" ";
      } else if ( styles.indexOf( "italic" ) > -1 ) {
        result += "name=\"HelveticaNeue-Italic\" family=\"Helvetica Neue\" ";
      } else if ( styles.indexOf( "bold" ) > -1 ) {
        result += "name=\"HelveticaNeue-Bold\" family=\"Helvetica Neue\" ";
      } else {
        result += "type=\"system\" ";
      }
    }
    if ( !textField.font.fontSize ) {
      result += "pointSize=\"14\"/>\n";
    } else {
      result += "pointSize=\"" + textField.font.fontSize + "\"/>\n";
    }
    return result;
  }
};
