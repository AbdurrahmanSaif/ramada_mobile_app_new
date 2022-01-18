/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Orders from '../components/Orders';

import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator();

const OrdersStack = ({ navigation, route }) => {

    return (
        <Stack.Navigator initialRouteName="Orders" screenOptions={{ header: () => <CustomHeader navigation={navigation} route={route} backPath="Orders" /> }}  >
            <Stack.Screen name="Orders" component={Orders} screenOptions={{ header: () => <CustomHeader navigation={navigation} route={route} backPath="Orders" /> }} />
        </Stack.Navigator >
    );
};

export default OrdersStack;
