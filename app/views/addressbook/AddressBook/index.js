import React from 'react';
import {
  FlatList,
  Text,
  ScrollView,
  List,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Container, Content, Footer} from 'native-base';
import StylesConstants from '../../../constants/styles';

import {
  FetchAddressPage,
  SetActiveAddress,
  DeleteAddress,
  InitAddressEditor,
} from '../../../actions/AccountActions';
import SafeScrollView from '../../../common/UI/SafeScrollView';
import HeaderWithBack from '../../../common/NavComponenets/headers/HeaderWithBack';
import LoadingIndicator from '../../../common/UI/LoadingIndicator';

import AddressItem from './AddressItem';
import PrimaryButton from '../../../common/UI/PrimaryButton';
import {connect} from 'react-redux';
import {NavigationEvents} from 'react-navigation';
import normalize from 'react-native-normalize';

const headerMapToProps = state => ({
  Title: state.account.addressesPage?.heading_title,
});
const Header = connect(headerMapToProps)(HeaderWithBack);

class AddressbookView extends React.Component {
  static navigationOptions = {
    header: <Header />,
  };
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
    };
  }
  // componentDidMount() {
  //     this.props.fetchAddressPage();
  // }

  ParseAddressList() {
    if (!this.props.pageData.addresses) return undefined;

    return this.props.pageData.addresses.map((item, index) => {
      let data = item.address.split('<br />');
      let length = data.length;
      let ad = {
        Name: data[0],
        Street: data[1],
        City: data[length - 3],
        Zone: data[length - 2],
        Country: data[length - 1],
      };
      return {address_id: item.address_id, ...ad, active: item.default};
    });
  }
  onDeletePress(id, IsActive) {
    if (IsActive) {
      Alert.alert(this.props.pageData.error_default, null, [{text: 'OK'}]);
      return;
    }
    this.props.deleteAddress(id);
  }
  onEditPress(id) {
    this.props.navigation.navigate('NewAddress', {address_id: id});
  }
  render() {
    return (
      <Container>
        <Content
          style={[{backgroundColor: StylesConstants.BackgroundColor}]}
          padder={true}
        >
          <NavigationEvents onDidFocus={() => this.props.fetchAddressPage()} />
          <View style={{flex: 1}}>
            <LoadingIndicator visible={this.props.loading} />
            <FlatList
              style={{flexGrow: 0}}
              data={this.ParseAddressList()}
              renderItem={({item, index, separators}) => (
                <TouchableOpacity
                  onPress={() => this.props.setActiveAddress(item.address_id)}
                >
                  <AddressItem
                    onEditPress={this.onEditPress.bind(this)}
                    onDeletePress={this.onDeletePress.bind(this)}
                    Address={item}
                    IsActive={item.active}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(e, i) => i.toString()}
              ListEmptyComponent={
                <Text style={{textAlign: 'center'}}>
                  {this.props.pageData?.text_empty}
                </Text>
              }
            />
          </View>
        </Content>
        <Footer style={{backgroundColor: StylesConstants.BackgroundColor}}>
          <Content>
            <PrimaryButton
              onPress={() => this.props.navigation.navigate('NewAddress')}
              Title={this.props.pageData?.text_address_add}
              style={{marginBottom: normalize(10, 'height'), width: '60%'}}
            />
          </Content>
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  pageData: state.account.addressesPage,
  activeAddress: state.account.activeAddress,
  loading: state.account.loading,
  loadingStatus: state.account.loadingStatus,
});
const mapDispatchToProps = dispatch => ({
  fetchAddressPage: () => dispatch(FetchAddressPage()),
  setActiveAddress: id => dispatch(SetActiveAddress(id)),
  deleteAddress: id => dispatch(DeleteAddress(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressbookView);
