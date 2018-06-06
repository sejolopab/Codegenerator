"use strict";
var utils = require( "../../../../utils" );
module.exports = {
  create : function ( scene, appname, canvasX, canvasY, tabs ) {
    var open =
      tabs + "<!--" + scene.name + "-->\n"+
      tabs + "<scene sceneID=\"" + scene.name + "\">\n" +
      tabs + "\t<objects>\n"+
      tabs + "\t\t<viewController id=\"" + scene.controller + "\" customClass=\"" + scene.controller + "\" customModule=\"" + appname + "\" customModuleProvider=\"target\" sceneMemberID=\"viewController\">\n"+
      tabs + "\t\t\t<layoutGuides>\n"+
      tabs + "\t\t\t\t<viewControllerLayoutGuide type=\"top\" id=\"" + scene.name + "TopGuide" + "\"/>\n"+
      tabs + "\t\t\t\t<viewControllerLayoutGuide type=\"bottom\" id=\"" + scene.name + "BotGuide" + "\"/>\n"+
      tabs + "\t\t\t</layoutGuides>\n"+
      tabs + "\t\t\t<view key=\"view\" contentMode=\"scaleToFill\" id=\"" + scene.name + "View" + "\">\n"+
      tabs + "\t\t\t\t<rect key=\"frame\" x=\"0.0\" y=\"0.0\" width=\"375\" height=\"667\"/>\n"+
      tabs + "\t\t\t\t<autoresizingMask key=\"autoresizingMask\" widthSizable=\"YES\" heightSizable=\"YES\"/>\n"+
      tabs + "\t\t\t\t<subviews>\n";

    var close =
      tabs + "\t\t\t\t</subviews>\n"+
      utils.getBackground( scene, tabs ) +
      tabs + "\t\t\t</view>\n"+
      this.addConnections( tabs + "\t\t\t", scene ) +
      tabs + "\t\t</viewController>\n"+
      tabs + "\t\t<placeholder placeholderIdentifier=\"IBFirstResponder\" id=\"" + scene.name + "PlaceHolder" + "\" sceneMemberID=\"firstResponder\"/>\n"+
      tabs + "\t</objects>\n"+
      tabs + "\t<point key=\"canvasLocation\" x=\"" + canvasX + "\" y=\"" + canvasY + "\"/>\n"+
      tabs + "</scene>\n";

    return {
      "open" : open,
      "body" : [],
      "close" : close
    };
  },
  addConnections : function ( tabs, scene ) {
    var result = "";
    for ( var i = 0; i < scene.connections.length; i++ ) {
      switch ( scene.connections[i].type ) {
        case "label":
          result += tabs + "\t<outlet property=\"" + scene.connections[i].name + "\" destination=\"" + scene.connections[i].name + "\" id=\"" + scene.connections[i].name + "Con\"/>\n";
          break;
        case "textField":
          result += tabs + "\t<outlet property=\"" + scene.connections[i].name + "\" destination=\"" + scene.connections[i].name + "\" id=\"" + scene.connections[i].name + "Con\"/>\n";
          break;
        case "button":
          result += tabs + "\t<segue destination=\"" + scene.connections[i].data.destiny + "\" kind=\"show\" identifier=\"" + scene.connections[i].data.name + "\" id=\"" + scene.connections[i].data.name + "Con\"/>\n";
          break;
      }
    }
    if ( result !== "" ) {
      result = tabs + "<connections>\n" + result + tabs + "</connections>\n";
    }
    return result;
  }
};
