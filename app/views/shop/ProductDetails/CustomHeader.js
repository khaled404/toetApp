import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import ConstantStyels from '../../../constants/styles';
import {
  AddToWishlist,
  RemoveFromWishlist,
  AddToCompare,
} from '../../../actions/ShopActions';
import normalize from 'react-native-normalize';
import {withNavigation} from 'react-navigation';

let c = ({navigation, wished, id}) => {
  const [inWish, setInWish] = useState(wished); //Google React hooks if you don't know what is this.

  function onWichPress() {
    if (wished) RemoveFromWishlist(id);
    else AddToWishlist(id);
    setInWish(!inWish);
  }
  let wishIcon = inWish ? (
    <Icon
      type="MaterialCommunityIcons"
      onPress={onWichPress}
      name="heart"
      style={{
        color: ConstantStyels.ColorScandre,
        fontSize: normalize(23),
        marginRight: normalize(5),
      }}
    />
  ) : (
    <Icon
      type="MaterialCommunityIcons"
      onPress={onWichPress}
      name="heart-outline"
      style={{
        color: 'grey',
        fontSize: normalize(23),
        marginRight: normalize(5),
      }}
    />
  );

  let angleIcon = global.IsRtl ? 'angle-right' : 'angle-left';

  return (
    <View
      style={{
        backgroundColor: 'rgba(255,255,255,0)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(20),
        marginTop: normalize(15, 'height'),
        zIndex: 250,
        paddingBottom: normalize(10, 'height'),
      }}
    >
      <Icon
        onPress={() => navigation.goBack(null)}
        type="FontAwesome"
        name={angleIcon}
        style={{color: ConstantStyels.MainColor, fontSize: normalize(23)}}
      />
      <View style={{flexDirection: 'row'}}>
        <Icon
          onPress={() => AddToCompare(id)}
          type="Entypo"
          name="cycle"
          style={{
            color: 'grey',
            fontSize: normalize(22),
            marginRight: normalize(7),
          }}
        />
        {wishIcon}
        <Icon
          name="search"
          type="antdesign"
          size={15}
          color="#515C6F"
          onPress={() => navigation.navigate('search')}
        />

        <Icon
          type="MaterialCommunityIcons"
          name="cart-outline"
          style={{color: ConstantStyels.MainColor, fontSize: normalize(23)}}
        />
      </View>
    </View>
  );
};

export default withNavigation(c);
