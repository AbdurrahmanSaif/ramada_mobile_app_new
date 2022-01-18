/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import { fetchBannerContent } from '../../api/productBanner';
import { icons, SIZES, COLORS, FONTS } from '../../constants';
import { imageUrl } from '../../helpers/common';

export default function ProductBanner({ navigation }) {
  const [banners, setBanners] = useState([]);

  const asyncCallsOnLoad = useCallback(async () => {
    try {
      const response = await fetchBannerContent('Product Banners');
      setBanners(response);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  }, []);

  useEffect(() => {
    asyncCallsOnLoad();
  }, [asyncCallsOnLoad]);

  // const [categories, setCategories] = React.useState(categoryData);

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.url)}
          style={{
            width: banners.length > 3 ? SIZES.width / 3.6 : SIZES.width / 3.4,
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 1,
            paddingTop: SIZES.padding * 2.5,
            backgroundColor: COLORS.white,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor:
              //   selectedCategory?.id === item.id
              //     ? COLORS.white
              //     : COLORS.lightGray,
            }}>
            <Image
              source={{ uri: imageUrl(item.image, 'banners') }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 10,
                marginBottom: 7,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              alignItems: 'center',
              textAlign: 'center',
              color: COLORS.black,
              ...FONTS.body5,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ paddingHorizontal: SIZES.padding * 1 }}>
        <FlatList
          data={banners}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: SIZES.padding * 1.5,
            paddingTop: 5,
          }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightGray }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.inputView}
          onPress={() => navigation.navigate('SearchStack')}>
          <TextInput
            style={[styles.input]}
            placeholder="Search medicines and health products"
            placeholderTextColor={COLORS.secondary}
            value=""
            editable={false}
          />
          <View style={styles.searchBtn}>
            <Image
              source={icons.search}
              style={{ width: 18, height: 18, tintColor: COLORS.primary }}
            />
          </View>
        </TouchableOpacity>
        {renderMainCategories()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
    width: '100%',
    marginBottom: 0,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  inputView: {
    marginTop: 15,
    paddingHorizontal: 10,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 12,
    color: 'black',
    paddingHorizontal: 10,
    position: 'relative',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  searchBtn: {
    position: 'absolute',
    right: 25,
    top: 17,
  },
});
