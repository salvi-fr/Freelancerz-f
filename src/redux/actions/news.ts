import axios from "lib/http/client";

import {
    CREATE_NEWS_SUCCESS,
    CREATE_NEWS_LOADING,
    CREATE_NEWS_FAILED,
    UPDATE_NEWS_SUCCESS,
    UPDATE_NEWS_LOADING,
    UPDATE_NEWS_FAILED,
    DELETE_NEWS_SUCCESS,
    DELETE_NEWS_FAILED,
    DELETE_NEWS_LOADING,
    GET_NEWS_SUCCESS,
    GET_NEWS_FAILED,
    GET_NEWS_LOADING,
    GET_NEWSES_SUCCESS
    , GET_NEWSES_FAILED,
    GET_NEWSES_LOADING
} from '../reducers/types';

import {INewsCreate, INewsUpdate,
    IResponsePaging,
    IResponse} from 'types'

export const getNewses = () => (dispatch) => {
    dispatch({ type: GET_NEWSES_LOADING });
    axios.get<IResponsePaging>('/api/news/').then((res) => {
        dispatch({
            type: GET_NEWSES_SUCCESS,
            payload: {news:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_NEWSES_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getNews = (id:string) => (dispatch) => {
    dispatch ({ type: GET_NEWS_LOADING });
    axios.get<IResponse>(`/api/news/${id}`).then((res) => {
        dispatch({
            type: GET_NEWS_SUCCESS,
            payload: {news:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_NEWS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createNews= (data:INewsCreate) => (dispatch) => {
    dispatch ({ type: CREATE_NEWS_LOADING });
    axios.post<IResponse>('/api/news',{...data}).then((res) => {
        dispatch({
            type: CREATE_NEWS_SUCCESS,
            payload: {news:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_NEWS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateNews = (id:string,data:INewsUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_NEWS_LOADING });
    axios.put<IResponse>(`/api/news/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_NEWS_SUCCESS,
            payload: {news:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: UPDATE_NEWS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteNews = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_NEWS_LOADING });
    axios.delete<IResponse>(`/api/news/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_NEWS_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_NEWS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}