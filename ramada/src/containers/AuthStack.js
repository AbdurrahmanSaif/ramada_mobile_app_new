/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../components/Login';
import ForgetPassword from '../components/ForgetPassword';

import SimpleHeader from '../components/SimpleHeader';
import SignUp from '../components/SignUp';

const Stack = createStackNavigator();

const AuthStack = ({ navigation, route }) => {

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ header: () => <SimpleHeader navigation={navigation} route={route} backPath="Auth" /> }}  >
            <Stack.Screen name="Login" component={Login} screenOptions={{ header: () => <SimpleHeader navigation={navigation} route={route} backPath="Auth" /> }} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ header: () => <SimpleHeader showBack={true} hideTopIcons={true} navigation={navigation} route={route} /> }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ header: () => <SimpleHeader showBack={true} hideTopIcons={true} navigation={navigation} route={route} /> }} />
        </Stack.Navigator >
    );
};

export default AuthStack;
