import React from 'react';
import {View, Picker, Alert} from 'react-native';
import {SocialIcon, Text} from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import PriamryButton from '../../../common/UI/PrimaryButton';
import {
  Container,
  Content,
  Item,
  Icon,
  Label,
  Grid,
  Row,
  Col,
  Input,
  Form,
  Footer,
} from 'native-base';
import StylesConstant from '../../../constants/styles';
import normalize from 'react-native-normalize';
import {connect} from 'react-redux';
import {EditAcountInfo} from '../../../actions/AccountActions';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import Toast from 'react-native-root-toast';
import {TranslateString} from '../../../util';
import TextInput from '../../../common/Forms/TextInput';

const headerMapToProps = state => ({
  Title: state.account.accountEditPage?.heading_title,
});
const Header = connect(headerMapToProps)(HeaderWithBack);

class AccountInfoEdit extends React.Component {
  static navigationOptions = {
    header: <Header />,
  };
  constructor(props) {
    super(props);
    this.state = {
      firstname: props.pageData.firstname,
      lastname: props.pageData.lastname,
      email: props.pageData.email,
      telephone: props.pageData.telephone,
    };
    this.text_success = props.pageData.text_success;
  }
  componentDidMount() {
    //Fetch the page
  }
  onChangePress() {
    let body = {...this.state};
    this.props.EditAcountInfo(body, () => {
      Toast.show(TranslateString('text_account_account_edit_success'));
    });
  }
  render() {
    return (
      <Container>
        <Content
          style={{backgroundColor: StylesConstant.BackgroundColor}}
          scrollEnabled={true}
          padder={true}
        >
          <Form>
            <Grid>
              <Row>
                <Col size={4}>
                  <TextInput
                    IconName="name"
                    IconType="local"
                    Label={TranslateString('entry_firstname')}
                    Value={this.state.firstname}
                    ErrorMessage={this.props.pageData.error_firstname}
                    onChangeText={firstname => this.setState({firstname})}
                  />
                </Col>
                <Col
                  size={0.1}
                  style={{backgroundColor: StylesConstant.BackgroundColor}}
                />
                <Col size={4}>
                  <TextInput
                    Label={TranslateString('entry_lastname')}
                    Value={this.state.lastname}
                    ErrorMessage={this.props.pageData.error_lastname}
                    onChangeText={lastname => this.setState({lastname})}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextInput
                    IconName="email"
                    IconType="local"
                    Label={TranslateString('entry_email')}
                    Value={this.state.email}
                    ErrorMessage={this.props.pageData.error_email}
                    onChangeText={email => this.setState({email})}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextInput
                    IconName="phone"
                    IconType="local"
                    Label={TranslateString('entry_telephone')}
                    Value={this.state.telephone}
                    ErrorMessage={this.props.pageData.error_telephone}
                    onChangeText={telephone => this.setState({telephone})}
                  />
                </Col>
              </Row>
            </Grid>
          </Form>
        </Content>
        {/* <Footer style={{ backgroundColor: StylesConstant.BackgroundColor }}>
                    <Content padder={true}>
                        <PriamryButton onPress={() => this.props.navigation.navigate('NewAddress')} Title={this.props.pageData ?.text_address_add} style={{ marginBottom: normalize(10, 'height'), width: '60%' }} />
                    </Content>
                </Footer> */}
        <Footer style={{backgroundColor: StylesConstant.BackgroundColor}}>
          <Content>
            <PriamryButton
              onPress={() => this.onChangePress()}
              Title={this.props.pageData.text_edit}
              style={{marginBottom: normalize(10, 'height'), width: '60%'}}
            />
          </Content>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pageData: state.account.accountEditPage,
});
const mapDispatchToProps = dispatch => ({
  EditAcountInfo: (body, cb) => dispatch(EditAcountInfo(body, cb)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountInfoEdit);
//export default AccountInfoEdit;
