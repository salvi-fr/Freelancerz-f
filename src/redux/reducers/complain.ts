import {
    CREATE_COMPLAIN_SUCCESS,
    CREATE_COMPLAIN_LOADING,
    CREATE_COMPLAIN_FAILED,
    UPDATE_COMPLAIN_SUCCESS,
    UPDATE_COMPLAIN_LOADING,
    UPDATE_COMPLAIN_FAILED,
    DELETE_COMPLAIN_SUCCESS,
    DELETE_COMPLAIN_FAILED,
    DELETE_COMPLAIN_LOADING,
    GET_COMPLAIN_SUCCESS,
    GET_COMPLAIN_FAILED,
    GET_COMPLAIN_LOADING,
    GET_COMPLAINS_SUCCESS
    , GET_COMPLAINS_FAILED,
    GET_COMPLAINS_LOADING
} from './types';
import {IComplain,IResponsePaging} from 'types'
export const InitialComplainState = {
    getComplainloading: false,
    getComplainSuccess: false,
    getComplainFailed: false,
    createComplainloading: false,
    createComplainSuccess: false,
    createComplainFailed: false,
    updateComplainloading: false,
    updateComplainSuccess: false,
    updateComplainFailed: false,
    deleteComplainloading: false,
    deleteComplainSuccess: false,
    deleteComplainFailed: false,
    getComplainsloading: false,
    getComplainsSuccess: false,
    getComplainsFailed: false,
    complains:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    complain: null,
    error: null,

}
export type ComplainState = {
    readonly getComplainloading?: boolean,
    readonly getComplainSuccess?: boolean,
    readonly getComplainFailed?: boolean,
    readonly createComplainloading?: boolean,
    readonly createComplainSuccess?: boolean,
    readonly createComplainFailed?: boolean,
    readonly updateComplainloading?: boolean,
    readonly updateComplainSuccess?: boolean,
    readonly updateComplainFailed?: boolean,
    readonly deleteComplainloading?: boolean,
    readonly deleteComplainSuccess?: boolean,
    readonly deleteComplainFailed?: boolean,
    readonly getComplainsloading?: boolean,
    readonly getComplainsSuccess?: boolean,
    readonly getComplainsFailed?: boolean,
    readonly complains?: IResponsePaging,
    readonly complain?: IComplain,
    readonly error?: string,

}

export type complainActionType = {
    type: string;
    payload: ComplainState
};



export const complainReducer: React.Reducer<ComplainState, complainActionType> = (
    state: ComplainState= InitialComplainState,
    action: complainActionType
) => {
    switch (action.type) {
        case CREATE_COMPLAIN_SUCCESS: {
            return {
                ...state,
                createComplainloading: false,
                createComplainSuccess: true,
                complain: action.payload.complain,
            }
        }
        case CREATE_COMPLAIN_LOADING: {
            return {
                ...state,
                createComplainloading: true,
            }
        }
        case CREATE_COMPLAIN_FAILED: {
            return {
                ...state,
                createComplainloading: false,
                createComplainFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_COMPLAIN_SUCCESS: {
            return {
                ...state,
                updateComplainloading: false,
                updateComplainSuccess: true,
                complain: action.payload.complain
            }
        }
        case UPDATE_COMPLAIN_LOADING: {
            return {
                ...state,
                updateComplainloading: true
            }
        }
        case UPDATE_COMPLAIN_FAILED: {
            return {
                ...state,
                updateComplainloading: false,
                updateComplainFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_COMPLAIN_SUCCESS: {
            return {
                ...state,
                deleteComplainloading: false,
                deleteComplainSuccess: true
            }
        }
        case DELETE_COMPLAIN_FAILED: {
            return {
                ...state,
                deleteComplainloading: false,
                deleteComplainFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_COMPLAIN_LOADING: {
            return {
                ...state,
                deleteComplainloading: true
            }
        }
        case GET_COMPLAIN_SUCCESS: {
            return {
                ...state,
                getComplainloading: false,
                getComplainSuccess: true,
                complain: action.payload.complain
            }
        }
        case GET_COMPLAIN_FAILED: {
            return {
                ...state,
                getComplainloading: false,
                getComplainFailed: true,
                error: action.payload.error
            }
        }
        case GET_COMPLAIN_LOADING: {
            return {
                ...state,
                getComplainloading: true
            }
        }
        case GET_COMPLAINS_SUCCESS: {
            return {
                ...state,
                getComplainsloading: false,
                getComplainsSuccess: true,
                complains: action.payload.complains
            }
        }
        case GET_COMPLAINS_FAILED: {
            return {
                ...state,
                getComplainsloading: false,
                getComplainsFailed: true,
                error: action.payload.error
            }
        }
        case GET_COMPLAINS_LOADING: {
            return {
                ...state,
                getComplainsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};