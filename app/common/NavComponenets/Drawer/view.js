import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  I18nManager,
  Share,
} from 'react-native';
import {TranslateString, SetSkipLogin} from '../../../util';
import {Icon} from 'react-native-elements';
import StylesConstant from '../../../constants/styles';
import {connect} from 'react-redux';
import normalize from 'react-native-normalize';
import {Logout} from '../../../actions/AuthActions';
import RNRestart from 'react-native-restart';
import LocalIcon from '../../Icons/LocalIcon';
import {SKIP_LOGIN} from '../../../actions/AuthTypes';
import CategoriesAccordion from './CategoriesAccordion';

class Drawer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  navItem() {
    return [
      {
        hideForGuest: false,
        navigateTo: 'home',
        Icon: 'home',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('text_home'),
      },
      {
        hideForGuest: false,
        navigateTo: 'categories',
        Icon: 'nav_categories',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('menu_categories'),
        RenderFunction: this.renderCategoriesSection.bind(this),
      },
      {
        hideForGuest: false,
        navigateTo: 'brands',
        Icon: 'brands',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('text_brands'),
      },
      {
        hideForGuest: true,
        navigateTo: 'addressbook',
        Icon: 'cart',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('text_account_account_address'),
      },
      {
        hideForGuest: true,
        navigateTo: 'myorders',
        Icon: 'shipments',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('text_account_account_orders'),
      },
      {
        hideForGuest: false,
        navigateTo: 'cart',
        Icon: 'cart',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('text_cart'),
      },
      {
        hideForGuest: false,
        navigateTo: 'favs',
        Icon: 'favourites',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('menu_wishlist'),
      },
      {
        hideForGuest: false,
        navigateTo: 'compareproducts',
        Icon: 'compare',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('menu_compare'),
      },
      {
        hideForGuest: true,
        navigateTo: 'loginFlow',
        Icon: 'close',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('text_logout'),
        onPress: () => this.onLogoutPress(),
      },
      {
        divider: true,
      },
      {
        hideForGuest: false,
        navigateTo: 'settings',
        Icon: 'settings',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('menu_settings'),
      },
      // {
      //     navigateTo: 'orderconfirmed',
      //     Icon: 'settings',
      //     IconType: 'local',
      //     IconSize:18,
      //     Text: "test"
      // },
      {
        hideForGuest: false,
        navigateTo: 'share',
        Icon: 'share',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('menu_share'),
        onPress: () => this.onShareAppPress(),
      },
      {
        hideForGuest: false,
        navigateTo: 'contactus',
        Icon: 'support',
        IconType: 'local',
        IconSize: 20,
        Text: TranslateString('text_contact'),
      },
    ];
  }
  rednerItem() {
    let currentRoute = this.getActiveRoute(this.props.navigation.state);
    return this.navItem().map(i => {
      if (!this.props.isLoggedIn && i.hideForGuest) return null;

      if (typeof i.RenderFunction !== 'undefined') {
        return i.RenderFunction();
      }
      let isActive = currentRoute === i.navigateTo;
      let onPress = null;
      if (typeof i.onPress === 'undefined') {
        onPress = () => this.props.navigation.navigate(i.navigateTo);
      } else onPress = i.onPress;

      let color = isActive ? StylesConstant.MainColor : '#727C8E';

      let IconComponenet = (
        <Icon type={i.IconType} name={i.Icon} color={color}></Icon>
      );
      if (i.IconType === 'local')
        IconComponenet = <LocalIcon name={i.Icon} size={i.IconSize} />;

      if (i.divider)
        return (
          <View
            style={{
              height: 1,
              backgroundColor: '#727C8E',
              opacity: 0.3,
              marginBottom: normalize(10, 'height'),
            }}
          ></View>
        );
      else
        return (
          <TouchableOpacity
            style={{
              zIndex: 999,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: normalize(15, 'height'),
            }}
            onPress={onPress}
          >
            {IconComponenet}
            <Text
              style={{
                fontSize: normalize(17),
                color: color,
                marginLeft: normalize(17),
                fontFamily: StylesConstant.FontFamily,
              }}
            >
              {i.Text}
            </Text>
          </TouchableOpacity>
        );
    });
  }
  getActiveRoute(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this.getActiveRoute(route);
    }
    return route.routeName;
  }
  onLogoutPress() {
    this.props.Logout(() => {
      RNRestart.Restart();
    });
  }
  onBackToLoginPress() {
    this.props.BackToLogin();
    this.props.navigation.navigate('loginFlow');
  }
  onShareAppPress() {
    let message = `
            ${this.props.contact.sharing} \n
            ${this.props.contact.android_url} \n
            ${this.props.contact.ios_url}
        `;
    Share.share({
      message,
    });
  }
  renderMyAccountView() {
    let img = require('../../../../assets/drawer_background.png');
    let content = null;
    let imgBackGroundStyle = !I18nManager.isRTL
      ? {transform: [{rotateY: '180deg'}]}
      : null;

    if (!this.props.isLoggedIn)
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: StylesConstant.MainColor,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 22,
              fontFamily: StylesConstant.FontFamilyBold,
            }}
          >
            {TranslateString('menu_welcome')}
          </Text>
          <Text
            onPress={() => this.onBackToLoginPress()}
            style={{
              color: '#B1B9EB',
              fontFamily: StylesConstant.FontFamilyBold,
            }}
          >{`${TranslateString('text_login')} / ${TranslateString(
            'text_register',
          )}`}</Text>
        </View>
      );

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: StylesConstant.MainColor,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 22,
            fontFamily: StylesConstant.FontFamilyBold,
          }}
        >
          {TranslateString('menu_welcome')} {this.props.firstname}{' '}
          {this.props.lastname}
        </Text>
        <Text
          onPress={() => this.props.navigation.navigate('myaccount')}
          style={{color: '#B1B9EB', fontFamily: StylesConstant.FontFamilyBold}}
        >
          {TranslateString('menu_account')}{' '}
        </Text>
      </View>
    );
  }
  renderCategoriesSection() {
    return <CategoriesAccordion navigation={this.props.navigation} />;
  }
  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        {this.renderMyAccountView()}
        <View style={{flex: 4, backgroundColor: '#fff', padding: 10}}>
          {this.rednerItem()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    contact: state.settings.contact,
  };
};
const mapDispatchToProps = dispatch => ({
  Logout: cb => dispatch(Logout(cb)),
  BackToLogin: () => dispatch({type: SKIP_LOGIN}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
