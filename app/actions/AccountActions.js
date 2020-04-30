import axios from 'axios';
import * as Types from '../actions/AccountTypes';
import { LOAD_AUTH_DATA } from '../actions/AuthTypes';
import { SetCookie, GetCookie, GetCurrency, GetLanguage } from "../util"
import { BASEURI } from '../constants/AppInfo';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-root-toast';
export const StartLoading = () => { return { type: Types.LOADING_STARTED, payload: null }; };
export const EndLoading = () => { return { type: Types.LOADING_FAILED, payload: null } };



export const FetchReturns = () => {
    return async dispatch => {
        let cookie = await GetCookie();

        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}account/return&cookie=${cookie}`);
            let data = response.data;
            dispatch({ type: Types.LOAD_RETURNS, payload: data });
        } catch (error) {
            dispatch(EndLoading());
        }
    }
}
export const FetchReturnsNextPage = (page) => {
    return async dispatch => {
        let cookie = await GetCookie();

        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}account/return&page=${page}&cookie=${cookie}`);
            let data = response.data;
            if (typeof (data.returns) !== 'undefined' && Array.isArray(data.returns)) {
                if (data.returns.length > 0)
                    dispatch({ type: Types.LOAD_RETURNS_NEXT_PAGE, payload: data });
            }
            dispatch(EndLoading());

        } catch (error) {
            dispatch(EndLoading());
        }
    }
}
export const FetchAddReturnsPage = (id) => {
    return async dispatch => {
        let cookie = await GetCookie();

        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}account/return/add&order_id=${id}&cookie=${cookie}`);
            let data = response.data;
            dispatch({ type: Types.LOAD_ADD_RETURN_PAGE, payload: data });
        } catch (error) {
            dispatch(EndLoading());
        }
    }
}
export const AddReturnsRequest = (id, body, cb) => {
    return async dispatch => {
        let cookie = await GetCookie();

        dispatch(StartLoading());
        try {
            let response = await axios.post(`${BASEURI}account/return/add&&cookie=${cookie}`, body);
            let data = response.data;
            if (data.success) {
                dispatch(EndLoading());
                cb();
                Toast.show(data.success);

            }
            else {
                dispatch(EndLoading());
                dispatch({ type: Types.LOAD_ADD_RETURN_PAGE, payload: data });
            }


        } catch (error) {
            dispatch(EndLoading());
        }
    }
}

export const FetchSignleOrderReturns = (id) => {
    return async dispatch => {
        let cookie = await GetCookie();

        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}account/return/info&return_id=${id}&cookie=${cookie}`);
            let data = response.data;
            dispatch({ type: Types.LOAD_RETURNED_ORDER_DETAILS, payload: data });
        } catch (error) {
            dispatch(EndLoading());
        }
    }
}


export const FetchDonwloads = () => {
    return async dispatch => {
        let cookie = await GetCookie();

        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}ocapi/account/download&cookie=${cookie}`);
            let data = response.data;
            dispatch({ type: Types.LOAD_DOWNLOADS, payload: data });
        } catch (error) {
            dispatch(EndLoading());
        }
    }
}
export const DownloadFile = async (download_id) => {

    try {
        let cookie = await GetCookie();
        let response = await axios.get(`${BASEURI}account/download/prepareDownloadApp&download_id=${download_id}&cookie=${cookie}`, {
            headers: {
                "Content-Type": "application/json",
                "Transfer-Encoding": "chunked"
            }
        });
        return response.data.url;
    }
    catch (error) {
        Toast.show('لا يوجد ملف للتحميل');
    }
}
export const FetchRewards = () => {
    return async dispatch => {
        let cookie = await GetCookie();

        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}ocapi/account/reward&cookie=${cookie}`);
            let data = response.data;
            dispatch({ type: Types.LOAD_REWARDS, payload: data });
        } catch (error) {
            dispatch(EndLoading());
        }
    }
}

export const FetchTrasnactions = () => {
    return async dispatch => {
        let cookie = await GetCookie();

        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}ocapi/account/transaction&cookie=${cookie}`);
            let data = response.data;
            dispatch({ type: Types.LOAD_TRANSACTIONS, payload: data });
        } catch (error) {
            dispatch(EndLoading());
        }
    }
}


export const FetchOrders = () => {
    return async dispatch => {

        let cookie = await GetCookie();

        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}ocapi/account/order&cookie=${cookie}`);
            let data = response.data;

            dispatch({ type: Types.LOAD_ORDERS, payload: data });
        } catch (error) {
            dispatch(EndLoading());
        }
    }
}
export const FetchSingleOrder = (order_id) => {
    return async dispatch => {
        let cookie = await GetCookie();

        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}ocapi/account/order/info&order_id=${order_id}&cookie=${cookie}`);
            let data = response.data;
            dispatch({ type: Types.LOAD_SINGLE_ORDER, payload: data });
        } catch (error) {
            dispatch(EndLoading());
        }
    }
}

export const SetActiveAddress = (id) => {
    return async dispatch => {
        // let response = await axios.post(`${BASEURI}[INSERT_YOUR_LINK_HERE]&address_id=${order_id}&cookie=${cookie}`);
        // let data = response.data;
        // if(data.success){
        //     Toast.show(data.success);
        // }
        dispatch({ type: Types.SET_ADDRESS_ACTIVE, payload: id });
    };

}
export const FetchAddressPage = () => {
    return async dispatch => {

        let cookie = await GetCookie();

        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}ocapi/account/address&cookie=${cookie}`);
            let data = response.data;

            dispatch({ type: Types.LOAD_ADDRESSES, payload: data });
            dispatch(InitAddressEditor());

        } catch (error) {
            dispatch(EndLoading());
        }
    }
}
export const DeleteAddress = (id) => {
    return async dispatch => {

        let cookie = await GetCookie();

        try {
            let response = await axios.get(`${BASEURI}ocapi/account/address/delete&address_id=${id}&cookie=${cookie}`);


            dispatch({ type: Types.DELETE_ADDRESS, payload: id });


        } catch (error) {
            dispatch(EndLoading());
        }
    }
}
export const AddAddress = (address, cb) => {
    return async dispatch => {

        let cookie = await GetCookie();

        try {

            let response = await axios.post(`${BASEURI}ocapi/account/address/insert&cookie=${cookie}`, address);
            if (response.data.success) {
                cb();
            }
            else {
                const { error_firstname,
                    error_lastname,
                    error_address_1,
                    error_city,
                    error_postcode,
                    error_country,
                    error_zone } = response.data;

                let payload = {
                    error_firstname,
                    error_lastname,
                    error_address_1,
                    error_city,
                    error_postcode,
                    error_country,
                    error_zone
                };
                dispatch({ type: Types.SET_EDITOR_ERRORS, payload });


            }




        } catch (error) {

        }
    }
}
export const EditAddress = (id, address, cb) => {
    return async dispatch => {

        let cookie = await GetCookie();

        try {

            let response = await axios.post(`${BASEURI}ocapi/account/address/update&address_id=${id}&cookie=${cookie}`, address);
            if (response.data.success) {
                cb();
            }
            else {
                const { error_firstname,
                    error_lastname,
                    error_address_1,
                    error_city,
                    error_postcode,
                    error_country,
                    error_zone } = response.data;

                let payload = {
                    error_firstname,
                    error_lastname,
                    error_address_1,
                    error_city,
                    error_postcode,
                    error_country,
                    error_zone
                };
                dispatch({ type: Types.SET_EDITOR_ERRORS, payload });


            }




        } catch (error) {

        }
    }
}
export const InitAddressEditor = () => ({ type: Types.INIT_ADDRESS_EDITOR, payload: null })


export const EditAcountInfo = (body, cb) => {
    return async dispatch => {
        let cookie = await GetCookie();

        try {

            let response = await axios.post(`${BASEURI}ocapi/account/edit&cookie=${cookie}`, body);
            if (!response.data.hasOwnProperty('error_warning')) {
                const { firstname, lastname, email, telephone, newsLetter } = response.data;
                dispatch({ type: LOAD_AUTH_DATA, payload: { firstname, lastname, email, telephone, newsLetter } });
                cb();
            }
            else {
                dispatch({ type: Types.LOAD_ACCOUNT_EDIT_PAGE, payload: response.data });
            }


        } catch (error) {

        }
    }
}
export const ChangePassword = (body, cb) => {
    return async dispatch => {
        let cookie = await GetCookie();

        try {

            let response = await axios.post(`${BASEURI}ocapi/account/password&cookie=${cookie}`, body);
            if (!response.data.hasOwnProperty('error_password')) {
                cb();
            }
            else {
                dispatch({ type: Types.LOAD_CHANGE_PASSWORD_PAGE, payload: response.data });
            }


        } catch (error) {

        }
    }
}


