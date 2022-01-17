import axios from "lib/http/client";

import {
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_LOADING,
    CREATE_COURSE_FAILED,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_LOADING,
    UPDATE_COURSE_FAILED,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAILED,
    DELETE_COURSE_LOADING,
    GET_COURSE_SUCCESS,
    GET_COURSE_FAILED,
    GET_COURSE_LOADING,
    GET_COURSES_SUCCESS
    , GET_COURSES_FAILED,
    GET_COURSES_LOADING
} from '../reducers/types';

import {ICourseCreate, ICourseUpdate,
    IResponsePaging,
    IResponse,
    ICourse} from 'types'

export const getCourses = () => (dispatch) => {
    dispatch({ type: GET_COURSES_LOADING });
    axios.get<IResponsePaging>('/api/course/').then((res) => {
        dispatch({
            type: GET_COURSES_SUCCESS,
            payload: {courses:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_COURSES_FAILED, 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}
        })
      });
}
export const getOpenCourses = () => (dispatch) => {
    dispatch({ type: GET_COURSES_LOADING });
    axios.get<IResponsePaging>('/api/course/open').then((res) => {
        dispatch({
            type: GET_COURSES_SUCCESS,
            payload: {courses:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_COURSES_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const getCourse = (id:string) => (dispatch) => {
    dispatch ({ type: GET_COURSE_LOADING });
    axios.get<IResponse>(`/api/course/${id}`).then((res) => {
        dispatch({
            type: GET_COURSE_SUCCESS,
            payload: {course:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_COURSE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

export const setCourse = (course:ICourse) => (dispatch) => {
if(course){
    dispatch({
        type: GET_COURSE_SUCCESS,
        payload: {course:course},
    })

}
        
   
}


export const createCourse= (data:ICourseCreate) => (dispatch) => {
    dispatch ({ type: CREATE_COURSE_LOADING });
    axios.post<IResponse>('/api/course',{...data}).then((res) => {
        dispatch({
            type: CREATE_COURSE_SUCCESS,
            payload: {course:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_COURSE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const updateCourse = (id:string,data:ICourseUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_COURSE_LOADING });
    axios.put<IResponse>(`/api/course/${id}`, { ...data }).then((res) => {
        dispatch({
            type: UPDATE_COURSE_SUCCESS,
            payload: {course:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: UPDATE_COURSE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const deleteCourse = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_COURSE_LOADING });
    axios.delete<IResponse>(`/api/course/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_COURSE_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_COURSE_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}