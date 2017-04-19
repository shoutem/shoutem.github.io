---
layout: doc
permalink: /docs/extensions/tutorials/publish-your-app
title: Publish your app
section: Tutorials
---

# Publish, Republish, Maintain

You're satisfied how your app looks like and you want to **publish** it to the store. This tutorial shows you how to publish your app to both [App Store]({{ site.external.appleAppStore }}) and [Google Play]({{ site.external.googlePlayStore }}) store. We'll also describe what does it mean to republish and maintain the data in your app.

There are 2 ways you can publish your app:

- using Shoutem automated app publishing tool or
- manually with a help of Shoutem CLI.

Once your app is published, for any changes you do in the Builder (except the changes in data from Shoutem Cloud Storage) and want to get in the live app, you will need to **republish** the app. Shoutem does the republishing automatically for you and most of the changes will be available seconds after you click the `Republish` button.

As the data used in app might change over the time, we made it easy for you **maintain** it using Shoutem CMS.

# Using Shoutem automated app publishing tool

Goal of Shoutem platform is to cover complete process of app developing: from prototyping, developing, designing, to publishing and maintaining. That's why we developed a tool for automated app publishing, which is integrated inside of Shoutem Builder.

#### Prerequisites

The only prerequisite to publish app using Shoutem is to have your developer accounts ready. If you don't have them, creating them is easy:
- to publish app to App Store (for iOS devices), create Apple [iOS Developer Account]({{ site.external.appleDeveloperAccount }})
- to publish app to Google Play Store (for Android devices), create [Google Play Developer account]({{ site.external.googlePlayDeveloperAccount }})

#### Publishing

There are 3 simple steps to publish your app

1. Grant Shoutem permission to publish app using your developer accounts
2. Fill in the app details (description, screenshots, ...) inside the builder
3. Click the `Publish` button

The first 2 steps need to be only done once.

##### Grant Shoutem permission

You need to grant Shoutem permission to stores where you want to publish your app.

**App Store**

Go to `Settings` -> `Store metadata` and the `iOS` tab should be selected. Find the _iOS Developer Account_ field and enter your credentials there. Do not worry - our tool will only handle new apps and won't do anything that you don't want. If, however, you don't want to share your credentials with us, there's a slightly more complex way to add permission to grant us permission to Apple Developer portal and iTunes Connect separately. For that, you should contact [our support]({{ site.shoutem.support }}).

**Google Play Store**

Go to `Settings` -> `Store metadata` and select `Android` tab. Find the _Google Play Android Developer Account_ field. You will find these steps to invite new user:

```
You need to invite shoutem@shoutem.com to use your Android dev account as an administrator.
Log in to your Android developer account
Click 'Manage user accounts...' link
Click 'Invite a new user button'
Enter 'shoutem@shoutem.com' and send invitation
```

Once you do that, write your Android developer account owner and console account name.

##### Fill in the app details

Instead of going to each store to fill in app information, we've put everything in one place. Go to `Settings` and fill out information under `App info` and `Store metadata`.

##### Click the `Publish` button

After you finish the first to steps, click the `Publish` button. Your app will go to review process in both stores and we'll be notifying you of the process.

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/publish-app.png'/>
</p>

Once your app is published, the `Publish` button will become `Republish`.

### Automatic Republishing

Using Shoutem, for most cases republishing of your app lasts a few seconds. Changes that you made in the app colors, settings, RSS feeds, order or number of extensions being used in the app structure will be visible immediately once you click the `Republish` button. Even installing new extensions, updating version of the existing extensions or uninstalling extensions will be visible automatically.

The only 2 changes that will require app to go over the reviewing process in the stores are:
- updating [Shoutem platform]({{ site.url }}/docs/extensions/reference/platform) being used in the app
- installing, updating or uninstalling extensions which contain native code

In those cases, you only need to click the `Republish` button and we'll take care of the rest and will notify you of the process.

### Maintaining the app data

Once your app is live, you might want to change data used in the app. The data shown in Shoutem CMS (used in Shoutem Cloud Storage) is live and changes to it will be immedaitely visible in the apps using Shoutem Cloud Storage. This is also the case for manual published apps using Shoutem Cloud.

# Manual publishing and republishing

If you want to have a complete overview of how publishing of your app looks like, you might want to publish your app manually. It is a bit longer process, but Shoutem CLI removes some of the obstacles along the way. Here we described required steps for both stores.

Also, it is not possible to manually publish your App Store, if you don't have an Apple Device (MacBook, Mac-Mini, MacPro).

## App Store

This is a manual process of publishing iOS app to App Store.

### Prerequisites

- **Apple Device:** In order to create your iOS app, an Apple computer (MacBook, Mac-Mini, MacPro) device is required since Xcode is not available on any other platforms
- **[Xcode]({{ site.external.xcode }}):** Apple's program for developing and distribution of iPhone apps
- **Active [iOS Developer Account]({{ site.external.appleDeveloperAccount }}):** a paid iOS developer account for submitting your app in App Store

### Building your app

If you have all the requirements set, let's build your app first. Result of this step is unsigned build file (.ipa file), which you can use to submit your app to store.

To do this, use Shoutem CLI command:

```ShellSession
$ shoutem build-ios
  Select your app: Restaurants ({{ site.example.appId }})
  ...
```

Build file will be located in the current folder.

### Preparing for Store

Once you have the build ready, you can start preparing your app for store.

#### Creating certificates
First you need to make an iOS distribution certificate and matching distribution provisiong profile for your app. Here's a short video tutorial on how to do it:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Xh2nnjttOwo" frameborder="0" allowfullscreen></iframe>

You can also use [Apple's guide](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingCertificates/MaintainingCertificates.html#//apple_ref/doc/uid/TP40012582-CH31-SW1) where each step is explained into more details.

#### Resigning app

Using created certificates, youćll need to resign your un/signed build file (.ipa) that you got in the Build step. You can do it quickly using Terminal by using [Fastlane's sign](https://github.com/fastlane/fastlane/tree/master/sigh) tool.

Once sigh is installed, do:

```ShellSession
$ fastlane sigh resign
...
Successfully signed ShoutemApp.ipa!
```

> #### Note
> Before you start this command, make sure you've added your [desired ceritifcte in your keychain](https://superuser.com/questions/936840/add-to-my-certificates-in-keychain-access-mac-os-10-10).

> #### Note
> `sigh` will find the build file and the provisioning profile for you if they are located in the current folder. If they're not in the current folder, provide more information to `sigh`: `fastlane sigh resign ./path/app.ipa --signing_identity "iPhone Distribution: Dummy user" -p "my.mobileprovision"`

#### Creating an app on iTunes Connect

[iTunes Connect](https://itunesconnect.apple.com) is Apple’s service where you upload your app and its metadata. From there, app will eventually become available in App Store. Let's create an app there.

Login to iTunes Connect with your iOS Developer account, click on `My Apps`, then click on the `+` in top left corner. You should get this menu:

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/itunes-connect-menu.png'/>
</p>

Fill your app details. Once you are done with that, click on `Create`. Your app is now created on iTunes connect and you are few steps away from publishing it. Fill the details of your app privacy policy link, category and licence agreement.

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/itunes-app-info.png'/>
</p>

In `Pricing and Availability`, choose to make your app free or paid and in which countries you want to make your app available.

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/itunes-pricing-and-availability.png'/>
</p>

Upload app's metadata. Click on iOS app which is currently in “Prepare for Submission” state. On this screen, you will upload your app’s screenshots, add app’s description, keywords, support URL, content rating, app store artwork and review contact information.

After doing so, upload your build file (.ipa). To upload it, use tool called Application Loader, which is one of the tools that comes along with Xcode. Find it in Xcode: Select Xcode in the menu -> Open Developer Tools -> Application Loader. This is what you should get:

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/xcode-application-loader.png'/>
</p>

Log in with your iOS Developer account, choose “Deliver your app” option and upload your .ipa file in iTunes Connect.

After uploading it, app will go trough processing time in iTunes Connect. Processing time can vary from few minutes to few hours (even days) and it depends on stability of the Apple’s services. If you click on `Activity tab` in iTunes Connect, you will see this while your app is in processing time:

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/itunes-processing-time.png'/>
</p>

Once the processing of your app is done, go back to your iOS app and scroll down to `Build section`. You will notice a little `+` sign appeared next to `Build`.

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/itunes-build.png'/>
</p>

Click on it and the build of your app is processed and ready for preview. After adding build, click on `Submit for Review` button in top right corner.

Finally, you need to declare your app's export compilance, content rights and advertising info:

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/itunes-compilance.png'/>
</p>

Answer those questions and click the `Submit` button. Your app status will change to "Waiting for review" state which means that your app is sent to Apple's review team.

### Review

Apple usually takes 2-3 days to review apps. Once they approve (or reject) the app, you should get the confirmation e-mail to your owner's e-mail about the review.

### Manual republish

If you make some changes in the app (colors, titles, change which extensions you use or their order), you will need to republish your app. Manual republishing of the app requires you to go through all the steps described here except creating new developer account and certificates.

### Maintaining the app data

Once your app is live, you might want to change data used in the app. The data shown in Shoutem CMS (used in Shoutem Cloud Storage) is live and changes to it will be immedaitely visible in the apps using Shoutem Cloud Storage.

## Google Play Store

This is a manual process of publishing android app in Google Play Store.

### Prerequisites

- **[Android Studio]({{ site.external.androidStudio }}):** Tool for developing Android apps and is used for app signing
- Android SDK tools: can be installed within Android Studio
- **[Google Play Developer account]({{ site.external.googlePlayDeveloperAccount }})** 

### Building your app

If you have all the requirements set, let's build your app first. Result of this step is unsigned build file (.apk file), which you can use to submit your app to store.

To do this, use Shoutem CLI command:

```ShellSession
$ shoutem build-android
  Select your app: Restaurants ({{ site.example.appId }})
  ...
```

Build file will be located in the current folder.

### Preparing for Store

Once you have the build ready, you can start preparing your app for store.

#### App signing and zipalign

You need to sign the build file (.apk) which you got from Shoutem CLI. You need to sign your android apk with your own keystore. Here's the [official documentation](https://developer.android.com/studio/publish/app-signing.html) on how you can do that.

Basically, these are the steps you will need to do:

##### App signing

1. Navigate to directory where you unsigned .apk file
2. Sign your app:

```ShellSession
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mykey.keystore myfile.apk alias_name
```

- mykey.keystore contains path to your keystore file
- myfile.apk is name of your .apk file
- alias_name is the name of the key that you are using during signing process

After your apk file is signed, it is ready for zipalign process

##### Zipalign

1. Put your unaligned apk file in desired directory.
2. Navigate to android sdk build-tools directory and choose desired sdk tools (for example 22.0.1):

```ShellSession
$ cd /path/to/your/android-sdk/build-tools/22.0.1/
```

3. Now, zipalign it:

```ShellSession
$ ./zipalign -v 4 /path/to/unaligned.apk /path/for/release-aligned.apk
```

4. Zipalign tool will start compressing apk file and after it finishes, it will print out “Verification succesful” in terminal. Now if you look in to directory that you set for aligned .apk file, you will find new, aligned .apk file ready for upload in Google Play Store.

#### Prepare app for publishing

Create your app in Google Play Developer Console. Log in with your Android Developer account credentials and select `Add New Application` in [Google Play Developer Console panel](https://play.google.com/apps/publish/):

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/android-create-app.png'/>
</p>

Once you’ve entered that information, you will be taken to `Store Listing` screen, where you need to update your apps short description, description, screenshots, featured graphics, choose category and application type and add link to your privacy policy:

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/android-store-listing.png'/>
</p>

#### Upload your app to production

Under `App Releases` tab, choose how you want to publish your Android app - is it for production, beta or alpha:

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/android-app-releases.png'/>
</p>

The process is pretty much the same for each release, so we will cover production release. Click on `Manage production` and then on `Create New`. This will take you to:

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/android-new-release-to-production.png'/>
</p>

Here you can upload your .apk file, choose release name and "What's Next" text. Once you're done, click on `Review`.

#### Content rating of your app

Answer Google's content rating questionnaire and choose your app’s content category. Add your email address and choose from one of six available categories.

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/android-content-rating.png'/>
</p>

Each category contains slightly different questions which needs to be answered mostly as Yes/No questions. Click `Save questionnaire`, then `Calculate rating`. You will see the ratings for the various locales where your app may be on sale. Scroll to the bottom of the list and click `Apply rating`. The `Content Rating` check mark is now green.

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/android-rating-details.png'/>
</p>

#### Pricing and distribution

Select the `Pricing & Distribution` check mark for the final step: setting the price of your app, and in which countries it will be available.

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/android-pricing-and-distrution.png'/>
</p>

Below this, there are few checkbox questions regarding your app distribution. Check the boxes by Content guidelines and US export laws to indicate your app’s compliance with relevant rules, then scroll to the top of the page and click `Save draft`.

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/android-content-guidelines.png'/>
</p>

### Release the app

Select your `App Release` tab again and select `Edit release` under `Manage Production`:

<p class="image">
<img src='{{ site.url }}/img/tutorials/publish-your-app/android-app-release.png'/>
</p>

Scroll down, click on `Review` button. Check your app details and if you are satisfied, click on `Start rollout to production` button to publish your app in `Google Play Store`. Clicking on the confirm button, you will publish the app in Store!


### Manual republish

If you make some changes in the app (colors, titles, change which extensions you use or their order), you will need to republish your app. Manual republishing of the app requires you to go through all the steps described here except creating new developer account and certificates. 

### Maintaining the app data

Once your app is live, you might want to change data used in the app. The data shown in Shoutem CMS (used in Shoutem Cloud Storage) is live and changes to it will be immedaitely visible in the apps using Shoutem Cloud Storage.