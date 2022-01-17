import axios from "lib/http/client";

import {
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_LOADING,
    CREATE_QUIZ_FAILED,
    UPDATE_QUIZ_SUCCESS,
    UPDATE_QUIZ_LOADING,
    UPDATE_QUIZ_FAILED,
    DELETE_QUIZ_SUCCESS,
    DELETE_QUIZ_FAILED,
    DELETE_QUIZ_LOADING,
    GET_QUIZ_SUCCESS,
    GET_QUIZ_FAILED,
    GET_QUIZ_LOADING,
    GET_QUIZES_SUCCESS
    , GET_QUIZES_FAILED,
    GET_QUIZES_LOADING
} from '../reducers/types';
import {IQuizCreate, IQuizUpdate,
    IResponsePaging,
    IResponse} from 'types'
export const getQuizes = () => (dispatch) => {
    dispatch({ type: GET_QUIZES_LOADING });
    axios.get<IResponsePaging>('/api/quiz/').then((res) => {
        dispatch({
            type: GET_QUIZES_SUCCESS,
            payload: {quizes:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_QUIZES_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getQuiz = (id:string) => (dispatch) => {
    dispatch ({ type: GET_QUIZ_LOADING });
    axios.get<IResponse>(`/api/quiz/${id}`).then((res) => {
        dispatch({
            type: GET_QUIZ_SUCCESS,
            payload: {quiz:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_QUIZ_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createQuiz= (data:IQuizCreate) => (dispatch) => {
    console.log('before dispaching ',data)
    dispatch ({ type: CREATE_QUIZ_LOADING });
    axios.post<IResponse>('/api/quiz',{...data}).then((res) => {
        dispatch({
            type: CREATE_QUIZ_SUCCESS,
            payload: {quiz:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_QUIZ_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateQuiz = (id:string,data:IQuizUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_QUIZ_LOADING });
    axios.put<IResponse>(`/api/quiz/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_QUIZ_SUCCESS,
            payload: {quiz:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: UPDATE_QUIZ_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteQuiz = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_QUIZ_LOADING });
    axios.delete<IResponse>(`/api/quiz/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_QUIZ_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_QUIZ_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}