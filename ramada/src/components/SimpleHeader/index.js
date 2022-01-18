/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import colorPalette from '../../helpers/colorPalette';
import colors from '../../helpers/colorPalette';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { SET_PENDING_NOTIFICATION_COUNT } from '../../constants/actionTypes';
import { getNotifications } from '../../actions/notifications';

const SimpleHeader = ({ showBack, navigation, hideTopIcons }) => {
  const { headerTitle, foodTab, parentScreen } = useSelector(state => state.nav);

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

  const onBackPress = () => {

    navigation.popToTop();
    navigation.navigate(parentScreen);

  };

  return (
    <View style={styles.headerContainer}>
      <View style={{ ...styles.logoContainer, paddingBottom: foodTab ? 1 : 15 }}>

        <View style={styles.leftButtons}>
          {showBack ? <Icon
            containerStyle={{ paddingLeft: 10, top: 4 }}
            color="white"
            type="ionicon"
            size={30}
            name="md-arrow-back"
            onPress={onBackPress}
          />
            : <Icon
              containerStyle={{ paddingLeft: 10, top: 4 }}
              color="white"
              type="ionicon"
              size={30}
              name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
              onPress={navigation.openDrawer}
            />
          }
        </View>

        <Text
          style={styles.headerTitle}
          ellipsizeMode="head">
          {headerTitle}
        </Text>

        <View style={styles.rightButtons} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primary,
    height: 40,
  },

  headerTitle: {
    marginRight: 50,
    top: 2,
    color: colorPalette.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SimpleHeader;
