import axios from "lib/http/client";

import {
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_LOADING,
    CREATE_EVENT_FAILED,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_LOADING,
    UPDATE_EVENT_FAILED,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAILED,
    DELETE_EVENT_LOADING,
    GET_EVENT_SUCCESS,
    GET_EVENT_FAILED,
    GET_EVENT_LOADING,
    GET_EVENTS_SUCCESS
    , GET_EVENTS_FAILED,
    GET_EVENTS_LOADING
} from '../reducers/types';

import {IEventCreate, IEventUpdate,
    IResponsePaging,
    IResponse} from 'types'


export const getEvents = () => (dispatch) => {
    dispatch({ type: GET_EVENTS_LOADING });
    axios.get<IResponsePaging>('/api/event/').then((res) => {
        dispatch({
            type: GET_EVENTS_SUCCESS,
            payload: {events:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_EVENTS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getEvent = (id:string) => (dispatch) => {
    dispatch ({ type: GET_EVENT_LOADING });
    axios.get<IResponse>(`/api/event/${id}`).then((res) => {
        dispatch({
            type: GET_EVENT_SUCCESS,
            payload: {event:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_EVENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}


export const createEvent= (data:IEventCreate) => (dispatch) => {
    dispatch ({ type: CREATE_EVENT_LOADING });
    axios.post<IResponse>('/api/event',{...data}).then((res) => {
        dispatch({
            type: CREATE_EVENT_SUCCESS,
            payload: {event:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_EVENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const updateEvent = (id:string,data:IEventUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_EVENT_LOADING });
    axios.put<IResponse>(`/api/event/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_EVENT_SUCCESS,
            payload: {event:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: UPDATE_EVENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const deleteEvent = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_EVENT_LOADING });
    axios.delete<IResponse>(`/api/event/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_EVENT_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_EVENT_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}