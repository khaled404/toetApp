import React from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import Product from '../../../common/Components/Product';
import { Grid, Col, Row } from 'native-base';
import { connect } from 'react-redux';
import { FetchWishlist } from '../../../actions/ShopActions';
import LoadIndicator from '../../../common/UI/LoadingIndicator';
import LocalIcon from '../../../common/Icons/LocalIcon';
import { NavigationEvents } from 'react-navigation';
import normalize from 'react-native-normalize';
import { ChooseStringByLanguage, TranslateString } from '../../../util';
import CommonStyles from '../../../common/styles';
import { SKIP_LOGIN } from '../../../actions/AuthTypes'
import PrimaryButton from '../../../common/UI/PrimaryButton';

class FavsScreen extends React.Component {
    BackToLogin() {
        this.props.BackToLogin();
        this.props.navigation.navigate("loginFlow");
    }
    renderEmptyMessage() {
        let message = this.props.pageData ?.text_empty;
        let LoginButton = null;
        if (!this.props.isLoggedIn) {
            message = TranslateString("text_login_wishlist");
            let loginMessage = ChooseStringByLanguage("Press here to login", "اضغط هنا لتسجيل الدخول");
            LoginButton =
                <PrimaryButton title={loginMessage} onPress={() => this.BackToLogin()} style={{ marginTop: 15 }} />
        }
        return (<View>
            <Text style={{ alignSelf: 'center' }}>{message}</Text>
            {LoginButton}
        </View>);
    }
    render() {

        return (
            <SafeScrollView>
                <NavigationEvents onDidFocus={() => this.props.fetchWishlist()} />
                <FlatList
                    data={this.props.pageData ?.products}
                    renderItem={({ item }) => <Product style={{ flex: 0.5 }} navigation={this.props.navigation} favorited={true} id={item.product_id} name={item.name} oldprice={item.special} rating={item.rating} price={item.price} img={item.thumb} />}
                    keyExtractor={(i, n) => i.name + n}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={this.renderEmptyMessage()}
                />
            </SafeScrollView>
        );
    }
}
const mapStateToProps = state => ({
    pageData: state.shop.wishlist,
    loading: state.shop.loading,
    loadingStatus: state.shop.loadingStatus,
    isLoggedIn: state.auth.isLoggedIn
});
const mapDispatchToProps = dispatch => ({
    fetchWishlist: () => dispatch(FetchWishlist()),
    BackToLogin: () => dispatch({ type: SKIP_LOGIN })

});
export default connect(mapStateToProps, mapDispatchToProps)(FavsScreen);