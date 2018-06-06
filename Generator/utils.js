"use strict";
module.exports = {
  componentToHex : function ( c ) {
    var hex = c.toString( 16 );
    return hex.length === 1 ? "0" + hex : hex;
  },
  rgbToHex : function ( rgb ) {
    return "#" + this.componentToHex( rgb[0] ) + this.componentToHex( rgb[1] ) + this.componentToHex( rgb[2] );
  },
  /**
   * Recieves a number and returns a string of tabs
   * @param {int} tabs number of tabs wanted
   */
  getTabs : function ( tabs ) {
    var result = "";
    for ( var x = 0; x < tabs; x++ ) {
      result += "\t";
    }
    return result;
  },
  /**
  * Concatenates an object into a string
  * @param {object} stream Variable with the code of the layout
  */
  concatStream : function( stream ) {
   var newStream = stream.open;
   for ( var i = 0; i < stream.content.length; i++ ) {
     newStream += stream.content[i];
   }
   newStream += stream.close;
   return newStream;
 },
 /**
  * Add background color to a view element
  * @param {object} element view element
  * @param {string} tabs tabs storage
  */
 getBackground : function ( element, tabs ) {
   var result = "";
   if ( element.style ) {
     if ( element.style.background ) {
       result +=
         tabs + "\t\t\t\t<color key=\"backgroundColor\" red=\"" + element.style.background[0]/255 + "\" "+
         "green=\"" + element.style.background[1]/255 + "\" blue=\"" + element.style.background[2]/255 + "\" "+
         "alpha=\"1\" colorSpace=\"custom\" customColorSpace=\"sRGB\"/>\n";
     }
   }
   return result;
 },
 /**
  * Adds the common properties of a android xml element
  * @param {object} element view element
  * @param {string} tabs tabs storage
  */
 getAndroidProperties : function ( element, tabs ) {
   var template = "";
   if ( !_.isNil( element.name ) ) {
     template +=
       "\n" + tabs + "\tandroid:id=\"@+id/" + element.name + "\"";
   }
   if ( !_.isNil( element.marginTop ) ) {
     template +=
       "\n" + tabs + "\tandroid:layout_marginTop=" + element.marginTop;
   }
   if ( !_.isNil( element.marginLeft ) ) {
     template +=
       "\n" + tabs + "\tandroid:layout_marginLeft=" + element.marginLeft;
   }
   if ( !_.isNil( element.marginRight ) ) {
     template +=
       "\n" + tabs + "\tandroid:layout_marginRight=" + element.marginRight;
   }
   if ( !_.isNil( element.text ) ) {
     template +=
       "\n" + tabs + "\tandroid:text=\"" + element.text + "\"";
   }
   if ( element.font ) {
     if ( !_.isNil( element.font.fontStyle ) ) {
       template +=
         "\n" + tabs + "\tandroid:textStyle=\"" + element.font.fontStyle + "\"";
     }
     if ( !_.isNil( element.font.fontSize ) ) {
       template +=
         "\n" + tabs + "\tandroid:textSize=\"" + element.font.fontSize + "dp\"";
     }
     if ( !_.isNil( element.font.fontColor ) ) {
       template +=
         "\n" + tabs + "\tandroid:textColor=\"" + utils.rgbToHex( element.font.fontColor ) + "\"";
     }
   }
   if ( element.style ) {
     if ( element.style.background ) {
       template +=
         "\n" + tabs + "\tandroid:background=\"" + utils.rgbToHex( element.style.background ) + "\"";
     }
   }
   return template;
 }
};
