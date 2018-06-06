"use strict";
describe ( "Controller generator", function () {
  var controller;
  var generator;
  var template;
  var errorHandler;
  var error = "Android codeGenerator failed";
  beforeEach( function () {
    controller = {
      "path" : "",
      "methods" : [
        {
          "name" : "gotoHomeView",
          "calls" : [
            {
              "elementName" : "btn1",
              "elementType" : "button"
            },
            {
              "elementName" : "btn2",
              "elementType" : "button"
            }
          ],
          "destiny" : "HomeView"
        }
      ],
      "className" : "LoginView"
    };
     errorHandler = {
       savedError : {},
       error : function ( error ) { this.savedError = error; }
     };
     generator = require( "./generate" ). inject( errorHandler );
     template = require( "./template" );
  });
  it ( "should show an error if a variable name is repeated", function () {
    var test = "btn1";
    controller.methods[0].calls[1].elementName = test;
    generator.isValid( controller );
    expect( errorHandler.savedError ).toEqual({
      "name" : error,
      "description" : "A variable (" + test + ") is repeated"
    });
  });
  it ( "should show an error if the variable name has special characters", function () {
    controller.methods[0].calls[0].elementName = "Log+,inView";
    generator.isValid( controller );
    expect( errorHandler.savedError ).toEqual({
      "name" : error,
      "description" : "Variable name has special characters"
    });
  });
  it ( "should return expected template correctly", function () {
    var layoutName = "activity_" + controller.className.toLowerCase();
    var appName = "appName";
    var expectedResult =
      "package com.codeGenerator."+ appName +";\n" +
      "import android.content.Intent;\n" +
      "import android.support.v7.app.AppCompatActivity;\n" +
      "import android.os.Bundle;\n" +
      "import android.view.View;\n" +
      "import android.widget.Button;\n" +
      "public class LoginView extends AppCompatActivity { \n" +
      "\t@Override \n" +
      "\tprotected void onCreate(Bundle savedInstanceState){ \n" +
      "\t\tsuper.onCreate(savedInstanceState); \n" +
      "\t\tsetContentView(R.layout." + layoutName + "); \n" +
      "\t\tButton btn1 = (Button) findViewById(R.id.btn1);\n" +
      "\t\tbtn1.setOnClickListener(new View.OnClickListener() {\n" +
      "\t\t\t@Override\n" +
      "\t\t\tpublic void onClick(View v) {\n" +
      "\t\t\t\tIntent i = new Intent(getApplicationContext(), HomeView.class);\n" +
      "\t\t\t\tstartActivity(i);\n" +
      "\t\t\t}\n" +
      "\t\t});\n" +
      "\t\tButton btn2 = (Button) findViewById(R.id.btn2);\n" +
      "\t\tbtn2.setOnClickListener(new View.OnClickListener() {\n" +
      "\t\t\t@Override\n" +
      "\t\t\tpublic void onClick(View v) {\n" +
      "\t\t\t\tIntent i = new Intent(getApplicationContext(), HomeView.class);\n" +
      "\t\t\t\tstartActivity(i);\n" +
      "\t\t\t}\n" +
      "\t\t});\n" +
      "\t}\n" +
      "}\n";
    var result = template.generate ( controller, appName );
    expect( expectedResult ).toEqual( result );
  });
});
