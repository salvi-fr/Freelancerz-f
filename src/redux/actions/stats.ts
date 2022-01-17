import axios from "lib/http/client";

import {
    GET_STATS_SUCCESS
    , GET_STATS_FAILED,
    GET_STATS_LOADING
} from '../reducers/types';
import {
    IResponse} from 'types'

export const getStats = () => (dispatch) => {
    dispatch({ type: GET_STATS_LOADING });
    axios.get<IResponse>('/api/stats/all').then((res) => {
        dispatch({
            type: GET_STATS_SUCCESS,
            payload: {stats:res.data.data},
        })
    }).catch(function (error) {
        dispatch ({ type: GET_STATS_FAILED,  payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"}})
      });
}

