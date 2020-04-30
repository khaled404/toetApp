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
import {TranslateString} from '../../util';
import styles from '../styles';
import LocalIcon from '../Icons/LocalIcon';
import CartIcon from '../Components/CartIcon';

const windowWidth = Dimensions.get('window').width;
const tabWidth = windowWidth / 5;
const SpotLight = posed.View({
  route0: {x: 0},
  route1: {x: tabWidth},
  route2: {x: tabWidth * 2},
  route3: {x: tabWidth * 3},
  route4: {x: tabWidth * 4},
});

const Scaler = posed.View({
  active: {scale: 1.1},
  inactive: {scale: 1},
});

const S = StyleSheet.create({
  container: StyleSheet.flatten([
    {
      backgroundColor: '#fff',
      flexDirection: 'row',
      height: normalize(53, 'height'),
      elevation: 2,
      alignItems: 'center',
    },
    styles.LightShadow,
  ]),
  tabButton: {flex: 1},
  spotLight: {
    width: tabWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotLightInner: {
    width: 48,
    height: 48,
  },
  scaler: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

const TabBar = props => {
  const {
    renderIcon,
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
    categories: 'nav_categories',
    favs: 'favourites',
    cart: 'cart',
    home: 'home',
    search: 'search',
  };
  return (
    <View style={S.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`}>
          <View style={S.spotLightInner} />
        </SpotLight>
      </View>

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
            accessibilityLabel={getAccessibilityLabel({route})}>
            <Scaler
              pose={isRouteActive ? 'active' : 'inactive'}
              style={S.scaler}>
              {route.key === 'cart' ? (
                <CartIcon
                  navigation={navigation}
                  iconSize={20}
                  iconColor={tintColor}
                />
              ) : (
                <LocalIcon
                  name={mapRouteToIcon[route.key]}
                  size={20}
                  color={tintColor}
                />
              )}

              {/* {renderIcon({ route, focused: isRouteActive, tintColor })} */}
              {/* <Text style={{color:tintColor,fontSize:normalize(13)}}>{getLabelText({ route })}</Text> */}
              <Text
                style={[
                  {color: tintColor, fontSize: 9},
                  styles.FontFamilyBold,
                ]}>
                {TranslateString(getLabelText({route}))}
              </Text>
            </Scaler>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
