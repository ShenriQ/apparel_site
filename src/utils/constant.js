// export const api_base_url = "http://10.10.10.229:81/flutter-store-admin/index.php/";
export const api_base_url = "http://10.10.10.229:81/flutter-store-admin/index.php/";
export const api_key = "romeodar0819";
export const img_url = "http://10.10.10.229:81/flutter-store-admin/uploads/";
export const img_thumb_url = "http://10.10.10.229:81/flutter-store-admin/uploads/thumbnail/";
// post
export const product_search_url = "rest/products/search/api_key/" + api_key + "/";
export const addtouch_url = "rest/touches/add_touch/api_key/" + api_key + "/";
export const getall_notis_url = "rest/notis/all_notis/api_key/" + api_key + "/";
export const read_notis_url = "rest/notis/is_read/api_key/" + api_key + "/";
export const category_search_url = "rest/categories/search/api_key/" + api_key + "/";
export const login_url = "rest/users/login/api_key/" + api_key + "/";
export const register_url = "rest/users/add/api_key/" + api_key + "/";
export const add_fav_url = "rest/favourites/press/api_key/" + api_key;
// get
export const getcollections_url = "rest/collections/get/api_key/" + api_key + "/";
export const getshop_info_url = "rest/shops/get_shop_info/api_key/" + api_key + "/";
export const get_images_url = "rest/images/get/api_key/" + api_key + "/";
export const get_products_url = "rest/products/get/api_key/" + api_key + "/";
export const get_prdoduct_trending_url = "rest/products/related_product_trending/api_key/" + api_key + "/";
export const get_transaction_url = "rest/transactionheaders/get/api_key/" + api_key + "/";
export const get_users_url = "rest/users/get/api_key/" + api_key + "/";
export const get_favproducts_url = "rest/products/get_favourite/api_key/" + api_key + "/login_user_id/***/";
export const get_rates_url = "rest/rates/get/api_key/" + api_key + "/product_id/";
// limit, offset
export const getLimOff_url = (limit, offset) => { return "limit/" + limit + "/offset/" + offset; } 