import React from 'react';
import {Header, Icon} from 'react-native-elements';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Input, Badge} from 'react-native-elements';
import LocalIcon from '../../Icons/LocalIcon';
import {withNavigation, NavigationActions} from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer';
import ProductFilter from '../../Components/ProductFilter';
import {TranslateString} from '../../../util';
import styles from '../../styles';
import StylesConstant from '../../../constants/styles';

import CartIcon from '../../Components/CartIcon';
class AppHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    let IsPageEmpty =
      Object.entries(this.props.search).length === 1 &&
      this.props.search.constructor === Object;
    this.state = {
      isSearchGoing: !IsPageEmpty,
      searchInput: props.keyword,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.keyword !== prevProps.keyword) {
      this.setState({
        searchInput: this.props.keyword,
      });
    }
  }
  getActiveRoute(navigationState) {
    if (!navigationState) {
      return null;
    }

    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this.getActiveRoute(route);
    }
    return route.routeName;
  }
  componentWillUnmount() {
    if (this.state.isSearchGoing) {
      this.props.ClearSearch();
    }
  }
  onSearchTypingEnd() {
    this.props.SearchProduct(this.state.searchInput);
    this.setState({isSearchGoing: true});
  }
  onSearchTypingEnd2() {
    this.props.ChangeKeyword(this.state.searchInput);
    this.props.SearchProduct(this.state.searchInput);
    this.setState({isSearchGoing: true});
    this.props.navigation.navigate('search');
  }
  defaultRender(title) {
    return (
      <Header
        placement="left"
        containerStyle={{
          backgroundColor: StylesConstant.MainColor,
          marginTop: (StatusBar.currentHeight || 0) * -1,
          marginBottom: -1,
          paddingHorizontal: 15,
        }}
        leftComponent={
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.toggleDrawer())
            }
          >
            <Icon name="menu" color="#fff" />
          </TouchableOpacity>
        }
        // { icon: 'menu', color: '#515C6F', onPress: () => this.props.navigation.dispatch(DrawerActions.openDrawer()) }}

        centerComponent={
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../../../assets/img/logo.png')}
              style={{width: 32, height: 25}}
              resizeMode="contain"
            />
            <Text
              style={[
                {color: '#fff', fontSize: 15, marginLeft: 10},
                styles.FontFamilyBold,
              ]}
            >
              {title}
            </Text>
          </View>
        }
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <LocalIcon
              onPress={() => this.props.navigation.navigate('search')}
              name="search"
              color="#fff"
              size={21}
              style={{marginRight: 15}}
            />

            <CartIcon
              navigation={this.props.navigation}
              iconSize={21}
              iconColor="#fff"
            />
            {/* <Icon onPress={() => this.props.navigation.navigate("search")} name='search1' type='antdesign' color='#fff' containerStyle={{ marginRight: 15 }} /> */}
            {/* <Icon onPress={() => this.props.navigation.navigate("cart")} name='cart-outline' type='material-community' color='#fff' /> */}
          </View>
        }
      />
    );
  }
  renderSearch() {
    let RightIcon =
      this.state.isSearchGoing && this.props.search.sort ? (
        <ProductFilter
          id={this.state.searchInput}
          order={this.props.search.order}
          sort={this.props.search.sort}
          sorts={this.props.search.sorts}
          filterProducts={this.props.SearchQueryByFilter}
        />
      ) : (
        <CartIcon
          navigation={this.props.navigation}
          iconSize={21}
          iconColor="#fff"
        />
      );

    return (
      <View style={{height: 110}}>
        <Header
          placement="left"
          containerStyle={{
            backgroundColor: StylesConstant.MainColor,
            marginTop: (StatusBar.currentHeight || 0) * -1,
            paddingHorizontal: 15,
          }}
          leftComponent={
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.toggleDrawer())
              }
            >
              <Icon name="menu" color="#ffffff" />
            </TouchableOpacity>
          }
          centerComponent={
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../../../assets/img/logo.png')}
                style={{width: 32, height: 25}}
                resizeMode="contain"
              />
              <Text
                style={[
                  {color: '#ffffff', fontSize: 15, marginLeft: 10},
                  styles.FontFamilyBold,
                ]}
              >
                {TranslateString('text_search')}
              </Text>
            </View>
          }
          rightComponent={
            <View style={{flexDirection: 'row'}}>
              {RightIcon}
              {/* <Icon onPress={() => this.props.navigation.navigate("cart")} name='cart-outline' type='material-community' color='#fff' /> */}
            </View>
          }
        />

        <View
          style={{
            flex: 1,
            backgroundColor: '#6973B7',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Input
            inputContainerStyle={{
              backgroundColor: '#ffffff',
              height: 35,
              width: '90%',
              borderRadius: 20,
              alignSelf: 'center',
            }}
            inputStyle={{
              textAlign: 'center',
              fontFamily: StylesConstant.FontFamily,
              fontSize: 15,
            }}
            onChangeText={text => this.setState({searchInput: text})}
            onEndEditing={e => this.onSearchTypingEnd()}
            value={this.state.searchInput}
            placeholder={TranslateString('text_toolbar_search')}
            rightIcon={() =>
              this.state.searchInput ? (
                <Icon
                  name="close"
                  type="material-community"
                  size={24}
                  onPress={() => {
                    this.props.ClearSearch();
                    this.setState({searchInput: ''});
                  }}
                  color={StylesConstant.MainColor}
                />
              ) : null
            }
            rightIconContainerStyle={{marginRight: 10}}
            leftIcon={() =>
              this.state.searchInput ? (
                <Icon
                  name="search1"
                  type="antdesign"
                  size={20}
                  color="rgba(81, 92, 111, 1)"
                />
              ) : null
            }
          />
          {/* <TextInput
                        onChangeText={(text) => this.setState({ searchInput: text })}
                        onEndEditing={(e) => this.onSearchTypingEnd()}
                        value={this.state.searchInput}
                        style={{ backgroundColor: '#fff', height: 30, width: '90%', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10, fontFamily: 'Tajawal', textAlign: 'center' }}
                        placeholder={TranslateString("text_toolbar_search")}
                    /> */}
        </View>
      </View>
    );
  }
  renderHome(title) {
    return (
      <View style={{height: 110}}>
        <Header
          placement="left"
          containerStyle={{
            backgroundColor: StylesConstant.MainColor,
            marginTop: (StatusBar.currentHeight || 0) * -1,
            marginBottom: -1,
            paddingHorizontal: 15,
          }}
          leftComponent={
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.toggleDrawer())
              }
            >
              <Icon name="menu" color="#ffffff" />
            </TouchableOpacity>
          }
          // { icon: 'menu', color: '#ffffff', onPress: () => this.props.navigation.dispatch(DrawerActions.openDrawer()) }}

          centerComponent={
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../../../assets/img/logo.png')}
                style={{width: 32, height: 25}}
                resizeMode="contain"
              />
              <Text
                style={[
                  {color: '#ffffff', fontSize: 15, marginLeft: 10},
                  styles.FontFamilyBold,
                ]}
              >
                {title}
              </Text>
            </View>
          }
          rightComponent={
            <View style={{flexDirection: 'row'}}>
              <LocalIcon
                onPress={() => this.props.navigation.navigate('search')}
                name="nav_search"
                color="#ffffff"
                size={21}
                style={{marginRight: 15}}
              />

              <CartIcon
                navigation={this.props.navigation}
                iconSize={21}
                iconColor="#ffffff"
              />
              {/* <Icon onPress={() => this.props.navigation.navigate("search")} name='search1' type='antdesign' color='#fff' containerStyle={{ marginRight: 15 }} /> */}
              {/* <Icon onPress={() => this.props.navigation.navigate("cart")} name='cart-outline' type='material-community' color='#fff' /> */}
            </View>
          }
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#6973B7',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Input
            inputContainerStyle={{
              backgroundColor: '#ffff',
              height: 35,
              width: '90%',
              borderRadius: 20,
              alignSelf: 'center',
            }}
            inputStyle={{
              textAlign: 'center',
              fontFamily: StylesConstant.FontFamily,
              fontSize: 15,
            }}
            onChangeText={text => this.setState({searchInput: text})}
            onEndEditing={e => {
              this.onSearchTypingEnd2();
            }}
            value={this.state.searchInput}
            placeholder={TranslateString('text_toolbar_search')}
            rightIcon={() =>
              this.state.searchInput ? (
                <Icon
                  name="close"
                  type="material-community"
                  size={24}
                  onPress={() => {
                    this.props.ClearSearch();
                    this.setState({searchInput: ''});
                  }}
                  color={StylesConstant.MainColor}
                />
              ) : null
            }
            rightIconContainerStyle={{marginRight: 10}}
            leftIcon={() =>
              this.state.searchInput ? (
                <Icon
                  name="search1"
                  type="antdesign"
                  size={20}
                  color="rgba(81, 92, 111, 1)"
                />
              ) : null
            }
          />
          {/* <TextInput
                        onChangeText={(text) => this.setState({ searchInput: text })}
                        onEndEditing={(e) => this.onSearchTypingEnd()}
                        value={this.state.searchInput}
                        style={{ backgroundColor: '#fff', height: 30, width: '90%', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10, fontFamily: 'Tajawal', textAlign: 'center' }}
                        placeholder={TranslateString("text_toolbar_search")}
                    /> */}
        </View>
      </View>
    );
  }
  render() {
    let currnetRoute = this.getActiveRoute(this.props.navigation.state);
    let title = 'توت';

    if (currnetRoute === 'search') return this.renderSearch();
    if (currnetRoute === 'home') return this.renderHome(title);
    switch (currnetRoute) {
      case 'favs':
        title = TranslateString('menu_wishlist');
        break;
      case 'cart':
        title = TranslateString('text_cart');
        break;
      case 'categories':
        title = TranslateString('text_categories');
        break;
    }
    return this.defaultRender(title);
  }
}

export default AppHeader;
