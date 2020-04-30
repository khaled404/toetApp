import { Alert } from 'react-native';
import * as types from './SearchTypes';
import { BASEURI } from '../constants/AppInfo';
import { GetCookie } from '../util';
import axios from 'axios';
import Toast from 'react-native-root-toast';
//------------------
export const StartLoading = () => { return { type: types.LOADING_STARTED, payload: null }; };
export const EndLoading = () => { return { type: types.LOADING_FAILED, payload: null } };



export const SearchProduct = (query) => {
    return async dispatch => {

        let cookie = await GetCookie();
        dispatch({ type: types.CHANGE_SEARCH_KEYWORD, payload: query });
        if (query === "") {
            dispatch({ type: types.FETCH_SERACH_QUERY, payload: { products: [] } });
            return;
        }
        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}ocapi/product/search&search=${query}&page=1&limit=10&cookie=${cookie}`);
            let data = response.data;
            dispatch({ type: types.FETCH_SERACH_QUERY, payload: data });


        } catch (error) {
            dispatch(EndLoading());
        }
    }
}
export const SearchQueryByFilter = (query, filter) => {
    let filterby = filter.split('-')[0];
    let order = filter.split('-')[1];
    return async dispatch => {

        let cookie = await GetCookie();
        dispatch({ type: types.FETCH_SERACH_QUERY, payload: { products: [] } }); //Clear the current data
        dispatch(StartLoading());

        try {
            let response = await axios.get(`${BASEURI}ocapi/product/search&search=${query}&page=1&cookie=${cookie}&sort=${filterby}&order=${order}&limit=10`);
            let data = response.data;
            dispatch({ type: types.FETCH_SERACH_QUERY, payload: data });


        } catch (error) {
            dispatch(EndLoading());
        }
    }

}
export const FetchNextSearchPage = (query, sort, order, page) => {
    return async dispatch => {

        let cookie = await GetCookie();
        dispatch(StartLoading());
        try {
            let response = await axios.get(`${BASEURI}ocapi/product/search&search=${query}&page=${page}&cookie=${cookie}&sort=${sort}&order=${order}&limit=10`);
            let data = response.data;
            dispatch({ type: types.ADD_NEXT_SEARCH_PAGE, payload: data });

        } catch (error) {
            dispatch(EndLoading());
        }
    }
}
export const ChangeKeyword = (keyword) => {
    return async dispatch => {
        dispatch({ type: types.CHANGE_SEARCH_KEYWORD, payload: keyword });
    }
}


export const ClearSearch = () =>{
    return async dispatch=>{
        dispatch({type:types.CLEAR_SEARCH,payload:""});
    }
}