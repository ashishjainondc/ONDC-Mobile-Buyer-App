import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from '../modules/authentication/login/Login';
import SignUp from '../modules/authentication/signUp/SignUp';
import Splash from '../modules/authentication/splash/Splash';
import AddDefaultAddress from '../modules/main/profile/AddDefaultAddress';
import Dashboard from '../modules/main/dashboard/Dashboard';
import AddressList from '../modules/main/dashboard/components/address/AddressList';
import Cart from '../modules/main/cart/Cart';
import ProductDetails from '../modules/main/product/details/ProductDetails';
import Profile from '../modules/main/profile/Profile';
import OrderDetails from '../modules/main/order/details/OrderDetails';
import UpdateAddress from '../modules/main/dashboard/components/address/UpdateAddress';
import CategoryDetails from '../modules/main/category/CategoryDetails';
import BrandDetails from '../modules/main/provider/BrandDetails';
import SubCategoryDetails from '../modules/main/subCategory/SubCategoryDetails';
import Outlets from '../modules/main/provider/Outlets';
import Orders from '../modules/main/order/list/Orders';
import CancelOrder from '../modules/main/order/details/CancelOrder';
import SearchProducts from '../modules/main/dashboard/SearchProducts';
import PaymentMethods from '../modules/main/order/details/PaymentMethods';
import OrderProductDetails from '../modules/main/order/details/OrderProductDetails';
import ReturnItem from '../modules/main/order/details/ReturnItem';
import Complaints from '../modules/main/complaint/list/Complaints';
import ComplaintDetails from '../modules/main/complaint/details/ComplaintDetails';
import OrderReturnDetails from '../modules/main/order/details/OrderReturnDetails';
import ForgotPassword from '../modules/authentication/forgotPassword/ForgotPassword';
import StoresNearMe from '../modules/main/stores/StoresNearMe';
import ShopByCategory from '../modules/main/category/ShopByCategory';
import {theme} from '../utils/theme';

const Stack = createStackNavigator();

interface AppNavigation {
  navigationRef: any;
}

const headerStyle = {
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowColor: 'black',
  shadowOpacity: 1,
  shadowRadius: 3.84,
  elevation: 15,
};

/**
 * Component for stack navigation
 * @returns {JSX.Element}
 * @constructor
 */
const AppNavigation: React.FC<AppNavigation> = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            title: 'My Cart',
          }}
        />
        <Stack.Screen
          name="AddDefaultAddress"
          component={AddDefaultAddress}
          options={{
            title: 'Add Address',
          }}
        />
        <Stack.Screen
          name="UpdateAddress"
          component={UpdateAddress}
          options={{
            title: 'Update Delivery Address',
          }}
        />

        <Stack.Screen
          name="AddressList"
          component={AddressList}
          options={{
            title: 'Delivery Address',
          }}
        />

        <Stack.Screen
          name="MyProfile"
          component={Profile}
          options={{
            title: 'My Profile',
          }}
        />

        <Stack.Screen
          name="Complaints"
          component={Complaints}
          options={{
            title: 'Complaints',
          }}
        />

        <Stack.Screen
          name="ComplaintDetails"
          component={ComplaintDetails}
          options={{
            title: 'Complaint Details',
          }}
        />

        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            title: 'Order History',
          }}
        />

        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="OrderProductDetails"
          component={OrderProductDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="OrderReturnDetails"
          component={OrderReturnDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CategoryDetails"
          component={CategoryDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubCategoryDetails"
          component={SubCategoryDetails}
          options={({navigation}) => ({
            title: '',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchProducts')}
                style={styles.searchButton}>
                <Icon
                  name={'search'}
                  size={24}
                  color={theme.colors.neutral400}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="CancelOrder"
          component={CancelOrder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReturnItem"
          component={ReturnItem}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentMethods"
          component={PaymentMethods}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BrandDetails"
          component={BrandDetails}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="Outlets"
          component={Outlets}
          options={{
            headerStyle,
          }}
        />
        <Stack.Screen
          name="SearchProducts"
          component={SearchProducts}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StoresNearMe"
          component={StoresNearMe}
          options={{
            title: 'Stores Near me',
          }}
        />
        <Stack.Screen
          name="ShopByCategory"
          component={ShopByCategory}
          options={{
            title: 'Shop by Category',
            headerRight: () => (
              <View style={styles.actionContainer}>
                <IconButton icon={'cards-heart-outline'} size={24} />
                <IconButton icon={'share-variant'} size={24} />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    marginRight: 16,
  },
});

export default AppNavigation;
