---
layout: doc
permalink: /docs/extensions/tutorials/debug-settings-pages
title: Debugging and local development of settings pages
section: Tutorials
---

# Debugging and Local Development
<hr />

This short tutorial covers how to improve your settings page development flow by utilizing the `Debug` feature in the Builder. It'll explain how to see code changes without having to `push` every code change and how to use dev tools to debug the settings pages through the Builder.

> #### Note
> HTML settings pages currently cannot use the `Debug` feature in the Builder.

## Local development

When you start developing settings pages, you'll quickly realize that it's inpractical to shoutem publish every change to Shoutem just to see the updated settings page. To avoid this and enjoy a much more efficient development flow, you can simply do the following:

1. Push, and install your extension in Shoutem Builder application (Only once)
2. Locate to the `extName/server` directory and execute `npm run dev` to run the webpack dev server (Until you kill server there is no need to run it again)
3. In your browser go to Shoutem Builder and open settings page you are developing
4. Click on the `Debug` button

Once you click Debug, the settings page will reload from `https://localhost:4790` and there is possibility that your browser will define `localhost` as insecure. We've prepared quick and simple tutorials on how to allow your browser to load the settings page from `localhost`.

**Chrome**<br/>
Chrome will show an error in the actual settings page iframe, stating that the website is moved to a new address or removed. Open that link in a new tab. Chrome will warn you that it is not a secure site, click on `Advanced` and choose to navigate to the site. After that, you can close the tab and your settings page will now work in the Builder.

**Safari**<br/>
Safari will prompt you with an alert that Safari can't verify the identity of the website "localhost". Simply click `Continue` and Safari will then take you to the localhost site. After that, navigate back to the Builder using the back button and again click on the `Debug` button your settings page will be started and you can reload it after making changes to your local files.

**Firefox**<br/>
Firefox will show an error in the settings page iframe, stating that the connection isn't secure. To resolve this, you'll have to pen this URL: chrome://pippki/content/exceptionDialog.xul.

In the `Location` field enter `localhost:4790`, check the `Permanently store this exception` checkbox and then click the `Confirm Security Exception` button. You can now successfully debug the settings page.

Since we use React and Webpack dev server we have the hot module reload feature enabled, meaning that every time you save changes to your code in your editor, the server will re-bundle it and reload it in the browser, so basically you have a live preview while you develop your settings page. There are some exceptions when it cannot work, like adding new npm module or file, but in that case just re-run dev server with and reload the Builder in your browser.

## Debugging settings pages

Debugging of settings pages should be done using the Debug feature explained in the section above. Once you enter debug mode, open the developer console (in Chrome keyboard shortcut is F12) and use Console, Sources, Elements and Network tab to debug your code. You can put breakpoint on code lines of your `/src` folder files by opening the `Source` tab and use the `Ctrl + P` keyboard shortcut to open the search bar.

|                |   |   | Normal |   |   | Debug |
|----------------|:-:|:-:|:------:|:-:|:-:|:-----:|
| Transpiled ES5 |   |   |   Yes  |   |   |  No   |
| Bundled        |   |   |   Yes  |   |   |  No   |
| Breakpoints    |   |   |   No   |   |   |  Yes  |
| Stack Trace    |   |   |   No   |   |   |  Yes  |

<br/>

Settings page debugging outside of debug mode is problematic, because the code is bundled in `extension.{hash}.js` and it's dependencies are in `vendor.{hash}.js` which the iframe loads. Webpack2 bundles and transpiles your code and we don't have to pass source maps. You can't easily put breakpoints or investigate the stack trace in such code.
