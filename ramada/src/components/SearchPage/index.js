/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EmptyImage from '../../../src/assets/images/search-lens.png';
import { setNavabarOptions } from '../../actions/nav';
import { searchProducts } from '../../api/items';
import colorPalette from '../../helpers/colorPalette';
import ProductRowBox from '../Products/ProductRowBox';
import { COLORS, icons } from '../../constants';
// import ProductDetails from '../Products/ProductDetails';

var timer;

const SearchPage = ({ route, navigation }) => {
  const cartItems = useSelector(state => state.cart.items);

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const [searchResult, searchSearchResult] = useState([]);

  const [loading, setLoading] = useState(false);

  console.log('searchResult::', searchResult);
  console.log('resultFound::', resultFound);

  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'Search' }));
    }
  }, [dispatch, isFocused]);

  // const [selectedProduct, setSelectedProduct] = useState({});
  // const [visible, setVisible] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState('');

  const [resultFound, setResultFound] = useState(true);

  // const onPress = product => {
  //   setSelectedProduct(product);
  //   setVisible(true);
  // };

  const onPress = product => {
    navigation.navigate('ProductDetails', { product });
  };

  const clearSearch = useCallback(() => {
    setLoading(false);
    setResultFound(true);
    searchSearchResult([]);
    setSearchKeyword('');
  }, []);

  const updateSearch = useCallback(
    value => {
      setSearchKeyword(value);

      if (timer) {
        clearTimeout(timer);
      }

      setLoading(true);
      setResultFound(true);
      searchSearchResult([]);

      timer = setTimeout(function () {
        if (searchKeyword) {
          searchProducts(searchKeyword).then(result => {
            searchSearchResult(result);
            if (result.length === 0) {
              setResultFound(false);
            }
          });
        }

        setLoading(false);
      }, 2000);
    },
    [searchKeyword],
  );

  var content = (
    <View style={styles.container}>
      <Image source={EmptyImage} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.emptyText}>Search Something</Text>
      </View>
    </View>
  );

  if (searchResult.length > 0) {
    content = (
      <FlatList
        data={searchResult}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id?.toString()}
        renderItem={({ item }) => (
          <ProductRowBox
            cartItems={cartItems}
            product={item}
            onPress={() => onPress(item)}
          />
        )}
      />
    );
  }

  if (!resultFound) {
    var content = (
      <View style={styles.container}>
        <Image source={EmptyImage} style={styles.image} />
        <View style={{ flex: 1 }}>
          <Text style={styles.emptyText}>Result not found.</Text>
        </View>
      </View>
    );
  }

  if (loading) {
    content = (
      <ActivityIndicator
        size="large"
        color={colorPalette.primary}
        style={{ margin: 50 }}
      />
    );
  }

  return (
    <View>
      {/* <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        onClear={clearSearch}
        lightTheme={true}
        value={searchKeyword}
        showLoading={loading}
      /> */}
      <View style={styles.inputView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', left: 10, top: 15, zIndex: 100 }}>
          <Image
            source={icons.back}
            style={{ width: 20, height: 20, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.input]}
          onChangeText={updateSearch}
          placeholder="Search medicines and health products"
          placeholderTextColor={COLORS.secondary}
          value={searchKeyword}
        />
        {searchKeyword ? (
          <TouchableOpacity style={styles.searchBtn} onPress={clearSearch}>
            <Image
              source={icons.close}
              style={{ width: 13, height: 13, tintColor: COLORS.black }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.searchBtn}>
            <Image
              source={icons.search}
              style={{ width: 18, height: 18, tintColor: COLORS.primary }}
            />
          </TouchableOpacity>
        )}
      </View>
      {content}

      {/* {visible && (
        <ProductDetails
          product={selectedProduct}
          isVisible={visible}
          setVisible={setVisible}
          navigation={navigation}
        />
      )} */}
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  totalPriceContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 200,
  },
  image: {
    marginTop: 90,
    marginBottom: 20,
    width: 210,
    height: 220,
    justifyContent: 'center',
    tintColor: '#303030',
  },
  emptyText: {
    color: '#666',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputView: {
    marginTop: 15,
    // paddingHorizontal: 10,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    color: 'black',
    paddingHorizontal: 10,
    position: 'relative',
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingLeft: 45,
  },
  searchBtn: {
    position: 'absolute',
    right: 20,
    top: 17,
  },
});
