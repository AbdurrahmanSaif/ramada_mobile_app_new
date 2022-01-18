/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ContactUs from '../components/ContactUs';

import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator();

const ContactUsStack = ({ navigation, route }) => {

    return (
        <Stack.Navigator initialRouteName="ContactUs" screenOptions={{ header: () => <CustomHeader navigation={navigation} route={route} backPath="ContactUs" /> }}  >
            <Stack.Screen name="ContactUs" component={ContactUs} screenOptions={{ header: () => <CustomHeader navigation={navigation} route={route} backPath="ContactUs" /> }} />
        </Stack.Navigator >
    );
};

export default ContactUsStack;
