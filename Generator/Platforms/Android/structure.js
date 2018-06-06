/**
 * structure.js restructure and fills the received data into a more manageable
 * and useful structure to create the code templates and final application
 */
"use strict";
var _ = require( "lodash" );
var map = require( "./viewMapper" );
var androidWidth = 360; // Nexus 5
var androidHeight = 560;
var codeGenWidth = 350;
var codeGenHeight = 600;
var standard_vertical_margin = 32;
var androidHeader = 30;
module.exports = {
  androidApp : {},
  /**
   *  Starts the restructure process
   * @param {object} data json input
   */
  create : function ( data ) {
    this.androidApp.appName = data.appName; // Application name
    this.androidApp.path = data.savePath;
    this.androidApp.java = { // Java files ( controllers )
      "path" : data.savePath + "/main/java/com/codeGenerator/" + data.appName + "/",
      "files" : []
    };
    this.addControllers( data ); // Add controllers to the new structure
    this.androidApp.res = { // Views data
      "path" : data.savePath + "/main/res/",
      "files" : {
        "layout" : [], // Views
        "values" : {}  // Rsesource data ( icons, strings, etc )
      }
    };
    this.addValues( data );
    this.addLayouts( data );
    this.androidApp = map.fix( this.androidApp );
    this.androidApp.manifest = { // add manifest
      "path" : data.savePath + "/main/AndroidManifest.xml",
      "package" : "com.codeGenerator." + data.appName,
      "application" : {
        "allowBackup" : true,
        "icon" : "@mipmap/ic_launcher",
        "label" : "@string/app_name",
        "supportsRtl" : "true",
        "theme" : "@style/AppTheme",
        "views" : [] // activities
      }
    };
    this.addManifest( data.views ); // Add activities to the manifest
  },
  /**
   * Adds the controller to the new data structure
   * @param {object} data Input json data
   */
  addControllers : function ( data ) {
    var methods; // controller methods
    for ( var v = 0; v < data.views.length; v++ ) { // Create a controller for each view
      methods = [];
      // Make first letter of the controller uppercase ( android standard )
      var className = data.views[v].name.charAt( 0 ).toUpperCase() + data.views[v].name.slice( 1 );
      // Controller saving Path
      var path = this.androidApp.java.path + className+ ".java";
      for ( var t = 0; t < data.transitions.length; t++ ) { // Search the controller methods on the transitions segment
        var tempMethod; // Methods of the new controller
        if ( data.transitions[t].origin === data.views[v].name ) {
          // Make first letter of the destiny name uppercase  ( android standard )
          var destiny = data.transitions[t].destiny.charAt( 0 ).toUpperCase() + data.transitions[t].destiny.slice( 1 );
          tempMethod = { // App all transitions of recieved view
            "name" : data.transitions[t].name, // Method id
            "calls" : this.getCalls( data.views[v], data.transitions[t].name ), // Calls to this transition
            "destiny" : destiny
          };
          methods.push( tempMethod ); // Add new methods to the controller methods
        }
      }
      this.androidApp.java.files.push({ // Save new controller
          "path" : path,
          "methods" : methods,
          "className" : className
      });
    }
  },
  /**
   * Searches for all the view elements inside an activity calling the same transition
   * @param {object} view Searched activity
   * @param {string} transition Called transition
   */
  getCalls : function ( view, transition ) {
    var calls = [];
    for ( var c = 0; c < view.content.length; c++ ) {
      if ( view.content[c].onTap ) {
        if ( view.content[c].onTap === transition ) {
          calls.push({
            "elementName" : view.content[c].name,
            "elementType" : view.content[c].type
          });
        }
      }
    }
    return calls;
  },
  /**
   * Adds android standard values files data to the new structure
   * @param {object} data Input json data
   */
  addValues : function ( data ) {
    this.androidApp.res.files.values = {
      "colors" : [
        {
          "name" : "colorPrimary",
          "color" : "#3F51B5"
        },
        {
          "name" : "colorPrimaryDark",
          "color" : "#303F9F"
        },
        {
          "name" : "colorAccent",
          "color" : "#FF4081"
        }
      ],
      "dimens" : [
        {
          "name" : "activity_horizontal_margin",
          "dimen" : "16dp"
        },
        {
          "name" : "activity_vertical_margin",
          "dimen" : "16dp"
        }
      ],
      "strings" : [
        {
          "name" : "app_name",
          "value" : data.appName
        }
      ],
      "styles" : [
        {
          "name" : "AppTheme",
          "parent" : "Theme.AppCompat.Light.DarkActionBar",
          "items" : [
            {
              "name" : "colorPrimary",
              "color" : "@color/colorPrimary"
            },
            {
              "name" : "colorPrimaryDark",
              "color" : "@color/colorPrimaryDark"
            },
            {
              "name" : "colorAccent",
              "color" : "@color/colorAccent"
            }
          ]
        }
      ]
    };
  },
  /**
   * Adds layouts to the new structure
   * @param  {object} data Input json data
   */
  addLayouts : function ( data ) {
    var newLayout = {};
    for ( var v = 0; v < data.views.length; v++ ) {
      codeGenHeight = data.views[v].position.height;
      codeGenWidth  = data.views[v].position.width;
      var name = "activity_" + data.views[v].name.toLowerCase(); // XML files must be on lower case
      var path = this.androidApp.res.path + "layout/" + name + ".xml"; // Layout saving path
      newLayout = {
        "path" : path,
        "name" : name,
        "height" : androidHeight,
        "width" : androidWidth,
        "x"      : 0,
        "y"      : 0,
        "controller" : data.views[v].controller,
        "content" : []
      };
      if ( data.views[v].style ) {
        newLayout.style = data.views[v].style;
      }
      if ( data.views[v].content ) {
        if ( data.views[v].content.length !== 0 ) {
          for ( var c = 0; c < data.views[v].content.length; c++ ) {
            newLayout.content.push( this.addContent( data.views[v].content[c] ) );
          }
        }
      }
      this.androidApp.res.files.layout.push( newLayout );
    }
  },
  /**
   * Updates the x, y, height and width to the approximate values on a android application
   * @param  {object} element Input element
   * @return {object} Element with updated x, y, height and width
   */
  addContent : function ( element ) {
    var newElement = element;
    if ( !_.isNil( newElement.text ) ) {
      var name = newElement.text.replace( / /g,"_" );
      newElement.text = "@string/" + name;
      this.androidApp.res.files.values.strings.push({
        "name" : name,
        "value" : name
      });
    }
    newElement.position = {
      "height" : ~~( ( parseInt( element.position.height ) * ( androidHeight - androidHeader - standard_vertical_margin ) ) / codeGenHeight ),
      "width"  : ~~( parseInt( element.position.width ) * androidWidth / codeGenWidth ),
      "x"      : ~~( parseInt( element.position.x ) * androidWidth / codeGenWidth ),
      "y"      : ~~( ( parseInt( element.position.y ) * ( androidHeight - androidHeader - standard_vertical_margin ) ) / codeGenHeight ),
    };
    if ( newElement.content ) {
      if ( newElement.type === "view" && _.isNil( newElement.orientation ) ) {
        newElement.orientation = "\"vertical\"";
      }
      if ( newElement.content.length !== 0 ) {
        var layoutContent = [];
        for ( var c = 0; c < newElement.content.length; c++ ) {
          layoutContent.push( this.addContent( newElement.content[c] ) );
        }
        newElement.content = layoutContent;
      }
    }
    return newElement;
  },
  /**
   * Adds the manifest to the new structure
   * @param {object} data Input json data
   */
  addManifest : function ( views ) {
    var viewsList = [];
    var isLauncher;
    for ( var v = 0; v < views.length; v++ ) {
      isLauncher = views[v].launcher ? true : false;
      // Make first letter of name uppercase
      var viewName = views[v].name.charAt( 0 ).toUpperCase() + views[v].name.slice( 1 );
      viewsList.push({
        "name" : viewName,
        "launcher" : isLauncher
      });
    }
    this.androidApp.manifest.application.views = viewsList;
  }
};
