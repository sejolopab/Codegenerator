/**
 * Manages the construction and validation of an Activity template
 */
"use strict";
exports.inject = function ( eHandler ) {
  var button = require( "../Button/generate" );
  var label = require( "../Label/generate" );
  var editText = require( "../EditText/generate" );
  var linearLayout = require( "../LinearLayout/generate" ).inject( eHandler );
  var template = require( "./template" );
  var tabs = 1;
  /**
   * Generates the code for the activity and it's content
   * @param {object} activity Contains the data for the activity
   */
  function _generate ( activity ) {
    var stream = template.generate( activity );
    for ( var c = 0; c < activity.content.length; c++ ) {
      stream = this.identifyAndGenerate( activity.content[c], stream );
    }
    var newStream = this.concatStream ( stream );
    return newStream;
  }
  /**
   * Identifies an element of the activity and call the corresponding module to generate the code
   * @param  {object} element Content of the activity
   * @param  {object} stream  Contains the generated code
   * @return {object} Code of the activity
   */
  function _identifyAndGenerate ( element, stream ) {
    switch ( element.type ) {
      case "view":
        stream.content += linearLayout.generate( element, tabs );
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
  /**
   * Concatenates an object into a string
   * @param  {object} stream Variable with the code of the activity
   * @return {string} Result
   */
  function _concatStream ( stream ) {
    var newStream = stream.open;
    for ( var i = 0; i < stream.content.length; i++ ) {
      newStream += stream.content[i];
    }
    newStream += stream.close;
    return newStream;
  }
  return {
    generate : _generate,
    identifyAndGenerate : _identifyAndGenerate,
    concatStream : _concatStream
  };
};
