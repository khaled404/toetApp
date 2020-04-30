import React from 'react';
import { View, Text } from 'react-native';
import SafeView from '../../../common/UI/SafeView';
import StylesConstant from '../../../constants/styles';
import { Container, Header, Content, ListItem, Radio, Right, Left, Form, CheckBox, Body, List } from 'native-base';
import { SetShippingtMethod } from '../../../actions/CheckoutActions'
import BlankHeader from '../../../common/NavComponenets/headers/BlankHeader';
import { connect } from 'react-redux';
class PaymentWays extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:props.shipping_method
        }
    }
    static navigationOptions = {
        header: (<BlankHeader TitleKey="text_checkout_4_title" />)
    }
    onListPress(shipping_method,title){
        this.setState({
            selected:shipping_method
        })
        this.props.navigation.setParams({
            shippingTitle:title
        });
        this.props.SetShippingtMethod(this.props.shipping_address_id,shipping_method,()=>{
         
            this.props.navigation.goBack(null);

        });
    }
    renderShippingList() {

        let methods = {};
        if (this.props.shipping_methods)
            methods = this.props.shipping_methods;
        let ret = []
        for (const [key, value] of Object.entries(methods)) {
            for (const [key2, value2] of Object.entries(value.quote)) {
                ret.push(<ListItem >
                     <Left>
                         <Text>{value2.code.includes('xshipping') || value2.code.includes('weight') || value2.code.includes('category_product_based') ? value2.title : value.title}</Text>
                     </Left>
                     <Right>
                     <Radio
                             onPress={() => this.onListPress(value2.code, value2.code.includes('xshipping') || value2.code.includes('weight') || value2.code.includes('category_product_based') ? value2.title : value.title)}
                             color={"#F06B4C"}
                             selectedColor={"#F06B4C"}
                             selected={this.state.selected === value2.code}
                         />
                     </Right>
                </ListItem>)
            }
        }
        return ret;
    }
    render() {

        return (
                <Container>
                    <Content padder style={{ backgroundColor: StylesConstant.BackgroundColor }}>
                       {this.renderShippingList()}
                    </Content>
                </Container>
        );
    }
}
const mapStateToProps = state => ({
    shipping_methods: state.checkout.shipping_methods,
    shipping_method_code: state.checkout.shipping_method_code,
    shipping_address_id: state.checkout.shipping_address_id,
    shipping_method: state.checkout.shipping_method,

});
const mapDispatchToProps = dispatch => ({
    SetShippingtMethod: (payment_address_id, payment_method,cb) => dispatch(SetShippingtMethod(payment_address_id, payment_method,cb))
})
export default connect(mapStateToProps, mapDispatchToProps)(PaymentWays);