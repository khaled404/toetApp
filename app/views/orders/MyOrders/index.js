import React from 'react';
import { Text, View } from 'react-native';
import { Content, Grid, Col, Row, Container } from 'native-base';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import { FetchOrders } from '../../../actions/AccountActions';
import Order from './Order';
import { connect } from 'react-redux';
import normalize from 'react-native-normalize';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import { ChooseStringByLanguage } from '../../../util';
import { SKIP_LOGIN } from '../../../actions/AuthTypes';

const headerMapToProps = state => ({ Title: state.account.ordersPage ?.heading_title});
const Header = connect(headerMapToProps)(HeaderWithBack)

class OrdersView extends React.Component {
    static navigationOptions = {
        header: (<Header />)
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchOrders();
    }
    onOrderPress(order_id) {
        this.props.navigation.navigate("orderdetails", { order_id: order_id })
    }
    BackToLogin() {
        this.props.BackToLogin();
        this.props.navigation.navigate("loginFlow");
    }
    renderEmptyMessage() {
        let message = this.props.pageData ?.text_empty;
        let LoginButton = null;
        if (this.props.pageData.hasOwnProperty("error_warning")) {
            message = ChooseStringByLanguage("Please login to be able to see your orders", "يرجى تسجيل الدخول لعرض طلباتك");
            let loginMessage = ChooseStringByLanguage("Press here to login", "اضغط هنا لتسجيل الدخول");
            LoginButton =
                <PrimaryButton title={loginMessage} onPress={() => this.BackToLogin()} style={{ marginTop: 15 }} />


        }
        if (this.props.pageData.orders ?.length == 0)
            return (<View>
                <Text style={{ alignSelf: 'center' }}>{message}</Text>
                {LoginButton}
            </View>);;
        return null;
    }
    render() {
        return (
            <SafeScrollView>
                <LoadingIndicator visible={this.props.loading} />
                <Grid style={{ flex: 1 }}>
                    <Col>
                        {this.props.pageData.orders ?.map((e, i) => <Order Order={e} key={i} onPress={this.onOrderPress.bind(this)} />)}
                        {this.renderEmptyMessage()}
                    </Col>
                </Grid>
            </SafeScrollView>
        );
    }
}
const mapStateToProps = state => ({ pageData: state.account.ordersPage, loading: state.account.loading });
const mapDispatchToProps = dispatch => ({
    fetchOrders: () => dispatch(FetchOrders()),
    BackToLogin: () => dispatch({ type: SKIP_LOGIN })


});
export default connect(mapStateToProps, mapDispatchToProps)(OrdersView);