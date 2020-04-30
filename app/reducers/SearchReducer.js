import * as Types from '../actions/SearchTypes'
const INITIAL_STATE = {
    loading: false,
    searchPage: {
        products: []
    },
    keyword: "",

}


const ShopReducer = (state = INITIAL_STATE, action) => {
    const newState = { ...state };
    switch (action.type) {
        case Types.LOADING_STARTED:

            newState.loading = true;
            newState.loadingStatus = "started";
            break;

        case Types.LOADING_FAILED:
            newState.loading = false;
            newState.loadingStatus = "failed";
            break;
        case Types.FETCH_SERACH_QUERY:
            newState.loading = false;
            newState.searchPage = action.payload;
            break;
        case Types.CHANGE_SEARCH_KEYWORD:
            newState.keyword = action.payload;
            break;
        case Types.ADD_NEXT_SEARCH_PAGE:
            let newProducts = [...newState.searchPage.products, ...action.payload.products];
            newState.searchPage.products = newProducts;
            newState.searchPage.pagination = action.payload.pagination;
            newState.searchPage.sort = action.payload.sort;
            newState.searchPage.order = action.payload.order;
            newState.loading = false;
            newState.loadingStatus = "done";

            break;
        case Types.CLEAR_SEARCH:
            newState.searchPage= {products:[]};
            newState.keyword = "";
            break;

    }
    return newState;

}
export default ShopReducer;