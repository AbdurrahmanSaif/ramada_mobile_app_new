/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setNavabarOptions } from '../../actions/nav';
import { getAllOrder } from '../../actions/orders';
import colors from '../../helpers/colorPalette';
import OrderDetails from './OrderDetails';
import InnerHeader from '../InnerHeader';

export default function Orders({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const orders = useSelector(state => state.orders.list);
  const [loading, setLoading] = useState(false);
  const [lastPage, setPage] = useState(1);
  const [selectedOrder, setOrder] = useState(null);
  useEffect(() => {
    if (isFocused) {
      dispatch(
        setNavabarOptions({
          headerTitle: 'My Orders',
          parentScreen: 'My Orders',
        }),
      );
    }
  }, [dispatch, isFocused]);

  const fetchOrder = useCallback(() => {
    setLoading(true);
    dispatch(getAllOrder(lastPage)).then(() => {
      setLoading(false);
    });
  }, [dispatch, lastPage]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const onGoToDetails = order => {
    setOrder(order);
  };

  return (
    <>
    <InnerHeader navigation={navigation} />
      <ScrollView>
        <View>
          {loading && orders.length === 0 && (
            <ActivityIndicator color={colors.primary} />
          )}
          {!loading && orders.length === 0 ? (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '60%',
              }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'gray' }}>
                No orders found
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                data={orders}
                keyExtractor={item => item.id}
                scrollEnabled
                style={{ padding: 12 }}
                onEndReached={() => fetchOrder()}
                renderItem={({ item }) => {
                  console.log('item::', item);
                  return (
                    <View
                      style={[
                        styles.orderCard,
                        item.order_status === 'Delivered'
                          ? styles.orderCardDone
                          : null,
                      ]}>
                      <TouchableNativeFeedback
                        onPress={() => onGoToDetails(item)}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.cardHeading} ellipsizeMode="tail">
                            Order Id: #{item.order_id}
                          </Text>
                          <Icon
                            type="ionicon"
                            name="chevron-forward-outline"
                            color={colors.secondary}
                          />
                        </View>
  
                        <Text
                          style={[
                            styles.orderPending,
                            item.order_status === 'Delivered'
                              ? styles.orderDone
                              : null,
                          ]}>
                          Order Status: {item.order_status}
                        </Text>
  
                        <Text style={{ fontWeight: '700', marginBottom: 10 }}>
                          Rs. {item.total_amount}
                        </Text>
                        <Text style={{ color: 'gray' }}>
                          {moment(item.order_date).fromNow()}
                        </Text>
                      </TouchableNativeFeedback>
                    </View>
                  );
                }}
                ListFooterComponent={() => (
                  <ActivityIndicator
                    color={colors.primary}
                    size={20}
                    animating={loading}
                  />
                )}
                refreshing={loading}
                onRefresh={() => {
                  setPage(1);
                  fetchOrder();
                }}
                pagingEnabled
              />
            </>
          )}
          {selectedOrder && (
            <OrderDetails
              order={selectedOrder}
              setOrder={setOrder}
              navigation={navigation}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  orderCard: {
    minHeight: 50,
    flexGrow: 1,
    marginVertical: 7,
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  orderCardDone: {
    borderWidth: 1,
    borderColor: 'green',
  },
  cardHeading: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: '700',
  },
  orderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'red',
  },
  orderPending: {
    fontWeight: '700',
    color: 'red',
    marginBottom: 6,
  },
  orderDone: {
    color: 'green',
  },
});
