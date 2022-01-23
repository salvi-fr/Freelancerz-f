import axios from "lib/http/client";
import {  toast } from 'react-toastify';

import {
    CREATE_COMPLAIN_SUCCESS,
    CREATE_COMPLAIN_LOADING,
    CREATE_COMPLAIN_FAILED,
    UPDATE_COMPLAIN_SUCCESS,
    UPDATE_COMPLAIN_LOADING,
    UPDATE_COMPLAIN_FAILED,
    DELETE_COMPLAIN_SUCCESS,
    DELETE_COMPLAIN_FAILED,
    DELETE_COMPLAIN_LOADING,
    GET_COMPLAIN_SUCCESS,
    GET_COMPLAIN_FAILED,
    GET_COMPLAIN_LOADING,
    GET_COMPLAINS_SUCCESS
    , GET_COMPLAINS_FAILED,
    GET_COMPLAINS_LOADING
} from '../reducers/types';

import {IComplainCreate, IComplainUpdate,
    IResponsePaging,
    IResponse} from 'types'

export const getComplains = () => (dispatch) => {
    dispatch({ type: GET_COMPLAINS_LOADING });
    axios.get<IResponsePaging>('/api/complain/').then((res) => {
        dispatch({
            type: GET_COMPLAINS_SUCCESS,
            payload: {complains:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_COMPLAINS_FAILED, 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}
        })
      });
}
export const getOpenComplains = () => (dispatch) => {
    dispatch({ type: GET_COMPLAINS_LOADING });
    axios.get<IResponsePaging>('/api/complain/open').then((res) => {
        dispatch({
            type: GET_COMPLAINS_SUCCESS,
            payload: {complains:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_COMPLAINS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getComplain = (id:string) => (dispatch) => {
    dispatch ({ type: GET_COMPLAIN_LOADING });
    axios.get<IResponse>(`/api/complain/${id}`).then((res) => {
        dispatch({
            type: GET_COMPLAIN_SUCCESS,
            payload: {complain:res.data.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_COMPLAIN_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createComplain= (data:IComplainCreate) => (dispatch) => {
    dispatch ({ type: CREATE_COMPLAIN_LOADING });
    axios.post<IResponse>('/api/complain',{...data}).then((res) => {
        dispatch({
            type: CREATE_COMPLAIN_SUCCESS,
            payload: {complain:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: CREATE_COMPLAIN_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const updateComplain = (id:string,data:IComplainUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_COMPLAIN_LOADING });
    axios.put<IResponse>(`/api/complain/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_COMPLAIN_SUCCESS,
            payload: {complain:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_COMPLAIN_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const deleteComplain = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_COMPLAIN_LOADING });
    axios.delete<IResponse>(`/api/complain/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_COMPLAIN_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: DELETE_COMPLAIN_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}