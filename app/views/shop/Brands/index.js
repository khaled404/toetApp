import React from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {FetchManufacturersList} from '../../../actions/ShopActions';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import Brand from './Brand';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import StylesConstant from '../../../constants/styles';
import {NavigationEvents} from 'react-navigation';
import {Container, Content} from 'native-base';
import normalize from 'react-native-normalize';
const headerMapToProps = state => ({
  Title: state.shop.manufacturersPage?.heading_title,
});
const Header = connect(headerMapToProps)(HeaderWithBack);

class BrandScreen extends React.Component {
  static navigationOptions = {
    header: <Header />,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchManufacturersList();
  }
  onScrollEnd() {}
  render() {
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{
            paddingVertical: normalize(22, 'height'),
            paddingHorizontal: normalize(20),
            backgroundColor: StylesConstant.BackgroundColor,
          }}
        >
          <LoadingIndicator visible={this.props.loading} />

          <FlatList
            data={this.props.pageData?.manufacturers}
            renderItem={({item}) => (
              <Brand
                onPress={() =>
                  this.props.navigation.navigate('branddetails', {
                    manufacturer_id: item.manufacturer_id,
                  })
                }
                Img={item.thumb}
                Name={item.name}
              />
            )}
            keyExtractor={(i, n) => i.name + n}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{marginBottom: normalize(30, 'height')}}
            ListEmptyComponent={<Text>{this.props.pageData?.text_empty}</Text>}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageData: state.shop.manufacturersPage,
    loading: state.shop.loading,
    loadingStatus: state.shop.loadingStatus,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchManufacturersList: () => dispatch(FetchManufacturersList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandScreen);
