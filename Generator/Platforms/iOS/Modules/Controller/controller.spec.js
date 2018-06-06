"use strict";
describe( "Controller", function () {
  var expected;
  var data;
  var controller;
  beforeEach ( function () {
    data =
      {
        "name" : "loginView",
        "launcher" : true,
        "controller" : "loginController",
        "type" : "view",
        "position" : { "height" : "575", "width" : "375", "x" : "0", "y" : "0" },
        "style" : { "background" : ["0.12", "0.18", "0.94"] },
        "content": [],
        "connections" : [
          { "name" : "lblten" , "type": "label" },
          { "name" : "edtone" , "type": "textField" },
          { "name" : "btn1"   , "type": "button", "data": {"name": "gotoHomeView","origin": "loginController","destiny": "homeController"}},
        ]
      };
    controller = require( "./generate" ).inject({});
  });
  it( "should be able to crate the code correctly", function () {
    expected =
      "import UIKit\n\n"+
      "class loginController: UIViewController {\n\n"+
      "\t//MARK: - properties\n"+
      "\t@IBOutlet weak var lblten: UILabel!\n"+
      "\t@IBOutlet weak var edtone: UITextField!\n\n"+
      "\t//MARK: - view cycle\n"+
      "\toverride func viewDidLoad() {\n"+
      "\t\tsuper.viewDidLoad()\n"+
      "\t}\n\n"+
      "\toverride func didReceiveMemoryWarning() {\n"+
      "\t\tsuper.didReceiveMemoryWarning()\n"+
      "\t}\n\n"+
      "\t//MARK: - functions\n"+
      "\t@IBAction func gotoHomeView(_ sender: Any) {\n"+
      "\t\tself.performSegue(withIdentifier: \"gotoHomeView\", sender: sender)\n"+
      "\t}\n"+
      "}";
    var result = controller.generate( data );
    expect( result ).toEqual( expected );
  });
});
