## News App Documentation

### About

The News App shows top headlines and gives user to pin and delete the header through swiping the news

The app is built using React Native and consists of multiple components and utility files.

### Installation and Usage

To use the News app, follow these steps:

1. Ensure you have React Native and its dependencies set up on your development machine.
2. Clone the project repository and navigate to the project directory.
3. Run `npm install` or `yarn` to install the required dependencies.
4. Connect a device or start an emulator/simulator.
5. Run `yarn start` or `npm start`
6. Run `npx react-native run-android` or `yarn react-native run-android` (for Android) or `npx react-native run-ios` or `yarn react-native run-ios`(for iOS) to launch the app.

Once the app is opened, a spalsh screen will be shown and then a list view of headlines will be seen.

### Components

The app is composed of the following components:

1. **App**: The root component of the app. It is the entry point of the app.
2. **NewsList** : Used for rendering the news list and the pin message
3. **News**: Individual news list item is configured through this.

### Utility Files

The app also includes the following utility files:

1. **TextLiterals**: Contains constant strings used in the app.
2. **CommonStyles**: Defines common styles used throughout the app.
3. **Functions**: Defines common functions and hooks used throughout the app.
4. **Hooks**: Defines the custom hook to manage the business logic for the UI.

### Customization and Extensibility

This app can be customized and extended in several ways:

- **UI Styling**: The app's visual appearance can be customized by modifying the styles defined in the components' style objects.
- **TextLiterals**: Can be helpful on future when localization is enabled

### Libraries used :

1. **@react-native-async-storage/async-storage** : Acts as localstorage for app.
2. **react-native-bootsplash** : Enables splash screen
3. **react-native-gesture-handler** : Used for handling gestures.

### References

This app is developed using various open-source libraries and resources. The following are the main technologies used:

- React Native: https://reactnative.dev/
- React: https://react.dev/

###  Video



https://github.com/mabarm/NewsApp/assets/25671335/a32948d5-b76c-4073-92f4-dec8812b12d4


## Conclusion

Use this information as a guide to understand and make modifications to the app according to your needs.
