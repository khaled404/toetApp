import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (typeof (_navigator) !== 'undefined') {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
  }
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};