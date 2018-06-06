"use strict";
var utils = require( "../../../../utils" );
module.exports = {
  create : function ( label, tabs ) {
    console.log( label );
     var template =
       tabs + "<label opaque=\"NO\" userInteractionEnabled=\"NO\" "+
          "contentMode=\"left\" horizontalHuggingPriority=\"251\" "+
          "verticalHuggingPriority=\"251\" fixedFrame=\"YES\" text=\"" +
          this.getText( label ) + "\" textAlignment=\"natural\" "+
          "lineBreakMode=\"tailTruncation\" baselineAdjustment=\"alignBaselines\" "+
          "adjustsFontSizeToFit=\"NO\" translatesAutoresizingMaskIntoConstraints=\"NO\" "+
          "id=\"" + label.name + "\">\n"+
       tabs + "\t<rect key=\"frame\" x=\"" + label.position.x + "\" y=\"" + label.position.y +
          "\" width=\"" + label.position.width + "\" height=\"" + label.position.height + "\"/>\n"+
       tabs + "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
       utils.getBackground( label, tabs ) +
       this.getFont( label, tabs ) +
       this.getColor( label, tabs ) +
       tabs + "\t<nil key=\"highlightedColor\"/>\n"+
       tabs + "</label>\n";
    console.log(".................");
    console.log( template );
    console.log(".................");
     return template;
  },
  getColor : function ( label, tabs ) {
    var result = "";
    if ( !label.font.fontColor ) {
      result += tabs + "\t<nil key=\"textColor\"/>\n";
    } else {
      result += tabs + "\t<color key=\"textColor\" "+
          "red=\"" + label.font.fontColor[0]/255 + "\" "+
          "green=\"" + label.font.fontColor[1]/255 + "\" "+
          "blue=\"" + label.font.fontColor[2]/255 + "\" alpha=\"1\" "+
          "colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n";
    }
    return result;
  },
  getText : function ( label ) {
    if ( label.text ) {
      return label.text;
    } else {
      return "Label";
    }
  },
  getFont : function ( label, tabs ) {
    var result = tabs + "\t<fontDescription key=\"fontDescription\" ";
    if ( !label.font.fontStyle ) {
      result += "type=\"system\" ";
    } else {
      var styles = label.font.fontStyle.split( "|" );
      if ( styles.indexOf( "bold" ) > -1 && styles.indexOf( "italic" ) > -1 ) {
        result += "name=\"HelveticaNeue-BoldItalic\" family=\"Helvetica Neue\" ";
      } else if ( styles.indexOf( "italic" ) > -1 ) {
        result += "name=\"HelveticaNeue-Italic\" family=\"Helvetica Neue\" ";
      } else if ( styles.indexOf( "bold" ) > -1 ) {
        result += "name=\"HelveticaNeue-Bold\" family=\"Helvetica Neue\" ";
      }
    }
    if ( !label.font.fontSize ) {
      result += "pointSize=\"17\"/>\n";
    } else {
      result += "pointSize=\"" + label.font.fontSize + "\"/>\n";
    }
    return result;
  }
};
