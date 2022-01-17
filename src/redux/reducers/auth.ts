import { setSession } from '@context/JWTAuthContext';
import {
    REFRESH_AUTH_SUCCESS,
    REFRESH_AUTH_LOADING,
    REFRESH_AUTH_FAILED,
    LOGIN_AUTH_SUCCESS,
    LOGIN_AUTH_LOADING,
    LOGIN_AUTH_FAILED,
    SIGNUP_AUTH_SUCCESS,
    SIGNUP_AUTH_LOADING,
    SIGNUP_AUTH_FAILED
} from './types';

export const InitialAuthState = {
    refreshAuthloading: false,
    refreshAuthSuccess: false,
    refreshAuthFailed: false,
    loginAuthloading: false,
    loginAuthSuccess: false,
    loginAuthFailed: false,
    signupAuthloading: false,
    signupAuthSuccess: false,
    signupAuthFailed: false,
    refreshToken: null,
    accessToken: null,
    error: null,
    profile:null,

}
export type AuthStateType = {
    readonly refreshAuthloading?: boolean,
    readonly refreshAuthSuccess?: boolean,
    readonly refreshAuthFailed?: boolean,
    readonly loginAuthloading?: boolean,
    readonly loginAuthSuccess?: boolean,
    readonly loginAuthFailed?: boolean,
    readonly signupAuthloading?: boolean,
    readonly signupAuthSuccess?: boolean,
    readonly signupAuthFailed?: boolean,
    readonly refreshToken?: string,
    readonly accessToken?: string,
    readonly error?: string,
    readonly profile?:any

}


export type authActionType = {
    type: string;
    payload: AuthStateType
};



export const authReducer: React.Reducer<AuthStateType, authActionType> = (
    state: AuthStateType=InitialAuthState,
    action: authActionType
) => {
    switch (action.type) {
        case REFRESH_AUTH_SUCCESS: {
            return {
                ...state,
                refreshAuthloading: false,
                refreshAuthSuccess: true,
                refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken,
            }
        }
        case REFRESH_AUTH_LOADING: {
            return {
                ...state,
                refreshAuthloading: true,
            }
        }
        case REFRESH_AUTH_FAILED: {
            return {
                ...state,
                refreshAuthloading: false,
                refreshAuthFailed: true,
                refreshToken: null,
                accessToken: null,
                error: action.payload.error,
            }
        }
        case LOGIN_AUTH_SUCCESS: {
            setSession(action.payload.accessToken ,action.payload.refreshToken)
            return {
                ...state,
                loginAuthloading: false,
                loginAuthSuccess: true,
                refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken,
            }
        }
        case LOGIN_AUTH_LOADING: {
            return {
                ...state,
                loginAuthloading: true
            }
        }
        case LOGIN_AUTH_FAILED: {
            console.log("login failed",action.payload)
            return {
                ...state,
                loginAuthloading: false,
                loginAuthFailed: true,
                refreshToken: null,
                accessToken: null,
                error: action.payload.error
            }
        }
        case SIGNUP_AUTH_SUCCESS: {
            setSession(action.payload.accessToken ,action.payload.refreshToken)
            return {
                ...state,
                signupAuthloading: false,
                signupAuthSuccess: true
            }
        }
        case SIGNUP_AUTH_LOADING: {
            return {
                ...state,
                signupAuthloading: true
            }
        }
        case SIGNUP_AUTH_FAILED: {
            console.log("login failed",action.payload)
            return {
                ...state,
                signupAuthloading: false,
                signupAuthFailed: true,
                error: action.payload.error
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};