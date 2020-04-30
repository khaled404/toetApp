import React from 'react';
import { View } from 'react-native';
import SafeView from '../../common/UI/SafeView';
import StylesConstant from '../../constants/styles';
import { Content, Form, Item, Input, Label, Grid, Col, Row } from 'native-base';
import ViewWithShadow from '../../common/UI/ViewWithShadow';
import PrimaryButton from '../../common/UI/PrimaryButton';
import BlankHeader from '../../common/NavComponenets/headers/BlankHeader';
export default class extends React.Component {
    static navigationOptions = {
        header: (<BlankHeader Title=" بطاقة جديده" />)
    }
    render() {
        return (
            <SafeView>
                <Content style={{ backgroundColor: StylesConstant.BackgroundColor }}>
                    <Form>
                        <ViewWithShadow>

                            <Grid>
                                <Row>
                                    <Col>
                                        <Item floatingLabel style={{ borderColor: '#fff' }}  >
                                            <Label>الإسم على البطاقه</Label>
                                            <Input />
                                        </Item>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Item floatingLabel style={{ borderColor: '#fff' }}  >
                                            <Label>  رقم البطاقه</Label>
                                            <Input />
                                        </Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={2}>
                                        <Item floatingLabel style={{ borderColor: '#fff' }}  >
                                            <Label>  تاريخ إنتهاء الصلاحيه</Label>
                                            <Input />
                                        </Item>
                                    </Col>
                                    <Col size={1}>
                                        <Item floatingLabel style={{ borderColor: '#fff' }}  >
                                            <Label>  رقم CVC</Label>
                                            <Input />
                                        </Item>
                                    </Col>
                                </Row>
                          
                            </Grid>

                        </ViewWithShadow>

                    </Form>
                    <View style={{ height: 30 }}></View>
                    <PrimaryButton onPress={() => this.props.navigation.navigate('addressbook')} Title="إضافة البطاقه" />
                </Content>

            </SafeView>
        );
    }
}
