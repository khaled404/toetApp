import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import StylesConstant from '../../../constants/styles';
import CommonStyles from '../../../common/styles';
import SectionDivider from '../../../common/UI/SectionDivider';
import { ParseDate, Translate, TranslateString } from '../../../util';
import { FetchSignleOrderReturns } from '../../../actions/AccountActions';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import { Item, Input, Label, Grid, Col, Row, Icon } from 'native-base';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import { connect } from 'react-redux';

// header
const headerMapToProps = state => ({ Title: state.account.returnDetailsPage ?.heading_title});
const HeaderWithProps = connect(headerMapToProps)(HeaderWithBack)

class ReturnsDetailsPage extends React.Component {
    static navigationOptions = {
        header: (<HeaderWithProps />)
    }

    constructor(props) {
        super(props);
        this.return_status = "";
    }
    componentDidMount() {
        let return_id = this.props.navigation.getParam("return_id");
        let status = this.props.navigation.getParam("return_status");
        this.return_status = status;
        this.props.FetchSignleOrderReturns(return_id);
    }
    render() {
        return (
            <SafeScrollView>
                <Grid>
                    <Row><Text style={[CommonStyles.FontFamilyMedium, { fontSize: 12, opacity: 0.6, marginBottom: 10 }]}>{TranslateString("text_account_orders_order_details")}</Text></Row>
                    <Row>
                        <Col><Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{this.props.pageData.column_order_id}</Text></Col>
                        <Col><Text style={[CommonStyles.FontFamilyBold, { alignSelf: 'flex-start', fontSize: 14 }]}>{this.props.pageData.order_id}</Text></Col>
                    </Row>
                    <Row>
                        <Col><Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{this.props.pageData.column_date_added}</Text></Col>
                        <Col><Text style={[CommonStyles.FontFamilyBold, { alignSelf: 'flex-start', fontSize: 14 }]}>{this.props.pageData.date_added}</Text></Col>
                    </Row>
                    <Row>
                        <Col><Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{this.props.pageData.column_return_id}</Text></Col>
                        <Col><Text style={[CommonStyles.FontFamilyBold, { alignSelf: 'flex-start', fontSize: 14 }]}>{this.props.pageData.return_id}</Text></Col>
                    </Row> 


                    <SectionDivider />


                    <Row>
                        <Col><Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{this.props.pageData.column_product}</Text></Col>
                        <Col><Text style={[CommonStyles.FontFamilyBold, { alignSelf: 'flex-start', fontSize: 14 }]}>{this.props.pageData.product}</Text></Col>
                    </Row>
                    <Row>
                        <Col><Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{this.props.pageData.column_model}</Text></Col>
                        <Col><Text style={[CommonStyles.FontFamilyBold, { alignSelf: 'flex-start', fontSize: 14 }]}>{this.props.pageData.model}</Text></Col>
                    </Row>

                    <Row>
                        <Col><Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{this.props.pageData.column_quantity}</Text></Col>
                        <Col><Text style={[CommonStyles.FontFamilyBold, { alignSelf: 'flex-start', fontSize: 14 }]}>{this.props.pageData.quantity}</Text></Col>
                    </Row>

                    <SectionDivider />


                    <Row>
                        <Col><Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{this.props.pageData.column_reason}</Text></Col>
                        <Col><Text style={[CommonStyles.FontFamilyBold, { alignSelf: 'flex-start', fontSize: 14 }]}>{this.props.pageData.reason}</Text></Col>
                    </Row>
                    <Row>
                        <Col><Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{this.props.pageData.column_opened}</Text></Col>
                        <Col><Text style={[CommonStyles.FontFamilyBold, { alignSelf: 'flex-start', fontSize: 14 }]}>{Translate(this.props.pageData.opened)}</Text></Col>
                    </Row>

                    <Row>
                        <Col><Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{this.props.pageData.column_status}</Text></Col>
                        <Col><Text style={[CommonStyles.FontFamilyBold, { alignSelf: 'flex-start', fontSize: 14 }]}>{this.return_status}</Text></Col>
                    </Row>

                    <SectionDivider />

                    <Row>
                        <Col><Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{this.props.pageData.column_date_ordered}</Text></Col>
                        <Col><Text style={[CommonStyles.FontFamilyBold, { alignSelf: 'flex-start', fontSize: 14 }]}>{this.props.pageData.date_ordered}</Text></Col>
                    </Row>
                    <Row>
                        <Col><Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>{this.props.pageData.column_comment}</Text></Col>
                        <Col><Text style={[CommonStyles.FontFamilyBold, { alignSelf: 'flex-start', fontSize: 14 }]}>{this.props.pageData.comment}</Text></Col>
                    </Row>

                </Grid>
            </SafeScrollView>
        );
    }
}

const mapStateToProps = state => ({ pageData: state.account.returnDetailsPage, loading: state.account.loading });
const mapDispatchToPRops = dispatch => ({ FetchSignleOrderReturns: (id) => dispatch(FetchSignleOrderReturns(id)) });
export default connect(mapStateToProps, mapDispatchToPRops)(ReturnsDetailsPage);