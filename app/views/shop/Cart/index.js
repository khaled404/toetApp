import React from 'react';
import {Text, View, ScrollView, FlatList, Alert} from 'react-native';
import {Divider} from 'react-native-elements';
import StylesConstant from '../../../constants/styles';
import SafeView from '../../../common/UI/SafeView';
import CommonStyles from '../../../common/styles';
import StylesConstants from '../../../constants/styles';
import CartItem from './CartItem';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import {connect} from 'react-redux';
import {FetchCart, ChangeCartQuanitity} from '../../../actions/ShopActions';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import {NavigationEvents} from 'react-navigation';
import Toast from 'react-native-root-toast';
import normalize from 'react-native-normalize';
import {TranslateString} from '../../../util';
import CouponSection from './CouponSection';
import VoucherSection from './VoucherSection';
import SectionDivider from '../../../common/UI/SectionDivider';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import {Container, Content} from 'native-base';
class CartView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  onQuanitiyChangePress(id, quantity, op) {
    let newQuantity = 0;
    if (op === '+') newQuantity = parseInt(quantity) + 1;
    else newQuantity = parseInt(quantity) - 1;
    if (newQuantity === 0) {
      Toast.show('أقل عدد ممكن من المنتجات هو 0');
      return;
    }
    this.props.ChangeCartQuanitity(id, newQuantity);
  }
  onDeletePress(id) {
    let newQuantity = 0;

    this.props.ChangeCartQuanitity(id, newQuantity);
  }
  _renderTotals() {
    let totals = this.props.pageData.totals;
    if (totals?.length > 0) {
      let children = [];
      for (let i = 0; i < totals.length; i++) {
        const t = totals[i];
        if (i === totals.length - 1) {
          //The last one
          children.push(
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={([CommonStyles.FontFamilyMedium], {fontSize: 15})}>
                {t?.title}
              </Text>
              <Text
                style={[
                  {color: StylesConstant.MainColor, fontSize: 15},
                  CommonStyles.FontFamilyBold,
                ]}
              >
                {t?.text}
              </Text>
            </View>,
          );
        } else {
          children.push(
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={([CommonStyles.FontFamilyMedium], {fontSize: 15})}>
                {t?.title}
              </Text>
              <Text
                style={[
                  {color: StylesConstant.MainColor, fontSize: 15},
                  CommonStyles.FontFamilyBold,
                ]}
              >
                {t?.text}
              </Text>
            </View>,
          );
        }
      }
      return <View style={{flex: 1}}>{children}</View>;
    }

    return null;
  }
  Checkout() {
    const {navigate} = this.props.navigation;

    if (this.props.isLoggedIn) {
      navigate('checkout');
    } else {
      navigate('guestcheckout');
    }
  }
  renderWarningMessage() {
    if (this.props.pageData.error_warning)
      return (
        <Text
          style={[
            CommonStyles.FontFamilyBold,
            CommonStyles.MainColor,
            {marginBottom: 5, fontSize: 12},
          ]}
        >
          {this.props.pageData.error_warning}
        </Text>
      );

    return null;
  }
  render() {
    let coupon = TranslateString('text_cart_coupon');
    if (
      typeof this.props.pageData.coupon !== 'object' &&
      typeof this.props.pageData.coupon !== 'undefined'
    ) {
      if (this.props.pageData.coupon) coupon = this.props.pageData.coupon;
    }

    let voucher = TranslateString('text_cart_voucher');
    if (
      typeof this.props.pageData.voucher !== 'object' &&
      typeof this.props.pageData.voucher !== 'undefined'
    ) {
      if (this.props.pageData.voucher) voucher = this.props.pageData.voucher;
    }

    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          style={[{backgroundColor: StylesConstants.BackgroundColor}]}
          padder={true}
        >
          <NavigationEvents onDidFocus={() => this.props.fetchCart()} />
          <LoadingIndicator visible={this.props.loading} />
          {this.renderWarningMessage()}
          <FlatList
            data={this.props.pageData?.products}
            renderItem={({item}) => (
              <CartItem
                key={item.cart_id}
                Name={item.name}
                Desc={item.model}
                Price={item.price}
                Total={item.total}
                Img={item.thumb}
                Product_Id={item.product_id}
                navigation={this.props.navigation}
                Option={item.option}
                Stock={item.stock}
                Count={item.quantity}
                onIncreasePress={() =>
                  this.onQuanitiyChangePress(item.cart_id, item.quantity, '+')
                }
                onDecresePress={() =>
                  this.onQuanitiyChangePress(item.cart_id, item.quantity, '-')
                }
                onDeletePress={() => this.onDeletePress(item.cart_id)}
              />
            )}
            keyExtractor={(i, n) => i.name + n}
            numColumns={1}
            ListEmptyComponent={
              <Text style={{alignSelf: 'center'}}>
                {this.props.pageData?.text_empty}
              </Text>
            }
          />

          <View
            style={{
              flexDirection: 'column',
              display:
                this.props.pageData.products?.length > 0 ? 'flex' : 'none',
            }}
          >
            <SectionDivider marginBottom={0} />

            <CouponSection
              title={TranslateString('text_cart_coupon')}
              coupon={coupon}
            />
            <VoucherSection
              title={TranslateString('text_cart_voucher')}
              voucher={voucher}
            />

            <SectionDivider marginTop={0} />
            <View style={{flexDirection: 'column'}}>
              {this._renderTotals()}

              <View style={{flex: 1, marginTop: 5}}>
                <PrimaryButton
                  disabled={this.props.pageData.error_warning}
                  Title={TranslateString('button_order_confirm')}
                  onPress={() => this.Checkout()}
                />
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  pageData: state.shop.cart,
  loading: state.shop.loading,
  loadingStatus: state.shop.loadingStatus,
});
const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(FetchCart()),
  ChangeCartQuanitity: (id, quantity) =>
    dispatch(ChangeCartQuanitity(id, quantity)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartView);
