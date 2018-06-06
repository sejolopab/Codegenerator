"use strict";
var utils = require( "../../../../utils" );
module.exports = {
  create : function ( view, tabs ) {
    var open =
      tabs + "<view contentMode=\"scaleToFill\" fixedFrame=\"YES\" "+
          "translatesAutoresizingMaskIntoConstraints=\"NO\" id=\"" + view.name + "\">\n"+
      tabs + "\t<rect key=\"frame\" x=\"" + view.position.x + "\" y=\"" + view.position.y + "\" "+
          "width=\"" + view.position.width + "\" height=\"" + view.position.height + "\"/>\n"+
      tabs + "\t<autoresizingMask key=\"autoresizingMask\" flexibleMaxX=\"YES\" flexibleMaxY=\"YES\"/>\n"+
      tabs + "\t<subviews>\n";
    var close =
      tabs + "\t</subviews>\n"+
      utils.getBackground( view, tabs ) +
      tabs + "</view>\n";
    return {
      "open" : open,
      "body" : "",
      "close" : close
    };
  }
};
