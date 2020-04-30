cd android
./gradlew clean
./gradlew bundleRelease
cd ..
adb uninstall com.taswookapp
react-native run-android --variant=release