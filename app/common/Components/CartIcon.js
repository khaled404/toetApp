import React from 'react';
import {View} from 'react-native';
import {Badge} from 'react-native-elements';
import LocalIcon from '../Icons/LocalIcon';
import {connect} from 'react-redux';
import normalize from 'react-native-normalize';
import StylesConstant from '../../constants/styles';
const CartIcon = ({cart, iconSize, iconColor, navigation}) => {
  let badge = null;
  if (cart && cart.length != 0)
    badge = (
      <Badge
        containerStyle={{
          position: 'absolute',
          top: normalize(-7, 'height'),
          left: normalize(-7),
        }}
        value={cart.length}
        badgeStyle={{backgroundColor: StylesConstant.ColorScandre}}
      />
    );

  return (
    <View>
      <LocalIcon
        onPress={() => navigation.navigate('cart')}
        name="cart"
        color={iconColor}
        size={iconSize}
      />

      {badge}
    </View>
  );
};

const mapStateToProps = state => ({
  cart: state.shop.cart.products,
});

export default connect(mapStateToProps)(CartIcon);
