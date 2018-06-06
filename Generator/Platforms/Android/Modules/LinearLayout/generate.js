/**
* Manages the construction and validation of LinearLayouts tamplates
*/
"use strict";
exports.inject = function ( eHandler ) {
  var button = require( "../Button/generate" );
  var label = require( "../Label/generate" );
  var editText = require( "../EditText/generate" );
  var layoutTemplate = require( "./template" );
  var utils = require( "../../../../utils" );
  /**
  * Generates the code for the layout and it's content
  * @param {object} layout Contains the data for the layout
  */
  function _generate ( layout, tabs ) {
   var stream = layoutTemplate.generate( layout, utils.getTabs( tabs ) );
   for ( var c = 0; c < layout.content.length; c++ ) {
     stream = this.identifyAndGenerate( layout.content[c], stream, tabs + 1 );
   }
   var newStream = utils.concatStream ( stream );
   return newStream;
  }
  /**
  * Identifies an element of the layout and call the corresponding module to generate the code
  * @param  {object} element Content of the layout
  * @param  {object} stream  Contains the generated code
  * @return {object} Code of the layout
  */
  function _identifyAndGenerate ( element, stream, tabs ) {
   switch ( element.type ) {
     case "linearLayout":
       stream.content += this.generate( element, tabs );
       break;
     case "button":
       stream.content += button.generate( element, tabs );
       break;
     case "label":
       stream.content += label.generate( element, tabs );
       break;
     case "editText":
       stream.content += editText.generate( element, tabs );
       break;
     default:
       eHandler.error({
         "name" : "Android codeGenerator failed",
         "description" : "Type element undefined"
       });
   }
   return stream;
 }
  return {
   generate : _generate,
   identifyAndGenerate : _identifyAndGenerate
  };
 };
