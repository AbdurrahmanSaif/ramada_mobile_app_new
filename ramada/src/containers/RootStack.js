import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import CustomSnackbar from '../components/Common/CustomSnackbar';
import Tabs from '../../navigation/tabs';
import Cart from '../components/Cart';
import Notifications from '../components/Notifications';
import Shipping from '../components/Shipping';
import Checkout from '../components/Checkout';
import Products from '../components/Products';
import ProductDetails from '../components/Products/ProductDetails';
import Login from '../components/Login';
import PoliciesPage from '../components/PoliciesPage';
import ContactUs from '../components/ContactUs';
import Orders from '../components/Orders';
import Account from '../components/Account';
import AboutUsPage from '../components/AboutUsPage';
import ProfileForm from '../components/Account/ProfileForm';
import LabTests from '../components/LabTests';
import SearchPage from '../components/SearchPage';
import Attachment from '../components/Attachment';

const Stack = createStackNavigator();

function RootStack({ navigation, route }) {
  const { visible, message, action, actionText, severity } = useSelector(
    state => state.snackbar,
  );

  return (
    <>
      <Stack.Navigator
        navigation={navigation}
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Shipping" component={Shipping} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PoliciesPage" component={PoliciesPage} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="ProfileForm" component={ProfileForm} />
        <Stack.Screen name="AboutUsPage" component={AboutUsPage} />
        <Stack.Screen name="LabStack" component={LabTests} />
        <Stack.Screen name="SearchStack" component={SearchPage} />
        <Stack.Screen name="Attachment" component={Attachment} />
      </Stack.Navigator>
      <CustomSnackbar
        visible={visible}
        message={message}
        buttonText={actionText}
        action={action}
        severity={severity}
      />
    </>
  );
}

export default RootStack;
