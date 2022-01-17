import axios from "lib/http/client";

import {
    CREATE_USER_SUCCESS,
    CREATE_USER_LOADING,
    CREATE_USER_FAILED,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_LOADING,
    UPDATE_USER_FAILED,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED,
    DELETE_USER_LOADING,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    GET_USER_LOADING,
    GET_ME_SUCCESS,
    GET_ME_FAILED,
    GET_ME_LOADING,
    GET_USERS_SUCCESS
    , GET_USERS_FAILED,
    GET_USERS_LOADING
} from '../reducers/types';

import {IUserCreate, IUserUpdate,
    IResponsePaging,
    IResponse} from 'types'

export const getUsers = () => (dispatch) => {
    dispatch({ type: GET_USERS_LOADING });
    axios.get<IResponsePaging>('/api/user').then((res) => {
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: {users:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_USERS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getUser = (id:string) => (dispatch) => {
    dispatch ({ type: GET_USER_LOADING });
    axios.get<IResponse>(`/api/user/${id}`).then((res) => {
        dispatch({
            type: GET_USER_SUCCESS,
            payload: {user:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_USER_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getProfile = () => (dispatch) => {
    dispatch ({ type: GET_USER_LOADING });
    axios.get<IResponse>(`/api/user/profile`).then((res) => {
        dispatch({
            type: GET_USER_SUCCESS,
            payload: {profile:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_USER_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}
export const getMe= () => (dispatch) => {
    dispatch ({ type: GET_ME_LOADING });
    axios.get<IResponse>(`/api/user/me`).then((res) => {
        dispatch({
            type: GET_ME_SUCCESS,
            payload: {profile:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_ME_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const createUser= (data:IUserCreate) => (dispatch) => {
    dispatch ({ type: CREATE_USER_LOADING });
    axios.post<IResponse>('/api/user',{...data}).then((res) => {
        dispatch({
            type: CREATE_USER_SUCCESS,
            payload: {user:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_USER_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateUser = (id:string,data:IUserUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_USER_LOADING });
    axios.put<IResponse>(`/api/user/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: {user:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: UPDATE_USER_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteUser = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_USER_LOADING });
    axios.delete<IResponse>(`/api/user/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_USER_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}