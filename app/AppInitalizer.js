import React from 'react';
import {I18nManager} from 'react-native';
import AppNavigator from './router';
import SplashScreen from './SplashScreen';
import {InitializApp} from './actions/SettingsActions';
import {connect} from 'react-redux';
import RNRestart from 'react-native-restart';
import NavigationService from './util/NavigationService';
class AppInitializer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.InitializApp();
  }
  render() {
    if (this.props.Loaded) {
      return (
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    } else return <SplashScreen />;
  }
}

const mapStateToProps = state => ({Loaded: state.settings.Loaded});
const mapDispatchToProps = dispatch => ({
  InitializApp: () => dispatch(InitializApp()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppInitializer);
