import React from "react";
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
// import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialBottomTabNavigator} from "react-native-paper/react-navigation";
import HomeScreen from "./src/screens/viaBottomTab/homeScreen";
import MapScreen from "./src/screens/viaBottomTab/mapScreen";
import SetScreen from "./src/screens/viaBottomTab/setScreen";
import ListScreen from "./src/screens/viaStack/listScreen";
// import StackNav from "./src/screens/StackNav";

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

function TabNav() {
  return (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Oases" component={OasesNav}/>
    <Tab.Screen name="Settings" component={SetScreen}/>
  </Tab.Navigator>
  );
}

function OasesNav() {
  return ( //listscreen should be reached through button on the mapscreen
      <Stack.Navigator>
          <Stack.Screen name="MapScreen" component={MapScreen}/>
          <Stack.Screen name="ListScreen" component={ListScreen}/>
      </Stack.Navigator>
  )
}

const App = () => {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <TabNav/>
        </NavigationContainer>
      </SafeAreaProvider>
          );
};

export default App;