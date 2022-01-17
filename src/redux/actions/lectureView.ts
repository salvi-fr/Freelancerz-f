import axios from "lib/http/client";

import {
    CREATE_LECTURE_VIEW_SUCCESS,
    CREATE_LECTURE_VIEW_LOADING,
    CREATE_LECTURE_VIEW_FAILED,
    UPDATE_LECTURE_VIEW_SUCCESS,
    UPDATE_LECTURE_VIEW_LOADING,
    UPDATE_LECTURE_VIEW_FAILED,
    DELETE_LECTURE_VIEW_SUCCESS,
    DELETE_LECTURE_VIEW_FAILED,
    DELETE_LECTURE_VIEW_LOADING,
    GET_LECTURE_VIEW_SUCCESS,
    GET_LECTURE_VIEW_FAILED,
    GET_LECTURE_VIEW_LOADING,
    GET_LECTURE_VIEWS_SUCCESS
    , GET_LECTURE_VIEWS_FAILED,
    GET_LECTURE_VIEWS_LOADING
} from '../reducers/types';

import {ILectureViewCreate, ILectureViewUpdate,
    IResponsePaging,
    IResponse,
    ILectureView} from 'types'
export const getLectureViews = () => (dispatch) => {
    dispatch({ type: GET_LECTURE_VIEWS_LOADING });
    axios.get<IResponsePaging>('/api/lectureview/').then((res) => {
        dispatch({
            type: GET_LECTURE_VIEWS_SUCCESS,
            payload: {lectures:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_LECTURE_VIEWS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getLectureView = (id:string) => (dispatch) => {
    dispatch ({ type: GET_LECTURE_VIEW_LOADING });
    axios.get<IResponse>(`/api/lectureview/${id}`).then((res) => {
        dispatch({
            type: GET_LECTURE_VIEW_SUCCESS,
            payload: {lectureView:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_LECTURE_VIEW_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const setLectureView = (lectureView:ILectureView) => (dispatch) => {
    if (lectureView){
        dispatch({
            type: GET_LECTURE_VIEW_SUCCESS,
            payload: {lectureView:lectureView},
        })
    }
}


export const createLectureView= (data:ILectureViewCreate) => (dispatch) => {
    dispatch ({ type: CREATE_LECTURE_VIEW_LOADING });
    axios.post<IResponse>('/api/lectureview',{...data}).then((res) => {
        dispatch({
            type: CREATE_LECTURE_VIEW_SUCCESS,
            payload: {lectureView:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_LECTURE_VIEW_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateLectureView = (id:string,data:ILectureViewUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_LECTURE_VIEW_LOADING });
    axios.put<IResponse>(`/api/lectureview/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_LECTURE_VIEW_SUCCESS,
            payload: {lectureView:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: UPDATE_LECTURE_VIEW_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteLectureView = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_LECTURE_VIEW_LOADING });
    axios.delete<IResponse>(`/api/lectureview/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_LECTURE_VIEW_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_LECTURE_VIEW_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}