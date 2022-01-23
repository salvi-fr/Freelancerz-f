import axios from "lib/http/client";
import {  toast } from 'react-toastify';

import {
    CREATE_PERMISSION_SUCCESS,
    CREATE_PERMISSION_LOADING,
    CREATE_PERMISSION_FAILED,
    UPDATE_PERMISSION_SUCCESS,
    UPDATE_PERMISSION_LOADING,
    UPDATE_PERMISSION_FAILED,
    DELETE_PERMISSION_SUCCESS,
    DELETE_PERMISSION_FAILED,
    DELETE_PERMISSION_LOADING,
    GET_PERMISSION_SUCCESS,
    GET_PERMISSION_FAILED,
    GET_PERMISSION_LOADING,
    GET_PERMISSIONS_SUCCESS
    , GET_PERMISSIONS_FAILED,
    GET_PERMISSIONS_LOADING
} from '../reducers/types';
import {IPermissionCreate, IPermissionUpdate,
    IResponsePaging,
    IResponse} from 'types'

export const getPermissions = () => (dispatch) => {
    dispatch({ type: GET_PERMISSIONS_LOADING });
    axios.get<IResponsePaging>('/api/permission/').then((res) => {
        dispatch({
            type: GET_PERMISSIONS_SUCCESS,
            payload: {permissions:res.data.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_PERMISSIONS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getPermission = (id:string) => (dispatch) => {
    dispatch ({ type: GET_PERMISSION_LOADING });
    axios.get<IResponse>(`/api/permission/${id}`).then((res) => {
        dispatch({
            type: GET_PERMISSION_SUCCESS,
            payload: {permission:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_PERMISSION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createPermission= (data:IPermissionCreate) => (dispatch) => {
    dispatch ({ type: CREATE_PERMISSION_LOADING });
    axios.post<IResponse>('/api/permission',{...data}).then((res) => {
        dispatch({
            type: CREATE_PERMISSION_SUCCESS,
            payload: {permission:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: CREATE_PERMISSION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updatePermission = (id:string,data:IPermissionUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_PERMISSION_LOADING });
    axios.put<IResponse>(`/api/permission/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_PERMISSION_SUCCESS,
            payload: {permission:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_PERMISSION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deletePermission = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_PERMISSION_LOADING });
    axios.delete<IResponse>(`/api/permission/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_PERMISSION_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: DELETE_PERMISSION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}