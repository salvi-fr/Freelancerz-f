
const INIT = "INIT";
import {  REFRESH_AUTH_SUCCESS,
    REFRESH_AUTH_LOADING,
    REFRESH_AUTH_FAILED,
    LOGIN_AUTH_SUCCESS,
    LOGIN_AUTH_LOADING,
    LOGIN_AUTH_FAILED,
    SIGNUP_AUTH_SUCCESS,
    SIGNUP_AUTH_LOADING,
    SIGNUP_AUTH_FAILED,
    LOGOUT } from '@redux/reducers/types'
    import {IUser} from 'types'
    
export const authInitialState = {
  user :null,
  isAuthenticated:false,
  loading:false
};



export type authStateType = {
    user: IUser|null;
    isAuthenticated: boolean;
    loading: boolean;
  };

export type authActionType = {
    type: string;
    payload: authStateType,
   
};

export const authReducer: React.Reducer<authStateType, authActionType> = (
    state: authStateType,
    action: authActionType
) => {
    switch (action.type) {
        case REFRESH_AUTH_SUCCESS: {
            // setSession(action.payload.accessToken ,action.payload.refreshToken)
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            }
        }
        case REFRESH_AUTH_LOADING: {
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            }
        }
        case REFRESH_AUTH_FAILED: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
            }
        }

        case INIT: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
            }
        }
        case LOGOUT:{
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
            }
        }
        case LOGIN_AUTH_SUCCESS: {

            // setSession(action.payload.accessToken ,action.payload.refreshToken)
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                loading: false,
            }
        }
        case LOGIN_AUTH_LOADING: {
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            }
        }
        case LOGIN_AUTH_FAILED: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
            }
        }
        case SIGNUP_AUTH_SUCCESS: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
            }
        }
        case SIGNUP_AUTH_LOADING: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: true,
            }
        }
        case SIGNUP_AUTH_FAILED: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
            }
        }

        default: {
            return {
            ...state,    
            }
        }
    }
};