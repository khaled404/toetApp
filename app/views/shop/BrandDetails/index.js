import React from 'react';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import Product from '../../../common/Components/Product';
import {connect} from 'react-redux';
import {
  FetchSingleManufacturer,
  FetchSingleManufacturerByFilter,
  FetchSingleManufacturerNextPage,
} from '../../../actions/ShopActions';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import ConstntStyles from '../../../constants/styles';
import {Grid, Col, Row, Container, Content} from 'native-base';
import {Text, FlatList, View} from 'react-native';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import ProductsFilter from '../../../common/Components/ProductFilter';
import normalize from 'react-native-normalize';

const headerMapToProps = state => ({
  Title: state.shop.manufacturerDetails?.heading_title,
});
const Header = connect(headerMapToProps)(HeaderWithBack);
//Filter
const filterMapTopProps = state => ({
  sort: state.shop.manufacturerDetails.sort,
  sorts: state.shop.manufacturerDetails.sorts,
  order: state.shop.manufacturerDetails.order,
  id: state.shop.manufacturerDetails.manufacturer_id,
});
const filterDispatchToProps = dispatch => ({
  filterProducts: (id, filter) =>
    dispatch(FetchSingleManufacturerByFilter(id, filter)),
});
const FilterComponent = connect(
  filterMapTopProps,
  filterDispatchToProps,
)(ProductsFilter);

class BrandDetails extends React.Component {
  static navigationOptions = {
    header: <Header rightComponent={<FilterComponent />} />,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let manufacturer_id = this.props.navigation.getParam('manufacturer_id');
    this.props.fetchSingleManufacturer(manufacturer_id);
  }
  onEndReached() {
    if (
      this.props.pageData.products.length > 0 &&
      this.props.pageData.pagination.page !== 0
    ) {
      let manufacturer_id = this.props.navigation.getParam('manufacturer_id');

      let sort = this.props.pageData.sort;
      let order = this.props.pageData.order;
      let page = parseInt(this.props.pageData.pagination.page) + 1;
      this.props.FetchSingleManufacturerNextPage(
        manufacturer_id,
        sort,
        order,
        page,
      );
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: normalize(20, 'height'),
          paddingHorizontal: normalize(20),
          backgroundColor: ConstntStyles.BackgroundColor,
        }}
      >
        <LoadingIndicator visible={this.props.loading} />
        <FlatList
          data={this.props.pageData?.products}
          renderItem={({item}) => (
            <Product
              style={{flex: 0.5}}
              id={item.product_id}
              favorited={item.wishlist}
              navigation={this.props.navigation}
              name={item.name}
              rating={item.rating}
              price={item.price}
              oldprice={item.special}
              img={item.thumb}
            />
          )}
          keyExtractor={(i, n) => i.name + n}
          numColumns={2}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={0.01}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          ListEmptyComponent={
            <Text style={{alignSelf: 'center'}}>
              {this.props.pageData?.text_empty}
            </Text>
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageData: state.shop.manufacturerDetails,
    loading: state.shop.loading,
    loadingStatus: state.shop.loadingStatus,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchSingleManufacturer: id => dispatch(FetchSingleManufacturer(id)),
  FetchSingleManufacturerNextPage: (id, sort, order, page) =>
    dispatch(FetchSingleManufacturerNextPage(id, sort, order, page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrandDetails);
