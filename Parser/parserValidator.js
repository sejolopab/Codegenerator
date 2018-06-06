"use strict";
var _ = require( "lodash" );
exports.inject = function ( eHandler ) {

  var undefinedError = " is undefined";
  var missingError = "A required parameter is missing";
  var ok = true;
  var error = false;
  var recordTrasitions = [];

  function _checkMe ( parsedJson ) {
    if ( _.isNil( parsedJson.appName ) ) {
      eHandler.error({
        "name" : "appName" + undefinedError,
        "description" : "request does not have an appName"
      });
      return error;
    }
    if ( _.isNil( parsedJson.savePath ) ) {
      eHandler.error({
        "name" : "savePath" + undefinedError,
        "description" : "request does not have a save destination"
      });
      return error;
    }
    if ( _.isEmpty( parsedJson.views ) ) {
      eHandler.error({
        "name" : "views" + undefinedError,
        "description" : "request does not have views in it"
      });
      return error;
    }
    if ( parsedJson.views.length !== 0 ) {
      for ( var i = 0; i < parsedJson.views.length; i++ ) {
        if ( !this.check( parsedJson.views[i], false ) ) {
          return error;
        }
      }
    }
    if ( parsedJson.transitions.length !== 0 ) {
      for ( var j = 0; j < parsedJson.transitions.length; j++ ) {
        if ( !this.checkTransition( parsedJson.transitions[j] ) ) {
          return error;
        }
      }
    }
    if ( recordTrasitions.length !== 0 ) {
      if ( !this.checkTransitionCalls ( parsedJson.transitions ) ) {
        return error;
      }
    }
    return ok;
  }
  function _checkTransitionCalls ( transitions ) {
    for ( var t = 0; t < transitions.length; t++ ) {
      if ( recordTrasitions.indexOf( transitions[t].name ) === -1 ) {
        eHandler.error({
          "name" : "transition" + undefinedError,
          "description" : "view element calls an undefined transition"
        });
        return error;
      }
    }
    return ok;
  }
  function _check ( element, nested ) {
    if ( element.type ) {
      if ( element.type === "view" && !nested ) {
        return this.checkView( element );
      } else {
        return this.checkViewElement( element );
      }
    } else {
      eHandler.error({
        "name" : missingError,
        "description" : element.name + " needs a type value"
      });
      return error;
    }
  }
  function _checkView ( view ) {
    if ( !view.position.height ) {
      eHandler.error({
        "name" : missingError,
        "description" : view.name + " view needs a height"
      });
      return error;
    }
    if ( !view.position.width ) {
      eHandler.error({
        "name" : missingError,
        "description" : view.name + " view needs a width"
      });
      return error;
    }
    if ( !view.controller ) {
      eHandler.error({
        "name" : missingError,
        "description" : view.name + " view needs a controller"
      });
      return error;
    }
    if ( view.content ) {
      if ( view.content.length !== 0 ) {
        for ( var i = 0; i < view.content.length; i++ ) {
          if ( !this.check( view.content[i], true ) ) {
            return error;
          }
        }
      }
    }
    return ok;
  }
  function _checkViewElement ( element ) {
    if ( !_.isNil( element.onTab ) ) {
      recordTrasitions.push( element.onTab );
    }
    if ( !element.position ) {
      eHandler.error({
        "name" : missingError,
        "description" : element.name + " needs a position"
      });
      return error;
    }
    if ( !element.position.x ) {
      eHandler.error({
        "name" : missingError,
        "description" : element.name + " needs position x"
      });
      return error;
    }
    if ( !element.position.y ) {
      eHandler.error({
        "name" : missingError,
        "description" : element.name + " needs position y"
      });
      return error;
    }
    if ( !element.position.height ) {
      eHandler.error({
        "name" : missingError,
        "description" : element.name + " needs a height"
      });
      return error;
    }
    if ( !element.position.width ) {
      eHandler.error({
        "name" : missingError,
        "description" : element.name + " needs a width"
      });
      return error;
    }
    if ( !element.type ) {
      eHandler.error({
        "name" : missingError,
        "description" : element.name + " needs a type"
      });
      return error;
    }
    if ( element.content ) {
      if ( element.content.length !== 0 ) {
        for ( var i = 0; i < element.content.length; i++ ) {
          if ( !this.check( element.content[i], true ) ) {
            return error;
          }
        }
      }
    }
    return ok;
  }
  function _checkTransition ( transition ) {
    if ( !transition.name ) {
      eHandler.error({
        "name" : missingError,
        "description" : "Transition name is required"
      });
      return error;
    }
    if ( !transition.destiny ) {
      eHandler.error({
        "name" : missingError,
        "description" : "Transition destiny is required"
      });
      return error;
    }
    if ( !transition.origin ) {
      eHandler.error({
        "name" : missingError,
        "description" : "Transition origin is required"
      });
      return error;
    }
    return ok;
  }
  return {
    checkMe : _checkMe,
    check : _check,
    checkView : _checkView,
    checkViewElement : _checkViewElement,
    checkTransition : _checkTransition,
    checkTransitionCalls : _checkTransitionCalls
  };
};
