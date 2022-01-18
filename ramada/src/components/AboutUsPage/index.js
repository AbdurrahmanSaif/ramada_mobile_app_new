/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setNavabarOptions } from '../../actions/nav';

import { getPage } from '../../api/pages';

import HTML from 'react-native-render-html';

import { showMessage } from 'react-native-flash-message';
import InnerHeader from '../InnerHeader';

export default function PoliciesPage({ navigation }) {
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const internal_name = 'about-us';

  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'About Us', foodTab: false }));
    }
  }, [dispatch, isFocused]);

  useEffect(() => {
    setLoading(true);

    getPage(internal_name)
      .then(result => {
        if (Array.isArray(result) && result[0]) {
          let pageData = result[0];
          dispatch(
            setNavabarOptions({ headerTitle: pageData.title, foodTab: false }),
          );
          setData(pageData);
        }
      })
      .catch(_err => {
        showMessage({
          message: 'Error occurred, please try again later!',
          type: 'danger',
          floating: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, internal_name]);

  return (
    <>
      <InnerHeader navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.overlay}>
          {loading ? (
            <Text>...loading</Text>
          ) : (
            <HTML style={{ ...styles.body }} source={{ html: data.content }} />
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 50,
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    margin: 10,
    padding: 10,
  },
});
