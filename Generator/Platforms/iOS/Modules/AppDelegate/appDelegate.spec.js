"use strict";
describe( "AppDelegate", function () {
  it( "should create the AppDelegate code correctly", function () {
    var expected =
      "//  AppDelegate.swift\n"+
      "import UIKit\n\n"+
      "@UIApplicationMain\n"+
      "class AppDelegate: UIResponder, UIApplicationDelegate {\n\n"+
      "\t\tvar window: UIWindow?\n\n"+
      "\t\tfunc application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {\n"+
      "\t\t\t\t// Override point for customization after application launch.\n"+
      "\t\t\t\treturn true\n"+
      "\t\t}\n\n"+
      "\t\tfunc applicationWillResignActive(_ application: UIApplication) {\n"+
      "\t\t\t\t// Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.\n"+
      "\t\t\t\t// Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.\n"+
      "\t\t}\n\n"+
      "\t\tfunc applicationDidEnterBackground(_ application: UIApplication) {\n"+
      "\t\t\t\t// Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.\n"+
      "\t\t\t\t// If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.\n"+
      "\t\t}\n"+
      "\t\tfunc applicationWillEnterForeground(_ application: UIApplication) {\n"+
      "\t\t\t\t// Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.\n"+
      "\t\t}\n\n"+
      "\t\tfunc applicationDidBecomeActive(_ application: UIApplication) {\n"+
      "\t\t\t\t// Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.\n"+
      "\t\t}\n\n"+
      "\t\tfunc applicationWillTerminate(_ application: UIApplication) {\n"+
      "\t\t\t\t// Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.\n"+
      "\t\t}\n\n"+
      "}";
    var AppDelegate = require( "./generate" );
    var result = AppDelegate.generate();
    expect( result ).toEqual( expected );
  });
});
