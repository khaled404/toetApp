import React from 'react';
import {View, Text, FlatList} from 'react-native';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import StylesConstant from '../../../constants/styles';
import CommonStyles from '../../../common/styles';
import {ParseDate} from '../../../util';
import {FetchTrasnactions} from '../../../actions/AccountActions';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';
import {
  Item,
  Input,
  Label,
  Grid,
  Col,
  Row,
  Icon,
  Container,
  Content,
} from 'native-base';
import ViewWithShadow from '../../../common/UI/ViewWithShadow';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import {connect} from 'react-redux';
import normalize from 'react-native-normalize';
import LinearGradient from 'react-native-linear-gradient';

// header
const headerMapToProps = state => ({
  Title: state.account.transactionsPage?.heading_title,
});
const Header = connect(headerMapToProps)(HeaderWithBack);

class TrasnactionScreen extends React.Component {
  static navigationOptions = {
    header: <Header />,
  };

  constructor(props) {
    super(props);
    this.state = {
      Items: [
        {Title: 'سويتر أبيض', Date: '2019/5/5', Value: '+20'},
        {Title: 'حذاء رياضي أحمر', Date: '2019/5/5', Value: '+100'},
        {Title: 'حذاء رياضي أخضر', Date: '2019/5/5', Value: '+150'},
      ],
    };
  }
  componentDidMount() {
    this.props.FetchTrasnactions();
  }
  _renderItem(e) {
    return (
      <Row>
        <Col style={{alignItems: 'flex-start'}} size={3}>
          <Text style={{fontSize: 16}}>{e.description}</Text>
        </Col>
        <Col style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 16}}>{e.date_added}</Text>
        </Col>
        <Col style={{alignItems: 'flex-end'}}>
          <Text style={[CommonStyles.MainColor, CommonStyles.FontFamilyBold]}>
            {e.amount}
          </Text>
        </Col>
      </Row>
    );
  }
  render() {
    return (
      <SafeScrollView>
        <View
          style={{
            backgroundColor: StylesConstant.MainColor,
            width: normalize(340),
            height: normalize(148, 'height'),
            alignItems: 'center',
            borderRadius: normalize(10),
            alignSelf: 'center',
            marginBottom: normalize(25, 'height'),
          }}
        >
          <View
            style={{
              backgroundColor: StylesConstant.BackgroundColor,
              width: normalize(320),
              height: normalize(148, 'height'),
              alignItems: 'center',
              borderRadius: normalize(10),
            }}
          >
            <View
              style={{
                width: normalize(300),
                height: normalize(148, 'height'),
                borderRadius: normalize(10),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: StylesConstant.ColorScandre,
              }}
            >
              <Text
                style={[
                  {color: '#fff', fontSize: 50},
                  CommonStyles.FontFamilyBold,
                ]}
              >
                {this.props.pageData?.total}
              </Text>
              <Text style={{color: '#fff', fontSize: 12}}>
                {this.props.pageData?.column_amount}
              </Text>
            </View>
          </View>
        </View>
        <Grid>
          {this.props.pageData?.transactions?.map(e => this._renderItem(e))}
        </Grid>
      </SafeScrollView>
    );
  }
}

const mapStateToProps = state => ({
  pageData: state.account.transactionsPage,
  loading: state.account.loading,
});
const mapDispatchToPRops = dispatch => ({
  FetchTrasnactions: () => dispatch(FetchTrasnactions()),
});
export default connect(
  mapStateToProps,
  mapDispatchToPRops,
)(TrasnactionScreen);
