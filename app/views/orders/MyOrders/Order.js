import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { Grid, Col, Row } from 'native-base';
import StylesConstant from '../../../constants/styles';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import CommonStyles from '../../../common/styles';
import { ParseDate, TranslateString } from '../../../util';
import normalize from 'react-native-normalize';

export default ({ Order, navigation, onPress }) => (
    <Row>
        <ViewWithShadow style={{
            flex: 1, flexDirection: 'row',
            marginVertical: normalize(5, 'height'),
            paddingVertical: normalize(10, 'height'),
            borderWidth: 1,
            borderColor: '#f2f2f2'
        }}>

            <TouchableOpacity style={{ flex: 1 }} onPress={() => onPress(Order.order_id)}>

                <Col size={3}>
                    <Row>
                        <Col>
                            <Row><Text style={{ fontSize: 14 }}>{TranslateString("text_account_orders_order_number")} </Text></Row>
                            <Row><Text style={{ fontSize: 14 }}>{TranslateString("text_account_orders_order_name")} </Text></Row>
                            <Row><Text style={{ fontSize: 14 }}>{TranslateString("text_account_orders_order_products")} </Text></Row>
                            <Row><Text style={{ fontSize: 14 }}>{TranslateString("text_account_orders_order_details")} </Text></Row>
                            <Row><Text style={{ fontSize: 14 }}>{TranslateString("text_account_orders_order_status")} </Text></Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col style={{alignItems:'flex-start'}}>
                                    <Text style={[{ fontSize: 14 }, CommonStyles.FontFamilyBold]} style={{ fontSize: 14, }}>{Order.order_id}</Text>
                                </Col>
                                <Col><Text style={{ fontSize: 12 }}>{Order.date_added}</Text></Col>
                            </Row>
                            <Row><Text style={[{ fontSize: 14 }, CommonStyles.FontFamilyBold]}>{Order.name}</Text></Row>
                            <Row><Text style={[{ fontSize: 14 }, CommonStyles.FontFamilyBold]}>{Order.products}</Text></Row>
                            <Row><Text style={[{ fontSize: 14 }, CommonStyles.FontFamilyBold]}>{Order.total}</Text></Row>
                            <Text style={[{ fontSize: 14 }, CommonStyles.MainColor, CommonStyles.FontFamilyBold]}>{Order.status}</Text>

                        </Col>
                    </Row>
                </Col>
                <Col size={1}>

                </Col>
            </TouchableOpacity>

        </ViewWithShadow>
    </Row>
);