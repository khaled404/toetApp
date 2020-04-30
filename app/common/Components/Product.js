import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

import {Card, Text, Image, Button} from 'react-native-elements';
import {Icon} from 'native-base';
import {AddToWishlist, RemoveFromWishlist} from '../../actions/ShopActions';
import ViewWithShadow from '../UI/ViewWithShadow';
import StylesConstants from '../../constants/styles';
import Rating from './Rating';
import normalize from 'react-native-normalize';
import {connect} from 'react-redux';
import CommonStyles from '../styles';
import Toast from 'react-native-root-toast';
import {TranslateString} from '../../util';
const styles = StyleSheet.create({
  ProductTitle: {
    alignSelf: 'flex-start',
    fontWeight: '300',
    marginBottom: 5,
    textAlign: 'left',
    fontSize: 12,
    width: '100%',
    height: '60%',
    fontFamily: StylesConstants.FontFamily,
  },
  CurrentPrice: {
    alignSelf: 'flex-start',
    fontFamily: StylesConstants.FontFamilyBold,
    fontSize: 17,
    marginRight: normalize(5),
  },
  OldPrice: {
    marginRight: 'auto',
    color: 'grey',
    textDecorationLine: 'line-through',
    fontFamily: StylesConstants.FontFamily,
    fontSize: 14,
    marginTop: normalize(4, 'height'),
    marginLeft: normalize(8),
  },
  // Rating: {
  //   backgroundColor: StylesConstants.MainColor,
  //   borderRadius: normalize(100),
  //   height: normalize(17, 'height'),
  //   width: normalize(45),
  // },
});

class Prdouct extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inWish: props.favorited || false,
    };
    this.navigateToDetails = this.navigateToDetails.bind(this);
    this.onWichPress = this.onWichPress.bind(this);
  }
  onWichPress() {
    if (!this.props.IsLoggedIn) {
      Toast.show(TranslateString('text_login_wishlist'));
      return;
    }
    if (this.state.inWish) {
      this.props.RemoveFromWishlist(this.props.id);
    } else {
      AddToWishlist(this.props.id);
    }

    this.setState(prevState => ({
      inWish: !prevState.inWish,
    }));
    // setInaWish(!this.state.inWish);
  }
  navigateToDetails() {
    this.props.navigation.navigate({
      routeName: 'productdetails',
      params: {product_id: this.props.id, wishlist: this.props.favorited},
      key: 'productdetails' + this.props.id,
    });
    // this.props.navigation.navigate("productdetails", { product_id: this.props.id, 'wishlist': this.props.favorited })
  }

  render() {
    let {name, oldprice, img, onCloseClick, IsLoggedIn} = this.props;

    let style = this.props.style || {};
    let price = this.props.price?.replace('thousand_point', ',');

    let closeIcon = null;
    if (typeof onCloseClick === 'function') {
      closeIcon = (
        <TouchableOpacity
          onPress={() => onCloseClick()}
          style={{position: 'absolute', top: 7, right: 7, zIndex: 20}}
        >
          <Icon
            type="MaterialCommunityIcons"
            name="close"
            style={{color: StylesConstants.MainColor, fontSize: 23}}
          />
        </TouchableOpacity>
      );
    }
    let currentPriceStyle = undefined;
    if (oldprice) {
      let s = price;
      price = oldprice;
      oldprice = s;
      currentPriceStyle = CommonStyles.MainColor;
    }
    let oldPriceComponent = oldprice ? (
      <Text style={styles.OldPrice}>{oldprice}</Text>
    ) : null;

    let wishIcon = null;
    wishIcon = this.state.inWish ? (
      <Icon
        type="MaterialCommunityIcons"
        name="heart"
        style={{color: StylesConstants.ColorScandre, fontSize: 28}}
      />
    ) : (
      <Icon
        type="MaterialCommunityIcons"
        name="heart-outline"
        style={{color: 'grey', fontSize: 28}}
      />
    );

    return (
      <View
        style={{
          flex: 1,
          marginLeft: normalize(7),
          marginRight: normalize(7),
          marginVertical: normalize(5, 'height'),
          ...style,
        }}
      >
        <TouchableOpacity style={{flex: 1}} onPress={this.navigateToDetails}>
          <ViewWithShadow
            style={{
              borderTopLeftRadius: normalize(15),
              borderTopRightRadius: normalize(15),
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              flex: 2.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={this.onWichPress}
              style={{position: 'absolute', top: 7, left: 7, zIndex: 20}}
            >
              {wishIcon}
            </TouchableOpacity>

            {closeIcon}

            <Image
              source={{uri: img}}
              style={{
                // flex: 1,
                // height: normalize(150, 'height'),
                // width: normalize(100),
                width: normalize(120),
                height: normalize(120),
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </ViewWithShadow>

          <ViewWithShadow
            style={{
              marginTop: 1,
              borderBottomLeftRadius: normalize(15),
              borderBottomRightRadius: normalize(15),
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <Text style={styles.ProductTitle}>{name}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.CurrentPrice, currentPriceStyle]}>
                  {price}
                </Text>
                {oldPriceComponent}
              </View>
              {/* <Rating rate={rating} /> */}
            </View>
          </ViewWithShadow>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  IsLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  RemoveFromWishlist: product_id => dispatch(RemoveFromWishlist(product_id)),
});
//export default withNavigation(component);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Prdouct);
