import axios from 'axios';
import * as Types from '../actions/SettingsTypes';
import {LOAD_AUTH_DATA, LOG_USER_IN, SKIP_LOGIN} from '../actions/AuthTypes';
import {
  LOAD_ACCOUNT_EDIT_PAGE,
  LOAD_CHANGE_PASSWORD_PAGE,
} from '../actions/AccountTypes';
import {LoadCategoriesList, LoadCart} from '../actions/ShopActions';
import {
  SetCookie,
  GetCookie,
  GetCurrency,
  GetLanguage,
  SetCurrency,
  SetLanguage,
  GetSkipLogin,
} from '../util';
import {BASEURI} from '../constants/AppInfo';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
export const LoadApp = () => ({type: Types.APP_LOADED, payload: null});

export const InitializApp = () => {
  return async dispatch => {
    var cookie = await GetCookie();
    var language_code = await GetLanguage();
    var currency_code = await GetCurrency();
    var skip_login = await GetSkipLogin();
    if (skip_login) {
      dispatch({type: SKIP_LOGIN, payload: true});
    }
    let body = {
      language_code,
      currency_code,
    };
    let isRtl = language_code.toLowerCase() === 'ar';
    global.IsRtl = isRtl;
    I18nManager.forceRTL(isRtl);
    if ((I18nManager.isRTL && !isRtl) || (!I18nManager.isRTL && isRtl)) {
      RNRestart.Restart();
    }

    let initAppUrl = `${BASEURI}ocapi/me`;
    //await Cookie.clear();
    if (typeof cookie != 'undefined' && cookie != null) {
      body.access_token = cookie;
      initAppUrl += `&cookie=${cookie}`;
    }
    try {
      var response = await axios.post(initAppUrl, body);
      let data = response.data;
      await SetCookie(data.cookie);
      cookie = data.cookie;
      if (data.logged !== null) {
        dispatch({type: LOG_USER_IN});
      }
      //Set currenty anc language
      await axios.post(`${BASEURI}module/language&cookie=${cookie}`, {
        language_code,
      });
      await axios.post(`${BASEURI}module/currency&cookie=${cookie}`, {
        currency_code,
      });

      var addressesPromise = axios.post(
        `${BASEURI}checkout/shipping_address&cookie=${cookie}`,
      );
      let homeLayoutPromise = axios.get(
        `${BASEURI}ocapi/home`,
      );
      let translationPromise = axios.get(
        `${BASEURI}ocapi/translate&cookie=${cookie}`,
      );
      const {firstname, lastname, email, telephone, newsletter, contact} = data;

      dispatch({type: Types.SET_CONTACT_INFO, payload: contact});
      dispatch({
        type: LOAD_AUTH_DATA,
        payload: {firstname, lastname, email, telephone, newsletter},
      });
      let homeLayout = await homeLayoutPromise;

      let translationText = await translationPromise;

      let categoriesResponse = await axios.get(
        `${BASEURI}ocapi/categories&cookie=${cookie}`,
      );
      // console.log(categoriesResponse);

      let categories = categoriesResponse.data?.content_top?.modules[0].data;
      dispatch(LoadCategoriesList(categories));
      dispatch({
        type: Types.LOAD_TRNASLATION_STRINGS,
        payload: translationText.data,
      });
      dispatch({type: Types.LOAD_HOMELAYOUT, payload: homeLayout.data});

      const {currency, currencies, language, languages} = data;
      SetCurrency(currency.cody);
      SetLanguage(language);
      dispatch({
        type: Types.LOAD_APP_SETTINGS,
        payload: {currency, currencies, language, languages},
      });
      dispatch(LoadApp());
      //Load Countires
      let addresses = await addressesPromise;
      let countries = addresses.data.countries;
      dispatch({type: Types.LOAD_COUNTRIES, payload: countries});

      let accountEditPage = await axios.get(
        `${BASEURI}ocapi/account/edit&cookie=${cookie}`,
      );
      dispatch({type: LOAD_ACCOUNT_EDIT_PAGE, payload: accountEditPage.data});
      let changepasswordPage = await axios.get(
        `${BASEURI}ocapi/account/password&cookie=${cookie}`,
      );
      dispatch({
        type: LOAD_CHANGE_PASSWORD_PAGE,
        payload: changepasswordPage.data,
      });
      let cart = (
        await axios.get(`${BASEURI}ocapi/checkout/cart&cookie=${cookie}`)
      ).data;
      dispatch(LoadCart(cart));
    } catch (error) {
      alert(error);
    }
  };
};

export const LoadZones = countryId => {
  return async dispatch => {
    let response = await axios.get(
      `${BASEURI}ocapi/localisation/zones&country_id=${countryId}&cookie=${cookie}`,
    );
    dispatch({
      type: Types.LOAD_ZONES,
      payload: response.data.zone,
    });
  };
};
