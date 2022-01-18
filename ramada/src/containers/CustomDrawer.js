/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { showMessage } from 'react-native-flash-message';

import { Avatar, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import colorPalette from '../helpers/colorPalette';
import { initials } from '../helpers/common';
import { getToken } from '../helpers/storage';
import HomeStack from './HomeStack';
import CategoriesStack from './CategoriesStack';
import AuthStack from './AuthStack';

import colors from '../helpers/colorPalette';
import OrdersStack from './OrdersStack';
import ProfileStack from './ProfileStack';
import ContactUsStack from './ContactUsStack';
import PoliciesPageStack from './PoliciesPageStack';
import AboutUsPageStack from './AboutUsPageStack';
import { logout } from "../actions/customer";


const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {

  const customer = useSelector(state => state.auth.profile);
  const authToken = useSelector(state => state.auth.authToken);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    showMessage({
      message: 'Logged out successfully!',
      type: 'success',
      floating: true,
    });
  };

  return (
    <DrawerContentScrollView style={{ backgroundColor: '#f5f5f5' }}  {...props}>
      <View style={{ flex: 1, alignItems: 'flex-end', paddingTop: 5, paddingRight: 10 }}>
        <Icon
          color={'black'}
          containerStyle={{ paddingLeft: 10 }}
          type="ionicon"
          name="close-outline"
          onPress={props.navigation.closeDrawer}
        />
      </View>
      <View style={{ width: '100%', alignItems: 'center', marginVertical: 0 }}>
        <Avatar
          title={initials(customer?.name)}
          size={140}
          rounded
          imageProps={{ resizeMode: 'contain' }}
          source={require('../assets/images/logo-png.png')}
          // containerStyle={{backgroundColor: ''}}
        />
      </View>

      <DrawerItemList {...props} />

      {authToken ?
        <DrawerItem
          label="Logout"
          labelStyle={{ color: 'black' }}
          icon={() => <Icon color={'black'} type="ionicon" name="exit-outline" />}
          onPress={onLogout}
        /> : null}

    </DrawerContentScrollView>
  );
};


export default function CustomDrawer({ route: { params } }) {

  const authToken = useSelector(state => state.auth.authToken);

  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent loadingToken={params?.loadingToken} {...props} />}
      drawerStyle={{ color: colorPalette.primary }}
      drawerContentOptions={{
        activeBackgrundColor: colors.black,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.black,
      }}
    >

      <Drawer.Screen
        name="Home"
        component={HomeStack}
        initialParams={{ screen: 'Home', params: { title: 'Home' } }}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => <Icon type="font-awesome-5" color={color} size={size} name="home"
          />,
        }}
      />

      <Drawer.Screen
        name="Categories"
        component={CategoriesStack}
        options={{ drawerIcon: ({ color, size }) => <Icon type="font-awesome-5" color={color} size={size} name="list" /> }}
      />

      {authToken ?
        <Drawer.Screen
          name="My Orders"
          component={OrdersStack}
          options={{
            drawerIcon: ({ color, size }) => <Icon type="font-awesome-5" color={color} size={size} name="list-alt" />,
          }}
        /> : null}

      <Drawer.Screen
        name="Policies"
        component={PoliciesPageStack}
        options={{ drawerIcon: ({ color, size }) => <Icon type="font-awesome-5" color={color} size={size} name="list-alt" /> }}
      />

      <Drawer.Screen
        name="About Us"
        component={AboutUsPageStack}
        options={{ drawerIcon: ({ color, size }) => <Icon type="font-awesome-5" color={color} size={size} name="list-alt" /> }}
      />

      <Drawer.Screen
        name="Contact Us"
        component={ContactUsStack}
        options={{ drawerIcon: ({ color, size }) => <Icon type="font-awesome-5" color={color} size={size} name="envelope-open" /> }}
      />

      {authToken ? <Drawer.Screen
        name="My Profile"
        component={ProfileStack}
        options={{ drawerIcon: ({ color, size }) => <Icon type="font-awesome-5" color={color} size={size} name="user-alt" /> }}
      /> :
        <Drawer.Screen
          name="Login"
          initialParams={{ screen: 'Auth', params: { title: 'Auth' } }}
          component={AuthStack}
          options={{
            drawerIcon: ({ color, size }) => <Icon type="font-awesome-5" color={color} size={size} name="sign-in-alt" />,
          }}
        />}

    </Drawer.Navigator>
  );
}
