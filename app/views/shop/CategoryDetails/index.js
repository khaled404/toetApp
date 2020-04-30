import React from 'react';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import Product from '../../../common/Components/Product';
import LocalIcon from '../../../common/Icons/LocalIcon';
import {connect} from 'react-redux';
import {
  FetchSingleCategory,
  FetchSingleCategoryByFilter,
  FetchSingleCategoryNextPage,
  LoadSingleCategory,
} from '../../../actions/ShopActions';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import ConstntStyles from '../../../constants/styles';
import SearchFiler from './SearchFilter';
import {Grid, Col, Row, Container, Content} from 'native-base';
import {
  Text,
  FlatList,
  View,
  Button,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import ProductsFilter from '../../../common/Components/ProductFilter';
import normalize from 'react-native-normalize';
import Drawer from 'react-native-drawer';

// header
const headerMapToProps = state => ({
  Title: state.shop.cateogryDetails?.heading_title,
});
const Header = connect(headerMapToProps)(HeaderWithBack);
//Filter
const filterMapTopProps = state => ({
  sort: state.shop.cateogryDetails.sort,
  sorts: state.shop.cateogryDetails.sorts,
  order: state.shop.cateogryDetails.order,
  id: state.shop.cateogryDetails.category_id,
});
const filterDispatchToProps = dispatch => ({
  filterProducts: (id, filter) =>
    dispatch(FetchSingleCategoryByFilter(id, filter)),
});
const FilterComponent = connect(
  filterMapTopProps,
  filterDispatchToProps,
)(ProductsFilter);

class BrandDetails extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      filters: [],
    };
  }
  componentWillUnmount() {
    this.props.ClearPage();
  }
  componentDidMount() {
    let category_id = this.props.navigation.getParam('category_id');
    this.props.fetchSingleCategory(category_id);
  }
  componentDidUpdate(prevProps, prevState) {
    // if (prevState.filters.length == 0 && this.state.filters.length == 0) return;
    if (this.state.filters.length === 0 && prevState.filters.length > 0) {
      let category_id = this.props.navigation.getParam('category_id');

      this.props.fetchSingleCategory(category_id, this.state.filters);
    }
    if (!this.state.filters.every(e => prevState.filters.includes(e))) {
      let category_id = this.props.navigation.getParam('category_id');

      this.props.fetchSingleCategory(category_id, this.state.filters);
    }
  }
  onEndReached() {
    if (
      this.props.pageData.products.length > 0 &&
      this.props.pageData.pagination.page !== 0
    ) {
      let category_id = this.props.navigation.getParam('category_id');
      let sort = this.props.pageData.sort;
      let order = this.props.pageData.order;
      let page = parseInt(this.props.pageData.pagination.page) + 1;
      this.props.FetchSingleCategoryNextPage(
        category_id,
        sort,
        order,
        page,
        this.state.filters,
      );
    }
  }
  openDrawer() {
    this.setState({
      drawerOpen: true,
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this._handleBackPressInDrawer.bind(this),
    );
  }

  closeDrawer() {
    this.setState({
      drawerOpen: false,
    });
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this._handleBackPressInDrawer.bind(this),
    );
  }
  _handleBackPressInDrawer() {
    if (this.state.drawerOpen) {
      this.closeDrawer();
      return true;
    }
    return false;
  }
  _renderHeaderIcons() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 50,
        }}
      >
        <FilterComponent />
        <LocalIcon
          onPress={() => this.openDrawer()}
          name="filter"
          color="#fff"
          size={18}
        />
      </View>
    );
  }
  onFilterChange(filters) {
    this.closeDrawer();
    this.setState({filters});
  }
  render() {
    return (
      <Drawer
        open={this.state.drawerOpen}
        onClose={() => this.closeDrawer()}
        type="overlay"
        side="right"
        content={
          <SearchFiler
            filter_groups={this.props.pageData.filter_groups}
            filter_category={this.props.pageData.filter_category}
            onFilterChange={filters => this.onFilterChange(filters)}
          />
        }
        tapToClose={true}
        openDrawerOffset={0.4} // 20% gap on the right side of drawer
        panCloseMask={0.4}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={ratio => ({
          main: {opacity: (2 - ratio) / 2},
        })}
      >
        <Header rightComponent={this._renderHeaderIcons()} />
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
                oldprice={item.special}
                rating={item.rating}
                price={item.price}
                img={item.thumb}
              />
            )}
            keyExtractor={(i, n) => i.name + n}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            onEndReached={() => this.onEndReached()}
            onEndReachedThreshold={0.01}
            initialNumToRender={10}
            ListEmptyComponent={
              <Text style={{alignSelf: 'center'}}>
                {this.props.pageData?.text_empty}
              </Text>
            }
          />
        </View>
      </Drawer>
    );
  }
}
const drawerStyles = {
  drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
};

const mapStateToProps = state => {
  return {
    pageData: state.shop.cateogryDetails,
    loading: state.shop.loading,
    loadingStatus: state.shop.loadingStatus,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchSingleCategory: (id, filters) =>
    dispatch(FetchSingleCategory(id, filters)),
  FetchSingleCategoryNextPage: (id, sort, order, page, filter) =>
    dispatch(FetchSingleCategoryNextPage(id, sort, order, page, filter)),
  ClearPage: () => dispatch(LoadSingleCategory({products: []})),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetails);
