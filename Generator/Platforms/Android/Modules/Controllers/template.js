"use strict";
var imports;
var body;
var importedClasses = [];
module.exports = {
  generate : function ( controller, appName ) {
    var layoutName = "activity_" + controller.className.toLowerCase();
    imports =
      "package com.codeGenerator."+ appName +";\n" +
      "import android.content.Intent;\n" +
      "import android.support.v7.app.AppCompatActivity;\n" +
      "import android.os.Bundle;\n" +
      "import android.view.View;\n";
    body =
      "public class " + controller.className + " extends AppCompatActivity { \n" +
      "\t@Override \n" +
      "\tprotected void onCreate(Bundle savedInstanceState){ \n" +
      "\t\tsuper.onCreate(savedInstanceState); \n" +
      "\t\tsetContentView(R.layout." + layoutName + "); \n";
    for ( var m = 0; m < controller.methods.length; m++ ) {
        for ( var c = 0; c < controller.methods[m].calls.length; c++ ) {
          var elmntType = controller.methods[m].calls[c].elementType;
          var elmntName = controller.methods[m].calls[c].elementName;
          var elmntClass = this.getClass( elmntType );
          if ( importedClasses.indexOf( elmntClass ) < 0 ) { // If class hasn't been imported
              importedClasses.push( elmntClass ); // Add to list
              imports = imports +
                "import android.widget." + elmntClass + ";\n";
          }
          body +=
            "\t\t" + elmntClass + " " + elmntName + " = (" + elmntClass + ") findViewById(R.id." + elmntName + ");\n" +
            "\t\t" + elmntName + ".setOnClickListener(new View.OnClickListener() {\n" +
            "\t\t\t@Override\n" +
            "\t\t\tpublic void onClick(View v) {\n" +
            "\t\t\t\tIntent i = new Intent(getApplicationContext(), " + controller.methods[m].destiny + ".class);\n" +
            "\t\t\t\tstartActivity(i);\n" +
            "\t\t\t}\n" +
            "\t\t});\n";
        }
    }
    body +=
      "\t}\n" +
      "}\n";
    return imports + body;
  },
  getClass : function ( type ) {
    switch ( type ) {
      case "button":
        return "Button";
      case "label":
        return "TextView";
      case "editText":
        return "EditText";
      default:
    }
  }
};
