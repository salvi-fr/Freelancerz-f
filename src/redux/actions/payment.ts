import axios from "lib/http/client";

import {
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_LOADING,
    CREATE_PAYMENT_FAILED,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_LOADING,
    UPDATE_PAYMENT_FAILED,
    DELETE_PAYMENT_SUCCESS,
    DELETE_PAYMENT_FAILED,
    DELETE_PAYMENT_LOADING,
    GET_PAYMENT_SUCCESS,
    GET_PAYMENT_FAILED,
    GET_PAYMENT_LOADING,
    GET_PAYMENTS_SUCCESS
    , GET_PAYMENTS_FAILED,
    GET_PAYMENTS_LOADING
} from '../reducers/types';

import {IPaymentCreate, IPaymentUpdate,
    IResponsePaging,
    IResponse} from 'types'

export const getPayments = () => (dispatch) => {
    dispatch({ type: GET_PAYMENTS_LOADING });
    axios.get<IResponsePaging>('/api/payment/').then((res) => {
        dispatch({
            type: GET_PAYMENTS_SUCCESS,
            payload: {payments:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_PAYMENTS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getPayment = (id:string) => (dispatch) => {
    dispatch ({ type: GET_PAYMENT_LOADING });
    axios.get<IResponse>(`/api/payment/${id}`).then((res) => {
        dispatch({
            type: GET_PAYMENT_SUCCESS,
            payload: {payment:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_PAYMENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createPayment= (data:IPaymentCreate) => (dispatch) => {
    dispatch ({ type: CREATE_PAYMENT_LOADING });
    axios.post<IResponse>('/api/payment',{...data}).then((res) => {
        dispatch({
            type: CREATE_PAYMENT_SUCCESS,
            payload: {payment:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_PAYMENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updatePayment = (id:string,data:IPaymentUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_PAYMENT_LOADING });
    axios.put<IResponse>(`/api/payment/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_PAYMENT_SUCCESS,
            payload: {payment:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: UPDATE_PAYMENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deletePayment = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_PAYMENT_LOADING });
    axios.delete<IResponse>(`/api/payment/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_PAYMENT_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_PAYMENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}