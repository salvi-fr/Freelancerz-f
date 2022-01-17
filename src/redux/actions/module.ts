import axios from "lib/http/client";

import {
    CREATE_MODULE_SUCCESS,
    CREATE_MODULE_LOADING,
    CREATE_MODULE_FAILED,
    UPDATE_MODULE_SUCCESS,
    UPDATE_MODULE_LOADING,
    UPDATE_MODULE_FAILED,
    DELETE_MODULE_SUCCESS,
    DELETE_MODULE_FAILED,
    DELETE_MODULE_LOADING,
    GET_MODULE_SUCCESS,
    GET_MODULE_FAILED,
    GET_MODULE_LOADING,
    GET_MODULES_SUCCESS
    , GET_MODULES_FAILED,
    GET_MODULES_LOADING
} from '../reducers/types';

import {IModuleCreate, IModuleUpdate,
    IResponsePaging,
    IResponse,
    IModule} from 'types'
    
export const getModules = () => (dispatch) => {
    dispatch({ type: GET_MODULES_LOADING });
    axios.get<IResponsePaging>('/api/module/').then((res) => {
        dispatch({
            type: GET_MODULES_SUCCESS,
            payload: {modules:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_MODULES_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getModule = (id:string) => (dispatch) => {
    dispatch ({ type: GET_MODULE_LOADING });
    axios.get<IResponse>(`/api/module/${id}`).then((res) => {
        dispatch({
            type: GET_MODULE_SUCCESS,
            payload: {module:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_MODULE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const setModule = (module:IModule) => (dispatch) => {
if(module){
    dispatch({
        type: GET_MODULE_SUCCESS,
        payload: {module:module},
    })
}
       
}


export const createModule= (data:IModuleCreate) => (dispatch) => {
    dispatch ({ type: CREATE_MODULE_LOADING });
    axios.post<IResponse>('/api/module',{...data}).then((res) => {
        dispatch({
            type: CREATE_MODULE_SUCCESS,
            payload: {module:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_MODULE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateModule = (id:string,data:IModuleUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_MODULE_LOADING });
    axios.put<IResponse>(`/api/module/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_MODULE_SUCCESS,
            payload: {module:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: UPDATE_MODULE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteModule = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_MODULE_LOADING });
    axios.delete<IResponse>(`/api/module/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_MODULE_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_MODULE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}