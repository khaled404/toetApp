import React from 'react';
import {
  SetLanguage,
  SetCurrency,
  ChooseStringByLanguage,
  TranslateString,
  GetLanguage,
  GetCurrency,
} from '../../util';
import {View, Picker, Toast, I18nManager, Alert} from 'react-native';
import SafeView from '../../common/UI/SafeView';
import StylesConstant from '../../constants/styles';
import {
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
import ViewWithShadow from '../../common/UI/ViewWithShadow';
import PrimaryButton from '../../common/UI/PrimaryButton';
import HeaderWithBack from '../../common/NavComponenets/headers/HeaderWithBack';
import {connect} from 'react-redux';
import normalize from 'react-native-normalize';
import RNRestart from 'react-native-restart';
import DropdownList from '../../common/Forms/DropdownList';

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: this.props.language,
      currency: this.props.currency.code,
      notifications: '1',
    };
  }
  static navigationOptions = {
    header: <HeaderWithBack TitleKey="menu_settings" />,
  };
  renderCurrencies() {
    return this.props.currencies.map(item => ({
      label: item.title,
      value: item.code,
    }));
  }
  renderLanguages() {
    return this.props.languages.map(item => ({
      label: item.name,
      value: item.code,
    }));

    // return this.props.languages.map((item) => (<Picker.Item label={item.name} value={item.code} />));
  }
  async componentDidMount() {
    let language = await GetLanguage();
    let currency = await GetCurrency();
    this.setState({
      language,
      currency,
    });
  }
  Save() {
    var p1 = SetCurrency(this.state.currency);
    var p2 = SetLanguage(this.state.language);
    Promise.all(p1, p2).then(() => {
      //Restart to do all the initalization
      I18nManager.forceRTL(this.state.language === 'ar');
      RNRestart.Restart();
    });
  }
  AlertUser() {
    let title = ChooseStringByLanguage('Warning', 'تنبيه');
    let content = ChooseStringByLanguage(
      'The application will be restarted to apply the changes',
      'سيتم إعادة تشغيل التطبيق من جديد لتفعيل التغيرات المطلوبة',
    );

    Alert.alert(title, content, [
      {
        text: TranslateString('text_cancel'),
        style: 'cancel',
      },
      {text: TranslateString('text_yes'), onPress: () => this.Save()},
    ]);
  }
  render() {
    return (
      <SafeView>
        <Content style={{backgroundColor: StylesConstant.BackgroundColor}}>
          <Form>
            <Grid>
              <Row>
                <Col>
                  <DropdownList
                    data={this.renderCurrencies()}
                    onChangeText={itemvalue =>
                      this.setState({currency: itemvalue})
                    }
                    value={this.state.currency}
                    label={TranslateString('text_currency')}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <DropdownList
                    data={this.renderLanguages()}
                    onChangeText={itemvalue =>
                      this.setState({language: itemvalue})
                    }
                    value={this.state.language}
                    label={TranslateString('text_language')}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <DropdownList
                    data={[
                      {
                        label: ChooseStringByLanguage('Subscriped', 'مشترك'),
                        value: '1',
                      },
                      {
                        label: ChooseStringByLanguage(
                          'Unsubscriped',
                          'غير مشترك',
                        ),
                        value: '0',
                      },
                    ]}
                    onChangeText={itemvalue =>
                      this.setState({notifications: itemvalue})
                    }
                    value={this.state.notifications}
                    label={TranslateString('text_notification')}
                  />
                </Col>
              </Row>
            </Grid>
          </Form>
        </Content>
        <PrimaryButton
          onPress={() => this.AlertUser()}
          Title={ChooseStringByLanguage('Save', 'حفظ')}
        />
      </SafeView>
    );
  }
}

const mapStateToProps = state => ({
  currencies: state.settings.currencies,
  currency: state.settings.currency,
  languages: state.settings.languages,
  language: state.settings.language,
});
export default connect(mapStateToProps)(SettingsView);
