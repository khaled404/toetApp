import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import ConstntStyles from '../../../constants/styles';
import CommonStyles from '../../../common/styles';
import { ParseDate } from '../../../util';
import { FetchReturns, FetchReturnsNextPage } from '../../../actions/AccountActions';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import { Item, Input, Label, Grid, Col, Row, Icon } from 'native-base';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import { connect } from 'react-redux';
import normalize from 'react-native-normalize';

// header
const headerMapToProps = state => ({ Title: state.account.returnsPage ?.heading_title});
const HeaderWithProps = connect(headerMapToProps)(HeaderWithBack)

class ReturnsPage extends React.Component {
    static navigationOptions = {
        header: (<HeaderWithProps />)
    }

    constructor(props) {
        super(props); 
    }
    componentDidMount() {
        this.props.FetchReturns();
    }
    _renderItem(i) {
        let item = i.item;
        return (
            <ViewWithShadow style={{ marginBottom: normalize(10, 'height'), marginRight: 5, width: '100%' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("returndetails", { return_id: item.return_id, "return_status": item.status })}>
                    <Grid>
                        <Row style={{ marginBottom: normalize(10, 'height') }}>
                            <Text style={[CommonStyles.FontFamilyBold]}>{this.props.pageData.text_return_id}  {item.return_id}  </Text>
                        </Row>
                        <Row style={{ marginBottom: normalize(10, 'height') }}>
                            <Text style={[CommonStyles.MainColor]}>{item.status}</Text>

                        </Row>
                        <Row>
                            <Col>
                                <Text> {this.props.pageData.text_date_ordered} </Text>
                                <Text> {this.props.pageData.text_order_id}</Text>
                            </Col>
                            <Col>
                                <Text style={{ alignSelf: "flex-start" }}> {item.date_added}</Text>
                                <Text style={{ alignSelf: "flex-start" }}> {item.order_id}</Text>
                            </Col>
                        </Row>
                    </Grid>
                </TouchableOpacity>
            </ViewWithShadow>
        );
    }
    onEndReached() {
        console.log(this.props.pageData.pagination);
        const { limit, page, total } = this.props.pageData.pagination;
        let currentTotal = this.props.pageData.returns.length;
        console.log("        this.props.FetchNewPage(parseInt(page) + 1);        ");
        this.props.FetchNewPage(parseInt(page) + 1);
        //console.log("end load new page", this.props.pageData.pagination);
    }
    render() {
        return (
            <View style={{ flex: 1, paddingTop: normalize(10, 'height'), paddingHorizontal: normalize(10), backgroundColor: ConstntStyles.BackgroundColor }}>
                <LoadingIndicator visible={this.props.loading} />
                <FlatList
                    data={this.props.pageData.returns}
                    keyExtractor={(i) => i.return_id}
                    renderItem={(item) => this._renderItem(item)}
                    onEndReached={() => this.onEndReached()}
                    onEndReachedThreshold={0.1}
                    showsVerticalScrollIndicator={false}

                    initialNumToRender={15}
                    numColumns={1} />

            </View>
        );
    }
}

const mapStateToProps = state => ({ pageData: state.account.returnsPage, loading: state.account.loading });
const mapDispatchToPRops = dispatch => ({ FetchReturns: () => dispatch(FetchReturns()), FetchNewPage: (page) => dispatch(FetchReturnsNextPage(page)) });
export default connect(mapStateToProps, mapDispatchToPRops)(ReturnsPage);