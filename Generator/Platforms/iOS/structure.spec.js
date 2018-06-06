"use strict";
describe ( "Structure", function () {
  var data;
  var expected;
  var structure;
  beforeEach( function () {
    data = {
      "platforms" : [
        "ios"
      ],
      "views" : [
        {
          "name" : "loginView",
          "launcher" : true,
          "controller" : "loginController",
          "type" : "view",
          "position" : {
            "width" : "350",
            "height" : "600"
          },
          "content" : [
            {
              "name" : "lblten",
              "type" : "label",
              "text" : "Log in",
              "position" : {
                "x" : "25",
                "y" : "50",
                "width" : "150",
                "height" : "50"
              }
            },
            {
              "name" : "edtone",
              "type" : "editText",
              "position" : {
                "x" : "25",
                "y" : "150",
                "width" : "150",
                "height" : "50"
              }
            },
            {
              "name" : "edt2",
              "type" : "editText",
              "position" : {
                "x" : "25",
                "y" : "250",
                "width" : "150",
                "height" : "50"
              }
            },
            {
              "name" : "btn1",
              "type" : "button",
              "text" : "My Button",
              "position" : {
                "x" : "25",
                "y" : "350",
                "width" : "150",
                "height" : "50"
              }
            }
          ]
        },
        {
          "name" : "homeView",
          "type" : "view",
          "controller" : "homeController",
          "position" : {
            "width" : "350",
            "height" : "600"
          },
          "content" : [
            {
              "name" : "lbl1",
              "type" : "label",
              "text" : "Primero",
              "position" : {
                "x" : "25",
                "y" : "100",
                "width" : "150",
                "height" : "50"
              }
            },
            {
              "name" : "lbl2",
              "type" : "label",
              "text" : "Segundo",
              "position" : {
                "x" : "200",
                "y" : "100",
                "width" : "150",
                "height" : "50"
              }
            },
            {
              "name" : "lbl3",
              "type" : "label",
              "text" : "Tercero",
              "position" : {
                "x" : "50",
                "y" : "300",
                "width" : "150",
                "height" : "50"
              }
            }
          ]
        }
      ],
      "transitions" : [
        {
          "name" :  "gotoHomeView",
          "destiny" : "homeView",
          "origin" : "loginView"
        }
      ]
    };
    structure =  require( "./structure" );
  });
  it( "should get the connections of labels and textFields", function () {
    var content = [
      {
        "name" : "lblten",
        "type" : "label",
        "text" : "Log in",
        "position" : {
          "x" : "25",
          "y" : "50",
          "width" : "150",
          "height" : "50"
        },
        "font" : {}
      },
      {
        "name" : "edtone",
        "type" : "editText",
        "position" : {
          "x" : "25",
          "y" : "150",
          "width" : "150",
          "height" : "50"
        },
        "font" : {}
      }
    ];
    expected = { "add" : true, "list" : [{ "name":"lblten","type":"label"},{ "name":"edtone","type":"textField"}] };
    var result = structure.getconnections( content, { "add" : false, "list" : [] }, [], [] );
    expect ( result ).toEqual( result );
  });
  it( "should get the connections of buttons", function () {
    var content = [
      {
        "name" : "btn1",
        "type" : "button",
        "text" : "My Button",
        "position" : {
          "x" : "25",
          "y" : "350",
          "width" : "150",
          "height" : "50"
        },
        "font" : {},
        "onTab" : "gotoHomeView"
      }
    ];
    expected = [{ "name":"btn1","type":"button","data":{"name":"gotoHomeView","origin":"loginController","destiny":"homeController"}}];
    var result = structure.getconnections( content, { "add" : false, "list" : [] }, data.transitions,data.views );
    expect ( result ).toEqual( result );
  });
  it( "should update the received positioning data to the ios platform", function () {
    expected = {
      "name": "loginView",
      "launcher": true,
      "controller": "loginController",
      "type": "view",
      "position": { "height": 575, "width": 375, "x": 0, "y": 0 },
      "content":[
        {
          "name": "lblten",
          "type": "label",
          "text": "Log in",
          "position": {
            "height" : 47,
            "width" : 160,
            "x" : 26,
            "y" : 47
          }
        },{
          "name": "edtone",
          "type": "textField",
          "position": {
            "height" : 47,
            "width" : 160,
            "x" : 26,
            "y" : 143
          }
        },{
          "name": "edt2",
          "type": "textField",
          "position": {
            "height" : 47,
            "width" : 160,
            "x" : 26,
            "y" : 239
          }
        },{
          "name": "btn1",
          "type": "button",
          "text": "My Button",
          "position": {
            "height" : 47,
            "width" : 160,
            "x" : 26,
            "y" : 335,
          }
        }
      ]
    };
    var result = structure.updatePositioningValues ( data.views[0],0,0 );
    expect( result ).toEqual( expected );
  });
});
