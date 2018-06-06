/**
 * viewMapper.js changes the positioning ( height, width, x, y ) recieved on
 * the json into valid parameters for xml ( match_parent, wrap_content, margin, padding)
 */
"use strict";
var _ = require( "lodash" );
var androidScreenWidth = 360;
// Screen Height = 520
var standard_margin = 32;
/**
 * Recieves the views of the aplication and restructures the content of each view
 * @param  {object} layouts Layout files
 * @return {object} Restructurated views
 */
function _fix ( layouts ) {
    for ( var l = 0; l < layouts.res.files.layout.length; l++ ) {
      var data = {
        "newContent" : [],
        "oldContent" : layouts.res.files.layout[l].content,
        "lastY" : standard_margin/2,
        "lastX" : 0
      };
      layouts.res.files.layout[l].content = this.map( data );
    }
    return layouts;
}
/**
 * Restructures the positioning of the content of an activity
 * @param  {object} layout Recieved activity
 * @return {object} New content for the activity
 */
function _map ( data ) {
  var coordinate1, coordinate2;
  for ( var cnt = 0; cnt < data.oldContent.length; cnt++ ) {
    if ( !data.oldContent[cnt].skip ) {
      var x = data.oldContent[cnt].position.x;
      var y = data.oldContent[cnt].position.y;
      var width = data.oldContent[cnt].position.width;
      var height  = data.oldContent[cnt].position.height;
      coordinate1 = [x,y];
      coordinate2 = [( x + width ),( y + height )];
      data = this.mapHorizontal( data, cnt, coordinate1, coordinate2 );
      if ( data.ifExist === false ) {
        data = this.mapVertical( data, cnt, coordinate1, coordinate2 );
      }
      data.lastY = coordinate2[1];
    }
  }
  return data.newContent;
}
/**
 * Search for all the content between two coordinates and creates the necesary
 * elements for android to position them horizontally
 * @param  {int} pos Activity position on the list
 * @param  {array} coordinate1 First coordinate
 * @param  {array} coordinate2 Second coordinate
 * @return {boolean} Returns true if there were more than one element between the recieved coordinates
 */
function _mapHorizontal ( data, pos, coordinate1, coordinate2 ) {
  var rowElements = [];
  var layout_y = data.oldContent[pos].position.y;
  for ( var cnt = pos; cnt < data.oldContent.length; cnt++ ) {
    if ( !data.oldContent[cnt].skip ) {
      if ( layout_y > data.oldContent[cnt].position.y ) {
        layout_y = data.oldContent[cnt].position.y;
      }
      var y = data.oldContent[cnt].position.y;
      var x = data.oldContent[cnt].position.x;
      if ( y >= coordinate1[1] && y < coordinate2[1] ) {
        data.oldContent[cnt].skip = true;
        var newElement = _.cloneDeep( data.oldContent[cnt] );
        var mLeft = x - data.lastX;
        if ( mLeft > 0 ) {
          newElement.marginLeft = "\"" + mLeft + "dp\"";
        }
        data.lastX = x + data.oldContent[cnt].position.width;
        newElement.width = "\"" + data.oldContent[cnt].position.width + "dp\"";
        newElement.height = "\"" + data.oldContent[cnt].position.height + "dp\"";
        delete newElement.position;
        rowElements.push( newElement );
      }
    }
  }
  if ( rowElements.length > 1 ) {
    var linearLayout = {
      "type" : "view",
      "width" : "\"match_parent\"",
      "height" : "\"wrap_content\"",
      "orientation" : "\"horizontal\"",
      "content" : rowElements
    };
    var mTop =  layout_y - data.lastY;
    if ( mTop > 0 ) {
      linearLayout.marginTop = "\"" + mTop + "dp\"";
    }
    data.newContent.push( linearLayout );
    data.lastX = 0;
    data.ifExist = true;
    return data;
  } else {
    data.lastX = 0;
    data.ifExist = false;
    return data;
  }
}
/**
 * Position one element on a view and adds margins if necesary
 * @param  {int} pos Activity position on the list
 * @param  {array} coordinate1 First coordinate
 * @param  {array} coordinate2 Second coordinate
 */
function _mapVertical ( data, pos, coordinate1, coordinate2 ) {
  var y = coordinate1[1];
  var x = coordinate1[0];
  var newElement = _.cloneDeep( data.oldContent[pos] );
  if ( newElement.type === "view" ) {
    var subData = {
      "newContent" : [],
      "oldContent" : data.oldContent[pos].content,
      "lastY" : y,
      "lastX" : x
    };
    newElement.content = this.map( subData );
  }
  var mTop =  y - data.lastY;
  if ( mTop > 0 ) {
    newElement.marginTop = "\"" + mTop + "dp\"";
  }
  data.lastY = coordinate2[1];
  var mLeft = x;
  if ( mLeft > 0 ) {
    newElement.marginLeft = "\"" + mLeft + "dp\"";
  }
  var mRight = androidScreenWidth - coordinate2[0];
  if ( mRight <= 5 ) {
    newElement.width = "\"match_parent\"";
    newElement.marginRight = "\""  + mRight + "dp\"";
  } else {
    newElement.width = "\""  + data.oldContent[pos].position.width + "dp\"";
  }
  if ( data.oldContent[pos].position.height < 30 ) {
    newElement.height = "\"wrap_content\"";
  } else {
    newElement.height = "\"" + data.oldContent[pos].position.height + "dp\"";
  }
  delete newElement.position;
  data.newContent.push( newElement );
  return data;
}
module.exports = {
  fix : _fix,
  map : _map,
  mapHorizontal : _mapHorizontal,
  mapVertical : _mapVertical
};
