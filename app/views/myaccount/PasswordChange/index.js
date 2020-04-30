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
import {ChangePassword} from '../../../actions/AccountActions';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import Toast from 'react-native-root-toast';
import {TranslateString} from '../../../util';
import TextInput from '../../../common/Forms/TextInput';
import CommonStyles from '../../../common/styles/index';

const headerMapToProps = state => ({
  Title: state.account.passwordChangePage?.heading_title,
});
const Header = connect(headerMapToProps)(HeaderWithBack);

class PasswordChangeView extends React.Component {
  static navigationOptions = {
    header: <Header />,
  };
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
      password: '',
      confirm: '',
    };
    this.text_success = props.pageData.text_success;
  }
  onChangePress() {
    let body = {...this.state};
    this.props.ChangePassword(body, () => {
      Toast.show(this.text_success);
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
          <View style={{padding: 0, marginBottom: normalize(25, 'height')}}>
            <Form>
              <Grid>
                <Row>
                  <Col size={7}>
                    <TextInput
                      IconName="password"
                      IconType="local"
                      Label={TranslateString('entry_password')}
                      secureTextEntry
                      Value={this.state.password}
                      ErrorMessage={this.props.pageData.error_password}
                      secureTextEntry={!this.state.passwordVisible}
                      onChangeText={p => this.setState({password: p})}
                      pass
                    />
                  </Col>
                  <Col
                    size={2}
                    style={[
                      {
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                        paddingHorizontal: normalize(10),
                        backgroundColor: '#fff',
                        marginTop: 10,
                      },
                      CommonStyles.LightShadow,
                    ]}
                  >
                    <Text
                      onPress={() =>
                        this.setState(p => ({
                          passwordVisible: !p.passwordVisible,
                        }))
                      }
                      style={{color: StylesConstant.MainColor}}
                    >
                      {this.state.passwordVisible
                        ? global.IsRtl
                          ? 'إخفاء'
                          : 'hide'
                        : global.IsRtl
                        ? 'إظهار'
                        : 'show'}
                    </Text>
                  </Col>
                </Row>

                <Row>
                  <Col size={7}>
                    <TextInput
                      IconName="password"
                      IconType="local"
                      Label={TranslateString('entry_confirm')}
                      secureTextEntry
                      Value={this.state.confirm}
                      ErrorMessage={this.props.pageData.error_confirm}
                      secureTextEntry={!this.state.passwordVisible}
                      onChangeText={p => this.setState({confirm: p})}
                      pass
                    />
                  </Col>
                  <Col
                    size={2}
                    style={[
                      {
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                        paddingHorizontal: normalize(10),
                        backgroundColor: '#fff',
                        marginTop: 10,
                      },
                      CommonStyles.LightShadow,
                    ]}
                  >
                    <Text
                      onPress={() =>
                        this.setState(p => ({
                          passwordVisible: !p.passwordVisible,
                        }))
                      }
                      style={{color: StylesConstant.MainColor}}
                    >
                      {this.state.passwordVisible
                        ? global.IsRtl
                          ? 'إخفاء'
                          : 'hide'
                        : global.IsRtl
                        ? 'إظهار'
                        : 'show'}
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </Form>
          </View>
        </Content>
        <Footer style={{backgroundColor: StylesConstant.BackgroundColor}}>
          <Content>
            <PriamryButton
              onPress={() => this.onChangePress()}
              Title={this.props.pageData.heading_title}
              style={{marginBottom: normalize(10, 'height'), width: '60%'}}
            />
          </Content>
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  pageData: state.account.passwordChangePage,
});
const mapDispatchToProps = dispatch => ({
  ChangePassword: (body, cb) => dispatch(ChangePassword(body, cb)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordChangeView);
