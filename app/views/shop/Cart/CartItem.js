import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {Icon, Grid, Row, Col} from 'native-base';

import propTypes from 'prop-types';
import StylesConstant from '../../../constants/styles';
import normalize from 'react-native-normalize';
import CommonStyles from '../../../common/styles';
class CartItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  renderOptions() {
    let options = this.props.Option;
    if (typeof options == 'undefined') return null;
    if (Array.isArray(options) && options.length > 0) {
      let children = [];
      for (let i = 0; i < options.length; i++) {
        const o = options[i];
        children.push(
          <Text style={{fontSize: 12}}>
            {o.name}: {o.value}
          </Text>,
        );
        // children.push(<Text style={{fontSize:12}}> {o.value}</Text>)
      }
      return (
        <Row size={2} style={{marginVertical: 5}}>
          <Col>{children}</Col>
        </Row>
      );
    }
    return null;
  }
  goToProudctPage() {
    this.props.navigation.navigate('productdetails', {
      product_id: this.props.Product_Id,
    });
  }
  render() {
    return (
      <Grid style={{marginBottom: normalize(20, 'height')}}>
        <Col>
          <TouchableOpacity
            onPress={() => this.goToProudctPage()}
            style={{
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#E7EAF0',
              width: normalize(100),
              height: normalize(100),
              borderRadius: normalize(100 / 2),
            }}
          >
            <Image
              source={{uri: this.props.Img}}
              style={[styles.CartImage, {resizeMode: 'stretch'}]}
            />
          </TouchableOpacity>
        </Col>
        <Col size={2}>
          <Row
            size={2}
            style={{justifyContent: 'space-between', alignItems: 'center'}}
          >
            <Col>
              <Text
                onPress={() => this.goToProudctPage()}
                style={[
                  CommonStyles.RegularSize,
                  CommonStyles.FontFamilyBold,
                  {
                    textDecorationLine: this.props.Stock
                      ? 'none'
                      : 'line-through',
                  },
                ]}
              >
                {this.props.Name} {this.props.Stock ? null : '***'}
              </Text>
              <Text style={[CommonStyles.RegularSize]}>{this.props.Desc}</Text>
            </Col>
            <Col>
              <Icon
                onPress={this.props.onDeletePress}
                type="MaterialCommunityIcons"
                name="close"
                style={styles.CancelButton}
              />
            </Col>
          </Row>

          {this.renderOptions()}

          <Row>
            <Col>
              <Row style={{alignItems: 'flex-end'}}>
                <Text
                  style={[
                    CommonStyles.RegularSize,
                    CommonStyles.FontFamilyMedium,
                    CommonStyles.MainColor,
                  ]}
                >
                  {this.props.Count} x {this.props.Price}{' '}
                </Text>
              </Row>
              <Row style={{alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={this.props.onIncreasePress}>
                  <View style={[styles.CircleButton, {marginLeft: 0}]}>
                    <Icon
                      type="FontAwesome"
                      name="plus"
                      style={{fontSize: normalize(10.5), opacity: 0.5}}
                    />
                  </View>
                </TouchableOpacity>

                <Text>{this.props.Count}</Text>
                <TouchableOpacity onPress={this.props.onDecresePress}>
                  <View style={styles.CircleButton}>
                    <Icon
                      type="FontAwesome"
                      name="minus"
                      style={{fontSize: normalize(10.5), opacity: 0.5}}
                    />
                  </View>
                </TouchableOpacity>
              </Row>
            </Col>
            <Col style={{justifyContent: 'flex-end'}}>
              <Text
                style={[
                  CommonStyles.RegularSize,
                  CommonStyles.FontFamilyBold,
                  CommonStyles.MainColor,
                ]}
              >
                {this.props.Total}{' '}
              </Text>
            </Col>
          </Row>
        </Col>
      </Grid>
      // <View style={styles.CartContainer}>
      //     <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      //         <Image source={{uri:this.props.Img}} style={styles.CartImage} />
      //     </View>
      //     <View style={{flex:3,alignItems:'flex-start',justifyContent:'center',marginLeft:20}}>
      //         <Text style={{fontFamily:'Tajawal-Bold'}}>{this.props.Name}</Text>
      //         <Text style={{fontFamily:'Tajawal-Light'}}>{this.props.Desc}</Text>
      //         <Text>{this.props.Price} </Text>
      //         <View style={{flexDirection:'row',backgroundColor:'yellow'}}>
      //             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',flex:4,height:50}}>
      //                 <View style={[styles.CircleButton,{marginLeft:0}]}><Text onPress={this.props.onIncreasePress}>+</Text></View>
      //                 <Text>{this.props.Count}</Text>
      //                 <View style={styles.CircleButton}><Text  onPress={this.props.onDecresePress}>-</Text></View>
      //             </View>
      //             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',flex:1,height:50}}>
      //                  <Icon type='FontAwesome' name='close' style={styles.CancelButton} />
      //                  {/* <Text style={styles.CancelButton}  onPress={this.props.onDecresePress}>X</Text> */}
      //             </View>
      //         </View>

      //     </View>
      // </View>
    );
  }
}
const styles = StyleSheet.create({
  CartContainer: {flexDirection: 'row', height: normalize(116, 'height')},
  CartImage: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
  },
  CircleButton: {
    backgroundColor: 'lightgrey',
    height: normalize(23, 'height'),
    width: normalize(23),
    borderRadius: normalize(11.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(10),
  },
  CancelButton: {
    color: '#F35056',
    fontSize: normalize(30),
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
});

CartItem.propTypes = {
  Name: propTypes.string.isRequired,
  Desc: propTypes.string.isRequired,
  Price: propTypes.number.isRequired,
  Count: propTypes.number.isRequired,
  Img: propTypes.string.isRequired,
  onIncreasePress: propTypes.func.isRequired,
  onDecresePress: propTypes.func.isRequired,
  onDeletePress: propTypes.func.isRequired,
};

export default CartItem;
