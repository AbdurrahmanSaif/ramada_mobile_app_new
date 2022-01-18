/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Cart from '../components/Cart';
import Notifications from '../components/Notifications';
import Shipping from '../components/Shipping';
import Checkout from '../components/Checkout';
import CustomHeader from '../components/CustomHeader';
import Products from '../components/Products';
import ProductDetails from '../components/Products/ProductDetails';
// import Orders from '../components/Orders';
// import Profile from '../components/Profile';

const Stack = createStackNavigator();

const InnerStack = ({ navigation, route }) => {

  return (
    <Stack.Navigator initialRouteName="Inner" screenOptions={{ header: () => <CustomHeader navigation={navigation} route={route} /> }}  >
      <Stack.Screen name="Products" component={Products} options={{ header: () => <CustomHeader showBack={true} navigation={navigation} route={route} /> }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false}} />
      <Stack.Screen name="Cart" component={Cart} options={{ header: () => <CustomHeader showBack={true} navigation={navigation} route={route} /> }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{ header: () => <CustomHeader showBack={true} navigation={navigation} route={route} /> }} />
      <Stack.Screen name="Shipping" component={Shipping} options={{ header: () => <CustomHeader showBack={true} navigation={navigation} route={route} /> }} />
      <Stack.Screen name="Checkout" component={Checkout} options={{ header: () => <CustomHeader showBack={true} navigation={navigation} route={route} /> }} />
    </Stack.Navigator>
  );
};

export default InnerStack;
