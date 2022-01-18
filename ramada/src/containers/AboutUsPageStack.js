/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AboutUsPage from '../components/AboutUsPage';

import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator();

const AboutUsPageStack = ({ navigation, route }) => {
    return (
        <Stack.Navigator screenOptions={{ header: () => <CustomHeader navigation={navigation} route={route} backPath="AboutUsPage" /> }}  >
            <Stack.Screen name="AboutUsPage" component={AboutUsPage} screenOptions={{ header: () => <CustomHeader navigation={navigation} route={route} backPath="AboutUsPage" /> }} />
        </Stack.Navigator >
    );
};

export default AboutUsPageStack;
