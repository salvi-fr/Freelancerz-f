import axios from "lib/http/client";
import {  toast } from 'react-toastify';

import {
    CREATE_SUBSCRIPTION_SUCCESS,
    CREATE_SUBSCRIPTION_LOADING,
    CREATE_SUBSCRIPTION_FAILED,
    UPDATE_SUBSCRIPTION_SUCCESS,
    UPDATE_SUBSCRIPTION_LOADING,
    UPDATE_SUBSCRIPTION_FAILED,
    DELETE_SUBSCRIPTION_SUCCESS,
    DELETE_SUBSCRIPTION_FAILED,
    DELETE_SUBSCRIPTION_LOADING,
    GET_SUBSCRIPTION_SUCCESS,
    GET_SUBSCRIPTION_FAILED,
    GET_SUBSCRIPTION_LOADING,
    GET_SUBSCRIPTIONS_SUCCESS
    , GET_SUBSCRIPTIONS_FAILED,
    GET_SUBSCRIPTIONS_LOADING
} from '../reducers/types';
import {ISubscriptionCreate, ISubscriptionUpdate,
    IResponsePaging,
    IResponse} from 'types'
export const getSubscriptions = () => (dispatch) => {
    dispatch({ type: GET_SUBSCRIPTIONS_LOADING });
    axios.get<IResponsePaging>('/api/subscription/').then((res) => {
        dispatch({
            type: GET_SUBSCRIPTIONS_SUCCESS,
            payload: {subscriptions:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_SUBSCRIPTIONS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getSubscription = (id:string) => (dispatch) => {
    dispatch ({ type: GET_SUBSCRIPTION_LOADING });
    axios.get<IResponse>(`/api/subscription/${id}`).then((res) => {
        dispatch({
            type: GET_SUBSCRIPTION_SUCCESS,
            payload: {subscription:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_SUBSCRIPTION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createSubscription= (data:ISubscriptionCreate) => (dispatch) => {
    dispatch ({ type: CREATE_SUBSCRIPTION_LOADING });
    axios.post<IResponse>('/api/subscription',{...data}).then((res) => {
        dispatch({
            type: CREATE_SUBSCRIPTION_SUCCESS,
            payload: {subscription:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: CREATE_SUBSCRIPTION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateSubscription = (id:string,data:ISubscriptionUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_SUBSCRIPTION_LOADING });
    axios.put<IResponse>(`/api/subscription/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_SUBSCRIPTION_SUCCESS,
            payload: {subscription:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_SUBSCRIPTION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteSubscription = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_SUBSCRIPTION_LOADING });
    axios.delete<IResponse>(`/api/subscription/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_SUBSCRIPTION_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: DELETE_SUBSCRIPTION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}