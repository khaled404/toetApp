import React from 'react';
import {Text, StyleSheet, FlatList, View} from 'react-native';
import {Content, Grid, Col, Row} from 'native-base';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import {
  FetchComparePage,
  RemoveFromCompare,
} from '../../../actions/ShopActions';

import {AddToCart} from '../../../actions/ProductActions';
import Product from '../../../common/Components/Product';
import {connect} from 'react-redux';
import normalize from 'react-native-normalize';
import IconButton from '../../../common/UI/IconButton';
import Toast from 'react-native-root-toast';
import {TranslateString} from '../../../util';
import PrimaryButton from '../../../common/UI/PrimaryButton';

class CompareScreen extends React.Component {
  static navigationOptions = {
    header: <HeaderWithBack TitleKey="menu_compare" />,
  };
  constructor(props) {
    super(props);
    this.state = {
      attributes: this.attributesExtractor(props.pageData?.attribute_groups),
      // attributes: []
    };
  }
  componentDidMount() {
    this.props.fetchComparePage();
  }
  flatProductList() {
    if (this.props.pageData.products) {
      let products = this.props.pageData.products;
      return Object.keys(products).map(e => products[e]);
    }
    return [];
  }
  attributesExtractor(attributeGroups) {
    let result = [];
    if (typeof attributeGroups === 'undefined') return result;
    Object.keys(attributeGroups).forEach(e => {
      let attr = attributeGroups[e];
      result.push({id: e, name: attr.name});

      if (attr.attribute) {
        result = result.concat(this.attributesExtractor(attr.attribute));
      }
    });
    return result;
  }
  AddToCart(product_id) {
    let body = `product_id=${product_id}&quantity=1`;
    this.props.AddToCart(
      body,
      msg => {
        if (msg) Toast.show(msg);
        else this.props.navigation.navigate('productdetails', {product_id});
      },
      () => {
        this.props.navigation.navigate('productdetails', {product_id});
      },
    );
  }
  renderCompareItem(item) {
    let allAttrs = this.attributesExtractor(
      this.props.pageData?.attribute_groups,
    );
    var attributes = null;
    if (item.attribute) {
      attributes = Object.keys(item.attribute)
        .map(a => {
          let value = item.attribute[a];
          let title = allAttrs.find(e => e.id === a).name;
          return {title, value};
        })
        .map(e => (
          <Row style={styles.Cell}>
            <Text style={styles.Title}>{e.title}</Text>
            <Text style={styles.Value}>{e.value}</Text>
          </Row>
        ));
    }
    return (
      <View>
        <Grid>
          <Col>
            <Row style={{height: normalize(300, 'height')}}>
              <Product
                style={{width: normalize(150)}}
                navigation={this.props.navigation}
                id={item.product_id}
                name={item.name}
                favorited={item.wishlist}
                oldprice={item.special}
                rating={item.rating}
                price={item.price}
                img={item.thumb}
              />
            </Row>
            <Row style={[styles.Cell, {marginTop: 10}]}>
              <PrimaryButton
                style={{
                  width: normalize(140),
                  height: normalize(40, 'height'),
                  marginBottom: 5,
                }}
                IconName="cart-plus"
                IconType="material-community"
                IconStyle={{marginLeft: 0}}
                IconContainerStyle={{marginRight: -3}}
                Title={TranslateString('button_cart')}
                onPress={() => this.AddToCart(item.product_id)}
              />
            </Row>
            <Row style={[styles.Cell, {marginBottom: 10}]}>
              <IconButton
                style={{width: normalize(140), height: normalize(40, 'height')}}
                IconName="close"
                IconType="font-awesome"
                IconContainerStyle={{marginRight: -3}}
                IconStyle={{marginLeft: 0}}
                IconColor="#FF4d4d"
                Title={global.IsRtl ? 'حذف المنتج ' : 'remove'}
                IconBackground="#FFF"
                onPress={() => this.props.RemoveFromCompare(item.product_id)}
                Color="#FF4d4d"
              />
            </Row>

            <Row style={styles.Cell}>
              <Text style={styles.Title}>
                {this.props.pageData.text_manufacturer}
              </Text>
              <Text style={styles.Value}>{item.manufacturer}</Text>
            </Row>
            <Row style={styles.Cell}>
              <Text style={styles.Title}>{this.props.pageData.text_model}</Text>
              <Text style={styles.Value}>{item.model} </Text>
            </Row>
            <Row style={styles.Cell}>
              <Text style={styles.Title}>
                {this.props.pageData.text_reviews}
              </Text>
              <Text style={styles.Value}>{item.reviews}</Text>
            </Row>
            <Row style={styles.Cell}>
              <Text style={styles.Title}>
                {this.props.pageData.text_weight}
              </Text>
              <Text style={styles.Value}>{item.weight}</Text>
            </Row>
            {attributes}
          </Col>
        </Grid>
      </View>
    );
  }
  render() {
    return (
      <SafeScrollView>
        <FlatList
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          data={this.flatProductList()}
          renderItem={({item}) => this.renderCompareItem(item)}
          keyExtractor={(i, n) => i.name + n}
          horizontal
          ListEmptyComponent={
            <Text style={{alignSelf: 'center'}}>
              {this.props.pageData?.text_empty}
            </Text>
          }
        />
        <View style={{height: normalize(20, 'height')}} />
      </SafeScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageData: state.shop.compare,
    loading: state.shop.loading,
    loadingStatus: state.shop.loadingStatus,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchComparePage: id => dispatch(FetchComparePage(id)),
  RemoveFromCompare: id => dispatch(RemoveFromCompare(id)),
  AddToCart: (body, cb, errCb) => dispatch(AddToCart(body, cb, errCb)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompareScreen);

const styles = StyleSheet.create({
  Cell: {
    flexDirection: 'column',
    marginBottom: normalize(10, 'height'),
    paddingHorizontal: normalize(20),
    height: normalize(45, 'height'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  Title: {
    fontSize: normalize(12),
    opacity: 0.7,
    alignSelf: 'center',
  },
  Value: {
    alignSelf: 'center',
    fontSize: normalize(16),
  },
});
