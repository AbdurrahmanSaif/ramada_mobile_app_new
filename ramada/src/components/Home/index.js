/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../actions/categories';
import { setNavabarOptions } from '../../actions/nav';
import { getSettingsInfo } from '../../actions/settings';
import LoadingScreen from '../Common/Loading';
import Banner from './Banner';
import HotProducts from './HotProducts';
import PopularCategories from './PopularCategories';
import BestSellers from './BestSellers';
import { COLORS } from '../../constants';
import ProductBanner from './ProductBanner';


const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const homePageCategoryData = useSelector(
    state => state.contents.frontend,
  )?.find(content => content.key === 'frontend_default_category_label');

  const [startSwiper, setSwiper] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();


  useEffect(() => {
    setTimeout(() => {
      setSwiper(true);
    }, 1000);
  }, [setSwiper]);

  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'Home', parentScreen: 'Home' }));
    }
  }, [dispatch, isFocused]);

  useEffect(() => {
    setLoading(true);
    dispatch(getSettingsInfo('frontend')).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    dispatch(getCategory({ categoryLabels: homePageCategoryData?.value })).then(
      () => {
        setLoading(false);
      },
    );
  }, [dispatch, homePageCategoryData]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
 />
 
      {startSwiper && (
        <View style={{ backgroundColor: 'white' }}>
          <ProductBanner navigation={navigation} />
          <Banner navigation={navigation} />
          <PopularCategories navigation={navigation} />
          {/* <Exclusive navigation={navigation} /> */}
          <HotProducts navigation={navigation} />
          <BestSellers navigation={navigation} />
        </View>
      )}

    </ScrollView>
  );
};


export default Home;
