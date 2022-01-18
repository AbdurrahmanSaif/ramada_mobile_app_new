/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FONTS, icons } from '../src/constants';
import HomeStack from '../src/containers/HomeStack';
import CategoriesStack from '../src/containers/CategoriesStack';
import AccountStack from '../src/containers/AccountStack';
import LabTests from '../src/components/LabTests';
import SearchPage from '../src/components/SearchPage';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}>
        <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
          <Svg width={70} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>

        <TouchableOpacity
          style={{
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
            width: 65,
            height: 65,
            borderRadius: 29,
            backgroundColor: COLORS.white,
          }}
          onPress={onPress}>
          <View
            style={{
              width: 55,
              height: 45,
              backgroundColor: COLORS.primary,
              borderRadius: 30,
            }}>
            {children}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 65,
          backgroundColor: COLORS.white,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = props => {
  return <BottomTabBar {...props.props} />;
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          // backgroundColor: 'transparent',
          height: 62,
          elevation: 0,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  width: focused ? 18 : 20,
                  height: 25,
                  tintColor: focused ? COLORS.white : COLORS.secondary,
                }}
              />
              <Text
                style={{
                  marginTop: 2,
                  ...FONTS.body6,
                  color: focused ? COLORS.primary : COLORS.secondary,
                  position: focused ? 'absolute' : 'relative',
                  bottom: focused ? -17 : 0,
                  fontWeight: focused ? '700' : 'normal',
                }}>
                Home
              </Text>
            </>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={icons.search}
                resizeMode="contain"
                style={{
                  width: focused ? 18 : 20,
                  height: 25,
                  tintColor: focused ? COLORS.white : COLORS.secondary,
                }}
              />
              <Text
                style={{
                  marginTop: 2,
                  ...FONTS.body6,
                  color: focused ? COLORS.primary : COLORS.secondary,
                  position: focused ? 'absolute' : 'relative',
                  bottom: focused ? -17 : 0,
                  fontWeight: focused ? '700' : 'normal',
                }}>
                Search
              </Text>
            </>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Categories"
        component={CategoriesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={icons.list}
                resizeMode="contain"
                style={{
                  width: focused ? 20 : 22,
                  height: 25,
                  tintColor: focused ? COLORS.white : COLORS.secondary,
                }}
              />
              <Text
                style={{
                  marginTop: 2,
                  ...FONTS.body6,
                  color: focused ? COLORS.primary : COLORS.secondary,
                  position: focused ? 'absolute' : 'relative',
                  bottom: focused ? -17 : 0,
                  fontWeight: focused ? '700' : 'normal',
                }}>
                Categories
              </Text>
            </>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="lab"
        component={LabTests}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={icons.chemistry}
                resizeMode="contain"
                style={{
                  width: focused ? 18 : 20,
                  height: 25,
                  tintColor: focused ? COLORS.white : COLORS.secondary,
                }}
              />
              <Text
                style={{
                  marginTop: 2,
                  ...FONTS.body6,
                  color: focused ? COLORS.primary : COLORS.secondary,
                  position: focused ? 'absolute' : 'relative',
                  bottom: focused ? -17 : 0,
                  fontWeight: focused ? '700' : 'normal',
                }}>
                Lab Tests
              </Text>
            </>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="User"
        component={AccountStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={icons.user}
                resizeMode="contain"
                style={{
                  width: focused ? 18 : 20,
                  height: 25,
                  tintColor: focused ? COLORS.white : COLORS.secondary,
                }}
              />
              <Text
                style={{
                  marginTop: 2,
                  ...FONTS.body6,
                  color: focused ? COLORS.primary : COLORS.secondary,
                  position: focused ? 'absolute' : 'relative',
                  bottom: focused ? -17 : 0,
                  fontWeight: focused ? '700' : 'normal',
                }}>
                Account
              </Text>
            </>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
