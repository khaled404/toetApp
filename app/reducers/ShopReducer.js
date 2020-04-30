import * as Types from '../actions/ShopTypes';

const INITIAL_STATE = {
   loading: true,
   loadingStatus: 'pending',
   fetchMoreLoader: true,
   manufacturersPage: { manufacturers: [] },
   manufacturerDetails: { products: [] },
   categoriesPage: {},
   cateogryDetails: { categories: [] },
   cart: { products: [] },
   wishlist: { products: [] },
   compare: { products: [] },
   products: {},
   search: { products: [] },
   sepcialProductPagePath: '',
   sepcialProductPage: {
      products: [],
   },
};

const ShopReducer = (state = INITIAL_STATE, action) => {
   const newState = { ...state };
   switch (action.type) {
      case Types.LOADING_STARTED:
         newState.loading = true;
         newState.loadingStatus = 'started';
         break;

      case Types.LOADING_FAILED:
         newState.loading = false;
         newState.loadingStatus = 'failed';
         break;
      case Types.FETCH_SPECIALS_PAGE:
         newState.loadingStatus = 'done';
         newState.loading = false;
         newState.specialDetails = action.payload;

      case Types.MANUFACTURERS_LIST_LOADED:
         newState.loadingStatus = 'done';
         newState.loading = false;
         newState.manufacturersPage = action.payload;
         break;
      case Types.SINGLE_MANUFACTURERE_LOADED:
         newState.loadingStatus = 'done';
         newState.loading = false;
         newState.manufacturerDetails = action.payload;
         break;
      case Types.LOAD_MANUFACTURER_NEXT_PAGE:
         let manfuctre_newProducts = [
            ...newState.manufacturerDetails.products,
            ...action.payload.products,
         ];
         newState.manufacturerDetails.products = manfuctre_newProducts;
         newState.manufacturerDetails.pagination = action.payload.pagination;
         newState.manufacturerDetails.sort = action.payload.sort;
         newState.manufacturerDetails.order = action.payload.order;
         newState.loading = false;
         newState.loadingStatus = 'done';

         break;

      case Types.CATEGORIES_LIST_LOADED:
         newState.loadingStatus = 'done';
         newState.loading = false;
         newState.categoriesPage = action.payload;
         break;
      case Types.SINGLE_CATEOGORY_LOADED:
         newState.loadingStatus = 'done';
         newState.loading = false;
         newState.cateogryDetails = action.payload;
         break;
      case Types.LOAD_CATEOGRY_NEXT_PAGE:
         let newProducts = [
            ...newState.cateogryDetails.products,
            ...action.payload.products,
         ];
         newState.cateogryDetails.products = newProducts;
         newState.cateogryDetails.pagination = action.payload.pagination;
         newState.cateogryDetails.sort = action.payload.sort;
         newState.cateogryDetails.order = action.payload.order;
         newState.loading = false;
         newState.loadingStatus = 'done';

         break;

      case Types.WISHLIST_LOADED:
         newState.loadingStatus = 'done';
         newState.loading = false;
         newState.wishlist = action.payload;
         break;
      case Types.REMOVE_FROM_WISHLIST:
         let newWishlist = { ...newState.wishlist };
         let products = newWishlist.products.filter(
            e => e.product_id != action.payload
         );
         newWishlist.products = products;
         newState.wishlist = newWishlist;
         break;

      case Types.CART_LOADED:
         newState.loadingStatus = 'done';
         newState.loading = false;
         newState.cart = action.payload;
         break;

      case Types.COMPARE_PAGE_LOADED:
         newState.loadingStatus = 'done';
         newState.loading = false;
         newState.compare = action.payload;
         break;

      case Types.SET_SEPCIAL_PRODUCT_PAGE_PATH:
         newState.sepcialProductPagePath = action.payload;
         break;
      case Types.LOAD_SEPCIAL_PRODUCT_PAGE:
         newState.loadingStatus = 'done';
         newState.loading = false;
         newState.sepcialProductPage = action.payload;
         break;
      case Types.LOAD_NEXT_SEPCIAL_PRODUCT_PAGE:
         let sepcialProductPage_newProducts = [
            ...newState.sepcialProductPage.products,
            ...action.payload.products,
         ];
         newState.sepcialProductPage.products = sepcialProductPage_newProducts;
         newState.sepcialProductPage.pagination = action.payload.pagination;
         newState.sepcialProductPage.sort = action.payload.sort;
         newState.sepcialProductPage.order = action.payload.order;
         newState.loading = false;
         newState.loadingStatus = 'done';

         break;
      case Types.FETCH_MORE_BOTTOM_LOADING:
         return { ...state, fetchMoreLoader: true };
         break;
      case Types.STOP_FETCH_MORE_BOTTOM_LOADING:
         return { ...state, fetchMoreLoader: false };
         breake;
   }
   return newState;
};

export default ShopReducer;
