import React from 'react';
import {View, Text, Picker,Switch} from 'react-native';
import {
  GetCookie,
  TranslateString,
  ChooseStringByLanguage,
} from '../../../util';
import {BASEURI} from '../../../constants/AppInfo';
import axios from 'axios';
import StylesConstant from '../../../constants/styles';
import {AddAddress, EditAddress} from '../../../actions/AccountActions';
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
import normalize from 'react-native-normalize';

class AddressEditor extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      firstname: '',
      lastname: '',
      address_1: '',
      country_id: '',
      zone_id: '',
      zones: [],
      city: '',
      default: true,
    };
  }
  async componentDidMount() {
    let cookie = await GetCookie();
    var address_id = this.props.navigation.getParam('address_id');
    if (typeof address_id != 'undefined') {
      let response = await axios.get(
        `${BASEURI}account/address/edit&address_id=${address_id}&cookie=${cookie}`,
      );
      console.log('response.data',response.data);
      const defaul = response.data.default
      const {
        firstname,
        lastname,
        address_1,
        country_id,
        zone_id,
        city,
        // default
      } = response.data;
      this.setState({
        firstname,
        lastname,
        address_1,
        country_id,
        zone_id,
        city,
        default:defaul,
        editMode: true,
      });
      this.firstnameRef.SetValue(firstname);
      this.lastnameRef.SetValue(lastname);
      this.address_1Ref.SetValue(address_1);
      this.cityRef.SetValue(city);
      this.onCountryChange(country_id).then(()=>{
        this.setState({
          zone: zone_id,
        });
      });
      
    }
  }
  onSavePress() {
    const body = {...this.state};
    if (body.default == true) {
      body.default = 1
    }else{
      body.default = 0
    }
    delete body.zones;
    if (this.state.editMode) {
      var address_id = this.props.navigation.getParam('address_id');

      this.props.editAddress(address_id, body, () => {
        this.props.navigation.navigate('addressbook');
      });
    } else {
      this.props.addAddress(body, () => {
        this.props.navigation.navigate('addressbook');
      });
    }
  }
  renderCountries() {
    return this.props.countries?.map(i => ({
      label: i.name,
      value: i.country_id,
    }));
  }
  renderZones() {
    if (this.state.zones.length === 0)
      return [{label: this.props.pageData.entry_zone, value: ''}];

    return this.state.zones?.map(i => ({label: i.name, value: i.zone_id}));
  }
  async onCountryChange(val) {
    let cookie = await GetCookie();
    let response = await axios.get(
      `${BASEURI}ocapi/localisation/zones&country_id=${val}&cookie=${cookie}`,
    );

    this.setState({
      country_id: val,
      zones: response.data.zone,
      zone: response.data.zone[0].zone_id,
    });
  }
  render() {
    let title = TranslateString('text_address_add_new');
    if (this.state.editMode)
      //title="text_address_edit";
      title = ChooseStringByLanguage('Edit Address', 'تعديل العنوان');
    return (
      <Container>
        <HeaderWithBack Title={title} />
        <Content
          style={{
            backgroundColor: StylesConstant.BackgroundColor,
            // paddingHorizontal: normalize(20),
          }}
        >
          <View
            style={{
              marginTop: normalize(20, 'height'),
              paddingVertical: normalize(20, 'height'),
            }}
          >
            <Grid style={{padding: 10}}>
              <Row style={{marginBottom: 7}}>
                <Col style={{marginHorizontal: 5}}>
                  <TextInput
                    ref={r => (this.firstnameRef = r)}
                    ErrorMessage={this.props.pageData.error_firstname}
                    Label={this.props.pageData.entry_firstname}
                    Value={this.state.firstname}
                    onChangeText={t => this.setState({firstname: t})}
                  />
                </Col>
                <Col>
                  <TextInput
                    ref={r => (this.lastnameRef = r)}
                    ErrorMessage={this.props.pageData.error_lastname}
                    Label={this.props.pageData.entry_lastname}
                    Value={this.state.lastname}
                    onChangeText={t => this.setState({lastname: t})}
                  />
                </Col>
              </Row>
              <Row style={{marginBottom: 15}}>
                <Col>
                  <TextInput
                    ErrorMessage={this.props.pageData.error_address_1}
                    Label={this.props.pageData.entry_address_1}
                    Value={this.state.address_1}
                    ref={r => (this.address_1Ref = r)}
                    onChangeText={t => this.setState({address_1: t})}
                  />
                </Col>
              </Row>
              <Row style={{marginBottom: 15}}>
                <Col>
                  <DropdownList
                    data={this.renderCountries()}
                    onChangeText={val => this.onCountryChange(val)}
                    label={this.props.pageData.entry_country}
                    error={this.props.pageData.error_country}
                    value={this.state.country_id}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <DropdownList
                    data={this.renderZones()}
                    onChangeText={zone_id => this.setState({zone_id})}
                    label={this.props.pageData.entry_zone}
                    error={this.props.pageData.error_zone}
                    value={this.state.zone}
                  />
                </Col>
              </Row>
              <Row  style={{marginBottom: 15}}>
                <Col>
                  <TextInput
                    ErrorMessage={this.props.pageData.error_city}
                    Label={this.props.pageData.entry_city}
                    Value={this.state.city}
                    ref={r => (this.cityRef = r)}
                    onChangeText={t => this.setState({city: t})}
                  />
                </Col>
              </Row>
              <Row style={{background:'red'}}>
                <Col>
                <Text>{this.props.pageData2.entry_default}</Text>
                </Col>
                <Col>
                <View style={{display:'flex',alignItems:'flex-end'}}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    onValueChange={()=>this.setState({default:!this.state.default})}
                    value={this.state.default}
                  />
                </View>
                
                </Col>
              </Row>
            </Grid>
          </View>
          <View style={{height: normalize(30, 'height')}} />
          <View style={{padding: 10}}>
            <PrimaryButton
              onPress={() => this.onSavePress()}
              Title={
                this.state.editMode
                  ? this.props.pageData.text_address_edit
                  : this.props.pageData.text_address_add
              }
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pageData: state.account.addressEditor,
  pageData2: state.account.addressesPage,
  countries: state.settings.countries,
});
const mapDispatchToProps = dispatch => ({
  addAddress: (address, cb) => dispatch(AddAddress(address, cb)),
  editAddress: (id, address, cb) => dispatch(EditAddress(id, address, cb)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressEditor);
