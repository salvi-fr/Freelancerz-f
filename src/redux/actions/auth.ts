// import axios from 'axios'
import axios from "lib/http/client";
import {
    LOGIN_AUTH_SUCCESS,
    LOGIN_AUTH_LOADING,
    LOGIN_AUTH_FAILED,
    REFRESH_AUTH_SUCCESS,
    REFRESH_AUTH_LOADING,
    REFRESH_AUTH_FAILED,
    SIGNUP_AUTH_SUCCESS,
SIGNUP_AUTH_LOADING,
SIGNUP_AUTH_FAILED
} from '../reducers/types';
export type LoginType = {
    email: string;
    rememberMe?: boolean;
    password: number;
};
export type SignupType = {
    email: string;
    password: number;
    passwordConfirmation: number;
    rememberMe?: boolean;
    firstName: string;
    lastName: string;
    role: string;
    mobileNumber: string;
}



export const Login=  (data:LoginType) => (dispatch) => {
    dispatch ({ type: LOGIN_AUTH_LOADING });
   
    axios.post('/api/auth/login',{...data}).then((res) => {
        
        dispatch({
            type: LOGIN_AUTH_SUCCESS,
            payload: res.data.data,
        })
    }).catch(function (error) {
        dispatch ({ type: LOGIN_AUTH_FAILED, 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}  })
      });
}

export const RefreshToken = () => (dispatch) => {
    dispatch ({ type: REFRESH_AUTH_LOADING });
    axios.post('/api/auth/refresh').then((res) => {
        dispatch({
            type: REFRESH_AUTH_SUCCESS,
            payload: {auth:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: REFRESH_AUTH_FAILED, 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const Signup = (data:SignupType) => (dispatch) => {
    dispatch ({ type: SIGNUP_AUTH_LOADING });
    axios.post('/api/auth/signup',{...data}).then((res) => {
        dispatch({
            type: SIGNUP_AUTH_SUCCESS,
            payload: {auth:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: SIGNUP_AUTH_FAILED, 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

