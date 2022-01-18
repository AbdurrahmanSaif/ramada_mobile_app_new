/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, ScrollView } from 'react-native';
import { colors, Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setNavabarOptions } from '../../actions/nav';
import { getProducts } from '../../actions/products';
import LoadingScreen from '../Common/Loading';
// import ProductDetails from './ProductDetails';
import ProductBox from './ProductBox';
import InnerHeader from '../InnerHeader';
import { COLORS } from '../../constants';

export default function Menus({ navigation, route }) {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // const [isVisible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const productList = useSelector(state => state.products.list);

  const cartItems = useSelector(state => state.cart.items);

  const cartItem = id => {
    return cartItems.find(item => item.id === id);
  };

  const { categoryId, categoryName, searchTag } = route.params;

  useEffect(() => {
    if (isFocused) {
      dispatch(
        setNavabarOptions({
          headerTitle: searchTag ? 'Search Results' : categoryName,
        }),
      );

      setLoading(true);
      dispatch(
        getProducts(`ProductsSearch[category_id]=${categoryId}`, 200, page),
      ).then(() => setLoading(false));
    }
  }, [dispatch, isFocused, page, route, categoryId, categoryName, searchTag]);

  const openProduct = product => {
    navigation.navigate('ProductDetails', { product });
  };
  return (
    <>
      <InnerHeader navigation={navigation} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.lightGray4,
          }}>
          {productList.length === 0 ? (
            <Text h4 style={{ color: colors.grey3 }}>
              {route.params?.searchTag
                ? `No search results found for ${route.params?.searchTag}`
                : 'No record found'}
            </Text>
          ) : (
            <>
              <ScrollView>
                <FlatList
                  data={productList}
                  numColumns={2}
                  contentContainerStyle={{
                    flex: 1,
                    marginLeft: 10,
                    marginTop: 13,
                  }}
                  renderItem={({ item }) => (
                    <ProductBox
                      cartItems={cartItems}
                      cartItem={cartItem(item.id)}
                      product={item}
                      onPress={() => openProduct(item)}
                    />
                  )}
                  keyExtractor={item => item?.id.toString()}
                  ListFooterComponent={() => (
                    <ActivityIndicator
                      color={colors.primary}
                      size={20}
                      animating={loading}
                    />
                  )}
                />
              </ScrollView>
            </>
          )}

          {/* <ProductDetails
      product={currentProduct}
      isVisible={isVisible}
      setVisible={setVisible}
    /> */}
        </View>
      )}
    </>
  );
}
