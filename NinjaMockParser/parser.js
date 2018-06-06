var fs = require('fs');
var path = require('path');
var filePath = path.join( __dirname, "./test.json" );
var parsedData = JSON.parse( fs.readFileSync( filePath, "utf8" ) );
var objectCounter = {
  "label" : 0,
  "editText" : 0,
  "button" : 0
}
// Result container
var newParser = {
  "appName" : parsedData.contents.appName,
  "platforms" : ["ios","android"],
  "views" : [],
  "transitions" : []
};
newParser.views = new Array(parsedData.contents.pages.length);
for ( var i = 0; i < newParser.views.length; i++ ) {
  var page = parsedData.contents.pages[i];
  newParser.views[i] = {
    "id" : page.id,
    "name" : page.name,
    "controller" : page.name + "Controller",
    "type" : "view",
    "position" : {
      "width" : page.children[0].panelProperties.properties.width,
      "height" : page.children[0].panelProperties.properties.height
    },
    "content" : []
  };
  if( page.children[0].properties["background.value"] ) {
    newParser.views[i].style = {
      "background" : getColor(page.children[0].properties["background.value"])
    };
  }
  var children = page.children[0].children;
  newParser.views[i].content = new Array( children.length );
  for ( var c = 0; c < children.length; c++ ) {
    switch ( children[c].type ) {
      case "sketch.ui.common.Label": {
        objectCounter.label++
        newParser.views[i].content[c] = {
          "name" : "label" + objectCounter.label,
          "type" : "label"
        };
        break;
      }
      case "sketch.framework.TemplatedElement":
        objectCounter.editText++
        newParser.views[i].content[c] = {
          "name" : "editText" + objectCounter.editText,
          "type" : "editText"
        };
        break;
      case "sketch.ui.android.ImageTextButton":
        objectCounter.button++;
        newParser.views[i].content[c] = {
          "name" : "button" + objectCounter.button,
          "type" : "button"
        };
        break;
      default:
    }
    if ( children[c].properties.text ) {
        newParser.views[i].content[c].text = children[c].properties.text;
    }
    newParser.views[i].content[c].position = {
      "x" : children[c].properties.left,
      "y" : children[c].properties.top,
      "width" : children[c].properties.width,
      "height" : children[c].properties.height
    }
    newParser.views[i].content[c].font = {
      "font" : "default",
      "fontStyle" : "nolmal"
    };
    if ( children[c].properties["font.size"] ) {
      newParser.views[i].content[c].font.fontSize =
        children[c].properties["font.size"];
    }
    if ( children[c].properties["font.color.value"] ) {
      newParser.views[i].content[c].font.fontColor =
        getColor(children[c].properties["font.color.value"]);
    }
    if ( children[c].properties.pageLink ) {
        var view =
          getViewName( parsedData.contents.pages,
              children[c].properties.pageLink );
        newParser.transitions.push({
          "name" :  "goto" + view.name,
          "destiny" : view.name,
          "origin" : page.name
        });
    }
  }
}
newParser.views[0].launcher = true;
printFile ( newParser );

function removeSpecialCharacters ( id ) {
  return id.replace(/[^a-zA-Z0-9]/g, '');
}

function getViewName ( views, id ) {
  for ( var v = 0; v < views.length; v++ ) {
    if ( views[v].id === id ) {
      return views[v];
    }
  }
  return null;
}

function printFile ( data ) {
  var savePath = path.join( __dirname, "./result.json" );
  var wstream = fs.createWriteStream( savePath );
      wstream.write( JSON.stringify( data ) );
      wstream.end();
}

function getColor(rgba) {
  console.log( rgba );
  var result = String(rgba);
  result = result.trim().split('(');
  result = String(result[1]).trim().split(',');
  result[3] = String(result[3]).split(')').join("");
  result.pop();
  for ( var i = 0; i < result.length; i ++) {
    result[i] = parseInt(result[i]);
  }
  console.log( result );
  return result;
}

//console.log(parsedData);
//console.log("");
//console.log(newParser);
