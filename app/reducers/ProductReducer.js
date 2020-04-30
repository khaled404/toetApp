import * as Types from '../actions/ProductTypes';
const INITIAL_STATE = {
  loading: true,
  loadingStatus: 'pending',
  pageData: {
    images: [],
    attribute_groups: [],
  },
  reviews: {
    reviews: [],
  },
  selecedOptions: [],
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  const newState = {...state};
  switch (action.type) {
    case Types.LOADING_STARTED:
      newState.loading = true;
      newState.loadingStatus = 'started';
      break;

    case Types.LOADING_FAILED:
      newState.loading = false;
      newState.loadingStatus = 'failed';
      break;
    case Types.FETCH_PROUDCT:
      newState.pageData = action.payload;
      newState.loading = false;
      newState.loadingStatus = 'finished';
      newState.selecedOptions = [];
      break;
    case Types.FETCH_REVIEWS:
      newState.reviews = action.payload;
    case Types.ADD_OPTION_VALUE:
      var options = [...newState.selecedOptions];
      options = options.filter(
        e => e.product_option_id != action.payload.product_option_id,
      );
      options.push(action.payload);
      newState.selecedOptions = options;
      break;
    case Types.ADD_GROUP_OF_OPTION_VALUE:
      var options = [...newState.selecedOptions];
      if (action.payload && action.payload.length > 0) {
        options = options.filter(
          e => e.product_option_id != action.payload[0].product_option_id,
        );
        //options.concat(action.payload);
        newState.selecedOptions = [].concat(options, action.payload);
        break;
      }
    case Types.REMOVE_OPTION_VALUE:
      var options = [...newState.selecedOptions];
      options = options.filter(e => e.product_option_id != action.payload);
      newState.selecedOptions = options;
      break;
  }

  return newState;
};

export default AuthReducer;
