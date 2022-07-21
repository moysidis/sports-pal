import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileMapScreen from '../screens/ProfileMapScreen';
import MapScreen from '../screens/MapScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatListScreen from '../screens/ChatListScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MapChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TheMap" component={MapScreen} />
      <Stack.Screen name="TheChat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TheProfile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const ChatListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TheChatList" component={ChatListScreen} />
      <Stack.Screen name="TheChat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const TabFlow = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveBackgroundColor: 'lightgreen',
      }}
    >
      <Tab.Screen
        name="MapChat"
        component={MapChatStack}
        options={{
          tabBarIcon: (tabInfo) => (
            <Feather name="map-pin" size={35} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatListStack}
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons name="chatbox-outline" size={35} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: (tabInfo) => (
            <FontAwesome5 name="user-circle" size={35} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="TabView" component={TabFlow} />
        <Stack.Screen name="TheProfileMap" component={ProfileMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
