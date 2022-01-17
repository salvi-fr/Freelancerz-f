import axios from "lib/http/client";

import {
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_LOADING,
    CREATE_ROLE_FAILED,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_LOADING,
    UPDATE_ROLE_FAILED,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_FAILED,
    DELETE_ROLE_LOADING,
    GET_ROLE_SUCCESS,
    GET_ROLE_FAILED,
    GET_ROLE_LOADING,
    GET_ROLES_SUCCESS
    , GET_ROLES_FAILED,
    GET_ROLES_LOADING
} from '../reducers/types';
import {IRoleCreate, IRoleUpdate,
    IResponsePaging,
    IResponse} from 'types'

export const getRoles = () => (dispatch) => {
    dispatch({ type: GET_ROLES_LOADING });
    axios.get<IResponsePaging>('/api/role/').then((res) => {
        dispatch({
            type: GET_ROLES_SUCCESS,
            payload: {roles:res.data.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_ROLES_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getRole = (id:string) => (dispatch) => {
    dispatch ({ type: GET_ROLE_LOADING });
    axios.get<IResponse>(`/api/role/${id}`).then((res) => {
        dispatch({
            type: GET_ROLE_SUCCESS,
            payload: {role:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_ROLE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createRole= (data:IRoleCreate) => (dispatch) => {
    dispatch ({ type: CREATE_ROLE_LOADING });
    axios.post<IResponse>('/api/role',{...data}).then((res) => {
        dispatch({
            type: CREATE_ROLE_SUCCESS,
            payload: {role:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_ROLE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateRole = (id:string,data:IRoleUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_ROLE_LOADING });
    axios.put<IResponse>(`/api/role/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_ROLE_SUCCESS,
            payload: {role:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: UPDATE_ROLE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteRole = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_ROLE_LOADING });
    axios.delete<IResponse>(`/api/role/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_ROLE_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_ROLE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}