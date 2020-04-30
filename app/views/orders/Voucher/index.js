import React from 'react';
import {View, Text} from 'react-native';
import SafeView from '../../../common/UI/SafeView';
import StylesConstant from '../../../constants/styles';
import {Content, Form, Item, Input, Label, Grid, Col, Row} from 'native-base';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import TextInput from '../../../common/Forms/TextInput';
import BlankHeader from '../../../common/NavComponenets/headers/BlankHeader';
import {ChooseStringByLanguage, TranslateString} from '../../../util';
import Axios from 'axios';
import {connect} from 'react-redux';
import {FetchCart} from '../../../actions/ShopActions';
import {BASEURI} from '../../../constants/AppInfo';
import Toast from 'react-native-root-toast';
class VoucherView extends React.Component {
  static navigationOptions = {
    header: <BlankHeader TitleKey="text_cart_voucher" />,
  };
  constructor(props) {
    super(props);
    this.state = {
      voucher: props.pageData.voucher,
      error: false,
    };
  }
  onAddVoucherPress() {
    this.setState({
      error: undefined,
    });
    Axios.post(`${BASEURI}extension/total/voucher/voucher`, {
      voucher: this.state.voucher,
    }).then(({data}) => {
      if (data.hasOwnProperty('error')) {
        this.setState({
          error: data.error,
        });
      } else {
        this.props.FetchCart();
        this.props.navigation.goBack(null);
      }
    });
  }
  render() {
    return (
      <SafeView>
        <Content style={{backgroundColor: StylesConstant.BackgroundColor}}>
          <Form>
            <Grid>
              <Col>
                <Row style={{marginTop: 20}}>
                  <View style={{flex: 1}}>
                    <TextInput
                      ErrorMessage={this.state.error}
                      Label={this.props.pageData.entry_voucher}
                      Value={this.state.voucher}
                      onChangeText={t =>
                        this.setState({voucher: t, error: false})
                      }
                    />
                  </View>
                </Row>
              </Col>
            </Grid>
          </Form>
          <View style={{height: 30}} />
          <PrimaryButton
            onPress={() => this.onAddVoucherPress()}
            Title={this.props.pageData.button_voucher}
          />
        </Content>
      </SafeView>
    );
  }
}
const mapStateToProps = state => ({
  pageData: state.shop.cart,
});
const mapDispatchToProps = dispatch => ({
  FetchCart: () => dispatch(FetchCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VoucherView);
