import React from 'react';
import { View, Text } from 'react-native';
import SafeView from '../../common/UI/SafeView';
import StylesConstant from '../../constants/styles';
import { Container, Header, Content, ListItem, Radio, Right, Left, Form, CheckBox, Body, List } from 'native-base';
import { SetPaymentMethod } from '../../actions/CheckoutActions'
import {FetchCart} from '../../actions/ShopActions';

import BlankHeader from '../../common/NavComponenets/headers/BlankHeader';
import { connect } from 'react-redux';
class PaymentWays extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:props.payment_method || ""
        }
    }
    static navigationOptions = {
        header: (<BlankHeader TitleKey="text_checkout_5_title" />)
    }    
    onListPress(payment_method){
        this.setState({
            selected:payment_method
        })
        this.props.SetPaymentMethod(this.props.payment_address_id,payment_method,()=>{
            this.props.navigation.goBack(null);
            this.props.FetchCart()
        });
    }
    renderPaymentList() {
        let methods = {};
        if (this.props.payment_methods)
            methods = this.props.payment_methods;
        return Object.keys(methods).map(m => {
            let objectValue = methods[m];
            return (
                <ListItem >
                    <Left>
                        <Text>{objectValue.title}</Text>
                    </Left>
                    <Right>
                        <Radio
                            onPress={()=> this.onListPress(objectValue.code)}
                            color={"#F06B4C"}
                            selectedColor={"#F06B4C"}
                            selected={this.state.selected === objectValue.code}
                        />
                    </Right>
                </ListItem>);
        });
    }
    render() {
        console.log(this.props.payment_method);
        return (
            <SafeView>
                <Container>
                    <Content padder style={{ backgroundColor: StylesConstant.BackgroundColor }}>
                       {this.renderPaymentList()}
                    </Content>
                </Container>
            </SafeView>
        );
    }
}
const mapStateToProps = state => ({
    payment_methods: state.checkout.payment_methods,
    payment_method_code: state.checkout.payment_method_code,
    payment_address_id: state.checkout.payment_address_id,
    payment_method: state.checkout.payment_method,

});
const mapDispatchToProps = dispatch => ({
    SetPaymentMethod: (payment_address_id, payment_method,cb) => dispatch(SetPaymentMethod(payment_address_id, payment_method,cb)),
    FetchCart :()=> dispatch(FetchCart())
})
export default connect(mapStateToProps, mapDispatchToProps)(PaymentWays);