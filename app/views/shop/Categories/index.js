import React from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {FetchCategoriesList} from '../../../actions/ShopActions';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import Category from '../../../common/Components/Category';
import {NavigationEvents} from 'react-navigation';
import {Container, Content} from 'native-base';
import StylesConstant from '../../../constants/styles';
import normalize from 'react-native-normalize';
const headerMapToProps = state => ({
  Title: state.shop.categoriesPage?.heading_title,
});
const Header = connect(headerMapToProps)(HeaderWithBack);

class CategoryList extends React.Component {
  static navigationOptions = {
    header: <Header />,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //this.props.fetchCategoriesList();
  }

  render() {
    return (
      <Container>
        <Content
          padder={true}
          style={{backgroundColor: StylesConstant.BackgroundColor}}
        >
          <LoadingIndicator visible={this.props.loading} />
          <FlatList
            data={this.props.pageData?.categories}
            renderItem={({item}) => (
              <Category
                onPress={() =>
                  this.props.navigation.navigate('categorydetails', {
                    category_id: item.category_id,
                  })
                }
                Img={item.thumb}
                Name={item.name}
              />
            )}
            keyExtractor={(i, n) => i.name + n}
            numColumns={3}
            columnWrapperStyle={{marginBottom: normalize(30, 'height')}}
            ListEmptyComponent={
              <Text style={{alignSelf: 'center'}}>
                {this.props.pageData?.text_empty}
              </Text>
            }
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageData: state.shop.categoriesPage,
    loading: state.shop.loading,
    loadingStatus: state.shop.loadingStatus,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchCategoriesList: () => dispatch(FetchCategoriesList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
