"use strict";
describe( "Generator", function () {
  var error = "Android codeGenerator failed";
  var fs, errorHandler, generator;
  var structure;
  beforeEach( function () {
      fs = {};
      errorHandler = {
        savedError : {},
        error : function ( error ) { this.savedError = error; }
      };
      generator = require( "./generator" ).inject( fs, errorHandler );
      structure = {
        "appName" : "test",
        "savePath" : "",
        "java" : {
          "path" : {},
          "files" : [
            {
              "path" : "",
              "methods" : [
                {
                  "name" : "transition1",
                  "calls" : [
                    {
                      "elementName" : "btn1",
                      "elementType" : "button"
                    }
                  ],
                  "destiny" : "class2"
                },
                {
                  "name" : "transition2",
                  "calls" : [
                    {
                      "elementName" : "btn2",
                      "elementType" : "button"
                    }
                  ],
                  "destiny" : "class2"
                }
              ],
              "className" : "class1"
            },{
              "path" : "",
              "methods" : [

              ],
              "className" : "class2"
            }
          ]
        },
        "res" : {
          "path" : {},
          "files" : {
            "layout" : [
              {
                "path" : "path_2/layout/activity_loginview.xml",
                "name" : "activity_loginview",
                "height" : 480,
                "width" : 320,
                "x"      : 0,
                "y"      : 0,
                "controller" : "loginController",
                "content" : [
                  {
                    "name" : "lbl_1",
                    "type" : "label",
                    "text" : "@string/Log_in",
                    "position" : {
                      "x" : 20,
                      "y" : 50,
                      "width" : 150,
                      "height" : 50
                    },
                    "font" : {
                      "font" : "default",
                      "fontStyle" : "bold",
                      "fontSize" : "22"
                    }
                  },{
                    "name" : "edt_1",
                    "type" : "editText",
                    "position" : {
                      "x" : 20,
                      "y" : 150,
                      "width" : 150,
                      "height" : 50
                    },
                    "font" : {
                      "font" : "default",
                      "fontType" : "email",
                      "fontStyle" : "plain",
                      "fontSize" : "12"
                    }
                  },{
                    "name" : "btn1",
                    "type" : "button",
                    "text" : "@string/My_Button",
                    "position" : {
                      "x" : 20,
                      "y" : 250,
                      "width" : 150,
                      "height" : 50
                    },
                    "font" : {
                      "font" : "default",
                      "fontStyle" : "bold",
                      "fontSize" : "12"
                    },
                    "onTap" : "gotoHomeView"
                  }
                ]
              }
            ],
            "values" : {}
          }
        },
        "manifest" : {}
      };
  });
  it( "should verify if a controllers name has special charactes", function () {
    var test = "Cla,ss@x";
    structure.java.files[1].className = test;
    generator.isValid( structure );
    expect( errorHandler.savedError ).toEqual({
      "name" : error,
      "description" : "Variable name has special characters"
    });
  });
  it( "should verify if a controller name is repeated", function () {
    var test = "class2";
    structure.java.files[0].className = test;
    generator.isValid( structure );
    expect( errorHandler.savedError ).toEqual({
      "name" : error,
      "description" : "Class (" + test + ") is repeated"
    });
  });
  it( "should verify if there are repeated ids on a view", function () {
    var test = "e%#dt_1";
    structure.res.files.layout[0].content[0].name = test;
    generator.isValid( structure );
    expect( errorHandler.savedError ).toEqual({
      "name" : error,
      "description" : "ID name (" + structure.res.files.layout[0].content[0].name + ") has special characters"
    });
  });
  it( "should verify if there is an id with special characters inside a view", function () {
    var test = "edt_1";
    structure.res.files.layout[0].content[0].name = test;
    generator.isValid( structure );
    expect( errorHandler.savedError ).toEqual({
      "name" : error,
      "description" : "ID (" + structure.res.files.layout[0].content[0].name + ") is repeated"
    });
  });
});
