import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import posed from 'react-native-pose';
import normalize from 'react-native-normalize';
import {TranslateString, ChooseStringByLanguage} from '../../util';
import styles from '../../common/styles';
import LocalIcon from '../../common/Icons/LocalIcon';
import CartIcon from '../../common/Components/CartIcon';
import ConstantStyles from '../../constants/styles';

let width = Dimensions.get('screen').width / 3;
const S = StyleSheet.create({
  container: StyleSheet.flatten([
    {
      backgroundColor: ConstantStyles.BackgroundColor,
      flexDirection: 'row',
      height: normalize(60, 'height'),
      paddingVertical: normalize(70, 'height'),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: normalize(16),
      elevation: 0,
      shadowOpacity: 0,
      alignItems: 'center',
    },
  ]),
  tabButton: {
    height: normalize(60, 'height'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});

const TabBar = props => {
  const {
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    getLabelText,
    navigation,
  } = props;

  const {routes, index: activeRouteIndex} = navigation.state;
  const mapRouteToIcon = {
    favs: 'favourites',
    cart: 'cart',
    home: 'home',
    search: 'search',
    categories: 'nav_categories',
  };
  function getRouteText(r) {
    switch (r.route.key.trim()) {
      case 'login':
        //return TranslateString("text_login")
        return ChooseStringByLanguage('Login', 'دخول');
      case 'register':
        //return TranslateString("text_register")
        return TranslateString('text_register');
      case 'forgetpassword':
        //return TranslateString("text_forgot_button")
        return ChooseStringByLanguage('Forget Password', 'نسيت كلمة المرور');
      default:
        return r.route.key;
    }
  }
  return (
    <View style={S.container}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        return (
          <TouchableOpacity
            key={routeIndex}
            style={S.tabButton}
            onPress={() => {
              onTabPress({route});
            }}
            onLongPress={() => {
              onTabLongPress({route});
            }}
            accessibilityLabel={getAccessibilityLabel({route})}
          >
            {/* {renderIcon({ route, focused: isRouteActive, tintColor })} */}
            {/* <Text style={{color:tintColor,fontSize:normalize(13)}}>{getLabelText({ route })}</Text> */}
            <Text
              style={[
                {
                  color: tintColor,
                  fontSize: normalize(22),
                  textAlign: 'center',
                  fontFamily: ConstantStyles.FontFamilyBold,
                },
                styles.FontFamilyMedium,
              ]}
            >
              {getRouteText({route})}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
