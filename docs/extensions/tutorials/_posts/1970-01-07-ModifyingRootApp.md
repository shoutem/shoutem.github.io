---
layout: doc
permalink: /docs/extensions/tutorials/modifying-root-app
title: Modifying Root App
section: Tutorials
---

# Modifying Root App

When making an extension with native dependencies, it's often necessary to change properties outside of the extension. One way we address this need using anchors, which can be used to inject code into files which often need to be modified in order to set up a native dependency.

Another tool we provide is the merging of the extension's app segmenet into the root app. For example, instead of directly modifying the root Android `build.gradle`, you can simply create a `build.gradle` in  the `{{ site.example.devName }}.extension-name/app/android` directory which is then merged into the root `build.gradle`. You can see an example in `shoutem.places`, [here](https://github.com/shoutem/extensions/tree/master/shoutem.places/app/android).

## Injecting

This section will elaborate on how to inject code into the native parts of the root app without leaving the extension.

#### Available anchors

The list of available anchors can be seen in the [platform's helper scripts](https://github.com/shoutem/platform/blob/develop/scripts/helpers/const.js).

The `ANCHORS` object is structured as follows:

```JavaScript
#file: AppName/scripts/helpers/const.js
const ANCHORS = {
  IOS: {
    PODFILE: {
      EXTENSION_DEPENDENCIES: '## <Extension dependencies>',
      EXTENSION_POSTINSTALL_TARGETS: '## <Extension postinstall targets>',
    },
    ...
  },
  ANDROID: {
    MAIN_ACTIVITY: {
      IMPORT: '//NativeModuleInjectionMark-mainActivity-import',
      ON_CREATE: '//NativeModuleInjectionMark-mainActivity-onCreate',
      ON_ACTIVITY_RESULT: '//NativeModuleInjectionMark-mainActivity-onActivityResult',
      ON_ACTIVITY_RESULT_END: '//NativeModuleInjectionMark-mainActivity-onActivityResult-end',
    },
    ...
  },
};

module.exports = {
  ANCHORS,
};
```

#### 'build' directory structuring

```
build/
  ├ const.js
  ├ inject{ExtensionName}{MobileOSName}.js
  └ index.js
```

We can look at the `shoutem.code-push` [extension](https://github.com/shoutem/extensions/tree/master/shoutem.code-push/app/build) as an example.

`const.js` should contain all the plaintext modifications you need to inject, in separate variables, exported as a single object named after your extension, with a structure resembling that of the `ANCHORS` object from `@shoutem/build-tools` seen above in the **Available anchors** section and the platform's `scripts/helpers/const.js` [file](https://github.com/shoutem/platform/blob/develop/scripts/helpers/const.js).

```JavaScript
#file: shoutem.code-push/app/build/const.js
const codepush = {
  ios: {
    appDelegate: {
      import: '#import <CodePush/CodePush.h>',
      oldBundle: appDelegateOldBundle,
      newBundle: appDelegateNewBundle,
    },
    ...
  },
  android: {
    app: {
      import: 'import com.microsoft.codepush.react.CodePush;',
      ...
    },
  },
};
```

`inject{ExtensionName}` should contain the functions which inject the code, one for Android and one for iOS, named `injectCodePushAndroid` and `injectCodePushIos`, respectively.

```JavaScript
#file: shoutem.code-push/app/build/injectCodePush.js
const {
  ANCHORS,
  ...
} = require('@shoutem/build-tools');
const { codepush } = require('./const');

function injectCodePushAndroid() {
  // app/build.gradle mods
  const gradleAppPath = getAppGradlePath({ cwd: projectPath });
  inject(
    gradleAppPath,
    ANCHORS.ANDROID.GRADLE.APP.REACT_GRADLE,
    codepush.android.app.gradle.codepushGradle,
  );
  ...
}

function injectCodePushIos() {
  const appDelegate = getAppDelegatePath({ cwd: projectPath });
  inject(appDelegate, ANCHORS.IOS.APP_DELEGATE.IMPORT, codepush.ios.appDelegate.import);
  replace(appDelegate, codepush.ios.appDelegate.oldBundle, codepush.ios.appDelegate.newBundle);
  ...
}

module.exports = {
  injectCodePushAndroid,
  injectCodePushIos,
};
```

`index.js` should contain a single export, a `preBuild` function which will be called in the preBuild step of the `shoutem configure` lifecycle. The preBuild function itself should simply call the functions imported from the `inject{ExtensionName}.js` file.

```JavaScript
#file: shoutem.code-push/app/build/index.js
const { injectCodePushAndroid, injectCodePushIos } = require('./injectCodePush');

exports.preBuild = function preBuild() {
  injectCodePushAndroid();
  injectCodePushIos();
}
```

#### inject{ExtensionName}{MobileOSName} convention

- name your functions `inject{ExtensionName}{MobileOSName}`
- start a new block by adding a comment declaring which file is going to be modified
- assign that file's path to a new const
- use inject() and/or replace() to apply modifications
- create another block if more changes are needed

The following example follows all of the above convention rules.

```JavScript
// app/settings.properties mods
const gradlePropertiesPath = getGradlePropertiesPath({ cwd: projectPath });
inject(
  gradlePropertiesPath,
  ANCHORS.ANDROID.GRADLE.PROPERTIES,
  codepush.android.app.gradle.codepushKey,
);

// MainApplication.java mods
const mainApplicationPath = getMainApplicationPath({ cwd: projectPath });
inject(
  mainApplicationPath,
  ANCHORS.ANDROID.MAIN_APPLICATION.IMPORT,
  codepush.android.app.import,
);
inject(
  mainApplicationPath,
  ANCHORS.ANDROID.MAIN_APPLICATION.RN_HOST_BODY,
  codepush.android.app.rnHost,
);
inject(
  mainApplicationPath,
  ANCHORS.ANDROID.MAIN_APPLICATION.GET_PACKAGES,
  codepush.android.app.getPackages,
);
```

#### inject() and replace()

The `inject()` and `replace()` functions can be used to either inject code at an anchor, or replace content in a specific file. Both functions will check if the code is already injected/replaced before doing so.

**inject()** accepts the following arguments:

- `filePath:` the path to the file that you need to modify
- `anchor:` position in the file specified in the `ANCHORS` object
- `contents`: the source code that needs to be injected at anchor position

**replace()** accepts the following arguments:

- `filePath:` the path to the file that you need to modify
- `oldContent:` the source code to search for in the file
- `newContent`: the source code that should replace `oldContent` in the file


## Merging files

As mentioned in the introduction, another tool provided for modifying the root app with an extension is to utilize the app segment merging.

An example of this can be seen in our `shoutem.places` [extension](https://github.com/shoutem/extensions/tree/master/shoutem.places/app/android) in the `shoutem.places/app/android` directory. It merges, among other things, `AndroidManifest.xml` in order to add permissions for Internet and Location:

```XML
#file: shoutem.places/app/android/src/main/AndroidManifest.xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.shoutem.places">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
</manifest>
```
