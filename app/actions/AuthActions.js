import { Alert, ToastAndroid } from 'react-native';
import axios from 'axios';
import { GetCookie, SetCurrency, SetLanguage, Clear } from '../util';
import * as Types from './AuthTypes';
import { LOAD_APP_SETTINGS, APP_LOADED } from './SettingsTypes';
import { BASEURI } from '../constants/AppInfo';
import CookieManager from 'react-native-cookies';
import Toast from 'react-native-root-toast';
export const StartLoading = () => { return { type: Types.LOADING_STARTED, payload: null }; };
export const EndLoading = () => { return { type: Types.LOADING_FAILED, payload: null } };

export const Register = (body, cb, errCB) => {
    return async dispatch => {
        dispatch(StartLoading());
        let cookie = await GetCookie();
        try {

            let response = await axios.post(`${BASEURI}ocapi/account/register&cookie=${cookie}`, body);
            let data = response.data;
            if (data.hasOwnProperty('error_warning')) {
                if (data.error_warning !== "") {
                    Alert.alert("", data.error_warning);
                }
                const { error_firstname,
                    error_lastname,
                    error_email,
                    error_telephone,
                    error_password,
                    error_confirm, } = data;

                dispatch({ type: Types.REGISTER_FAILS, payload: { error_firstname, error_lastname, error_email, error_telephone, error_password, error_confirm, } });
            }
            else {
                const { firstname, lastname, email, telephone, newsLetter } = data;
                dispatch({ type: Types.LOAD_AUTH_DATA, payload: { firstname, lastname, email, telephone, newsLetter } });
                const { currency, currencies, language, languages } = data;
                SetCurrency(currency.code);
                SetLanguage(language);
                dispatch({ type: LOAD_APP_SETTINGS, payload: { currency, currencies, language, languages } });
                dispatch({ type: Types.LOG_USER_IN, payload: null });
                cb();
            }
            dispatch(EndLoading());



        } catch (error) {
            dispatch(EndLoading());

        }
    }
}

export const LoginNormal = (body, cb) => {
    return async dispatch => {
        dispatch(StartLoading());

        let cookie = await GetCookie();
        try {
            let response = await axios.post(`${BASEURI}ocapi/account/login&cookie=${cookie}`, body);
            let data = response.data;
            if (data.hasOwnProperty("error_warning")) {
                dispatch(EndLoading());
                Toast.show(data["error_warning"]);
            }
            else {
                const { firstname, lastname, email, telephone, newsLetter } = data;
                dispatch({ type: Types.LOAD_AUTH_DATA, payload: { firstname, lastname, email, telephone, newsLetter } });
                const { currency, currencies, language, languages } = data;
                SetCurrency(currency.code);
                SetLanguage(language);
                dispatch({ type: LOAD_APP_SETTINGS, payload: { currency, currencies, language, languages } });
                dispatch({ type: Types.LOG_USER_IN, payload: null });
                cb();
            }

        } catch (error) {
            dispatch(EndLoading());

        }
    }
}
export const LoginWithFacebook = (token, cb) => {
    return async dispatch => {
        dispatch(StartLoading());

        let cookie = await GetCookie();
        try {
            let response = await axios.post(`${BASEURI}ocapi/social/login&cookie=${cookie}`, {
                type: 'facebook',
                accessToken: token
            });
            let data = response.data;

            const { firstname, lastname, email, telephone, newsLetter } = data;
            dispatch({ type: Types.LOAD_AUTH_DATA, payload: { firstname, lastname, email, telephone, newsLetter } });
            const { currency, currencies, language, languages } = data;
            SetCurrency(currency.code);
            SetLanguage(language);
            dispatch({ type: LOAD_APP_SETTINGS, payload: { currency, currencies, language, languages } });
            dispatch({ type: Types.LOG_USER_IN, payload: null });
            cb();
            dispatch(EndLoading());

        } catch (error) {
            dispatch(EndLoading());

        }
    }
}
export const LoginWithTwitter = (token, cb) => {
    return async dispatch => {
        dispatch(StartLoading());

        let cookie = await GetCookie();
        try {
            let response = await axios.post(`${BASEURI}ocapi/social/login&cookie=${cookie}`, {
                type: 'twitter',
                accessToken: token
            });
            let data = response.data;

            const { firstname, lastname, email, telephone, newsLetter } = data;
            dispatch({ type: Types.LOAD_AUTH_DATA, payload: { firstname, lastname, email, telephone, newsLetter } });
            const { currency, currencies, language, languages } = data;
            SetCurrency(currency.code);
            SetLanguage(language);
            dispatch({ type: LOAD_APP_SETTINGS, payload: { currency, currencies, language, languages } });
            dispatch({ type: Types.LOG_USER_IN, payload: null });
            cb();
            dispatch(EndLoading());

        } catch (error) {
            dispatch(EndLoading());

        }
    }
}

export const Logout = (cb) => {

    return async dispatch => {
        await Clear();
        dispatch({ type: Types.LOG_USER_OUT });
        await CookieManager.clearAll()
        cb();
    }
}
export const ToggleNewLetter = (subscrption) => {
    return async dispatch => {

        let cookie = await GetCookie();
        try {
            let response = await axios.post(`${BASEURI}account/newsletter&cookie=&cookie=${cookie}`, { newsletter: subscrption });
            if(response.data.success){
                Toast.show(response.data.success);
            }
            dispatch({ type: Types.TOGGLE_NEWSLETTER, payload: subscrption });

        } catch (error) {
        }
    }
}