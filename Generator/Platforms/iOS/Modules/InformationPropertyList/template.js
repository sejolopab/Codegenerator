"use strict";
module.exports = {
  createTemplate : function () {
    var template =
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+
      "<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n"+
      "<plist version=\"1.0\">\n"+
      "<dict>\n"+
      "\t<key>CFBundleDevelopmentRegion</key>\n"+
      "\t<string>en</string>\n"+
      "\t<key>CFBundleExecutable</key>\n"+
      "\t<string>$(EXECUTABLE_NAME)</string>\n"+
      "\t<key>CFBundleIdentifier</key>\n"+
      "\t<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>\n"+
      "\t<key>CFBundleInfoDictionaryVersion</key>\n"+
      "\t<string>6.0</string>\n"+
      "\t<key>CFBundleName</key>\n"+
      "\t<string>$(PRODUCT_NAME)</string>\n"+
      "\t<key>CFBundlePackageType</key>\n"+
      "\t<string>APPL</string>\n"+
      "\t<key>CFBundleShortVersionString</key>\n"+
      "\t<string>1.0</string>\n"+
      "\t<key>CFBundleVersion</key>\n"+
      "\t<string>1</string>\n"+
      "\t<key>LSRequiresIPhoneOS</key>\n"+
      "\t<true/>\n"+
      "\t<key>UILaunchStoryboardName</key>\n"+
      "\t<string>LaunchScreen</string>\n"+
      "\t<key>UIMainStoryboardFile</key>\n"+
      "\t<string>Main</string>\n"+
      "\t<key>UIRequiredDeviceCapabilities</key>\n"+
      "\t<array>\n"+
      "\t\t	<string>armv7</string>\n"+
      "\t</array>\n"+
      "\t<key>UISupportedInterfaceOrientations</key>\n"+
      "\t<array>\n"+
      "\t\t<string>UIInterfaceOrientationPortrait</string>\n"+
      "\t\t<string>UIInterfaceOrientationLandscapeLeft</string>\n"+
      "\t\t<string>UIInterfaceOrientationLandscapeRight</string>\n"+
      "\t</array>\n"+
      "\t<key>UISupportedInterfaceOrientations~ipad</key>\n"+
      "\t<array>\n"+
      "\t\t<string>UIInterfaceOrientationPortrait</string>\n"+
      "\t\t<string>UIInterfaceOrientationPortraitUpsideDown</string>\n"+
      "\t\t<string>UIInterfaceOrientationLandscapeLeft</string>\n"+
      "\t\t<string>UIInterfaceOrientationLandscapeRight</string>\n"+
      "\t</array>\n"+
      "</dict>\n"+
      "</plist>\n";
    return template;
  }
};
