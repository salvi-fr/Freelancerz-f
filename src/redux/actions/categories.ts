import axios from "lib/http/client";

import {
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_LOADING,
    CREATE_CATEGORY_FAILED,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_LOADING,
    UPDATE_CATEGORY_FAILED,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILED,
    DELETE_CATEGORY_LOADING,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILED,
    GET_CATEGORY_LOADING,
    GET_CATEGORIES_SUCCESS
    , GET_CATEGORIES_FAILED,
    GET_CATEGORIES_LOADING
} from '../reducers/types';
import {ICategoryCreate, ICategoryUpdate,
    IResponsePaging,
    IResponse} from 'types'

export const getCategories = () => (dispatch) => {
    dispatch({ type: GET_CATEGORIES_LOADING });
    axios.get<IResponsePaging>('/api/category').then((res) => {
        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload:{categories:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_CATEGORIES_FAILED, 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const getOpenCategories = () => (dispatch) => {
    dispatch({ type: GET_CATEGORIES_LOADING });
    axios.get<IResponsePaging>('/api/category/open').then((res) => {
        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload:{categories:res.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_CATEGORIES_FAILED, 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
}

export const getCategory = (id:string) => (dispatch) => {
    dispatch ({ type: GET_CATEGORY_LOADING });
    axios.get<IResponse>(`/api/category/${id}`).then((res) => {
        dispatch({
            type: GET_CATEGORY_SUCCESS,
            payload: {category:res.data.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: GET_CATEGORY_FAILED, 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}  })
      });
}


export const createCategory = (data:ICategoryCreate) => (dispatch) => {
    dispatch ({ type: CREATE_CATEGORY_LOADING });
    axios.post<IResponse>('/api/category',{...data}).then((res) => {
        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: {category:res.data},
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: CREATE_CATEGORY_FAILED,
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}  })
      });
}

export const updateCategory  = (id:string,data:ICategoryUpdate) => (dispatch) => {
    dispatch ({ type: UPDATE_CATEGORY_LOADING });
    axios.put<IResponse>(`/api/category/${id}`, { ...data }).then((res) => {
            dispatch({
                type: UPDATE_CATEGORY_SUCCESS,
                payload: {category:res.data},
            })
    
       
    }).catch(function (error) {
        console.log('error',error);
        
        dispatch ({ type: UPDATE_CATEGORY_FAILED, 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}  })
      });
}

export const deleteCategory  = (id:string) => (dispatch) => {
    dispatch ({ type: DELETE_CATEGORY_LOADING });
    axios.delete<IResponse>(`/api/category/${id}`).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: res.data,
        })
    }).catch(function (error) {
        console.log(error);
        dispatch ({ type: DELETE_CATEGORY_FAILED, 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}  })
      });
}