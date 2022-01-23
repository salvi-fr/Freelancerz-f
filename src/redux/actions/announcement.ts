import axios from "lib/http/client";
import {  toast } from 'react-toastify';

import {
    CREATE_ANNOUNCEMENT_SUCCESS,
    CREATE_ANNOUNCEMENT_LOADING,
    CREATE_ANNOUNCEMENT_FAILED,
    UPDATE_ANNOUNCEMENT_SUCCESS,
    UPDATE_ANNOUNCEMENT_LOADING,
    UPDATE_ANNOUNCEMENT_FAILED,
    DELETE_ANNOUNCEMENT_SUCCESS,
    DELETE_ANNOUNCEMENT_FAILED,
    DELETE_ANNOUNCEMENT_LOADING,
    GET_ANNOUNCEMENT_SUCCESS,
    GET_ANNOUNCEMENT_FAILED,
    GET_ANNOUNCEMENT_LOADING,
    GET_ANNOUNCEMENTS_SUCCESS
    , GET_ANNOUNCEMENTS_FAILED,
    GET_ANNOUNCEMENTS_LOADING
} from '../reducers/types';
import {IAnnouncementCreate, IAnnouncementUpdate,
    IResponsePaging,
    IResponse} from 'types'


export const getAnnouncements = () => (dispatch) => {
    dispatch({ type: GET_ANNOUNCEMENTS_LOADING });
    axios.get<IResponsePaging>('/api/announcement/').then((res) => {
        dispatch({
            type: GET_ANNOUNCEMENTS_SUCCESS,
             payload: {data:res.data.data,
                totalData:res.data.totalData,
                totalPage:res.data.totalPage,
               currentPage:res.data.currentPage,
               perPage:res.data.perPage},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_ANNOUNCEMENTS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getMyAnnouncements = () => (dispatch) => {
    dispatch({ type: GET_ANNOUNCEMENTS_LOADING });
    axios.get<IResponsePaging>('/api/announcement/').then((res) => {
        dispatch({
            type: GET_ANNOUNCEMENTS_SUCCESS,
            payload: {announcements:res.data}
        })
    }).catch(function (error) {
        dispatch ({ type: GET_ANNOUNCEMENTS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getAnnouncement = (id:string) => (dispatch) => {
    dispatch ({ type: GET_ANNOUNCEMENT_LOADING });
    axios.get<IResponse>(`/api/announcement/${id}`).then((res) => {
        dispatch({
            type: GET_ANNOUNCEMENT_SUCCESS,
            payload: {announcement:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: GET_ANNOUNCEMENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createAnnouncement= (data:IAnnouncementCreate) => (dispatch) => {
    dispatch ({ type: CREATE_ANNOUNCEMENT_LOADING });
    axios.post<IResponse>('/api/announcement/create',{...data}).then((res) => {
        dispatch({
            type: CREATE_ANNOUNCEMENT_SUCCESS,
            payload: {announcement:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: CREATE_ANNOUNCEMENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateAnnouncement = (id:string,data:IAnnouncementUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_ANNOUNCEMENT_LOADING });
    axios.put<IResponse>(`/api/announcement/update/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_ANNOUNCEMENT_SUCCESS,
            payload: {announcement:res.data},
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: UPDATE_ANNOUNCEMENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteAnnouncement = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_ANNOUNCEMENT_LOADING });
    axios.delete<IResponse>(`/api/announcement/delete/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_ANNOUNCEMENT_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
          console.log(error);
        const er= error?.response?.data?.message? error.response.data.message: "Error Accured with the request";
        toast.error(er, {
            icon: "🚀"
          });
        dispatch ({ type: DELETE_ANNOUNCEMENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}