import {Alert} from 'react-native';
import * as types from './ShopTypes';
import {BASEURI} from '../constants/AppInfo';
import {GetCookie, ChooseStringByLanguage} from '../util';
import axios from 'axios';
import Toast from 'react-native-root-toast';

export const StartLoading = () => {
  return {type: types.LOADING_STARTED, payload: null};
};
export const EndLoading = () => {
  return {type: types.LOADING_FAILED, payload: null};
};

export const FetchSpeicalPage = path => {
  console.log('fetched');

  return async dispatch => {
    let cookie = await GetCookie();
    dispatch(StartLoading());
    dispatch({type: types.SET_SEPCIAL_PRODUCT_PAGE_PATH, payload: path});
    try {
      let response = await axios.get(
        `${BASEURI}${path}&limit=10&cookie=${cookie}`,
      );
      let data = response.data;
      dispatch({type: types.LOAD_SEPCIAL_PRODUCT_PAGE, payload: data});
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const FetchSpeicalPageNextPage = (path, sort, order, page) => {
  return async dispatch => {
    let cookie = await GetCookie();

    try {
      dispatch({type: types.FETCH_MORE_BOTTOM_LOADING});
      let response = await axios.get(
        `${BASEURI}${path}&page=${page}&limit=10&sort=${sort}&order=${order}&cookie=${cookie}`,
      );
      let data = response.data;
      dispatch({
        type: types.LOAD_NEXT_SEPCIAL_PRODUCT_PAGE,
        payload: data,
      });

      dispatch({type: types.STOP_FETCH_MORE_BOTTOM_LOADING});
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const FetchSpecialPageByFilter = (path, filter) => {
  let filterby = filter.split('-')[0];
  let order = filter.split('-')[1];
  return async dispatch => {
    let cookie = await GetCookie();
    dispatch({
      type: types.LOAD_SEPCIAL_PRODUCT_PAGE,
      payload: {products: []},
    });
    //Clear the current data
    dispatch(StartLoading());
    let link = `${path}&cookie=${cookie}&limit=10&sort=${filterby}&order=${order}`;

    try {
      let response = await axios.get(`${BASEURI}${link}`);
      let data = response.data;
      dispatch({type: types.LOAD_SEPCIAL_PRODUCT_PAGE, payload: data});
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const FetchSpecials = () => {
  return async dispatch => {
    let cookie = await GetCookie();

    dispatch(StartLoading());
    try {
      let response = await axios.get(
        `${BASEURI}ocapi/product/special&cookie=${cookie}`,
      );
      let data = response.data;
      dispatch({type: types.FETCH_SPECIALS_PAGE, payload: data});
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const FetchSpecialsByFilter = (id, filter) => {
  let filterby = filter.split('-')[0];
  let order = filter.split('-')[1];
  return async dispatch => {
    let cookie = await GetCookie();
    dispatch({type: types.FETCH_SPECIALS_PAGE, payload: {}});
    dispatch(StartLoading());
    let link = `ocapi/product/special&cookie=${cookie}&sort=${filterby}&order=${order}`;

    try {
      let response = await axios.get(`${BASEURI}${link}`);
      let data = response.data;
      dispatch({type: types.FETCH_SPECIALS_PAGE, payload: data});
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const LoadManufacturersList = data => {
  return {type: types.MANUFACTURERS_LIST_LOADED, payload: data};
};
export const FetchManufacturersList = () => {
  return async dispatch => {
    let cookie = await GetCookie();

    dispatch(StartLoading());
    try {
      let response = await axios.get(
        `${BASEURI}ocapi/product/manufacturer&limt=10&cookie=${cookie}`,
      );
      let data = response.data;
      dispatch(LoadManufacturersList(data));
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const LoadManufacturerDetails = data => {
  return {type: types.SINGLE_MANUFACTURERE_LOADED, payload: data};
};
export const FetchSingleManufacturer = id => {
  return async dispatch => {
    let cookie = await GetCookie();
    dispatch(StartLoading());
    try {
      let response = await axios.get(
        `${BASEURI}ocapi/product/manufacturer/info&manufacturer_id=${id}&limit=10&cookie=${cookie}`,
      );
      let data = response.data;
      data.manufacturer_id = id;
      dispatch(LoadManufacturerDetails(data));
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const FetchSingleManufacturerNextPage = (id, sort, order, page) => {
  return async dispatch => {
    let cookie = await GetCookie();

    dispatch(StartLoading());
    try {
      let response = await axios.get(
        `${BASEURI}ocapi/product/manufacturer/info&manufacturer_id=${id}&page=${page}&limit=10&sort=${sort}&order=${order}&cookie=${cookie}`,
      );
      let data = response.data;
      data.manufacturer_id = id;
      dispatch({type: types.LOAD_MANUFACTURER_NEXT_PAGE, payload: data});
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const FetchSingleManufacturerByFilter = (id, filter) => {
  let filterby = filter.split('-')[0];
  let order = filter.split('-')[1];
  return async dispatch => {
    let cookie = await GetCookie();
    dispatch(LoadManufacturerDetails({})); //Clear the current data
    dispatch(StartLoading());
    let link = `product/manufacturer/info&cookie=${cookie}&manufacturer_id=${id}&limit=10&sort=${filterby}&order=${order}`;

    try {
      let response = await axios.get(`${BASEURI}${link}`);
      let data = response.data;
      data.manufacturer_id = id;
      dispatch(LoadManufacturerDetails(data));
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

//--------------------------------------------------
export const LoadCategoriesList = data => {
  return {type: types.CATEGORIES_LIST_LOADED, payload: data};
};
export const FetchCategoriesList = () => {
  return async dispatch => {
    let cookie = await GetCookie();

    dispatch(StartLoading());
    try {
      let response = await axios.get(
        `${BASEURI}ocapi/categories&cookie=${cookie}`,
      );
      let data = response.data?.content_top?.modules[0].data;
      dispatch(LoadCategoriesList(data));
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const LoadSingleCategory = data => ({
  type: types.SINGLE_CATEOGORY_LOADED,
  payload: data,
});
export const FetchSingleCategory = (id, filters) => {
  return async dispatch => {
    let cookie = await GetCookie();

    dispatch(StartLoading());
    try {
      let filter = '';
      if (typeof filters !== 'undefined') {
        if (filters.length > 0) filter = `&filter=${filters.join(',')}`;
      }
      let response = await axios.get(
        `${BASEURI}ocapi/product/category&path=${id}${filter}&page=1&limit=10&cookie=${cookie}`,
      );
      let data = response.data;
      data.category_id = id;
      dispatch(LoadSingleCategory(data));
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const FetchSingleCategoryNextPage = (id, sort, order, page, filters) => {
  return async dispatch => {
    let cookie = await GetCookie();

    dispatch(StartLoading());
    try {
      let filter = '';
      if (typeof filters !== 'undefined') {
        if (filters.length > 0) filter = `&filter=${filters.join(',')}`;
      }

      let response = await axios.get(
        `${BASEURI}ocapi/product/category&path=${id}${filter}&page=${page}&limit=10&sort=${sort}&order=${order}&cookie=${cookie}`,
      );
      let data = response.data;
      data.category_id = id;
      dispatch({type: types.LOAD_CATEOGRY_NEXT_PAGE, payload: data});
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const FetchSingleCategoryByFilter = (id, filter) => {
  let filterby = filter.split('-')[0];
  let order = filter.split('-')[1];

  return async dispatch => {
    let cookie = await GetCookie();
    dispatch(LoadSingleCategory({})); //Clear the current data
    dispatch(StartLoading());

    try {
      let response = await axios.get(
        `${BASEURI}ocapi/product/category&path=${id}&&limit=10&page=1&cookie=${cookie}&sort=${filterby}&order=${order}`,
      );
      let data = response.data;
      data.category_id = id;
      dispatch(LoadSingleCategory(data));
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
//---------------------------------------------------
export const LoadWishlist = data => ({
  type: types.WISHLIST_LOADED,
  payload: data,
});
export const FetchWishlist = () => {
  return async dispatch => {
    let cookie = await GetCookie();

    dispatch(StartLoading());
    try {
      let response = await axios.get(
        `${BASEURI}ocapi/wishlist&cookie=${cookie}`,
      );
      let data = response.data;
      dispatch(LoadWishlist(data));
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const AddToWishlist = async product_id => {
  let cookie = await GetCookie();
  console.log(`${BASEURI}account/wishlist/add&cookie=${cookie}`);

  let response = await axios.post(
    `${BASEURI}account/wishlist/add&cookie=${cookie}`,
    {product_id},
  );
  console.log('wishlist', response.data);

  Toast.show(
    ChooseStringByLanguage(
      'Added to wishlist successfully',
      'تم إضافة المنتج للمفضلة',
    ),
  );
};
export const RemoveFromWishlist = product_id => {
  return async dispatch => {
    let cookie = await GetCookie();

    let response = await axios.get(
      `${BASEURI}=account/wishlist&remove=${product_id}&cookie=${cookie}`,
    );
    dispatch({type: types.REMOVE_FROM_WISHLIST, payload: product_id});
    Toast.show(
      ChooseStringByLanguage(
        'Removed from wishlist successfully',
        'تم إزالة المنتج من المفضلة',
      ),
    );
  };
};
//------------
export const LoadCart = data => ({type: types.CART_LOADED, payload: data});
export const FetchCart = () => {
  return async dispatch => {
    let cookie = await GetCookie();

    dispatch(StartLoading());
    try {
      let response = await axios.get(
        `${BASEURI}ocapi/checkout/cart&cookie=${cookie}`,
      );
      let data = response.data;
      dispatch(LoadCart(data));
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
function stringify(obj_from_json) {
  if (typeof obj_from_json !== 'object' || Array.isArray(obj_from_json)) {
    // not an object, stringify using native function
    return JSON.stringify(obj_from_json);
  }
  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  let props = Object.keys(obj_from_json)
    .map(key => `${key}:${stringify(obj_from_json[key])}`)
    .join(',');
  return `{${props}}`;
}
export const ChangeCartQuanitity = (cart_id, quanitity) => {
  return async dispatch => {
    let cookie = await GetCookie();

    dispatch(StartLoading());
    try {
      //let body = `quantity[${cart_id}]=${quanitity}`;
      // body[`quantity[${cart_id}]`] = `${quanitity}`;
      let body = {};
      // body.push({`quantity[${cart_id}]`:quanitity})
      body['quantity[' + cart_id + ']'] = quanitity;
      //body = stringify(body);
      str = JSON.stringify(body);
      str = JSON.parse(str);

      //body = JSON.parse(body);
      let response = await axios.post(
        `${BASEURI}ocapi/checkout/cart&cookie=${cookie}`,
        body,
      );
      console.log('====================================');
      console.log('body', str);
      console.log('====================================');
      console.log('====================================');
      console.log('response', response.data);
      console.log('====================================');
      let data = response.data;
      dispatch(LoadCart(data));
    } catch (error) {
      console.log('====================================');
      console.log('error', error);
      console.log('====================================');
      dispatch(EndLoading());
    }
  };
};
//--------------------
export const LoadComparePage = data => ({
  type: types.COMPARE_PAGE_LOADED,
  payload: data,
});
export const FetchComparePage = () => {
  return async dispatch => {
    let cookie = await GetCookie();

    dispatch(StartLoading());
    try {
      let response = await axios.get(
        `${BASEURI}ocapi/product/compare&cookie=${cookie}`,
      );
      let data = response.data;
      dispatch(LoadComparePage(data));
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const AddToCompare = async id => {
  let cookie = await GetCookie();

  try {
    let response = await axios.post(
      `${BASEURI}product/compare/add&cookie=${cookie}`,
      {product_id: id},
    );

    let data = response.data;
    Toast.show(
      ChooseStringByLanguage(
        'The product was added to compare page',
        'تم إضافة المنتج لصفحة المقارنة',
      ),
    );
  } catch (error) {}
};
export const RemoveFromCompare = id => {
  return async dispatch => {
    let cookie = await GetCookie();

    try {
      let response = await axios.get(
        `${BASEURI}ocapi/product/compare&remove=${id}&cookie=${cookie}`,
      );
      let data = response.data;
      dispatch(LoadComparePage(data));
    } catch (error) {}
  };
};

//----------
export const ReorderAgain = (body, cb) => {
  return async dispatch => {
    let cookie = await GetCookie();
    //dispatch({ type: types.FETCH_SERACH_QUERY, payload: {} }); //Clear the current data
    dispatch(StartLoading());

    try {
      let response = await axios.get(
        `${BASEURI}=account/order/reorder&${body}&cookie=${cookie}`,
      );
      let data = response.data;
      cb();
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
