import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Content, Grid, Col, Row, Container } from 'native-base';
import { Divider } from 'react-native-elements';
import { ParseDate, TranslateString, RemoveHTMLFromString } from '../../../util';
import CommonStyles from '../../../common/styles';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import PriamryButton from '../../../common/UI/PrimaryButton';
import IconButton from '../../../common/UI/IconButton';
import SectionDivider from '../../../common/UI/SectionDivider';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import Address from '../../../common/Components/Address';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import { FetchSingleOrder, FetchAddReturnsPage } from '../../../actions/AccountActions';
import { ReorderAgain } from '../../../actions/ShopActions';
import { connect } from 'react-redux';
import StylesConstant from '../../../constants/styles';
import normalize from 'react-native-normalize';
import PrimaryButton from '../../../common/UI/PrimaryButton';

const headerMapToProps = state => ({ Title: state.account.orderDetails ?.heading_title});
const Header = connect(headerMapToProps)(HeaderWithBack)

class OrderDetails extends React.Component {
    static navigationOptions = {
        header: (<Header />)
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let order_id = this.props.navigation.getParam('order_id');
        this.props.fetchSingleOrder(order_id);
    }
    _renderProductItem(item) {
        return (<Row style={{ flexDirection: 'column' }}>
            <Row>
                <Col size={2} style={{ flexDirection: 'row' }}>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 15 }}> x{item.quantity}</Text>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 15 }}>{item.name} </Text>
                </Col>
                <Col size={1}>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 15 }}>{item.total}</Text>
                </Col>
            </Row>
            <Row>
                <Col style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start', marginVertical: normalize(7, 'height') }}>
                    {/* <IconButton
                        IconName="arrow-up"
                        IconType="font-awesome"
                        IconStyle={{ marginLeft: 0 }}
                        IconColor="#fff"
                        Title={this.props.pageData.button_return}
                        IconBackground="#727C8E"
                        Color="#fff"
                        style={{ width: normalize(100), height: normalize(30, 'height') }}

                    /> */}
                    <TouchableOpacity onPress={() => this.onReturnPress()}
                        style={{ backgroundColor: '#fff', borderColor: '#515C6F', borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 5, paddingVertical: 3 }}>
                        <Text style={{ width: '100%', fontSize: 15, color: '#515C6F', textAlign: 'center' }}>{this.props.pageData.button_return}</Text>
                    </TouchableOpacity>
                    {/* <PriamryButton
                        onPress={() => this.AddToCart()}
                        Title={this.props.pageData.button_cart}
                        style={{ width: normalize(100), height: normalize(30, 'height') }}
                        titleStyle={{ fontFamily: 'Tajawal-bold', color: '#fff', alignSelf: 'center', marginRight: normalize(15), fontSize: 12 }}

                    /> */}
                    <TouchableOpacity
                        onPress={() => this.onBuyAgainPress(item.order_product_id)}
                        style={{ backgroundColor: StylesConstant.MainColor, borderColor: '#515C6F', borderWidth: 0.7, borderRadius: 10, paddingHorizontal: 5, paddingVertical: 3 }}>
                        <Text style={{ width: '100%', fontSize: 15, color: '#fff', textAlign: 'center' }}>{this.props.pageData.button_reorder}</Text>
                    </TouchableOpacity>
                </Col>
                <Col size={1}>

                </Col>
            </Row>
        </Row>);
    }
    renderTotalItem(item, index) {
        let l = this.props.pageData.totals.length
        let color = index == (l - 1) ? StylesConstant.MainColor : "#000"
        return (
            <Row>
                <Col size={2} style={{ flexDirection: 'row' }}>
                    <Text style={{ alignSelf: 'flex-start', color: color, fontSize: 15 }}> {item.title}</Text>
                </Col>
                <Col size={1}>
                    <Text style={{ alignSelf: 'flex-start', color: color, fontSize: 15 }}>{item.text}</Text>
                </Col>
                <Col size={2}></Col>
            </Row>);
    }
    onReturnPress() {
        let order_id = this.props.navigation.getParam('order_id');
        this.props.navigation.navigate('addreturnrequest', { order_id })
    }
    onBuyAgainPress(order_product_id) {
        let order_id = this.props.navigation.getParam('order_id');

        let body = `order_id=${order_id}`;

        body += `&order_product_id=${order_product_id}`;

        this.props.ReorderAgain(body, () => this.props.navigation.navigate('cart'));
    }
    renderHistory() {
        if (Array.isArray(this.props.pageData.histories))
            return this.props.pageData.histories.map(e => (<Row>
                <Col size={1} style={{alignItems:'flex-start'}}><Text>{e.date_added}</Text><Text style={[CommonStyles.MainColor]}>{e.status}</Text></Col>
                <Col size={3} style={{alignItems:'flex-start'}}><Text >{RemoveHTMLFromString(e.comment)}</Text></Col>
            </Row>));
        else return [];
    }
    render() {
        return (
            <Container>
                <Content scrollEnabled style={{ backgroundColor: StylesConstant.BackgroundColor }} padder>
                    <LoadingIndicator visible={this.props.loading} />

                    <Row><Text style={[CommonStyles.FontFamilyMedium, { fontSize: 12, opacity: 0.6, marginBottom: 10 }]}>{TranslateString("text_account_orders_order_details")}</Text></Row>


                    <Grid style={{ flex: 1 }}>
                        <Row style={styles.DetailsRow}>
                            <Col><Text style={styles.DetailsTextTitle}>{this.props.pageData.column_order_id}</Text></Col>
                            <Col><Text style={styles.DetailsTextValue}>{this.props.pageData.order_id}</Text></Col>
                        </Row>
                        <Row style={styles.DetailsRow}>
                            <Col><Text style={styles.DetailsTextTitle}>{this.props.pageData.column_date_added}</Text></Col>
                            <Col><Text style={styles.DetailsTextValue}>{this.props.pageData.date_added}</Text></Col>
                        </Row>
                        <Row style={styles.DetailsRow}>
                            <Col><Text style={styles.DetailsTextTitle}>{this.props.pageData.text_shipping_method}</Text></Col>
                            <Col><Text style={styles.DetailsTextValue}>{this.props.pageData.shipping_method}</Text></Col>
                        </Row>
                        <Row style={styles.DetailsRow}>
                            <Col><Text style={styles.DetailsTextTitle}>{this.props.pageData.text_payment_method}</Text></Col>
                            <Col><Text style={styles.DetailsTextValue}>{this.props.pageData.payment_method}</Text></Col>
                        </Row>
                        <Row style={styles.DetailsRow}>
                            <Col><Text style={styles.DetailsTextTitle}>{this.props.pageData.text_comment}</Text></Col>
                            <Col><Text style={styles.DetailsTextValue}>{this.props.pageData.comment || "لا يوجد"}</Text></Col>
                        </Row>
                        <SectionDivider />
                        <Row>
                            <Col>
                                <Row style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 12, opacity: 0.6, marginBottom: normalize(5) }}>{this.props.pageData.text_shipping_address}</Text>
                                    <Address Address={this.props.pageData.shipping_address} />
                                </Row>

                            </Col>
                            <Col>
                                <Row><Text style={{ fontSize: 12, opacity: 0.6, marginBottom: normalize(5) }}>{this.props.pageData.text_payment_address}</Text></Row>
                                <Address Address={this.props.pageData.payment_address} />
                            </Col>
                        </Row>
                        <SectionDivider />
                        <Row><Text style={{ fontSize: 12, opacity: 0.6, marginBottom: normalize(5) }}>تفاصيل الطلب</Text></Row>
                        <Row style={{ flexDirection: 'column' }}>
                            {this.props.pageData ?.products ?.map((e) => this._renderProductItem(e))}
                            <Row style={{ marginVertical: normalize(5, 'height') }}></Row>
                            {this.props.pageData ?.totals ?.map((e, i) => this.renderTotalItem(e, i))}
                        </Row>
                        <SectionDivider />

                        <Row><Text style={[CommonStyles.FontFamilyMedium, { fontSize: 12, opacity: 0.6, marginBottom: 10 }]}>{this.props.pageData.text_history}</Text></Row>
                        {this.renderHistory()}
                    </Grid>

                </Content>
            </Container>
        );
    }
}
const mapStateToProps = state => ({ pageData: state.account.orderDetails, loading: state.account.loading });
const mapDispatchToProps = dispatch => ({
    fetchSingleOrder: (order_id) => dispatch(FetchSingleOrder(order_id)),
    fetchAddReturnsPage: (order_id) => dispatch(FetchAddReturnsPage(order_id)),
    ReorderAgain: (body, cb) => dispatch(ReorderAgain(body, cb))
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);



const styles = StyleSheet.create({
    DetailsRow: {
        marginBottom: normalize(10)
    },
    DetailsTextTitle: {
        alignSelf: 'flex-start',
        fontSize: 15

    },
    DetailsTextValue: StyleSheet.flatten([{
        alignSelf: 'flex-start',
        fontSize: 15
    }, CommonStyles.FontFamilyBold])
})