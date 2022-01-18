/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SearchPage from '../components/SearchPage';
import CustomHeader from '../components/CustomHeader';
import Home from '../components/Home';
// import Orders from '../components/Orders';
// import Profile from '../components/Profile';

const Stack = createStackNavigator();

const HomeStack = ({ navigation, route }) => {

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ header: () => <CustomHeader navigation={navigation} route={route} /> }}  >
      <Stack.Screen name="Home" component={Home} screenOptions={{ header: () => <CustomHeader navigation={navigation} route={route} /> }} />
      <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerShown: false }}/>
      {/* <Stack.Screen name="Categories" component={Categories} options={{ header: () => <CustomHeader showBack={true} navigation={navigation} route={route} backPath="Home" /> }} /> */}
      {/* <Stack.Screen name="OrdersList" component={Orders} /> */}
      {/* <Stack.Screen name="Videos" component={VideosGallery} /> */}
      {/* <Stack.Screen name="Images" component={ImagesGallery} /> */}
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
