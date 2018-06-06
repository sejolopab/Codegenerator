"use strict";
module.exports = {
  generateColors : function ( colors ) {
    var template =
      "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
      "<resources>\n";
    for ( var c = 0; c < colors.length; c ++ ) {
      template +=
        "\t<color name=\"" + colors[c].name + "\">" + colors[c].color + "</color>\n";
    }
    template += "</resources>\n";
    return template;
  },
  generateDimens : function ( dimens ) {
    var template =  "<resources>\n";
    for ( var d = 0; d < dimens.length; d ++ ) {
      template +=
        "\t<dimen name=\"" + dimens[d].name + "\">" + dimens[d].dimen + "</dimen>\n";
    }
    template += "</resources>\n";
    return template;
  },
  generateStyles : function ( styles ) {
    var template = "<resources>\n";
    for ( var s = 0; s < styles.length; s ++ ) {
      template += "\t<style name=\"" + styles[s].name + "\" parent=\"" + styles[s].parent + "\">\n";
      for ( var i = 0; i < styles[s].items.length; i++ ) {
        template +=
        "\t\t<item name=\"" + styles[s].items[i].name + "\">" + styles[s].items[i].color + "</item>\n";
      }
      template += "\t</style>\n";
    }
    template += "</resources>\n";
    return template;
  },
  generateStrings : function ( strings ) {
    var template = "<resources>\n";
    for ( var s = 0; s < strings.length; s ++ ) {
      template +=
        "\t<string name=\"" + strings[s].name + "\">" + strings[s].value + "</string>\n";
    }
    template += "</resources>\n";
    return template;
  }
};
