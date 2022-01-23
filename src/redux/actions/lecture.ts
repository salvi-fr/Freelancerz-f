import axios from "lib/http/client";
import {  toast } from 'react-toastify';

import {
    CREATE_LECTURE_SUCCESS,
    CREATE_LECTURE_LOADING,
    CREATE_LECTURE_FAILED,
    UPDATE_LECTURE_SUCCESS,
    UPDATE_LECTURE_LOADING,
    UPDATE_LECTURE_FAILED,
    DELETE_LECTURE_SUCCESS,
    DELETE_LECTURE_FAILED,
    DELETE_LECTURE_LOADING,
    GET_LECTURE_SUCCESS,
    GET_LECTURE_FAILED,
    GET_LECTURE_LOADING,
    GET_LECTURES_SUCCESS
    , GET_LECTURES_FAILED,
    GET_LECTURES_LOADING
} from '../reducers/types';

import {ILectureCreate, ILectureUpdate,
    IResponsePaging,
    IResponse,
    ILecture} from 'types'
export const getLectures = () => (dispatch) => {
    dispatch({ type: GET_LECTURES_LOADING });
    axios.get<IResponsePaging>('/api/lecture/').then((res) => {
        dispatch({
            type: GET_LECTURES_SUCCESS,
            payload: {lectures:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_LECTURES_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getLecture = (id:string) => (dispatch) => {
    dispatch ({ type: GET_LECTURE_LOADING });
    axios.get<IResponse>(`/api/lecture/${id}`).then((res) => {
        dispatch({
            type: GET_LECTURE_SUCCESS,
            payload: {lecture:res.data.data},
        })
    }).catch(function (error) {
            console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_LECTURE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const setLecture = (lecture:ILecture) => (dispatch) => {
    if (lecture){
        dispatch({
            type: GET_LECTURE_SUCCESS,
            payload: {lecture:lecture},
        })
    }
}


export const createLecture= (data:ILectureCreate) => (dispatch) => {
    dispatch ({ type: CREATE_LECTURE_LOADING });
    axios.post<IResponse>('/api/lecture',{...data}).then((res) => {
        dispatch({
            type: CREATE_LECTURE_SUCCESS,
            payload: {lecture:res.data},
        })
    }).catch(function (error) {
            console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: CREATE_LECTURE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateLecture = (id:string,data:ILectureUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_LECTURE_LOADING });
    axios.put<IResponse>(`/api/lecture/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_LECTURE_SUCCESS,
            payload: {lecture:res.data},
        })
    }).catch(function (error) {
            console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_LECTURE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteLecture = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_LECTURE_LOADING });
    axios.delete<IResponse>(`/api/lecture/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_LECTURE_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
            console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: DELETE_LECTURE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}