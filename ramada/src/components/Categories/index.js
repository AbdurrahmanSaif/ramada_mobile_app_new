import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { colors, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../actions/categories';
import { setNavabarOptions } from '../../actions/nav';
import { COLORS } from '../../constants';
import LoadingScreen from '../Common/Loading';
import MenuItemCard from './CategoryCard';

const Categories = ({ navigation }) => {
  const isFocused = useIsFocused();
  const categories = useSelector(state => state.categories.mainCategories);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const filteredCategories = categories.filter(
    category => category.parent_id === 1,
  );

  useEffect(() => {
    if (isFocused) {
      dispatch(
        setNavabarOptions({
          headerTitle: 'Categories',
          parentScreen: 'Categories',
        }),
      );
    }
  }, [isFocused, dispatch]);

  const fetchCategories = () => {
    setLoading(true);

    dispatch(getCategory()).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, [dispatch]);

  const onCategoryPress = (categoryId, categoryName) => {
    navigation.navigate('Products', {
      categoryId,
      categoryName,
      backPath: 'Categories',
    });
  };

  return loading ? (
    <LoadingScreen />
  ) : filteredCategories.length === 0 ? (
    <View>
      <Text selectionColor={colors.primary}>No item categories found</Text>
    </View>
  ) : (
    <View style={styles.categoryWrapper}>
      <FlatList
        data={filteredCategories}
        renderItem={({ item }) => (
          <MenuItemCard category={item} onPress={onCategoryPress} />
        )}
        numColumns={2}
        keyExtractor={item => item?.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onRefresh={() => fetchCategories()}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: COLORS.lightGray4,
    paddingBottom: 80,
  },
  emptyText: {
    color: colors.secondary,
    fontWeight: '700',
  },
});

export default Categories;
