import React from 'react';
import {FlatList, View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import Product from '../../common/Components/Product';
import StylesConstants from '../../constants/styles';
import normalize from 'react-native-normalize';
import styles from '../../common/styles';
import {TranslateString} from '../../util';

function GetPath(code) {
  if (code === 'special' || code === 'featured') return 'ocapi/product/special';
  else if (code === 'latest') return 'ocapi/product/allproduct';
  else if (code === 'featured') return 'ocapi/product/bestseller';

  return null;
}

export default ({navigation, products, title, code}) => {
  let showAll = null;

  let path = GetPath(code);
  if (path != 'special') {
    showAll = (
      <Text
        style={[
          {
            alignSelf: 'flex-end',
            color: StylesConstants.MainColor,
            fontSize: 12,
          },
          styles.FontFamilyBold,
        ]}
        onPress={() => navigation.navigate('specials', {path: path})}>
        {TranslateString('text_view_all')}
      </Text>
    );
  }
  return (
    <View style={{marginBottom: normalize(25, 'height')}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: normalize(10),
          marginBottom: normalize(15, 'height'),
          marginLeft: 5,
        }}>
        <Text style={[{alignSelf: 'flex-start'}, styles.RegularSize]}>
          {title}
        </Text>
        {showAll}
      </View>
      <FlatList
        style={{alignSelf: 'center', flexGrow: 0}}
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={({item}) => (
          <View style={{height: normalize(280, 'height')}}>
            <Product
              navigation={navigation}
              style={{width: normalize(180)}} // width
              id={item.product_id}
              name={item.name}
              rating={item.rating}
              oldprice={item.special}
              price={item.price}
              img={item.thumb}
              favorited={item.wishlist}
            />
          </View>
        )}
        keyExtractor={(i, index) => `${i.name}${index}`}
        horizontal
      />
    </View>
  );
};
