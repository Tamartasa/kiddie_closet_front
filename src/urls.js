const HOSTNAME = "http://127.0.0.1:8000/api";

export const SIGNUP = `${HOSTNAME}/users/signup/`;
export const USER_DATA = `${HOSTNAME}/users/data`;
// export const UPLOAD_PROFILE_IMG = `${HOSTNAME}/auth/me/profile_img`
export const LOGIN = `${HOSTNAME}/users/token/`;
export const REFRESH = `${HOSTNAME}/users/token/refresh/`;

export const CATEGORIES_URL = `${HOSTNAME}/categories/`;
export const GET_ADD_ITEM = `${HOSTNAME}/items/`;
export const GET_ITEMS_BY_AD_ID = `${HOSTNAME}/items?ad_id=`;

export const GET_ITEMS_BY_CATEGORY_URL = `${HOSTNAME}/items?category=`;

export const staticItemImage =
  "https://img.freepik.com/premium-vector/clothes-items-white-background-seamless-pattern-thin-line_48369-13298.jpg?w=2000";
