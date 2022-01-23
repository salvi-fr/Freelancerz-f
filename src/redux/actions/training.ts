import axios from "lib/http/client";
import {  toast } from 'react-toastify';

import {
    CREATE_TRAINING_SUCCESS,
    CREATE_TRAINING_LOADING,
    CREATE_TRAINING_FAILED,
    UPDATE_TRAINING_SUCCESS,
    UPDATE_TRAINING_LOADING,
    UPDATE_TRAINING_FAILED,
    DELETE_TRAINING_SUCCESS,
    DELETE_TRAINING_FAILED,
    DELETE_TRAINING_LOADING,
    GET_TRAINING_SUCCESS,
    GET_TRAINING_FAILED,
    GET_TRAINING_LOADING,
    GET_TRAININGS_SUCCESS
    , GET_TRAININGS_FAILED,
    GET_TRAININGS_LOADING
} from '../reducers/types';

import {ITrainingCreate, ITrainingUpdate,
    IResponsePaging,
    IResponse} from 'types'

export const getTrainings = () => (dispatch) => {
    dispatch({ type: GET_TRAININGS_LOADING });
    axios.get<IResponsePaging>('/api/training/').then((res) => {
        dispatch({
            type: GET_TRAININGS_SUCCESS,
            payload: {trainings:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_TRAININGS_FAILED, 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}
        })
      });
}
export const getOpenTrainings = () => (dispatch) => {
    dispatch({ type: GET_TRAININGS_LOADING });
    axios.get<IResponsePaging>('/api/training/open').then((res) => {
        dispatch({
            type: GET_TRAININGS_SUCCESS,
            payload: {trainings:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_TRAININGS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getTraining = (id:string) => (dispatch) => {
    dispatch ({ type: GET_TRAINING_LOADING });
    axios.get<IResponse>(`/api/training/${id}`).then((res) => {
        dispatch({
            type: GET_TRAINING_SUCCESS,
            payload: {training:res.data.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_TRAINING_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createTraining= (data:ITrainingCreate) => (dispatch) => {
    dispatch ({ type: CREATE_TRAINING_LOADING });
    axios.post<IResponse>('/api/training',{...data}).then((res) => {
        dispatch({
            type: CREATE_TRAINING_SUCCESS,
            payload: {training:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: CREATE_TRAINING_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const updateTraining = (id:string,data:ITrainingUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_TRAINING_LOADING });
    axios.put<IResponse>(`/api/training/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_TRAINING_SUCCESS,
            payload: {training:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_TRAINING_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const deleteTraining = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_TRAINING_LOADING });
    axios.delete<IResponse>(`/api/training/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_TRAINING_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: DELETE_TRAINING_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}