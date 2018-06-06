"use strict";
module.exports = {
  create : function ( controller, connections ) {
    var init =
      "import UIKit\n\n" +
      "class " + controller + ": UIViewController {\n\n";
    var viewCycle =
      "\n\t//MARK: - view cycle\n" +
      "\toverride func viewDidLoad() {\n"+
      "\t\tsuper.viewDidLoad()\n"+
      "\t}\n\n"+
      "\toverride func didReceiveMemoryWarning() {\n"+
      "\t\tsuper.didReceiveMemoryWarning()\n"+
      "\t}\n\n";
    var functions = "\t//MARK: - functions\n";
    var properties = "\t//MARK: - properties\n";
    for ( var c = 0; c < connections.length; c++ ) {
      switch ( connections[c].type ) {
        case "label":
          properties +=
            "\t@IBOutlet weak var " + connections[c].name + ": UILabel!\n";
          break;
        case "textField":
          properties +=
            "\t@IBOutlet weak var " + connections[c].name + ": UITextField!\n";
          break;
        case "button":
          functions +=
            "\t@IBAction func " + connections[c].data.name + "(_ sender: Any) {\n" +
            "\t\tself.performSegue(withIdentifier: \"" + connections[c].data.name + "\", sender: sender)\n"+
            "\t}\n";
          break;
      }
    }
    init += properties + viewCycle + functions + "}";
    return init;
  }
};
