/** @format */

import { AppRegistry } from 'react-native';
import App from './App';

import MovieScreen from './MovieScreen';

import { Navigation } from 'react-native-navigation';

Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);
Navigation.registerComponent(
  `navigation.playground.movieScreen`,
  () => MovieScreen
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      title: {
        text: 'My App',
      },
    },
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'navigation.playground.WelcomeScreen',
            },
          },
        ],
      },
    },
  });
});
