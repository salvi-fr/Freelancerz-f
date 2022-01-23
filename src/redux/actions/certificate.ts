import axios from "lib/http/client";
import {  toast } from 'react-toastify';

import {
    CREATE_CERTIFICATE_SUCCESS,
    CREATE_CERTIFICATE_LOADING,
    CREATE_CERTIFICATE_FAILED,
    UPDATE_CERTIFICATE_SUCCESS,
    UPDATE_CERTIFICATE_LOADING,
    UPDATE_CERTIFICATE_FAILED,
    DELETE_CERTIFICATE_SUCCESS,
    DELETE_CERTIFICATE_FAILED,
    DELETE_CERTIFICATE_LOADING,
    GET_CERTIFICATE_SUCCESS,
    GET_CERTIFICATE_FAILED,
    GET_CERTIFICATE_LOADING,
    GET_CERTIFICATES_SUCCESS
    , GET_CERTIFICATES_FAILED,
    GET_CERTIFICATES_LOADING
} from '../reducers/types';
import {ICertificateCreate, ICertificateUpdate,
    IResponsePaging,
    IResponse} from 'types'

export const getCertificates = () => (dispatch) => {
    dispatch({ type: GET_CERTIFICATES_LOADING });
    axios.get<IResponsePaging>('/api/certificate/').then((res) => {
        dispatch({
            type: GET_CERTIFICATES_SUCCESS,
            payload: {certificates:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_CERTIFICATES_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getCertificate = (id:string) => (dispatch) => {
    dispatch ({ type: GET_CERTIFICATE_LOADING });
    axios.get<IResponse>(`/api/certificate/${id}`).then((res) => {
        dispatch({
            type: GET_CERTIFICATE_SUCCESS,
            payload: {certificate:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_CERTIFICATE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createCertificate= (data:ICertificateCreate) => (dispatch) => {
    dispatch ({ type: CREATE_CERTIFICATE_LOADING });
    axios.post<IResponse>('/api/certificate',{...data}).then((res) => {
        dispatch({
            type: CREATE_CERTIFICATE_SUCCESS,
            payload: {certificate:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: CREATE_CERTIFICATE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateCertificate = (id:string,data:ICertificateUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_CERTIFICATE_LOADING });
    axios.put<IResponse>(`/api/certificate/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_CERTIFICATE_SUCCESS,
            payload: {certificate:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_CERTIFICATE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteCertificate = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_CERTIFICATE_LOADING });
    axios.delete<IResponse>(`/api/certificate/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_CERTIFICATE_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: DELETE_CERTIFICATE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}