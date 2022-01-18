/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PoliciesPage from '../components/PoliciesPage';

import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator();

const PoliciesPageStack = ({ navigation, route }) => {
    return (
        <Stack.Navigator screenOptions={{ header: () => <CustomHeader navigation={navigation} route={route} backPath="PoliciesPage" /> }}  >
            <Stack.Screen name="PoliciesPage" component={PoliciesPage} screenOptions={{ header: () => <CustomHeader navigation={navigation} route={route} backPath="PoliciesPage" /> }} />
        </Stack.Navigator >
    );
};

export default PoliciesPageStack;
