import { authReducer,authInitialState,authActionType } from "./authReducer";
import { cartActionType, cartInitialState, cartReducer } from "./cartReducer";
import combineReducers from "./combineReducers";
import {
  layoutActionType,
  layoutInitialState,
  layoutReducer,
} from "./layoutReducer";

export type rootActionType = layoutActionType | cartActionType| authActionType;

export const initialState = {
  layout: layoutInitialState,
  cart: cartInitialState,
  auth:authInitialState,
};

export const rootReducer = combineReducers({
  layout: layoutReducer,
  cart: cartReducer,
  auth: authReducer,
});
