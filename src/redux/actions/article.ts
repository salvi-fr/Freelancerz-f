import axios from "lib/http/client";
import {  toast } from 'react-toastify';

import {
    CREATE_ARTICLE_SUCCESS,
    CREATE_ARTICLE_LOADING,
    CREATE_ARTICLE_FAILED,
    UPDATE_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_LOADING,
    UPDATE_ARTICLE_FAILED,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_FAILED,
    DELETE_ARTICLE_LOADING,
    GET_ARTICLE_SUCCESS,
    GET_ARTICLE_FAILED,
    GET_ARTICLE_LOADING,
    GET_ARTICLES_SUCCESS
    , GET_ARTICLES_FAILED,
    GET_ARTICLES_LOADING
} from '../reducers/types';
import {IArticleCreate, IArticleUpdate,
    IResponsePaging,
    IResponse} from 'types'

export const getArticles = () => (dispatch) => {
    dispatch({ type: GET_ARTICLES_LOADING });
    axios.get<IResponsePaging>('/api/article/').then((res) => {
        dispatch({
            type: GET_ARTICLES_SUCCESS,
            payload: {articles:res.data}
        })
    }).catch(function (error) {
        console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_ARTICLES_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const getArticle = (id:string) => (dispatch) => {
    dispatch ({ type: GET_ARTICLE_LOADING });
    axios.get<IResponse>(`/api/article/${id}`).then((res) => {
        dispatch({
            type: GET_ARTICLE_SUCCESS,
            payload: {article:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_ARTICLE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const getMyArticle = () => (dispatch) => {
    dispatch({ type: GET_ARTICLES_LOADING });
    axios.get<IResponsePaging>('/api/article/me').then((res) => {
        dispatch({
            type: GET_ARTICLES_SUCCESS,
            payload: {articles:res.data}
        })
    }).catch(function (error) {
        console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_ARTICLES_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}


export const createArticle= (data:IArticleCreate) => (dispatch) => {
    dispatch ({ type: CREATE_ARTICLE_LOADING });
    axios.post<IResponse>('/api/article',{...data}).then((res) => {
        dispatch({
            type: CREATE_ARTICLE_SUCCESS,
            payload: {article:res.data},
        })
    }).catch(function (error) {
         console.log(error);
         console.log(error);
         const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
         toast.error(er, {
             icon: "🚀"
           });
        dispatch ({ type: CREATE_ARTICLE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const updateArticle = (id:string,data:IArticleUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_ARTICLE_LOADING });
    axios.put<IResponse>(`/api/article/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_ARTICLE_SUCCESS,
            payload: {article:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_ARTICLE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const deleteArticle = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_ARTICLE_LOADING });
    axios.delete<IResponse>(`/api/article/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_ARTICLE_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: DELETE_ARTICLE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}