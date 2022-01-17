import axios from "lib/http/client";

import {
    CREATE_PROMO_SUCCESS,
    CREATE_PROMO_LOADING,
    CREATE_PROMO_FAILED,
    UPDATE_PROMO_SUCCESS,
    UPDATE_PROMO_LOADING,
    UPDATE_PROMO_FAILED,
    DELETE_PROMO_SUCCESS,
    DELETE_PROMO_FAILED,
    DELETE_PROMO_LOADING,
    GET_PROMO_SUCCESS,
    GET_PROMO_FAILED,
    GET_PROMO_LOADING,
    GET_PROMOS_SUCCESS
    , GET_PROMOS_FAILED,
    GET_PROMOS_LOADING
} from '../reducers/types';

import {IPromoCreate, IPromoUpdate,
    IResponsePaging,
    IResponse} from 'types'


export const getPromos = () => (dispatch) => {
    dispatch({ type: GET_PROMOS_LOADING });
    axios.get<IResponsePaging>('/api/promo/').then((res) => {
        dispatch({
            type: GET_PROMOS_SUCCESS,
            payload: {promos:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_PROMOS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getPromo = (id:string) => (dispatch) => {
    dispatch ({ type: GET_PROMO_LOADING });
    axios.get<IResponse>(`/api/promo/${id}`).then((res) => {
        dispatch({
            type: GET_PROMO_SUCCESS,
            payload: {promo:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_PROMO_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createPromo= (data:IPromoCreate) => (dispatch) => {
    dispatch ({ type: CREATE_PROMO_LOADING });
    axios.post<IResponse>('/api/promo/',{...data}).then((res) => {
        dispatch({
            type: CREATE_PROMO_SUCCESS,
            payload: {promo:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_PROMO_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updatePromo = (id:string,data:IPromoUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_PROMO_LOADING });
    axios.put<IResponse>(`/api/promo/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_PROMO_SUCCESS,
            payload: {promo:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: UPDATE_PROMO_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deletePromo = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_PROMO_LOADING });
    axios.delete<IResponse>(`/api/promo/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_PROMO_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_PROMO_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}