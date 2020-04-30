import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Grid, Row, Col, Input, Textarea} from 'native-base';
import StylesConstant from '../../../../constants/styles';

import RadioGroup from './Options/RadioGroup';
import CheckboxGroup from './Options/CheckboxGroup';
import DateTimePicker from './Options/DateTime';
import {
  SetProductOption,
  SetGroupOfProductOption,
  RemoveProductOption,
  UploadFile,
} from '../../../../actions/ProductActions';
import {connect} from 'react-redux';
import normalize from 'react-native-normalize';
import FileUpload from './Options/FileUpload';
class ProductCustomize extends React.Component {
  constructor(props) {
    super(props);
  }
  onTextChange(product_option_id, text) {
    if (text === '') {
      this.props.RemoveProductOption(product_option_id);
      return;
    }
    this.props.SetProductOption(product_option_id, text);
  }
  renderRightComponenet(option) {
    switch (option.type) {
      case 'radio':
      case 'select':
        return (
          <Row style={styles.Cell}>
            <Text style={styles.Title}>{option.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <RadioGroup
                product_option_id={option.product_option_id}
                SetProductOption={this.props.SetProductOption}
                options={option.product_option_value || option.option_value}
              />
            </View>
          </Row>
        );
      case 'checkbox':
        return (
          <Row style={styles.Cell}>
            <Text style={styles.Title}>{option.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <CheckboxGroup
                product_option_id={option.product_option_id}
                SetGroupOfProductOption={this.props.SetGroupOfProductOption}
                RemoveProductOption={this.props.RemoveProductOption}
                options={option.product_option_value || option.option_value}
              />
            </View>
          </Row>
        );
      case 'text':
        return (
          <Row style={styles.Cell}>
            <Text style={styles.Title}>{option.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Input
                style={{
                  backgroundColor: '#fff',
                  borderRadius: normalize(25),
                  textAlign: 'center',
                  fontFamily: StylesConstant.FontFamily,
                  borderWidth: 1,
                  borderColor: '#efefef',
                  height: normalize(50, 'height'),
                }}
                placeholder={option.name}
                onChangeText={text =>
                  this.onTextChange(option.product_option_id, text)
                }
              />
            </View>
          </Row>
        );
      case 'textarea':
        return (
          <Row style={styles.Cell}>
            <Text style={styles.Title}>{option.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Textarea
                style={{
                  backgroundColor: '#fff',
                  borderRadius: normalize(15),
                  textAlign: 'center',
                  fontFamily: StylesConstant.FontFamily,
                  borderWidth: 1,
                  borderColor: '#efefef',
                  flex: 1,
                  justifyContent: 'center',
                }}
                placeholder={option.name}
                onChangeText={text =>
                  this.onTextChange(option.product_option_id, text)
                }
              />
            </View>
          </Row>
        );
      case 'time':
      case 'datetime':
      case 'date':
        return (
          <Row style={styles.Cell}>
            <Text style={styles.Title}>{option.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <DateTimePicker
                product_option_id={option.product_option_id}
                name={option.name}
                type={option.type}
                SetProductOption={this.props.SetProductOption}
              />
            </View>
          </Row>
        );
      case 'file':
        return (
          <Row style={styles.Cell}>
            <Text style={styles.Title}>{option.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <FileUpload
                product_option_id={option.product_option_id}
                name={option.name}
                UploadFile={this.props.UploadFile}
              />
            </View>
          </Row>
        );
    }
    return null;
  }
  renderMessageIfEmpty() {
    if (this.props.options && this.props.options.length == 0) {
      return (
        <Row
          style={[
            styles.Cell,
            {justifyContent: 'center', alignItems: 'center'},
          ]}
        >
          <Text style={[styles.Title, {alignSelf: 'center'}]}>
            {global.IsRtl
              ? 'لا يوجد تفاصيل للمنتج'
              : 'There are no details for the product'}
          </Text>
        </Row>
      );
    }
    return null;
  }
  render() {
    return (
      <Grid style={{backgroundColor: StylesConstant.BackgroundColor}}>
        {this.props.options
          ? this.props.options.map(i => this.renderRightComponenet(i))
          : null}
        {this.renderMessageIfEmpty()}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  selecedOptions: state.product.selecedOptions,
});
const mapDispatchToProps = dispatch => ({
  SetProductOption: (product_option_id, option_value_id) =>
    dispatch(SetProductOption(product_option_id, option_value_id)),
  SetGroupOfProductOption: arr => dispatch(SetGroupOfProductOption(arr)),
  RemoveProductOption: product_option_id =>
    dispatch(RemoveProductOption(product_option_id)),
  UploadFile: (product_option_id, data) =>
    dispatch(UploadFile(product_option_id, data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductCustomize);

const styles = StyleSheet.create({
  Cell: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: normalize(20),
    height: normalize(90, 'height'),
  },
  Title: {
    fontSize: 15,
    opacity: 0.7,
    marginVertical: 15,
    alignSelf: 'flex-start',
  },
  Value: {
    fontSize: normalize(16),
  },
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
