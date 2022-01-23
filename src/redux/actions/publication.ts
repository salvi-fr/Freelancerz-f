import axios from "lib/http/client";
import {  toast } from 'react-toastify';

import {
    CREATE_PUBLICATION_SUCCESS,
    CREATE_PUBLICATION_LOADING,
    CREATE_PUBLICATION_FAILED,
    UPDATE_PUBLICATION_SUCCESS,
    UPDATE_PUBLICATION_LOADING,
    UPDATE_PUBLICATION_FAILED,
    DELETE_PUBLICATION_SUCCESS,
    DELETE_PUBLICATION_FAILED,
    DELETE_PUBLICATION_LOADING,
    GET_PUBLICATION_SUCCESS,
    GET_PUBLICATION_FAILED,
    GET_PUBLICATION_LOADING,
    GET_PUBLICATIONS_SUCCESS
    , GET_PUBLICATIONS_FAILED,
    GET_PUBLICATIONS_LOADING
} from '../reducers/types';

import {IPublicationCreate, IPublicationUpdate,
    IResponsePaging,
    IResponse} from 'types'
    
export const getPublications = () => (dispatch) => {
    dispatch({ type: GET_PUBLICATIONS_LOADING });
    axios.get<IResponsePaging>('/api/publication/').then((res) => {
        dispatch({
            type: GET_PUBLICATIONS_SUCCESS,
            payload: {publications:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_PUBLICATIONS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getPublication = (id:string) => (dispatch) => {
    dispatch ({ type: GET_PUBLICATION_LOADING });
    axios.get<IResponse>(`/api/publication/${id}`).then((res) => {
        dispatch({
            type: GET_PUBLICATION_SUCCESS,
            payload: {publication:res.data.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_PUBLICATION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createPublication= (data:IPublicationCreate) => (dispatch) => {
    dispatch ({ type: CREATE_PUBLICATION_LOADING });
    axios.post<IResponse>('/api/publication',{...data}).then((res) => {
        dispatch({
            type: CREATE_PUBLICATION_SUCCESS,
            payload: {publication:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: CREATE_PUBLICATION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updatePublication = (id:string,data:IPublicationUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_PUBLICATION_LOADING });
    axios.put<IResponse>(`/api/publication/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_PUBLICATION_SUCCESS,
            payload: {publication:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_PUBLICATION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deletePublication = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_PUBLICATION_LOADING });
    axios.delete<IResponse>(`/api/publication/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_PUBLICATION_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: DELETE_PUBLICATION_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}