import {
    CREATE_APPLICATION_SUCCESS,
    CREATE_APPLICATION_LOADING,
    CREATE_APPLICATION_FAILED,
    UPDATE_APPLICATION_SUCCESS,
    UPDATE_APPLICATION_LOADING,
    UPDATE_APPLICATION_FAILED,
    DELETE_APPLICATION_SUCCESS,
    DELETE_APPLICATION_FAILED,
    DELETE_APPLICATION_LOADING,
    GET_APPLICATION_SUCCESS,
    GET_APPLICATION_FAILED,
    GET_APPLICATION_LOADING,
    GET_APPLICATIONS_SUCCESS
    , GET_APPLICATIONS_FAILED,
    GET_APPLICATIONS_LOADING
} from './types';
import {IApplication,IResponsePaging} from 'types'

export const InitialApplicationState = {
    getApplicationloading: false,
    getApplicationSuccess: false,
    getApplicationFailed: false,
    createApplicationloading: false,
    createApplicationSuccess: false,
    createApplicationFailed: false,
    updateApplicationloading: false,
    updateApplicationSuccess: false,
    updateApplicationFailed: false,
    deleteApplicationloading: false,
    deleteApplicationSuccess: false,
    deleteApplicationFailed: false,
    getApplicationsloading: false,
    getApplicationsSuccess: false,
    getApplicationsFailed: false,
    applications:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    application: null,
    error: null,

}
export type ApplicationState = {
    readonly getApplicationloading?: boolean,
    readonly getApplicationSuccess?: boolean,
    readonly getApplicationFailed?: boolean,
    readonly createApplicationloading?: boolean,
    readonly createApplicationSuccess?: boolean,
    readonly createApplicationFailed?: boolean,
    readonly updateApplicationloading?: boolean,
    readonly updateApplicationSuccess?: boolean,
    readonly updateApplicationFailed?: boolean,
    readonly deleteApplicationloading?: boolean,
    readonly deleteApplicationSuccess?: boolean,
    readonly deleteApplicationFailed?: boolean,
    readonly getApplicationsloading?: boolean,
    readonly getApplicationsSuccess?: boolean,
    readonly getApplicationsFailed?: boolean,
    readonly applications?: IResponsePaging,
    readonly application?: IApplication,
    readonly error?: string,

}


export type applicationActionType = {
    type: string;
    payload: ApplicationState
};



export const applicationReducer: React.Reducer<ApplicationState, applicationActionType> = (
    state: ApplicationState= InitialApplicationState,
    action: applicationActionType
) => {
    switch (action.type) {
        case CREATE_APPLICATION_SUCCESS: {
            return {
                ...state,
                createApplicationloading: false,
                createApplicationSuccess: true,
                application: action.payload.application,
            }
        }
        case CREATE_APPLICATION_LOADING: {
            return {
                ...state,
                createApplicationloading: true,
            }
        }
        case CREATE_APPLICATION_FAILED: {
            return {
                ...state,
                createApplicationloading: false,
                createApplicationFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_APPLICATION_SUCCESS: {
            return {
                ...state,
                updateApplicationloading: false,
                updateApplicationSuccess: true,
                application: action.payload.application
            }
        }
        case UPDATE_APPLICATION_LOADING: {
            return {
                ...state,
                updateApplicationloading: true
            }
        }
        case UPDATE_APPLICATION_FAILED: {
            return {
                ...state,
                updateApplicationloading: false,
                updateApplicationFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_APPLICATION_SUCCESS: {
            return {
                ...state,
                deleteApplicationloading: false,
                deleteApplicationSuccess: true
            }
        }
        case DELETE_APPLICATION_FAILED: {
            return {
                ...state,
                deleteApplicationloading: false,
                deleteApplicationFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_APPLICATION_LOADING: {
            return {
                ...state,
                deleteApplicationloading: true
            }
        }
        case GET_APPLICATION_SUCCESS: {
            return {
                ...state,
                getApplicationloading: false,
                getApplicationSuccess: true,
                application: action.payload.application
            }
        }
        case GET_APPLICATION_FAILED: {
            return {
                ...state,
                getApplicationloading: false,
                getApplicationFailed: true,
                error: action.payload.error
            }
        }
        case GET_APPLICATION_LOADING: {
            return {
                ...state,
                getApplicationloading: true
            }
        }
        case GET_APPLICATIONS_SUCCESS: {
            return {
                ...state,
                getApplicationsloading: false,
                getApplicationsSuccess: true,
                applications: action.payload.applications
            }
        }
        case GET_APPLICATIONS_FAILED: {
            return {
                ...state,
                getApplicationsloading: false,
                getApplicationsFailed: true,
                error: action.payload.error
            }
        }
        case GET_APPLICATIONS_LOADING: {
            return {
                ...state,
                getApplicationsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};