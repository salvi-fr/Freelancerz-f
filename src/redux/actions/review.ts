import axios from "lib/http/client";

import {
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_LOADING,
    CREATE_REVIEW_FAILED,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_LOADING,
    UPDATE_REVIEW_FAILED,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAILED,
    DELETE_REVIEW_LOADING,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAILED,
    GET_REVIEW_LOADING,
    GET_REVIEWS_SUCCESS
    , GET_REVIEWS_FAILED,
    GET_REVIEWS_LOADING
} from '../reducers/types';
import {IReviewCreate, IReviewUpdate,
    IResponsePaging,
    IResponse} from 'types'
export const getReviews = () => (dispatch) => {
    dispatch({ type: GET_REVIEWS_LOADING });
    axios.get<IResponsePaging>('/api/review/').then((res) => {
        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: {reviews:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_REVIEWS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getReview = (id:string) => (dispatch) => {
    dispatch ({ type: GET_REVIEW_LOADING });
    axios.get<IResponse>(`/api/review/${id}`).then((res) => {
        dispatch({
            type: GET_REVIEW_SUCCESS,
            payload: {review:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_REVIEW_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createReview= (data:IReviewCreate) => (dispatch) => {
    dispatch ({ type: CREATE_REVIEW_LOADING });
    axios.post<IResponse>('/api/review',{...data}).then((res) => {
        dispatch({
            type: CREATE_REVIEW_SUCCESS,
            payload: {review:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_REVIEW_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateReview = (id:string,data:IReviewUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_REVIEW_LOADING });
    axios.put<IResponse>(`/api/review/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_REVIEW_SUCCESS,
            payload: {review:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: UPDATE_REVIEW_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteReview = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_REVIEW_LOADING });
    axios.delete<IResponse>(`/api/review/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_REVIEW_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}