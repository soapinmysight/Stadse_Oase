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
    <Tab.Screen name="HomeScreen" component={HomeScreen}/>
      <Tab.Screen name="StackNav" component={StackNav}/>
    <Tab.Screen name="SetScreen" component={SetScreen}/>
  </Tab.Navigator>
  );
}

function StackNav() {
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