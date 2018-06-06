"use strict";
module.exports = {
  generate : function ( manifest ) {
    var result =
      "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
      "<manifest \n" +
      "\txmlns:android=\"http://schemas.android.com/apk/res/android\" \n" +
      "\tpackage=\"" + manifest.package + "\"> \n" +
      "\t<application\n" +
      "\t\tandroid:allowBackup=\"" + manifest.application.allowBackup + "\"\n" +
      "\t\tandroid:icon=\"" + manifest.application.icon + "\"\n" +
      "\t\tandroid:label=\"@string/app_name\"\n" +
      "\t\tandroid:supportsRtl=\"" + manifest.application.supportsRtl + "\"\n" +
      "\t\tandroid:theme=\"" + manifest.application.theme + "\">\n";
    for ( var v = 0; v < manifest.application.views.length; v++ ) { // Add activities
      if ( manifest.application.views[v].launcher === true ) {
        result +=
          "\t\t<activity android:name=\"." + manifest.application.views[v].name + "\">\n" +
          "\t\t\t<intent-filter>\n" +
          "\t\t\t\t<action android:name=\"android.intent.action.MAIN\" />\n" +
          "\t\t\t\t<category android:name=\"android.intent.category.LAUNCHER\" />\n" +
          "\t\t\t</intent-filter>\n" +
          "\t\t</activity>\n";
      } else {
        result +=
          "\t\t<activity android:name=\"." + manifest.application.views[v].name + "\">" +
          "</activity>\n";
      }
    }
    result += "\t</application>\n</manifest>";
    return result;
  }
};
