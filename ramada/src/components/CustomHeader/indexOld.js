/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text, withBadge } from 'react-native-elements';
import { useSelector } from 'react-redux';
import colorPalette from '../../helpers/colorPalette';
import colors from '../../helpers/colorPalette';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { SET_PENDING_NOTIFICATION_COUNT } from '../../constants/actionTypes';
import { getNotifications } from '../../actions/notifications';

const CustomHeader = ({ showBack, navigation, hideTopIcons }) => {
  const { headerTitle, parentScreen } = useSelector(state => state.nav);

  const cartItems = useSelector(state => state.cart.items);
  const notifications = useSelector(state => state.notifications);

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('last_notifications_count', 0).then(count => {
      if (count) {
        if (notifications.data.length !== 0) {
          dispatch({ type: SET_PENDING_NOTIFICATION_COUNT, count: notifications.data.length - parseInt(count) });
        }
      }
    });
  }, [dispatch, notifications.data]);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);


  const showCart = () => {
    navigation.navigate('Cart');
  };

  const showNotifications = () => {
    navigation.navigate('Notifications');
  };

  const showSearchPage = () => {
    navigation.navigate('SearchPage');
  };


  const badgeCounter = {
    left: 15,
    top: -3,
    width: 25,
    badgeStyle: {
      backgroundColor: colors.primary,
      borderWidth: 1,
    },
  };

  const cartCount = cartItems.length;

  const CartIcon = cartCount === 0 ? Icon : withBadge(cartCount > 9 ? '9+' : `${cartCount}`, { ...badgeCounter, width: cartCount > 9 ? 12 : 18 })(Icon);

  const notificationCount = notifications.pendingNotifications;

  const NotificationIcon = notificationCount === 0 ? Icon : withBadge(notificationCount > 9 ? '9+' : `${notificationCount}`, { ...badgeCounter, top: -3, left: 10, width: notificationCount > 9 ? 25 : 18 })(Icon);

  const onBackPress = () => {

    navigation.popToTop();
    navigation.navigate(parentScreen);

  };

  return (
    <View style={styles.headerContainer}>
      <View style={{ ...styles.logoContainer}}>

        <View style={styles.leftButtons}>
          {showBack ? <Icon
            containerStyle={{ paddingLeft: 10 }}
            color="white"
            type="ionicon"
            size={30}
            name="md-arrow-back"
            onPress={onBackPress}
          />
            : <Icon
              containerStyle={{ paddingLeft: 10}}
              color="white"
              type="ionicon"
              size={30}
              name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
              onPress={navigation.openDrawer}
            />
          }

          {hideTopIcons ||
            <View style={{ marginLeft: 30, alignSelf: 'center'}} >
              <TouchableOpacity onPress={showNotifications}>
                <NotificationIcon color="white" type="font-awesome-5" size={20} name="bell" />
              </TouchableOpacity>
            </View>}


        </View>

        {!headerTitle || headerTitle.toLowerCase() === 'home' ? (
          <View/>) : (<Text
            style={styles.headerTitle}
            ellipsizeMode="head">
            {headerTitle}
          </Text>)}


        <View style={styles.rightButtons}>
          {hideTopIcons ||
            <View style={{ marginRight: 40}} >
              <TouchableOpacity onPress={showSearchPage}>
                <Icon color="white" type="font-awesome-5" name="search" size={20} />
              </TouchableOpacity>
            </View>}

          {hideTopIcons ||
            <View style={{ marginRight: 24 }} >
              <TouchableOpacity onPress={showCart}>
                <CartIcon color="white" type="font-awesome-5" name="shopping-cart" size={18} />
              </TouchableOpacity>
            </View>
          }
        </View>


      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primary,
    height: 40,
    justifyContent: 'space-between',
    display: 'flex',
    paddingTop: 5,
  },
  headerLogo: {
    height: 60,
    width: 120,
    resizeMode: 'contain',
    marginTop: 4,
    position: 'absolute',
    top: -2,
    left: '34%',
  },
  headerTitle: {
    color: colorPalette.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInputContainer: {
    borderColor: colorPalette.primary,
    backgroundColor: colorPalette.primary,
    margin: 6,
    elevation: 20,
    borderRadius: 30,
  },
  searchContainer: {
    backgroundColor: colorPalette.secondary,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingVertical: 5,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftButtons: {
    flexDirection: 'row',
  },
  rightButtons: {
    flexDirection: 'row',
  },


});

export default CustomHeader;
