import React from 'react';
import SafeView from '../../../common/UI/SafeView';
import PriamryButton from '../../../common/UI/PrimaryButton';
import IconButton from '../../../common/UI/IconButton';
import Slider from '../../../common/UI/Slider';
import CommonStyles from '../../../common/styles';
import {FetchProduct, AddToCart} from '../../../actions/ProductActions';
import {
  FetchCart,
  AddToWishlist,
  RemoveFromWishlist,
  AddToCompare,
} from '../../../actions/ShopActions';
import Rating from '../../../common/Components/Rating';
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  Modal,
  TouchableOpacity,
  Share,
  FlatList,
} from 'react-native';
import {Text, Icon} from 'react-native-elements';

import {
  Grid,
  Col,
  Row,
  Tab,
  Tabs,
  TabHeading,
  Container,
  Content,
  ScrollableTab,
  Icon as NativeIcon,
} from 'native-base';
import StylesConstant from '../../../constants/styles';
import Attributes from './Attributes';
import ReviewsSection from './Reviews/ReviewsSection';
import ProductCustomize from './Customization/ProductCustomize';
import CustomHeader from './CustomHeader';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import HTML from 'react-native-render-html';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import normalize from 'react-native-normalize';
import ImageViewer from 'react-native-image-zoom-viewer';

import {
  TranslateString,
  RemoveHTMLFromString,
  ChooseStringByLanguage,
} from '../../../util';
import ProductTabs from './ProductTabs';
import {SliderBox} from 'react-native-image-slider-box';
import AddReview from './Reviews/AddReview';
import SectionDivider from '../../../common/UI/SectionDivider';
import Product from '../../../common/Components/Product';
class ProductDetailsView extends React.Component {
  static navigationOptions = {
    header: (
      <HeaderWithBack Title={ChooseStringByLanguage('المنتج', 'Product')} />
    ),
  };
  constructor(props) {
    super(props);

    this.state = {
      product_id: 0,
      wished: false,
      imageShow: false,
      imageShowIndex: 0,
      inCart: false,
      itemCount: 1,
    };
  }
  componentDidMount() {
    let product_id = this.props.navigation.getParam('product_id');
    this.product_id = product_id;
    this.wished = this.props.pageData.wishlist;
    this.props.FetchProduct(product_id);
    let inCart = false;
    for (let i = 0; i < this.props.cart?.length; i++) {
      const cartItem = this.props.cart[i];
      if (cartItem.product_id === product_id) inCart = true;
    }
    this.setState({
      product_id: product_id,
      wished: this.props.pageData.wishlist,
      inCart,
    });
  }
  onProductSharePress() {
    let message = `
            ${this.props.pageData.heading_title} \n
            ${this.props.pageData.share_url}
        `;
    Share.share({
      message,
    });
  }
  _renderPrice() {
    if (this.props.pageData.special?.toString() === 'false') {
      return (
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: normalize(20, 'height'),
          }}
        >
          <Text style={{fontSize: 15}}>{this.props.pageData.price}</Text>
        </Row>
      );
    } else {
      return (
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: normalize(18, 'height'),
          }}
        >
          <Text style={{fontSize: 15, color: StylesConstant.MainColor}}>
            {this.props.pageData.special}
          </Text>
          <Text
            style={{
              fontSize: 12,
              textDecorationLine: 'line-through',
              marginLeft: normalize(10),
            }}
          >
            {this.props.pageData.price}
          </Text>
        </Row>
      );
    }
  }
  _getDetailsHtml() {
    let details = this.props.pageData.description;
    return `<div style="background-color:${
      StylesConstant.BackgroundColor
    };line-height: 20;">${details}</div>`;
  }
  validateOptions() {
    if (this.props.pageData.options && this.props.pageData.options.length == 0)
      return true;

    let requiredOptions = this.props.pageData.options.filter(
      e => e.required === '1',
    );
    if (requiredOptions.length == 0) return true;
    let enteredOPtions = this.props.selecedOptions.map(
      e => e.product_option_id,
    );

    for (let i = 0; i < requiredOptions.length; i++) {
      const element = requiredOptions[i];

      if (enteredOPtions.indexOf(element.product_option_id) == -1) {
        return false;
      }
    }

    return true;
  }
  AddToCart() {
    if (this.validateOptions() && this.state.itemCount > 0) {
      let product_id = this.props.navigation.getParam('product_id');
      let body = {
        product_id: product_id,
        quantity: this.state.itemCount,
      };
      body['option'] = [];
      // if (this.props.selecedOptions.length > 0) {
      //   this.props.selecedOptions.forEach(o => {
      //     body['option'][o.product_option_id] = o.option_value_id;
      //   });
      // }

      this.props.AddToCart(body, () => {
        //this.props.navigation.navigate("cart");
        // this.props.fetchCart();
        this.props.fetchCart();
        this.setState({
          inCart: true,
        });
      });
    } else {
      Alert.alert('لم تقم بإدخال تفاصيل المنتج كلها');
    }
  }
  onWichPress() {
    if (this.state.wished) {
      this.props.RemoveFromWishlist(this.props.id);
    } else {
      AddToWishlist(this.props.id);
    }
    this.setState({
      wished: !this.state.wished,
    });
    // setInWish(!inWish);
  }
  renderCustomizationSection() {
    return (
      <View style={{width: '100%'}}>
        <ProductCustomize options={this.props.pageData.options} />
      </View>
    );
  }
  renderReviewSection() {
    return (
      <ReviewsSection
        reviews={this.props.reviews}
        empty={this.props.pageData.text_no_reviews}
      />
    );
  }
  renderDescriptionSection() {
    let details = this.props.pageData.description;
    let html = `<div style="background-color:${
      StylesConstant.BackgroundColor
    };line-height: 20;width:100%;padding:20px ">${details}</div>`;
    return (
      <View style={{padding: 10}}>
        <HTML
          html={html}
          ignoredStyles={['height', 'width', 'text-align']}
          imagesMaxWidth={Dimensions.get('window').width}
          style={{width: '100%'}}
        />
      </View>
    );
  }
  renderAttributeSection() {
    let attribute_groups = this.props.pageData.attribute_groups;
    return (
      <View style={{width: '100%', padding: 20}}>
        <Attributes attributes={attribute_groups} />
      </View>
    );
  }
  setTabsData() {
    let tab_reviews = this.props.pageData.reviews || '';
    let tab_attribute = this.props.pageData.tab_attribute || '';
    let tab_description = this.props.pageData.tab_description || '';

    let tabData = [
      {
        label: ChooseStringByLanguage('Details', 'تفاصيل'),
        view: this.renderCustomizationSection(),
      },
      {
        label: ChooseStringByLanguage('Reviews', 'التعليقات'),
        view: this.renderReviewSection(),
      },
      {
        label: ChooseStringByLanguage('Description', 'الوصف'),
        view: this.renderDescriptionSection(),
      },
    ];

    if (this.props.pageData?.attribute_groups?.length > 0) {
      tabData.push({
        label: tab_attribute,
        view: this.renderAttributeSection(),
      });
    }
    return tabData;
  }
  renderTextMinmium() {
    if (this.props.pageData.text_minimum) {
      return (
        <Row style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 12, marginLeft: normalize(10)}}>
            {this.props.pageData.text_minimum}
          </Text>
        </Row>
      );
    }
  }
  renderReleatedProducts() {}
  onItemCountPlus = () => {
    this.setState({itemCount: this.state.itemCount + 1});
  };
  onItemCountMinus = () => {
    this.setState({itemCount: this.state.itemCount - 1});
  };
  render() {
    let images = [this.props.pageData.popup];
    this.props.pageData.images
      ? this.props.pageData.images.map(e => images.push(e.popup))
      : [];

    return (
      <Container style={{backgroundColor: StylesConstant.BackgroundColor}}>
        <Content showsVerticalScrollIndicator={false}>
          {/* <CustomHeader
                  wished={this.props.pageData.wishlist || false}
                  id={this.state.product_id}
               /> */}
          <LoadingIndicator visible={this.props.loading} />

          <Grid>
            <Col>
              <Row>
                <TouchableOpacity
                  onPress={() => this.onWichPress()}
                  style={[
                    {
                      backgroundColor: '#fff',
                    },
                    styles.CallToAction1,
                    CommonStyles.LightShadow,
                  ]}
                >
                  <NativeIcon
                    name={this.state.wished ? 'heart' : 'heart-outline'}
                    type="MaterialCommunityIcons"
                    style={{
                      color: this.state.wished
                        ? StylesConstant.MainColor
                        : '#727C8E',
                    }}
                    size={17}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    AddToCompare(this.props.navigation.getParam('product_id'))
                  }
                  style={[
                    {
                      backgroundColor: '#fff',
                    },
                    styles.CallToAction2,
                    CommonStyles.LightShadow,
                  ]}
                >
                  <NativeIcon
                    type="Entypo"
                    name="cycle"
                    style={{color: '#727C8E'}}
                    size={17}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onProductSharePress()}
                  style={[
                    {
                      backgroundColor: '#39B6EE',
                    },
                    styles.CallToAction3,
                    CommonStyles.LightShadow,
                  ]}
                >
                  <NativeIcon
                    type="Entypo"
                    name="share"
                    style={{color: '#fff'}}
                    size={17}
                  />
                </TouchableOpacity>

                <Slider
                  onCurrentImagePressed={index =>
                    this.setState({
                      imageShow: true,
                      imageShowIndex: index,
                    })
                  }
                  dotColor={StylesConstant.MainColor}
                  sliderBoxHeight={width}
                  images={images}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    borderWidth: 1,
                    backgroundColor: '#515C6F',
                  }}
                  circleLoop
                />
                <Modal
                  onRequestClose={() => this.setState({imageShow: false})}
                  visible={this.state.imageShow}
                  transparent={false}
                >
                  <ImageViewer
                    onCancel={() => this.setState({imageShow: false})}
                    index={this.state.imageShowIndex}
                    enableSwipeDown
                    imageUrls={images.map(e => ({url: e}))}
                  />
                </Modal>
              </Row>
              <Row
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: normalize(10, 'height'),
                }}
              >
                <Text
                  style={[
                    {fontSize: 20, maxWidth: '80%'},
                    CommonStyles.FontFamilyBold,
                  ]}
                >
                  {this.props.pageData.heading_title}
                </Text>

                <Rating
                  style={{
                    marginTop: normalize(4, 'height'),
                    marginLeft: normalize(10),
                  }}
                  rate={this.props.pageData.rating}
                />
              </Row>
              {this.renderTextMinmium()}
              {this._renderPrice()}
            </Col>
          </Grid>

          {/* {this._renderTabs()}
           */}
          <ProductTabs content={this.setTabsData()} />
          <SectionDivider />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: '#5A64A8',
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NativeIcon
                type="FontAwesome"
                name="truck"
                style={{color: '#fff'}}
                size={17}
              />
            </View>
            <View>
              <Text style={{color: '#515C6F', fontSize: 18}}>
                {global.IsRtl ? 'شحن سريع' : 'Fast shipping'}
              </Text>
              <Text
                style={{
                  color: '#515C6F',
                  fontSize: normalize(15, 'width'),
                  marginTop: 5,
                }}
              >
                {global.IsRtl
                  ? 'لا تهتم ، نوصل لك طلبك الى بابك '
                  : 'Do not care, we deliver your order to your door'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: '#5A64A8',
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NativeIcon
                type="MaterialCommunityIcons"
                name="shield-check"
                style={{color: '#fff'}}
                size={17}
              />
            </View>
            <View>
              <Text style={{color: '#515C6F', fontSize: 18}}>
                {global.IsRtl ? 'تسوق بأمان' : 'Shop safely'}
              </Text>
              <Text
                style={{
                  color: '#515C6F',
                  fontSize: normalize(15, 'width'),
                  marginTop: 5,
                }}
              >
                {global.IsRtl
                  ? 'خيارات دفع آمنة وموثوقة وبياناتك محمية دائماً'
                  : 'Safe and reliable payment options and your data is always protected'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: '#5A64A8',
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NativeIcon
                type="FontAwesome"
                name="star"
                style={{color: '#fff'}}
                size={17}
              />
            </View>
            <View>
              <Text style={{color: '#515C6F', fontSize: 18}}>
                {global.IsRtl ? 'منتجات موثوقة ' : 'Reliable products'}
              </Text>
              <Text
                style={{
                  color: '#515C6F',
                  fontSize: normalize(15, 'width'),
                  marginTop: 5,
                }}
              >
                {global.IsRtl
                  ? 'منتجات أصلية | جودة عالية'
                  : 'Original products | High quality'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: '#5A64A8',
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NativeIcon
                type="MaterialCommunityIcons"
                name="wallet-outline"
                style={{color: '#fff'}}
                size={17}
              />
            </View>
            <View>
              <Text style={{color: '#515C6F', fontSize: 18}}>
                {global.IsRtl ? 'دفع عند الاستلام' : 'Pay on delivery'}
              </Text>
              <Text
                style={{
                  color: '#515C6F',
                  fontSize: normalize(15, 'width'),
                  marginTop: 5,
                }}
              >
                {global.IsRtl
                  ? 'توفر خدمة الدفع عند استلام المنتج'
                  : 'Payment service is available upon receipt of the product'}
              </Text>
            </View>
          </View>
          <SectionDivider />
          <AddReview product_id={this.product_id} />

          <SectionDivider />
          <View style={{padding: 10}}>
            <Text
              style={[
                {fontSize: 12, marginBottom: 10},
                CommonStyles.FontFamilyMedium,
              ]}
            >
              {this.props.pageData.tab_related}
            </Text>
            <FlatList
              style={{alignSelf: 'center', flexGrow: 0}}
              showsHorizontalScrollIndicator={false}
              data={this.props.pageData.products}
              renderItem={({item}) => (
                <View style={{height: normalize(280, 'height')}}>
                  <Product
                    navigation={this.props.navigation}
                    style={{width: normalize(160)}}
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

          <View
            style={{
              height: normalize(120, 'height'),
              backgroundColor: StylesConstant.BackgroundColor,
            }}
          />
        </Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: normalize(40, 'height'),
            position: 'absolute',
            zIndex: 20,
            paddingHorizontal: 15,
            bottom: normalize(30, 'height'),
            left: 0,
            right: 0,
            backgroundColor: StylesConstant.BackgroundColor,
          }}
        >
          {/* row plus one or minus */}
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: normalize(170),
              height: normalize(40, 'height'),
              borderRadius: normalize(29 / 2),
            }}
          >
            <TouchableOpacity onPress={this.onItemCountPlus}>
              <View
                style={{
                  backgroundColor: '#DFDFDF',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 5,
                }}
              >
                <NativeIcon
                  type="FontAwesome"
                  name="plus"
                  style={{
                    fontSize: normalize(20),

                    color: '#fff',

                    alignSelf: 'center',
                  }}
                />
              </View>
            </TouchableOpacity>

            <Text>{this.state.itemCount}</Text>
            <TouchableOpacity
              onPress={
                this.state.itemCount < 1
                  ? () => {
                      return;
                    }
                  : this.onItemCountMinus
              }
            >
              <View
                style={{
                  backgroundColor: '#DFDFDF',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 5,
                }}
              >
                <NativeIcon
                  type="FontAwesome"
                  name="minus"
                  style={{
                    fontSize: normalize(20),

                    color: '#fff',

                    alignSelf: 'center',
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* row plus one or minus */}

          {/* <IconButton
                  style={{
                     width: normalize(170),
                     height: normalize(40, 'height'),
                  }}
                  IconName="arrow-up"
                  IconType="font-awesome"
                  IconStyle={{ marginLeft: 0 }}
                  IconColor="#fff"
                  Title={global.IsRtl ? 'شارك المنتج' : 'Share'}
                  IconBackground="#727C8E"
                  onPress={() => this.onProductSharePress()}
                  Color="#fff"
               /> */}
          <PriamryButton
            onPress={() => this.AddToCart()}
            Title={TranslateString('button_cart')}
            style={{
              width: normalize(170),
              height: normalize(40, 'height'),
            }}
            IconColor={this.state.inCart ? StylesConstant.MainColor : '#5B8C5A'}
            Color={this.state.inCart ? StylesConstant.MainColor : '#5B8C5A'}
            // Overriding default peoperties
            IconName="cart-plus"
            IconType="material-community"
            IconStyle={{marginRight: normalize(4)}}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inactiveTab: {
    backgroundColor: '#e1e6ed',
    borderRadius: normalize(50),
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: normalize(50),
  },
  CallToAction1: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: '70%',
    right: 0,
    zIndex: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CallToAction2: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: '55%',
    right: 0,
    zIndex: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CallToAction3: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: '40%',
    right: 0,
    zIndex: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusAndMinus: {
    height: 20,
    width: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: '10%',
    right: 0,
    left: 10,
    zIndex: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = state => ({
  pageData: state.product.pageData,
  loading: state.product.loading,
  selecedOptions: state.product.selecedOptions,
  reviews: state.product.reviews.reviews,
  cart: state.shop.cart.products,
});

const mapDispatchToProps = dispatch => ({
  FetchProduct: id => dispatch(FetchProduct(id)),
  AddToCart: (body, cb) => dispatch(AddToCart(body, cb)),
  fetchCart: () => dispatch(FetchCart()),
  RemoveFromWishlist: product_id => dispatch(RemoveFromWishlist(product_id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailsView);
