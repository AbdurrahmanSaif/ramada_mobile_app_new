/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setNavabarOptions } from '../../actions/nav';

import { getPage } from '../../api/pages';

import HTML from 'react-native-render-html';
import InnerHeader from '../InnerHeader';
import { COLORS } from '../../constants';

export default function PoliciesPage({ route, navigation }) {
  const [data, setData] = useState({});

  console.log('params::', route.params);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const internal_name = 'privacy-policy';

  useEffect(() => {
    if (isFocused) {
      dispatch(setNavabarOptions({ headerTitle: 'Policies', foodTab: false }));
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
        // dispatch(showErrorSnackbar('Error occurred, please try again later!'));
        alert('Error occurred, please try again later!');
        // TODO:fix this
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
    backgroundColor: COLORS.lightGray4,
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    margin: 10,
    padding: 10,
  },
});
