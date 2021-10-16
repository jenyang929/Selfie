# Selfie

![HomePage](./SelfieImages/homepage.png)
![SelfiePage](./SelfieImages/selfiepage.png)
![Camera](./SelfieImages/camera.png)

# About this app

- Created with JavaScript, React Native, and React with a couple of libraries for testing, fonts, react router, AsyncStorage, etc.
- On the home page, you can see all of your photos with a camera icon on the upper right hand corner to take more selfies
- Click on a selfie to view photo details (ex. date and time)
- Click on camera on the home page to take more selfies with only a front-facing camera
- If you also close the app and open it again, you won't lose your photos due to localStorage.

# Setup

This app uses react-native and expo. Expo takes a while to download. 

1. Clone the repo
```
git clone https://github.com/jenyang929/Selfie.git
cd Selfie
```

2. Yarn or npm i to install dependencies
```
yarn
```

```
npm i
```

3. If you don't have expo, you will have to download expo globally which is an iOS simulator. You can also download it onto your phone to use your phone as an emulator. Expo CLI requires node versions of these and above:
```
expo-cli supports following Node.js versions:
* >=12.13.0 <13.0.0 (Maintenance LTS)
* >=14.0.0 <15.0.0 (Active LTS)
* >=15.0.0 <17.0.0 (Current Release)
```

4. You may also need to have watchman installed 
```
brew install watchman
```

5. If you don't have XCode, you need to install that as well. Download XCode app from the app store - this takes time!

6. After you have everything installed, start the app!
```
npm start OR yarn start
```
One thing to note is that iOS simulator does not allow camera functionality but you can still take pictures. You'll just take photos of black screens. Hence I recommend using your phone expo app to act as an emulator. 

7. If you have expo on your phone, once you start the app on your browser, you can use the QR code or use the simulator in your recent project development to start the app. 


# Things to improve

There are always things to help improve the app for the future! Some of these examples are:

1. Tests - more tests the better!
2. CSS - make universal/utility classes to make CSS more readable and reuseable
3. Styling - Use CSS preprocessor and/or design UI libraries to help with styling

...and much more!!

# Boilerplate

Great thanks to this <a href="https://github.com/expo/create-react-native-app">boilerplate!</a>

