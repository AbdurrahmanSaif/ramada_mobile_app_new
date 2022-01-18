/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Account from '../components/Account';
// import ProfileForm from '../components/Profile/ProfileForm';
import InnerHeader from '../components/InnerHeader';

const Stack = createStackNavigator();

const AccountStack = ({ navigation, route }) => {

    return (
        <Stack.Navigator initialRouteName="Account" screenOptions={{ headerShown: false }}  >
            <Stack.Screen name="Account" component={Account} screenOptions={{ header: () => <InnerHeader navigation={navigation} route={route} backPath="Account" /> }} />
        </Stack.Navigator >
    );
};

export default AccountStack;
