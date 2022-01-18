/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Categories from '../components/Categories';

import InnerHeader from '../components/InnerHeader';

const Stack = createStackNavigator();

const CategoriesStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        header: () => (
          <InnerHeader
            navigation={navigation}
            route={route}
            backPath="Categories"
          />
        ),
      }}>
      <Stack.Screen
        name="Categories"
        component={Categories}
        screenOptions={{
          header: () => (
            <InnerHeader
              navigation={navigation}
              route={route}
              backPath="Categories"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default CategoriesStack;
