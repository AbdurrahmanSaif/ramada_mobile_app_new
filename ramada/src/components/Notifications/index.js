/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Button, Divider, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import EmptyNotifications from '../../../src/assets/images/empty-notifications.png';
import { setNavabarOptions } from '../../actions/nav';

import AsyncStorage from '@react-native-async-storage/async-storage';

import colorPalette from '../../helpers/colorPalette';
import { SET_PENDING_NOTIFICATION_COUNT } from "../../constants/actionTypes";

const Notifications = ({ route, navigation }) => {

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const notifications = useSelector(state => state.notifications);

  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'Notifications' }));
    }
  }, [dispatch, isFocused]);

  useEffect(() => {
    AsyncStorage.setItem('last_notifications_count', `${notifications.data.length}`);
    dispatch({ type: SET_PENDING_NOTIFICATION_COUNT, count: 0 });
  }, [notifications.data.length]);

  return (
    <View>
      {notifications.data.length === 0 ? (
        <View style={styles.container}>
          <Image source={EmptyNotifications} style={styles.image} />
          <View style={{ flex: 1 }}>
            <Text style={styles.emptyText}>No Notifications</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={notifications.data}
          keyExtractor={item => item.id?.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.nameContainer}>
                <View>
                  <Text style={styles.nameTxt}>{item.title}</Text>
                </View>
                <View >
                  <Text style={styles.sellingPrice}>Rs. {item.message}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Notifications;


const styles = StyleSheet.create({
  theImage: {
    width: 80,
    height: 80,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  listEndItem: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButton: {
    height: 35,
    width: 100,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  carouselBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemTitle: {
    fontWeight: '700',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 60,
    margin: 10,
  },
  pic: {
    width: 50,
    height: 50,
  },
  row: {
    display: "flex",
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  nameContainer: {
    margin: 2,
    flexGrow: 1,
  },
  nameTxt: {
    marginBottom: 2,
    marginLeft: 10,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  sellingPrice: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
    marginLeft: 10,
  },
  icon: {
    height: 28,
    width: 28,
  },

});

