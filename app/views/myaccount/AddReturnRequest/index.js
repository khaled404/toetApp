import React from 'react';
import {View, Text, Picker} from 'react-native';
import {GetCookie, TranslateString} from '../../../util';
import {BASEURI} from '../../../constants/AppInfo';
import axios from 'axios';
import StylesConstant from '../../../constants/styles';
import {
  AddReturnsRequest,
  FetchAddReturnsPage,
} from '../../../actions/AccountActions';
import {
  Container,
  Header,
  Button,
  Title,
  Content,
  Form,
  Item,
  Input,
  Label,
  Grid,
  Col,
  Row,
  Icon,
} from 'native-base';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import TextInput from '../../../common/Forms/TextInput';
import DropdownList from '../../../common/Forms/DropdownList';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import {connect} from 'react-redux';

class ReturnRequest extends React.Component {
  static navigationOptions = {
    header: <HeaderWithBack Title="المنتجات المرتجعة" />,
  };
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      firstname: props.firstname,
      lastname: props.lastname,
      email: props.email,
      telephone: props.telephone,
      product: props.pageData.product,
      model: props.model,
      return_reason_id: '',
      opened: '1',
      quantity: '1',
      fault_detail: props.fault_detail,
      order_id: props.navigation.getParam('order_id').toString(),
    };
  }
  componentDidMount() {
    this.props.FetchAddReturnsPage(this.state.order_id);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.loaded) {
      this.setState({
        loaded: true,
        firstname: this.props.firstname,
        lastname: this.props.lastname,
        email: this.props.email,
        telephone: this.props.telephone,
        product: this.props.pageData.product,
        model: this.props.model,
        return_reason_id: '',
        opened: this.props.opened,
        fault_detail: this.props.fault_detail,
        //order_id: this.props.pageData.order_id
      });
    }
  }
  onSavePress() {
    this.props.AddReturnsRequest(this.state.order_id, this.state, () => {
      this.props.navigation.navigate('myorders');
    });
  }

  render() {
    return (
      <Content padder style={{backgroundColor: StylesConstant.BackgroundColor}}>
        <Grid>
          <Row>
            <Col>
              <TextInput
                ErrorMessage={this.props.pageData.error_firstname}
                Label={this.props.pageData.entry_firstname}
                Value={this.state.firstname}
                onChangeText={t => this.setState({firstname: t})}
              />
            </Col>
            <Col>
              <TextInput
                ErrorMessage={this.props.pageData.error_lastname}
                Label={this.props.pageData.entry_lastname}
                Value={this.state.lastname}
                onChangeText={t => this.setState({lastname: t})}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                Label={this.props.pageData.entry_email}
                Value={this.state.email}
                ErrorMessage={this.props.pageData.error_email}
                onChangeText={email => this.setState({email})}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                Label={this.props.pageData.entry_quantity}
                Value={this.state.quantity}
                keyboardType="numeric"
                ErrorMessage={this.props.pageData.error_quantity}
                onChangeText={quantity => this.setState({quantity})}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                Label={this.props.pageData.entry_telephone}
                Value={this.state.telephone}
                ErrorMessage={this.props.pageData.error_telephone}
                onChangeText={telephone => this.setState({telephone})}
              />
            </Col>
            <Col>
              <TextInput
                ErrorMessage={this.props.pageData.error_order_id}
                Label={this.props.pageData.entry_order_id}
                Value={this.state.order_id}
                onChangeText={t => this.setState({order_id: t})}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <DropdownList
                error={this.props.pageData.error_opened}
                label={this.props.pageData.entry_opened}
                onChangeText={val => this.setState({opened: val})}
                value={this.state.opened}
                data={[
                  {
                    label: TranslateString('text_yes'),
                    value: '1',
                  },
                  {
                    label: TranslateString('text_no'),
                    value: '0',
                  },
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                ErrorMessage={this.props.pageData.error_product}
                Label={this.props.pageData.entry_product}
                Value={this.state.product}
                onChangeText={t => this.setState({product: t})}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                ErrorMessage={this.props.pageData.error_model}
                Label={this.props.pageData.entry_model}
                Value={this.state.model}
                onChangeText={t => this.setState({model: t})}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <DropdownList
                error={this.props.pageData.error_reason}
                label={this.props.pageData.entry_reason}
                onChangeText={val => this.setState({return_reason_id: val})}
                value={this.state.return_reason_id}
                data={this.props.pageData.return_reasons?.map(e => ({
                  label: e.name,
                  value: e.return_reason_id,
                }))}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                ErrorMessage={this.props.pageData.error_fault_detail}
                Label={this.props.pageData.entry_fault_detail}
                Value={this.state.fault_detail}
                onChangeText={t => this.setState({fault_detail: t})}
              />
            </Col>
          </Row>
        </Grid>

        <PrimaryButton
          onPress={() => this.onSavePress()}
          Title={this.props.pageData.text_checkout}
        />
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  pageData: state.account.addReturnPage,
  firstname: state.auth.firstname,
  lastname: state.auth.lastname,
  email: state.auth.email,
  telephone: state.auth.telephone,
});
const mapDispatchToProps = dispatch => ({
  AddReturnsRequest: (id, body, cb) =>
    dispatch(AddReturnsRequest(id, body, cb)),
  FetchAddReturnsPage: id => dispatch(FetchAddReturnsPage(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReturnRequest);
