import React, {Component} from 'react';
import Text from 'react-native'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import * as Font from "expo-font";
import { Platform, ActivityIndicator, StatusBar, View } from "react-native";
import Login from "./screens/LoginScreen";
import Home from "./screens/HomeScreen";
import NavigationService from "./service/navigation";

const Container = createStackNavigator (
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    }
  },
  {
    initialRouteName: "Login",
  }
);

const AppContainer = createAppContainer(Container);

class App extends Component {                                                                                                                                                                                                                                                                                                                                                         
  state = {
    fontsAreLoaded: false,
    notification: {},
 };

 async componentWillMount() {
  await Font.loadAsync({
    "Rubik-Black": require("./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf"),
    "Rubik-BlackItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf"),
    "Rubik-Bold": require("./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf"),
    "Rubik-BoldItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf"),
    "Rubik-Italic": require("./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf"),
    "Rubik-Light": require("./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf"),
    "Rubik-LightItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf"),
    "Rubik-Medium": require("./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf"),
    "Rubik-MediumItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf"),
    "Rubik-Regular": require("./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
    "rubicon-icon-font": require("./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf")
   });
  }
  
  render() {
  
    return (
      <>
         <StatusBar
            translucent
            barStyle={
               Platform.OS == "ios" ? "dark-content" : "light-content"
            }
         />
          <AppContainer
            ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
               }}
            />
      </>
   );
  }
}

export default App;