import axios from "lib/http/client";
import {  toast } from 'react-toastify';

import {
    CREATE_JOB_SUCCESS,
    CREATE_JOB_LOADING,
    CREATE_JOB_FAILED,
    UPDATE_JOB_SUCCESS,
    UPDATE_JOB_LOADING,
    UPDATE_JOB_FAILED,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_FAILED,
    DELETE_JOB_LOADING,
    GET_JOB_SUCCESS,
    GET_JOB_FAILED,
    GET_JOB_LOADING,
    GET_JOBS_SUCCESS
    , GET_JOBS_FAILED,
    GET_JOBS_LOADING
} from '../reducers/types';

import {IJobCreate, IJobUpdate,
    IResponsePaging,
    IResponse,
    IJob} from 'types'

export const getJobs = (status:string) => (dispatch) => {
    dispatch({ type: GET_JOBS_LOADING });
    axios.get<IResponsePaging>(`/api/jobs?status=${status}`).then((res) => {
        dispatch({
            type: GET_JOBS_SUCCESS,
            payload: {jobs:res},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_JOBS_FAILED, 
            payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"}
        })
      });
}

export const getJob = (id:string) => (dispatch) => {
    dispatch ({ type: GET_JOB_LOADING });
    axios.post<IResponse>(`/api/job/view`,{id}).then((res) => {
        dispatch({
            type: GET_JOB_SUCCESS,
            payload: {job:res.data},
        })
    }).catch(function (error) {
          console.log(error.response);
        const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_JOB_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"}})
      });
}



export const createJob= (data:IJobCreate) => (dispatch) => {
    dispatch ({ type: CREATE_JOB_LOADING });
    axios.post<IResponse>('/api/jobs',{...data}).then((res) => {
        dispatch({
            type: CREATE_JOB_SUCCESS,
            payload: {job:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: CREATE_JOB_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"} })
      });
}

export const updateJob = (data:IJobUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_JOB_LOADING });
    axios.put<IResponse>(`/api/job/edit`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_JOB_SUCCESS,
            payload: {job:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_JOB_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"} })
      });
}

export const updateJobStatus = (id:string,status:string) => (dispatch) => {
    dispatch ({ type: UPDATE_JOB_LOADING });
    axios.put<IResponse>(`/api/job?status=${status}`, { id}).then((res) => {
        dispatch({
            type: UPDATE_JOB_SUCCESS,
            payload: {job:res.data.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_JOB_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"} })
      });
}
export const deleteJob = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_JOB_LOADING });
    axios.delete<IResponse>(`/api/job`,{data:{id:id}}).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_JOB_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.error? error.response.data.error: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: DELETE_JOB_FAILED,  payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request"} })
      });
}