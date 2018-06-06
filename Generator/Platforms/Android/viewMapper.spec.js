"use strict";
describe( "viewMapper", function () {
  var layouts;
  var viewMapper;
  beforeEach( function () {
    layouts = [
      { // Test 1: horizontal linearLayout
        "path": "",
        "name": "",
        "height": 480,
        "width": 320,
        "x": 0,
        "y": 0,
        "controller": "",
        "content": [
          {
            "name": "lbl_1",
            "type": "label",
            "position": { "height": 50, "width": 50, x: 0, y: 80 }
          },{
            "name": "lbl_2",
            "type": "label",
            "position": { "height": 50, "width": 50, x: 60, y: 80 }
          },{
            "name": "lbl_3",
            "type": "label",
            "position": { "height": 50, "width": 50, x: 120, y: 80 }
          }
        ]
      },{ // Test 2: vertical new element
        "path": "",
        "name": "activity_loginview",
        "height": 480,
        "width": 320,
        "x": 0,
        "y": 0,
        "controller": "",
        "content": [
          {
            "name": "lbl_1",
            "type": "label",
            "position": { "height": 40, "width": 130, x: 10, y: 50 },
          },{
            "name": "edt_1",
            "type": "editText",
            "position": { "height": 40, "width": 130, x: 50, y: 100 },
          },{
            "name": "edt_2",
            "type": "editText",
            "position": { "height": 40, "width": 130, x: 20, y: 180 },
          },{
            "name": "btn1",
            "type": "button",
            "position": { "height": 40, "width": 130, x: 10, y: 250 },
          }
        ]
      },{ // Test 3: mixed elements
        "path": "",
        "name": "",
        "height": 480,
        "width": 320,
        "x": 0,
        "y": 0,
        "controller": "",
        "content": [
          {
            "name": "lbl_1",
            "type": "label",
            "position": { "height": 50, "width": 50, x: 16, y: 50 }
          },{
            "name": "lbl_2",
            "type": "label",
            "position": { "height": 50, "width": 50, x: 60, y: 100 }
          },{
            "name": "lbl_3",
            "type": "label",
            "position": { "height": 50, "width": 50, x: 120, y: 100 }
          }
        ]
      }
    ];
  });
  it( "should add a linearLayout with horizontal orientation if there are more than one element on the same row", function () {
    viewMapper = require( "./viewMapper" );
    var expected = [{
      "type": "view",
      "width": "\"match_parent\"",
      "height": "\"wrap_content\"",
      "orientation": "\"horizontal\"",
      "content": [
        {
          "name": "lbl_1",
          "type": "label",
          "skip": true,
          "width": "\"50dp\"",
          "height": "\"50dp\""
        },{
          "name": "lbl_2",
          "type": "label",
          "skip": true,
          "marginLeft": "\"10dp\"",
          "width": "\"50dp\"",
          "height": "\"50dp\""
        },{
          "name": "lbl_3",
          "type": "label",
          "skip": true,
          "marginLeft": "\"10dp\"",
          "width": "\"50dp\"",
          "height": "\"50dp\""
        }
      ],
      "marginTop": "\"64dp\""
    }];
    var data = {
      "newContent" : [],
      "oldContent" : layouts[0].content,
      "lastY" : 16,
      "lastX" : 0
    };
    var result = viewMapper.map( data );
    expect( result ).toEqual( expected );
  });
  it( "should be able to add elements vertically", function () {
    viewMapper.newContent = [];
    var expected = [
      {
        "name": "lbl_1",
        "type": "label",
        "skip": true,
        "marginTop": "\"34dp\"",
        "marginLeft": "\"10dp\"",
        "width": "\"130dp\"",
        "height": "\"40dp\""
      },{
        "name": "edt_1",
        "type": "editText",
        "skip": true,
        "marginTop": "\"10dp\"",
        "marginLeft": "\"50dp\"",
        "width": "\"130dp\"",
        "height": "\"40dp\""
      },{
        "name": "edt_2",
        "type": "editText",
        "skip": true,
        "marginTop": "\"40dp\"",
        "marginLeft": "\"20dp\"",
        "width": "\"130dp\"",
        "height": "\"40dp\""
      },{
        "name": "btn1",
        "type": "button",
        "skip": true,
        "marginTop": "\"30dp\"",
        "marginLeft": "\"10dp\"",
        "width": "\"130dp\"",
        "height": "\"40dp\""
      }
    ];
    var dataPackage = {
      "newContent" : [],
      "oldContent" : layouts[1].content,
      "lastY" : 16,
      "lastX" : 0
    };
    var result = viewMapper.map( dataPackage );
    expect( result ).toEqual( expected );
  });
  it( "should be able to build a view with horizontal and vertical elements mixted together", function () {
    viewMapper.newContent = [];
    var expected =  [
      {
        "name": "lbl_1",
        "type": "label",
        "skip": true,
        "marginTop": "\"34dp\"",
        "marginLeft": "\"16dp\"",
        "width": "\"50dp\"",
        "height": "\"50dp\""
      },{
        "type": "view",
        "width": "\"match_parent\"",
        "height": "\"wrap_content\"",
        "orientation": "\"horizontal\"",
        "content": [
          {
            "name": "lbl_2",
            "type": "label",
            "skip": true,
            "marginLeft": "\"60dp\"",
            "width": "\"50dp\"",
            "height": "\"50dp\""
          },{
            "name": "lbl_3",
            "type": "label",
            "skip": true,
            "marginLeft":   "\"10dp\"",
            "width": "\"50dp\"",
            "height": "\"50dp\"" }
          ]
        }
      ];
      var dataPackage = {
        "newContent" : [],
        "oldContent" : layouts[2].content,
        "lastY" : 16,
        "lastX" : 0
      };
      var result = viewMapper.map( dataPackage );
    expect( result ).toEqual( expected );
  });
});
