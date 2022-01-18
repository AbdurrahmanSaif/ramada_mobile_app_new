/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../actions/cart';
import { getOrderDetails } from '../../actions/orders';

import colors from '../../helpers/colorPalette';
import { backendUrl } from '../../helpers/common';

import { showMessage } from 'react-native-flash-message';

export default function OrderDetails({ setOrder, order, navigation }) {
  const cartItems = useSelector(state => state.orders.currOrder);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getOrderDetails(order.order_id)).then(ack => {
      setLoading(false);

      if (!ack) {
        showMessage({
          message: 'Cannot fetch order details!',
          type: 'danger',
          floating: true,
        });
      }
    });
  }, [dispatch, order.order_id]);

  const onReorder = () => {
    dispatch(
      addItemToCart(
        cartItems.map(item => ({ ...item.product, quantity: item.quantity })),
      ),
    );
    navigation.navigate('Cart');
  };

  return (
    <Modal animationType="slide" transparent={true} visible={!!order}>
      <View style={{ flex: 1, backgroundColor: '#00000066' }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text h4 h4Style={{ color: colors.primary }}>
              You Ordered
            </Text>
            <Icon
              type="ionicon"
              name="close-outline"
              onPress={() => setOrder(null)}
            />
          </View>

          <Text style={{ color: colors.primary }}>
            on {moment(order.order_date).format('Do MMM YYYY')}
          </Text>

          <Text
            style={{
              color: colors.primary,
              fontSize: 20,
              marginTop: 20,
              marginBottom: 5,
            }}>
            Items
          </Text>
          <Divider />

          <FlatList
            data={cartItems}
            renderItem={({ item }) => <OrderItem item={item} />}
            keyExtractor={item => item?.id.toString()}
            ListFooterComponent={() => (
              <ActivityIndicator
                color={colors.primary}
                size={20}
                animating={loading}
              />
            )}
            style={{ marginHorizontal: 10 }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 18 }}>Total: Rs.{order.total_amount}</Text>
            <Button title="Reorder" onPress={onReorder} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const OrderItem = ({ item }) => {
  const additionalField = item.product?.additional_fields;

  let additionalFieldObj = {};

  if (additionalField) {
    additionalFieldObj = JSON.parse(additionalField);
  }

  return (
    <>
      <View style={styles.foodContainer}>
        <Image
          source={{
            uri: `${backendUrl}/data/products/${item.product.id}/290x290-${item.product.main_image}`,
          }}
          style={styles.image}
        />
        <View style={{ marginLeft: 12, justifyContent: 'center' }}>
          <Text style={{ fontWeight: '700' }}>{item.product.name}</Text>
          <Text
            style={{
              color: colors.secondary,
              fontSize: 11,
              paddingVertical: 2,
            }}>
            Rs. {item.product.selling_price} x {item.quantity}
          </Text>

          {additionalFieldObj?.item_weight ? (
            <Text style={styles.item_weight}>
              Weight: ({additionalFieldObj.item_weight})
            </Text>
          ) : null}

          <Text
            style={{ color: colors.primary, fontWeight: 'bold', fontSize: 16 }}>
            Rs. {item.product.selling_price * item.quantity}
          </Text>
        </View>
      </View>

      <Divider style={{ borderBottomColor: colors.primary }} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    height: Dimensions.get('window').height - 100,
    width: Dimensions.get('window').width,
    elevation: 10,
  },
  item_weight: {
    fontSize: 11,
    marginVertical: 2,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodContainer: {
    margin: 6,
    flexDirection: 'row',
  },
  image: {
    marginVertical: 5,
    height: 140,
    width: 140,
    borderRadius: 6,
  },
  imageTile: {
    height: 50,
    width: 50,
    marginTop: 10,
    marginRight: 10,
  },
  cartButtonContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    height: 40,
    flex: 2,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 10,
    marginRight: 10,
  },
  attributeName: {
    marginBottom: 5,
    marginRight: 10,
    fontSize: 16,
    fontWeight: '700',
    color: colors.grey2,
  },
});
