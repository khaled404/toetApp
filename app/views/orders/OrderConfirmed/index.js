import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Grid, Col, Row } from 'native-base';

import SafeView from '../../../common/UI/SafeView';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import CommonStyles from '../../../common/styles';
import StylesConstant from '../../../constants/styles';
import { FetchCart } from '../../../actions/ShopActions';
import { connect } from 'react-redux';
import { ChooseStringByLanguage, TranslateString } from '../../../util';
class OrderConfrimation extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.FetchCart();
    }
    render() {
        return (
            <SafeView>
                <Grid>
                    <Col>
                        <Row style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <ViewWithShadow style={{
                                height: 100, width: 100, borderRadius: 50,
                                alignSelf: 'center', justifyContent: 'center'
                            }}>
                                <Icon name="check" type='font-awesome' size={55} color={StylesConstant.MainColor} />
                            </ViewWithShadow>
                        </Row>
                        <Row style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, marginBottom: 10 }}>
                            {ChooseStringByLanguage("Your order is placed","تم وضع الطلب")}
                            </Text>
                            <Text style={{ lineHeight: 25, textAlign: 'center' }}>
                            {ChooseStringByLanguage("Your order is placed sucessfully, You can see your order's status using My Orders page","تم وضع طلبك بنجاح، سيتم اخطارك فور شحن الطلب. بإمكانك متابعة حالة الطلب من خلال صفحة طلباتي")}
                            
                            </Text>
                        </Row>
                        <Row style={{ flexDirection: 'column', alignContent: 'center' }}>
                            <PrimaryButton Title={TranslateString("text_order")} onPress={() => this.props.navigation.navigate("myorders")} />
                            <Text
                                onPress={() => this.props.navigation.navigate("home")}
                                style={[CommonStyles.FontFamilyBold, CommonStyles.MainColor, { alignSelf: 'center', marginTop: 20 }]}>
                                {ChooseStringByLanguage("Back to Home","العودة للرئيسية")}
                            </Text>

                        </Row>

                    </Col>
                </Grid>
            </SafeView>
        );
    }
}
const mapDispatchToProps = dispatch => ({ FetchCart: () => dispatch(FetchCart()) })

export default connect(null,mapDispatchToProps)(OrderConfrimation);