import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Icon, Overlay } from 'react-native-elements';
import { ListItem, Body, CheckBox, Grid, Col } from 'native-base';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import CommonStyles from '../../../common/styles';
import Header from '../../../common/NavComponenets/headers/BlankHeader';
import SectionDivider from '../../../common/UI/SectionDivider';
import { InitCheckout, Checkout, InitGuestCheckout } from '../../../actions/CheckoutActions';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import ShippingAddressSection from './ShippingAddressSection';
import PaymentSection from './PaymentSection';
import ShippingSection from './ShippingSection';
import OrdersSection from './OrderSection';
import StylesConstant from '../../../constants/styles';
import { connect } from 'react-redux'
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import PaymentAddressSection from './PaymentAddressSection';
import { TranslateString, ChooseStringByLanguage } from '../../../util';
import WebView from 'react-native-webview';
import normalize from 'react-native-normalize';
import Toast from 'react-native-root-toast';
import { NavigationActions, StackActions, ScrollView, NavigationEvents } from 'react-navigation';
import TextInput from '../../../common/Forms/TextInput';
import styles from './styles';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import Axios from 'axios';
import { BASEURI } from '../../../constants/AppInfo';
import HTML from 'react-native-render-html';

class CheckoutView extends React.Component {
    static navigationOptions = {
        header: (null)
    }

    constructor(props) {
        super(props);

        this.state = {
            paymentChoosed: Boolean(this.props.payment_method),
            shippingChoosed: Boolean(this.props.shipping_method),
            termsAccepted: false,
            showWebview: false,
            completeUrl: "",
            comment: "",
            termsContent: '',
            termsVisible: false
        }
    }
    InitCart() {
        if (this.props.isLoggedIn) {
            this.props.InitCheckout();
        }
        else
            this.props.InitGuestCheckout(this.props.guestData);

    }
    componentDidMount() {




        //this.focusListener = this.props.navigation.addListener('didFocus', () => this.forceUpdate());
    }
    componentDidUpdate(prevProps) {
        if (prevProps.payment_method !== this.props.payment_method) {
            this.setState({
                paymentChoosed: true
            });
        }
        if (prevProps.shipping_method !== this.props.shipping_method) {
            this.setState({
                shippingChoosed: true
            });
        }
        if (this.props.agree_data.agree_id !== prevProps.agree_data.agree_id) {
            //Load the terms and conditions page 
            Axios.get(`${BASEURI}information/information&information_id=${this.props.agree_data.agree_id}`).then(({ data }) => {
                let description = data.description;
                description = `<div style="background-color:${StylesConstant.BackgroundColor};line-height: 20;">${description}</div>`;
                this.setState({
                    termsContent: description
                });
            })

        }
    }
    componentWillUnmount() {
        //this.focusListener.remove();

    }
    getShippingMethodTitleByCode(c) {
        for (const [key, value] of Object.entries(this.props.shipping_methods)) {
            for (const [key2, value2] of Object.entries(value.quote)) {
                if (value2.code == c) {
                    return value2.code.includes('weight') || value2.code.includes('category_product_based')|| value2.code.includes('geo_zone_shipping') ? value2.title : value.title;
                }
            }
        }
    }
    _onNavigationStateChange(webViewState) {
        if (webViewState.url.indexOf('checkout/success') > -1) {
            this.setState({
                showWebview: false,
            }, this.navigateToSuccess)
        }
    }
    navigateToSuccess() {
        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'main' }),
                NavigationActions.navigate({ routeName: 'orderconfirmed' })
            ],
            key: 'stack' // THIS LINE

        });
        this.props.navigation.dispatch(resetAction);

    }
    validateCheckout() {

        let paymentMethodValid = Boolean(this.props.payment_method);
        let shippingMethodValid = Boolean(this.props.shipping_method);
        // let agreedToTerms = this.state.termsAccepted;



        if (!Boolean(this.props.payment_address_id)) {
            Toast.show(this.props.translates['error_address']);
            return false;

        }
        if (!Boolean(this.props.shipping_address_id)) {
            Toast.show(this.props.translates['error_address']);
            return false;
        }
        if (!paymentMethodValid) {
            Toast.show(this.props.translates['error_payment']);
            return false;
        }
        if (!shippingMethodValid) {
            Toast.show(this.props.translates['error_shipping']);
            return false;
        }
        // if (!agreedToTerms) {
        //     Toast.show(this.props.translates['error_agree']);
        //     return false;
        // }
        return true;


    }
    onCheckoutPress() {
        if (this.validateCheckout()) {
            let callBackWithUrl = (url) => {
                this.setState({
                    showWebview: true,
                    completeUrl: url,
                })
            };

            this.props.Checkout(this.props.payment_address_id, this.state.comment, callBackWithUrl, this.navigateToSuccess.bind(this))
        }
    }
    renderTerms() {
        // return (<View style={{ flexDirection: 'row' }}>
        //     <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
        //         <Text onPress={() => this.setState({ termsVisible: true })} style={[{ color: StylesConstant.MainColor, fontSize: 15 }, CommonStyles.FontFamilyMedium]}>
        //             {this.props.agree_data.text_agree}
        //         </Text>
        //     </View>
        //     {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 13 }}>
        //         <CheckBox color={"#F06B4C"} checked={this.state.termsAccepted} onPress={() => this.setState({ termsAccepted: !this.state.termsAccepted })} />
        //     </View> */}
        //     <Overlay
        //         isVisible={this.state.termsVisible}
        //         windowBackgroundColor="rgba(0, 0, 0, .4)"
        //         overlayBackgroundColor="#F5F6F8"
        //         overlayStyle={{ borderRadius: 10 }}
        //         onBackdropPress={() => this.setState({ termsVisible: false })}
        //         width={Dimensions.get('window').width - 20}
        //         height={Dimensions.get('window').height - 20}>
        //         <ScrollView>
        //         <Icon 
        //         name="close" 
        //         color="grey" 
        //         onPress={() => this.setState({ termsVisible: false })}
        //         containerStyle={{alignSelf:'flex-start'}} />
        //             <HTML
        //                 html={this.state.termsContent}
        //                 imagesMaxWidth={Dimensions.get('window').width - 20} />
        //         </ScrollView>

        //     </Overlay>
        // </View>);
    }
    renderTotals(){
        let totals = this.props.totals;
        if (totals ?.length > 0) {
            let children = [];
            for (let i = 0; i < totals.length; i++) {
                const t = totals[i];
                if (i === totals.length - 1) { //The last one
                    children.push(<View style={{ flex: 1,flexDirection: 'row',justifyContent:'space-between'}}>
                        <Text style={[CommonStyles.FontFamilyMedium], { fontSize: 15 }}>{t ?.title}</Text>
                        <Text style={[{ color: StylesConstant.MainColor, fontSize: 15 }, CommonStyles.FontFamilyBold]}>{t ?.text}</Text>
                    </View>);
                }
                else {
                    children.push(<View style={{ flex: 1, flexDirection: 'row',justifyContent:'space-between' }}>
                        <Text style={[CommonStyles.FontFamilyMedium], { fontSize: 15 }}>{t ?.title}</Text>
                        <Text style={[{ color: StylesConstant.MainColor, fontSize: 15 }, CommonStyles.FontFamilyBold]}>{t ?.text}</Text>
                    </View>);
                }

            }
            return (<View style={{ flex: 1 }}>
                {children}
            </View>);
        }

        return null;
    }
    render() {      
        return (
            <SafeScrollView >
                <NavigationEvents onDidFocus={() => this.InitCart()} />

                <LoadingIndicator visible={this.props.loading} />
                {/* ADDRESS SECTION */}
                <Header ContainerStyle={{ paddingTop: 25, paddingBottom: 0 }} TitleKey="button_order_confirm" />
                <Grid style={{ marginTop: 15 }}>
                    <Col>
                        <ShippingAddressSection navigation={this.props.navigation} />

                    </Col>
                    <Col>
                        <PaymentAddressSection navigation={this.props.navigation} />
                    </Col>
                </Grid>
                <SectionDivider margin={15} />
                <PaymentSection
                    title={this.props.translates['text_checkout_payment_method']}
                    navigation={this.props.navigation}
                    payment={this.state.paymentChoosed ? this.props.payment_methods[this.props.payment_method] ?.title : this.props.translates['text_payment_method']} />

                <SectionDivider margin={15} />
                <ShippingSection
                    title={this.props.translates['text_checkout_shipping_method']}
                    navigation={this.props.navigation}
                    shipping={this.state.shippingChoosed ? this.getShippingMethodTitleByCode(this.props.shipping_method) : this.props.translates['text_shipping_method']} />

                <SectionDivider margin={15} />
                <Text style={[styles.SectionTitle, { marginBottom: 10 }]}>
                    {ChooseStringByLanguage("Step 4: Enter any notes if needed", "الخطوة 4: قم بإدخال ملاحظاتك")}
                </Text>
                <ViewWithShadow style={{ padding: 0 }}>
                    <TextInput
                        Value={this.state.note}
                        onChangeText={(comment) => this.setState({ comment })}
                        Label={ChooseStringByLanguage("Notes","ملاحظاتك")}
                    />
                </ViewWithShadow>


                <SectionDivider margin={15} />
                <OrdersSection products={this.state.products} />



                {/* <SectionDivider margin={15} /> */}


                {this.renderTerms()}

                <SectionDivider marginTop={15} marginBottom={25} />

                <View style={{ flexDirection: 'column'}}>
                    {this.renderTotals()}                   
                    <View style={{ flex: 1, height: 50,marginTop:10 }}>
                        <PrimaryButton Title={TranslateString("button_checkout")} onPress={() => this.onCheckoutPress()} />
                    </View>
                </View>
                <Overlay
                    visible={this.state.showWebview}
                    windowBackgroundColor="rgba(255, 255, 255, .5)"
                    overlayBackgroundColor="white"
                    onBackdropPress={() => this.setState({ showWebview: false })}
                    width={normalize(Dimensions.get('screen').width)}
                    height={normalize(Dimensions.get('screen').height - 100, 'height')}>
                    <WebView
                        source={{ uri: this.state.completeUrl }}
                        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                        javaScriptEnabled={true}
                        domStorageEnabled={true} />
                </Overlay>
            </SafeScrollView>);

    }
}
const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    loading: state.checkout.loading,
    payment_methods: state.checkout.payment_methods,
    payment_method: state.checkout.payment_method,
    shipping_methods: state.checkout.shipping_methods,
    shipping_method: state.checkout.shipping_method,
    payment_address_id: state.checkout.payment_address_id,
    shipping_address_id: state.checkout.shipping_address_id,
    guestData: state.checkout.guestData,
    total_invoice: state.shop.cart.totals[state.shop.cart.totals.length - 1],
    totals :state.shop.cart.totals,
    translates: state.checkout.translates,
    agree_data: state.checkout.agree_data
})
const mapDispatchToProps = dispatch => ({
    InitCheckout: () => dispatch(InitCheckout()),
    InitGuestCheckout: (guestData) => dispatch(InitGuestCheckout(guestData)),
    Checkout: (payment_address_id, comment, cbWebView, cb) => dispatch(Checkout(payment_address_id, comment, cbWebView, cb))
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutView);