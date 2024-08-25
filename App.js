import React from "react";
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createMaterialBottomTabNavigator} from "react-native-paper/react-navigation";
import HomeScreen from "./src/screens/viaBottomTab/homeScreen";
import MapScreen from "./src/screens/viaStack/mapScreen";
import SetScreen from "./src/screens/viaBottomTab/setScreen";
import ListScreen from "./src/screens/viaStack/listScreen";
import { ThemeProvider } from './src/hooks/themeProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

// Function that sets up the bottom tab navigation
// Linking stack navigator through the oases tab
function TabNav() {
  return (
  <Tab.Navigator>
    <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={24} />
            ),
        }}/>
      <Tab.Screen
          name="Oases"
          component={OasesNav}
          options={{
              tabBarLabel: 'Oases',
              tabBarIcon: ({ color }) => (
                  <Icon name="map" color={color} size={24} />
              ),
          }}
      />
    <Tab.Screen
        name="Settings"
        component={SetScreen}
        options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
                <Icon name="cog" color={color} size={24} />
            ),
        }}
    />
  </Tab.Navigator>
  );
}

// Function that sets up the stack navigation for the Oases tab
// So MapScreen and ListScreen can be reached
function OasesNav() {
  return (
      <Stack.Navigator>
          <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ListScreen" component={ListScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
  )
}

// Main app component, wrapped in themeProvider
// With TabNAv as main navigation
const App = () => {
  return (
      <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <TabNav/>
        </NavigationContainer>
      </SafeAreaProvider>
      </ThemeProvider>
          );
};

export default App;