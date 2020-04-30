import React from 'react';
import {View, Text, ScrollView, FlatList, Image} from 'react-native';
import SafeView from '../../common/UI/SafeView';
import Slideshow from './Slideshow';
import ProductSection from './ProductsSection';
import {connect} from 'react-redux';
import normalize from 'react-native-normalize';
import CategoriesSection from './CategoriesSection';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  buildHomePage() {
    let topContentModules = this.props.pageData.content_top.modules;
    let bottomContentModules = this.props.pageData.content_bottom.modules;
    let topElements = topContentModules.map(e => this.praseModule(e));
    let bottomElements = bottomContentModules.map(e => this.praseModule(e));
    return [].concat(topElements, bottomElements);
    //return [].concat(topElements);
  }
  praseModule(module) {
    if (module.code === 'slideshow') {
      let banners = module.data.banners;
      return <Slideshow banners={banners} navigation={this.props.navigation} />;
    }
    if (module.code === 'category') {
      let cateogries = module.data.categories;
      return (
        <CategoriesSection
          categories={cateogries}
          navigation={this.props.navigation}
        />
      );
    }
    if (
      module.code === 'latest' ||
      module.code === 'special' ||
      module.code === 'featured' ||
      module.code === 'mostviewed'
    ) {
      let products = module.data.products;
      let heading_title = module.data.heading_title;
      return (
        <ProductSection
          code={module.code}
          navigation={this.props.navigation}
          title={heading_title}
          products={products}
        />
      );
    }
    if (module.code === 'banner') {
      let image = module.data.banners[0].image;
      return (
        <View
          style={{
            flex: 1,
            overflow: 'hidden',
            marginBottom: normalize(25, 'height'),
          }}
        >
          <Image
            source={{uri: image}}
            style={{
              width: '100%',
              height: normalize(180, 'height'),
              alignSelf: 'center',
              resizeMode: 'cover',
            }}
          />
        </View>
      );
    }
  }
  render() {
    return (
      <SafeView style={{padding: 0}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.buildHomePage()}
        </ScrollView>
      </SafeView>
    );
  }
}

const mapStateToProps = state => ({
  pageData: state.settings.HomeLayout,
});
export default connect(mapStateToProps)(HomePage);
