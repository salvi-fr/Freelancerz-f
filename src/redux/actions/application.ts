import axios from "lib/http/client";
import {  toast } from 'react-toastify';

import {
    CREATE_APPLICATION_SUCCESS,
    CREATE_APPLICATION_LOADING,
    CREATE_APPLICATION_FAILED,
    UPDATE_APPLICATION_SUCCESS,
    UPDATE_APPLICATION_LOADING,
    UPDATE_APPLICATION_FAILED,
    DELETE_APPLICATION_SUCCESS,
    DELETE_APPLICATION_FAILED,
    DELETE_APPLICATION_LOADING,
    GET_APPLICATION_SUCCESS,
    GET_APPLICATION_FAILED,
    GET_APPLICATION_LOADING,
    GET_APPLICATIONS_SUCCESS
    , GET_APPLICATIONS_FAILED,
    GET_APPLICATIONS_LOADING
} from '../reducers/types';
import {IApplicationCreate, IApplicationUpdate,
    IResponsePaging,
    IResponse} from 'types'

export const getApplications = (id:string) => (dispatch) => {
    dispatch({ type: GET_APPLICATIONS_LOADING });
    axios.post<IResponsePaging>('/api/job/applications/',{id:id}).then((res) => {
        console.log("got applcications",res)
        dispatch({
            type: GET_APPLICATIONS_SUCCESS,
            payload: {applications:res}
        })
    }).catch(function (error) {
        console.log(error);
        const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_APPLICATIONS_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"} })
      });
}

export const getApplication = (id:string) => (dispatch) => {
    dispatch ({ type: GET_APPLICATION_LOADING });
    axios.get<IResponse>(`/api/job/application`,{data:{id:id}}).then((res) => {
        dispatch({
            type: GET_APPLICATION_SUCCESS,
            payload: {application:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        console.log(error);
        const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_APPLICATION_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"} })
      });
}

export const getMyApplication = () => (dispatch) => {
    dispatch({ type: GET_APPLICATIONS_LOADING });
    axios.get<IResponsePaging>('/api/job/apply/me').then((res) => {
        dispatch({
            type: GET_APPLICATIONS_SUCCESS,
            payload: {applications:res.data}
        })
    }).catch(function (error) {
        console.log(error);
        const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_APPLICATIONS_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"} })
      });
}


export const createApplication= (data:IApplicationCreate) => (dispatch) => {
    dispatch ({ type: CREATE_APPLICATION_LOADING });
    axios.post<IResponse>('/api/job/apply',{...data}).then((res) => {
        dispatch({
            type: CREATE_APPLICATION_SUCCESS,
            payload: {application:res.data},
        })
    }).catch(function (error) {
         console.log(error);
         console.log(error);
         const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
         toast.error(er, {
             icon: "🚀"
           });
        dispatch ({ type: CREATE_APPLICATION_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"} })
      });
}

export const updateApplication = (id:string,data:IApplicationUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_APPLICATION_LOADING });
    axios.put<IResponse>(`/api/job/apply/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_APPLICATION_SUCCESS,
            payload: {application:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_APPLICATION_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"} })
      });
}
export const approveApplication = (id:string) => (dispatch) => {
    dispatch ({ type: UPDATE_APPLICATION_LOADING });
    axios.put<IResponse>(`/api/job/apply/approve`, { id:id}).then((res) => {
        dispatch({
            type: UPDATE_APPLICATION_SUCCESS,
            payload: {application:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_APPLICATION_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"} })
      });
}

export const deleteApplication = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_APPLICATION_LOADING });
    axios.delete<IResponse>(`/api/job/apply/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_APPLICATION_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: DELETE_APPLICATION_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"} })
      });
}