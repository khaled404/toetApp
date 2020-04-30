import React from 'react';
import { View, Text, FlatList, Linking } from 'react-native';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import StylesConstant from '../../../constants/styles';
import CommonStyles from '../../../common/styles';
import { ParseDate } from '../../../util';
import { DownloadFile, FetchDonwloads } from '../../../actions/AccountActions';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import { Item, Input, Label, Grid, Col, Row, Icon } from 'native-base';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import { connect } from 'react-redux';
import normalize from 'react-native-normalize';
import Toast from 'react-native-root-toast'
// header
const headerMapToProps = state => ({ Title: state.account.downloadsPage ?.heading_title});
const Header = connect(headerMapToProps)(HeaderWithBack)

class DigitalFiles extends React.Component {
    static navigationOptions = {
        header: (<Header />)
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchDonwloads();
    }
    _onDowloadPress(download_id) {

        //let url = "http://mirror.filearena.net/pub/speed/SpeedTest_16MB.dat?_ga=2.93134933.994118284.1571612633-1319799615.1571612633";
        Toast.show('سيتم بدأ التحميل في الحال');
        DownloadFile(download_id).then(url => {
            Linking.openURL(url).then((e) => {
                Toast.show('جاري تحميل الملف');
            }).catch(() => {
                Toast.show('حدث خطأ ما');

            });
        });


    }
    _renderItem({ name, size, date_added, order_id, download_id }) {
        return (
            <ViewWithShadow style={{ marginBottom: normalize(10, 'height') }}>
                <Grid>
                    <Row style={{ marginBottom: normalize(10, 'height') }}>
                        <Text style={[CommonStyles.FontFamilyBold, CommonStyles.RegularSize]}>{name}</Text>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={[{ fontSize: 12 }]}>{this.props.pageData.column_size}</Text>
                            <Text style={[{ fontSize: 12 }]}>{this.props.pageData.column_date_added}</Text>
                            <Text style={[{ fontSize: 12 }]}>{this.props.pageData.column_order_id} </Text>
                        </Col>
                        <Col>
                            <Text style={[{ fontSize: 12, alignSelf: "flex-start" }]}> {size}</Text>
                            <Text style={[{ fontSize: 12, alignSelf: "flex-start" }]}> {date_added}</Text>
                            <Text style={[{ fontSize: 12, alignSelf: "flex-start" }]}>{order_id}</Text>
                        </Col>
                    </Row>
                    <Row style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text onPress={() => this._onDowloadPress(download_id)} style={[CommonStyles.MainColor,CommonStyles.FontFamilyBold,{fontSize:12}]}>
                            {this.props.pageData.button_download}
                        </Text>
                    </Row>
                </Grid>
            </ViewWithShadow>
        );
    }
    render() {
        return (
            <SafeScrollView>
                <LoadingIndicator visible={this.props.loading} />
                <FlatList
                    data={this.props.pageData ?.downloads }
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(i, n) => i.name + n}
                    numColumns={1}
                    ListEmptyComponent={<Text style={{ alignSelf: 'center' }}>{this.props.pageData ?.text_empty}</Text>}
                />


            </SafeScrollView>
        );
    }
}

const mapStateToPRops = state => ({ pageData: state.account.downloadsPage, loading: state.account.loading });
const mapDispatchToPRops = dispatch => ({ fetchDonwloads: () => dispatch(FetchDonwloads()) });
export default connect(mapStateToPRops, mapDispatchToPRops)(DigitalFiles);