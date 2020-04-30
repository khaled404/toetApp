import React from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  ChangeKeyword,
  SearchProduct,
  FetchNextSearchPage,
} from '../../../actions/SearchActions';
import StylesConstant from '../../../constants/styles';
import {connect} from 'react-redux';
import Product from '../../../common/Components/Product';
import LocalIcon from '../../../common/Icons/LocalIcon';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import LottieView from 'lottie-react-native';
import normalize from 'react-native-normalize';
import Voice from 'react-native-voice';
import {GetLanguage} from '../../../util';
class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVoiceAvailable: false,
      isVoiceSearchActive: false,
    };
    this.onVoiceSearchPress = this.onVoiceSearchPress.bind(this);
    this.onEndVoiceSearchPress = this.onEndVoiceSearchPress.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechEnd = () => this.setState({isVoiceSearchActive: false});
  }
  // async componentDidMount() {
  //   let isVoiceAvailable = await Voice.isAvailable();
  //   this.setState({
  //     isVoiceAvailable,
  //   });
  // }
  async componentDidMount() {
    let isVoiceAvailable = await Voice.isAvailable();
    this.setState({
      isVoiceAvailable,
    });
    let searchKeyword = this.props.navigation.getParam('searchKeyword');

    console.log(searchKeyword);
    if (searchKeyword) {
      this.props.ChangeKeyword(searchKeyword);
      this.setState({keyword: searchKeyword});
      //     this.props.SearchProduct(searchKeyword);
      //     this.setState({ isSearchGoing: true });
    }
  }
  async onVoiceSearchPress() {
    let lang = await GetLanguage();
    let val = await Voice.start(lang);
    if (val == null) {
      let isVoiceSearchActive = await Voice.isRecognizing();
      this.setState({isVoiceSearchActive});
    }
  }
  async onEndVoiceSearchPress() {
    let result = await Voice.stop();

    if (result == null) {
      let isVoiceSearchActive = await Voice.isRecognizing();

      this.setState({isVoiceSearchActive});
    }
  }
  onSpeechResults(event) {
    if (typeof event !== 'undefined') {
      let keyword = event.value[0];
      this.props.ChangeKeyword(keyword);
      this.props.SearchProduct(keyword);
    }
  }
  onEndReached() {
    if (
      this.props.pageData.products.length > 0 &&
      this.props.pageData.pagination.page !== 0
    ) {
      let currentTotal = this.props.pageData.products.length;
      if (currentTotal < this.props.pageData.pagination.total) {
        let query = this.props.keyword;
        let sort = this.props.pageData.sort;
        let order = this.props.pageData.order;
        let page = parseInt(this.props.pageData.pagination.page) + 1;
        this.props.FetchNextSearchPage(query, sort, order, page);
      }
    }
  }
  renderVoiceSection() {
    if (!this.state.isVoiceAvailable) return null;

    let isSearchGoingOn =
      this.props.pageData.products.length >= 0 && this.props.keyword.length > 0;

    if (isSearchGoingOn) return null;
    if (!this.state.isVoiceSearchActive)
      return (
        <TouchableOpacity
          onPress={this.onVoiceSearchPress}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
            flex: 9,
          }}
        >
          <View
            style={{
              height: 120,
              width: 120,
              borderRadius: 60,
              backgroundColor: StylesConstant.ColorScandre,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LocalIcon name="mic" color="#fff" size={70} />
            {/* <Icon name="microphone-outline" type="MaterialCommunityIcons" style={{ fontSize: 80, color: '#fff' }} /> */}
          </View>
          <Text
            style={{
              fontFamily: StylesConstant.FontFamily,
              position: 'absolute',
              bottom: 50,
            }}
          >
            {global.IsRtl
              ? 'اضغط هنا للبحث عن منتج بصوتك'
              : 'Press here to start voice search'}
          </Text>
        </TouchableOpacity>
      );

    return (
      <TouchableOpacity
        onPress={this.onEndVoiceSearchPress}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
          flex: 9,
          position: 'relative',
        }}
      >
        <LottieView
          source={require('../../../animations/voice-waves.json')}
          autoPlay
          loop
        />

        <View
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
            backgroundColor: StylesConstant.MainColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LocalIcon name="mic" color="#fff" size={70} />
        </View>
        <Text
          style={{
            fontFamily: StylesConstant.FontFamily,
            position: 'absolute',
            bottom: -30,
          }}
        >
          {global.IsRtl
            ? 'قم بنطق اسم المنتج الذي تبحث عنه'
            : 'Please say your product name loud and clear'}
        </Text>
      </TouchableOpacity>
    );
  }
  renderSearchFooter() {
    let isSearchGoingOn =
      this.props.pageData.products.length >= 0 && this.props.keyword.length > 0;

    if (!this.state.isVoiceSearchActive && isSearchGoingOn) {
      return (
        <View
          style={{
            height: 44,
            backgroundColor: StylesConstant.ColorScandre,
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text onPress={this.onVoiceSearchPress} style={{color: '#fff'}}>
            {global.IsRtl
              ? 'اضغط هنا للبحث عن منتج بصوتك'
              : 'Press here to start voice search'}
          </Text>
          <LocalIcon name="mic" color="#fff" size={12} />
        </View>
      );
    } else if (this.state.isVoiceSearchActive && isSearchGoingOn) {
      return (
        <View
          style={{
            height: 44,
            backgroundColor: StylesConstant.MainColor,
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text onPress={this.onEndVoiceSearchPress} style={{color: '#fff'}}>
            {global.IsRtl
              ? 'قم بنطق اسم المنتج الذي تبحث عنه'
              : 'Please say your product name loud and clear'}
          </Text>
          <LocalIcon name="mic" color="#fff" size={12} />
        </View>
      );
    }
    return null;
  }
  render() {
    return (
      <View
        style={{
          paddingTop: normalize(20, 'height'),
          paddingHorizontal: normalize(20),
          flex: 1,
          backgroundColor: StylesConstant.BackgroundColor,
        }}
      >
        <LoadingIndicator visible={this.props.loading} />
        {this.renderVoiceSection()}
        <FlatList
          data={this.props.pageData?.products}
          renderItem={({item}) => (
            <Product
              style={{flex: 0.5}}
              navigation={this.props.navigation}
              id={item.product_id}
              name={item.name}
              rating={item.rating}
              oldprice={item.special}
              price={item.price}
              oldPrice={item.special}
              img={item.thumb}
              favorited={item.wishlist}
            />
          )}
          keyExtractor={(i, n) => i.name + n}
          numColumns={2}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={0.01}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          ListFooterComponent={<View style={{height: 50}} />}
          ListEmptyComponent={
            <Text style={{alignSelf: 'center'}}>
              {this.props.pageData?.text_empty}
            </Text>
          }
        />
        {this.renderSearchFooter()}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  pageData: state.search.searchPage,
  loading: state.search.loading,
  keyword: state.search.keyword,
});
const mapDispatchToProps = dispatch => ({
  ChangeKeyword: keyword => dispatch(ChangeKeyword(keyword)),
  SearchProduct: query => dispatch(SearchProduct(query)),
  FetchNextSearchPage: (query, sort, order, page) =>
    dispatch(FetchNextSearchPage(query, sort, order, page)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
