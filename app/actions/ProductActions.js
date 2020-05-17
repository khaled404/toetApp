import * as types from './ProductTypes';
import {BASEURI} from '../constants/AppInfo';
import {GetCookie} from '../util';
import axios from 'axios';
import Toast from 'react-native-root-toast';

export const StartLoading = () => {
  return {type: types.LOADING_STARTED, payload: null};
};
export const EndLoading = () => {
  return {type: types.LOADING_FAILED, payload: null};
};

export const FetchProduct = id => {
  return async dispatch => {
    let cookie = await GetCookie();
    dispatch({type: types.FETCH_PROUDCT, payload: {}});

    dispatch(StartLoading());
    try {
      let res = axios.get(
        `${BASEURI}ocapi/product/product&product_id=${id}&cookie=${cookie}`,
      );
      const response = await res;
      const mindata = await JSON.stringify(response);
      const data = await JSON.parse(mindata);
      let reviewsPromise = axios.get(
        `${BASEURI}ocapi/product/product/review&product_id=${id}&cookie=${cookie}`,
      );
      dispatch({type: types.FETCH_PROUDCT, payload: data.data.product});
      let reviewsRespnose = await reviewsPromise;
      dispatch({
        type: types.FETCH_REVIEWS,
        payload: reviewsRespnose.data,
      });
    } catch (error) {
      console.log('====================================', error);
      dispatch(EndLoading());
    }
  };
};

export const UploadFile = (product_option_id, data) => {
  return async dispatch => {
    let cookie = await GetCookie();
    dispatch(StartLoading());

    try {
      let response = await axios.post(
        `${BASEURI}tool/upload&cookie=${cookie}`,
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-requested-api': 'ocapi',
            'x-requested-with': 'XMLHttpRequest',
            Accept: 'application/json',
          },
        },
      );
      if (response.data.hasOwnProperty('code')) {
        dispatch(SetProductOption(product_option_id, response.data.code));
        dispatch(EndLoading());
      } else {
        dispatch(EndLoading());
        Toast.show(response.data.error);
      }
    } catch (error) {
      if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
      }
    }
  };
};

export const SetProductOption = (product_option_id, option_value_id) => {
  return {
    type: types.ADD_OPTION_VALUE,
    payload: {product_option_id, option_value_id},
  };
};
export const SetGroupOfProductOption = data => {
  return {type: types.ADD_GROUP_OF_OPTION_VALUE, payload: data};
};
export const RemoveProductOption = product_option_id => {
  return {type: types.REMOVE_OPTION_VALUE, payload: product_option_id};
};
export const AddToCart = (body, cb, errorCb) => {
  return async dispatch => {
    let cookie = await GetCookie();

    let response = await axios.post(
      `${BASEURI}checkout/cart/add&cookie=${cookie}`,
      body,
    );
    console.log('response',response);
    
    if (response.data.hasOwnProperty('success')) {
      cb(response.data.success);
    } else {
      errorCb();
    }
  };
};
