/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import ScreenNum1 from './src/ScreenNum1';
import ScreenNum2 from './src/ScreenNum2';

import { Navigation } from "react-native-navigation";

Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);
Navigation.registerComponent(`navigation.playground.ScreenNum1`, () => ScreenNum1);
Navigation.registerComponent(`navigation.playground.ScreenNum2`, () => ScreenNum2);

Navigation.events().registerAppLaunchedListener(() => {
Navigation.setDefaultOptions({
      topBar: {
        title: {
          text: 'My App'
        }
      }
});


  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: "navigation.playground.WelcomeScreen"
          },
        }]
      }
    }
  });
});

