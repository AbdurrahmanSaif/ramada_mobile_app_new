1. git clone
2. npm install

to see list of installed emulators.
./emulator -list-avds

3. start emulator either from android studio or from the given command.
   cd /Users/mohdshahid/Library/Android/sdk/tools
   ./emulator -avd Pixel_2_API_26

4. Then
   cd /Users/mohdshahid/Documents/nodejs/poc/shahid/projects/avon_mobile_app
   react-native run-android

# TODO:

- [x] Rename ShippingForm to AddressForm
- [x] Show msg on error while shipping
- [x] Shipping -> last selected address must be selected by default
- [x] Shipping -> show loader in button after submit
- [x] Login -> save last used phone number
- [x] Persistence storage is not working
- [ ] Orders Page -> Order list is not showing
- [ ] Orders Page -> address must be shown with order
- [ ] On app load -> it shows the grey bg for a second but it should show a white bg
- [ ] Fix warnings
- [ ] Delete unused codes

# Building APK file

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

cd android
./gradlew assembleDebug

You can find .apk file here which you can send to other on whatsapp
android/app/build/outputs/apk/debug/app-armeabi-v7a-debug.apk
