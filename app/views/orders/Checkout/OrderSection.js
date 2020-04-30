import React from 'react';
import { View,FlatList,Text } from 'react-native';
import OrderItem from './OrderItem';
import styles from './styles';
import {Grid,Col,Row,Content} from 'native-base';
import {connect} from 'react-redux';
let component= ({ products,pageData }) => (
    <Content>
            <Grid>
                <Col>
                    {pageData.products.map((p,i) => <OrderItem key={i} Product={p} />)}
               </Col>
                
            </Grid>
    </Content>
)


const mapStateToProps = state => ({
    pageData: state.shop.cart
});
export default connect(mapStateToProps)(component);