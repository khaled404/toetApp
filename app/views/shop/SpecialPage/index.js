import React from 'react';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import Product from '../../../common/Components/Product';
import { connect } from 'react-redux';
import {
   FetchSpeicalPage,
   FetchSpeicalPageNextPage,
   FetchSpecialPageByFilter,
} from '../../../actions/ShopActions';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import ConstntStyles from '../../../constants/styles';

import { Grid, Col, Row, Container, Content } from 'native-base';
import {
   Text,
   FlatList,
   View,
   ActivityIndicator,
   RefreshControl,
} from 'react-native';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import ProductsFilter from '../../../common/Components/ProductFilter';
import normalize from 'react-native-normalize';
import StylesConstant from '../../../constants/styles';

// header
const headerMapToProps = state => ({
   Title: state.shop.sepcialProductPage?.heading_title,
});
const Header = connect(headerMapToProps)(HeaderWithBack);
//Filter
const filterMapTopProps = state => ({
   sort: state.shop.sepcialProductPage.sort,
   sorts: state.shop.sepcialProductPage.sorts,
   order: state.shop.sepcialProductPage.order,
   id: state.shop.sepcialProductPagePath,
});
const filterDispatchToProps = dispatch => ({
   filterProducts: (id, filter) =>
      dispatch(FetchSpecialPageByFilter(id, filter)),
});
const FilterComponent = connect(
   filterMapTopProps,
   filterDispatchToProps
)(ProductsFilter);

class SepcialsDetails extends React.Component {
   static navigationOptions = {
      header: <Header rightComponent={<FilterComponent />} />,
   };
   constructor(props) {
      super(props);
      this.state = {
         refresh: false,
      };
   }
   componentDidMount() {
      let path = this.props.navigation.getParam('path');
      this.props.FetchSpeicalPage(path);
   }
   onEndReached() {
      if (typeof this.props.pageData.pagination === 'undefined') return;
      if (
         this.props.pageData.products.length > 0 &&
         this.props.pageData.pagination.page !== 0
      ) {
         let path = this.props.navigation.getParam('path');
         let sort = this.props.pageData.sort;
         let order = this.props.pageData.order;
         let page = parseInt(this.props.pageData.pagination.page) + 1;
         this.props.FetchSpeicalPageNextPage(path, sort, order, page);
      }
   }
   renderfetchMoreLoader = () =>
      this.props.fetchMoreLoader && (
         <View style={{ flex: 1 }}>
            <ActivityIndicator size="large" color={StylesConstant.MainColor} />
         </View>
      );
   refresh = async refreshFlag => {
      this.setState({ refresh: true });
      let path = this.props.navigation.getParam('path');
      await this.props.FetchSpeicalPage(path);
      this.setState({ refresh: false });
   };
   render() {
      const { refresh } = this.state;
      return (
         <View
            style={{
               flex: 1,
               paddingVertical: 10,
               paddingHorizontal: 10,
               backgroundColor: ConstntStyles.BackgroundColor,
            }}>
            <LoadingIndicator visible={this.props.loading} />
            <FlatList
               data={this.props.pageData?.products}
               /*  ListFooterComponent={this.renderfetchMoreLoader} */
               refreshControl={
                  <RefreshControl
                     refreshing={refresh}
                     onRefresh={refresh => {
                        this.refresh(refresh);
                     }}
                     tintColor={StylesConstant.MainColor}
                     colors={[StylesConstant.MainColor]}
                  />
               }
               renderItem={({ item }) => (
                  <Product
                     style={{ flex: 0.5 }}
                     id={item.product_id}
                     favorited={item.wishlist}
                     navigation={this.props.navigation}
                     oldprice={item.special}
                     name={item.name}
                     rating={item.rating}
                     price={item.price}
                     img={item.thumb}
                  />
               )}
               keyExtractor={(i, n) => i.name + n}
               numColumns={2}
               onEndReached={() => this.onEndReached()}
               onEndReachedThreshold={0.5}
               showsVerticalScrollIndicator={false}
               ListEmptyComponent={
                  <Text style={{ alignSelf: 'center' }}>
                     {this.props.pageData?.text_empty}
                  </Text>
               }
            />
            <View style={{ height: normalize(20, 'height') }}></View>
         </View>
      );
   }
}

const mapStateToProps = state => {
   return {
      pageData: state.shop.sepcialProductPage,
      path: state.shop.sepcialProductPagePath,
      loading: state.shop.loading,
      loadingStatus: state.shop.loadingStatus,
      fetchMoreLoader: state.shop.fetchMoreLoader,
   };
};
const mapDispatchToProps = dispatch => ({
   FetchSpeicalPage: path => dispatch(FetchSpeicalPage(path)),
   FetchSpeicalPageNextPage: (path, sort, order, page) =>
      dispatch(FetchSpeicalPageNextPage(path, sort, order, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SepcialsDetails);
