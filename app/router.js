import React from 'react';
import {
  SearchProduct,
  SearchQueryByFilter,
  ChangeKeyword,
  ClearSearch,
} from './actions/SearchActions';
import {Dimensions, I18nManager} from 'react-native';
import StylesConstants from './constants/styles';
import {createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';

import DrawerComponenet from './common/NavComponenets/Drawer/view';

import {Icon} from 'react-native-elements';
import AppHeader from './common/NavComponenets/headers/AppHeader';

import ForgetPasswordView from './views/auth/ForgetPassword';
import LoginWithPassword from './views/auth/Login';
import RegisterUserView from './views/auth/RegisterUser';
import ConfirmationView from './views/auth/Confirmation';

import HomePageScreen from './views/HomePage';

import CartScreen from './views/shop/Cart';
import CategoryDetailsScreen from './views/shop/CategoryDetails';
import SpecialsScreen from './views/shop/SpecialPage';
import CheckoutScreen from './views/orders/Checkout';
import GuestCheckoutScreen from './views/orders/GuestCheckout';
import OrderConfirmedScreen from './views/orders/OrderConfirmed';
import MyOrdersScreen from './views/orders/MyOrders';
import OrderDetailsScreen from './views/orders/OrderDetails';

import BrandsScreen from './views/shop/Brands';
import BrandDetailsScreen from './views/shop/BrandDetails';

import CategoriesScreen from './views/shop/Categories';
import FavsScreen from './views/shop/Favs';
import ProductDetailsScreen from './views/shop/ProductDetails';
import SearchScreen from './views/shop/Search';
import CompareProductsScreen from './views/shop/CompareProducts';

import AddressBookScreen from './views/addressbook/AddressBook';
import NewAddressScreen from './views/addressbook/NewAddress';

import PaymentWaysScreen from './views/payments/PaymentWays';
import NewCardScreen from './views/payments/NewCard';

import ShippingWaysScreen from './views/orders/Shipping';

import CouponScreen from './views/orders/Coupon';
import SettingsScreen from './views/settings';
import VoucherScreen from './views/orders/Voucher';

import MyAccountScreen from './views/myaccount';
import AccountInfoScreen from './views/myaccount/AccountInfo';
import PasswordChangeScreen from './views/myaccount/PasswordChange';
import DigitalFilesScreen from './views/myaccount/DigitalFiles';
import RecurringPaymentsScreen from './views/myaccount/RecurringPayments';
import RewardsScreen from './views/myaccount/Rewards';
import RefundsScreen from './views/myaccount/Refunds';
import ReturnDetailsScreen from './views/myaccount/ReturnsDetails';
import AddReturnRequestScreen from './views/myaccount/AddReturnRequest';

import MyBalanceScreen from './views/myaccount/MyBalance';
import NewsletterScreen from './views/myaccount/Newsletter';
import ContactUsScreen from './views/contactus';

import {connect} from 'react-redux';
import normalize from 'react-native-normalize';
import TabBar from './common/NavComponenets/TabBar';
import LoginTabbar from './views/auth/LoginTabbar';
const loginFlowTabConfig = {
  tabBarComponent: LoginTabbar,
  tabBarOptions: {
    labelStyle: {
      fontSize: normalize(22),
      alignSelf: 'center',
    },
    scrollEnabled: false,
    activeTintColor: '#515C6F',
    inactiveTintColor: '#D4D6DC',
    indicatorStyle: {
      opacity: 0,
    },
    tabStyle: {
      paddingVertical: normalize(77, 'height'),
      height: normalize(60, 'height'),
      width: '100%',
      alignItmes: 'center',
      justifyContent: 'center',
      paddingLeft: normalize(16),
    },
    style: {
      backgroundColor: StylesConstants.BackgroundColor,
      elevation: 0,
      alignItmes: 'center',
      justifyContent: 'center',
    },
  },
};

const mainTabsConfig = {
  initialRouteName: 'home',
  tabBarComponent: TabBar,
  tabBarOptions: {
    activeTintColor: StylesConstants.MainColor,
    inactiveTintColor: '#727C8E',
  },
};
const defaultStackNavigationOptions = {
  defaultNavigationOptions: nav => {
    const mapStateToProps = state => ({
      search: state.search.searchPage,
      keyword: state.search.keyword,
      navigation: nav.navigation,
    });
    const mapDispatchToProps = dispatch => ({
      SearchProduct: query => dispatch(SearchProduct(query)),
      SearchQueryByFilter: (query, filter) =>
        dispatch(SearchQueryByFilter(query, filter)),
      ChangeKeyword: query => dispatch(ChangeKeyword(query)),
      ClearSearch: () => dispatch(ClearSearch()),
    });

    let navState = nav.navigation.state;
    let isSearchScreenActive = false;

    if (navState.routeName === 'drawer') {
      if (navState.routes.length > 0) {
        isSearchScreenActive = navState.routes[0].index === 3;
      }
    }

    // let header = (<AppHeader />);
    // if(isSearchScreenActive){
    //     header = (null);
    // }
    let H = connect(mapStateToProps, mapDispatchToProps)(AppHeader);
    return {
      header: <H />,
    };
  },
};

const routes = createStackNavigator(
  {
    loginFlow: {
      screen: createStackNavigator(
        {
          auth: createMaterialTopTabNavigator(
            {
              'login ': {screen: LoginWithPassword},
              register: {screen: RegisterUserView},
              forgetpassword: {screen: ForgetPasswordView},
            },
            loginFlowTabConfig,
          ),

          confirmation: {screen: ConfirmationView},
        },
        {defaultNavigationOptions: {header: null}},
      ),
    },
    mainFlow: {
      screen: createDrawerNavigator(
        {
          stack: createStackNavigator(
            {
              main: createBottomTabNavigator(
                {
                  favs: {
                    screen: FavsScreen,
                    navigationOptions: {
                      title: 'menu_wishlist',
                      tabBarIcon: ({tintColor}) => (
                        <Icon
                          name="heart-outline"
                          type="material-community"
                          color={tintColor}
                        />
                      ),
                    },
                  },
                  cart: {
                    screen: CartScreen,
                    navigationOptions: {
                      title: 'text_cart',
                      tabBarIcon: ({tintColor}) => (
                        <Icon
                          name="cart-outline"
                          type="material-community"
                          color={tintColor}
                        />
                      ),
                    },
                  },
                  home: {
                    screen: HomePageScreen,
                    navigationOptions: {
                      title: 'text_home',
                      tabBarIcon: ({tintColor}) => (
                        <Icon
                          name="home-outline"
                          type="material-community"
                          color={tintColor}
                        />
                      ),
                    },
                  },
                  search: {
                    screen: SearchScreen,
                    navigationOptions: {
                      title: 'text_search',
                      tabBarIcon: ({tintColor}) => (
                        <Icon
                          name="search1"
                          type="antdesign"
                          color={tintColor}
                        />
                      ),
                    },
                  },
                  categories: {
                    screen: CategoriesScreen,
                    navigationOptions: {
                      title: 'menu_categories',
                      tabBarIcon: ({tintColor}) => (
                        <Icon
                          name="format-list-checkbox"
                          type="material-community"
                          color={tintColor}
                        />
                      ),
                    },
                  },
                },
                mainTabsConfig,
              ),
              compareproducts: {screen: CompareProductsScreen},
              productdetails: {screen: ProductDetailsScreen},
              myorders: {screen: MyOrdersScreen},
              orderdetails: {screen: OrderDetailsScreen},
              orderconfirmed: {screen: OrderConfirmedScreen},
              checkout: {screen: CheckoutScreen},
              guestcheckout: {screen: GuestCheckoutScreen},
              coupon: {screen: CouponScreen},
              voucher: {screen: VoucherScreen},

              addressbook: {screen: AddressBookScreen},
              NewAddress: {screen: NewAddressScreen},
              PaymentWays: {screen: PaymentWaysScreen},
              NewCard: {screen: NewCardScreen},
              shippingways: {screen: ShippingWaysScreen},
              categorydetails: {screen: CategoryDetailsScreen},
              settings: {screen: SettingsScreen},

              myaccount: {screen: MyAccountScreen},
              accountinfo: {screen: AccountInfoScreen},
              passwordchange: {screen: PasswordChangeScreen},
              digitalfiles: {screen: DigitalFilesScreen},
              recurringpayments: {screen: RecurringPaymentsScreen},
              rewards: {screen: RewardsScreen},
              refunds: {screen: RefundsScreen},
              returndetails: {screen: ReturnDetailsScreen},
              addreturnrequest: {screen: AddReturnRequestScreen},
              mybalance: {screen: MyBalanceScreen},
              newsletter: {screen: NewsletterScreen},
              brands: {screen: BrandsScreen},
              branddetails: {screen: BrandDetailsScreen},
              specials: {screen: SpecialsScreen},
              contactus: {screen: ContactUsScreen},
            },
            defaultStackNavigationOptions,
          ),
        },
        {
          drawerWidth: Dimensions.get('window').width - 110,
          contentComponent: DrawerComponenet,
          drawerPosition: I18nManager.isRTL ? 'right' : 'left',
          overlayColor: 'rgba(0,0,0,0.8)',
          navigationOptions: {
            header: null,
          },
        },
      ),
    },
  },
  {defaultNavigationOptions: {header: null}, initialRouteName: 'mainFlow'},
);

export default createAppContainer(routes);
