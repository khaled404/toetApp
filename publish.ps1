cd android
./gradlew clean
./gradlew bundleRelease
cd ..
adb uninstall com.tasawk.toet
react-native run-android --variant=release