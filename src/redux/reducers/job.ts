import {
    CREATE_JOB_SUCCESS,
    CREATE_JOB_LOADING,
    CREATE_JOB_FAILED,
    UPDATE_JOB_SUCCESS,
    UPDATE_JOB_LOADING,
    UPDATE_JOB_FAILED,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_FAILED,
    DELETE_JOB_LOADING,
    GET_JOB_SUCCESS,
    GET_JOB_FAILED,
    GET_JOB_LOADING,
    GET_JOBS_SUCCESS
    , GET_JOBS_FAILED,
    GET_JOBS_LOADING
} from './types';
import {IJob,IResponsePaging} from 'types'
export const InitialJobState = {
    getJobloading: false,
    getJobSuccess: false,
    getJobFailed: false,
    createJobloading: false,
    createJobSuccess: false,
    createJobFailed: false,
    updateJobloading: false,
    updateJobSuccess: false,
    updateJobFailed: false,
    deleteJobloading: false,
    deleteJobSuccess: false,
    deleteJobFailed: false,
    getJobsloading: false,
    getJobsSuccess: false,
    getJobsFailed: false,
    jobs:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    job: null,
    error: null,

}
export type JobState = {
    readonly getJobloading?: boolean,
    readonly getJobSuccess?: boolean,
    readonly getJobFailed?: boolean,
    readonly createJobloading?: boolean,
    readonly createJobSuccess?: boolean,
    readonly createJobFailed?: boolean,
    readonly updateJobloading?: boolean,
    readonly updateJobSuccess?: boolean,
    readonly updateJobFailed?: boolean,
    readonly deleteJobloading?: boolean,
    readonly deleteJobSuccess?: boolean,
    readonly deleteJobFailed?: boolean,
    readonly getJobsloading?: boolean,
    readonly getJobsSuccess?: boolean,
    readonly getJobsFailed?: boolean,
    readonly jobs?: IResponsePaging,
    readonly job?: IJob,
    readonly error?: string,

}

export type jobActionType = {
    type: string;
    payload: JobState
};



export const jobReducer: React.Reducer<JobState, jobActionType> = (
    state: JobState= InitialJobState,
    action: jobActionType
) => {
    switch (action.type) {
        case CREATE_JOB_SUCCESS: {
            return {
                ...state,
                createJobloading: false,
                createJobSuccess: true,
                job: action.payload.job,
            }
        }
        case CREATE_JOB_LOADING: {
            return {
                ...state,
                createJobloading: true,
            }
        }
        case CREATE_JOB_FAILED: {
            return {
                ...state,
                createJobloading: false,
                createJobFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_JOB_SUCCESS: {
            return {
                ...state,
                updateJobloading: false,
                updateJobSuccess: true,
                job: action.payload.job
            }
        }
        case UPDATE_JOB_LOADING: {
            return {
                ...state,
                updateJobloading: true
            }
        }
        case UPDATE_JOB_FAILED: {
            return {
                ...state,
                updateJobloading: false,
                updateJobFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_JOB_SUCCESS: {
            return {
                ...state,
                deleteJobloading: false,
                deleteJobSuccess: true
            }
        }
        case DELETE_JOB_FAILED: {
            return {
                ...state,
                deleteJobloading: false,
                deleteJobFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_JOB_LOADING: {
            return {
                ...state,
                deleteJobloading: true
            }
        }
        case GET_JOB_SUCCESS: {
            return {
                ...state,
                getJobloading: false,
                getJobSuccess: true,
                job: action.payload.job
            }
        }
        case GET_JOB_FAILED: {
            return {
                ...state,
                getJobloading: false,
                getJobFailed: true,
                error: action.payload.error
            }
        }
        case GET_JOB_LOADING: {
            return {
                ...state,
                getJobloading: true
            }
        }
        case GET_JOBS_SUCCESS: {
            return {
                ...state,
                getJobsloading: false,
                getJobsSuccess: true,
                jobs: action.payload.jobs
            }
        }
        case GET_JOBS_FAILED: {
            return {
                ...state,
                getJobsloading: false,
                getJobsFailed: true,
                error: action.payload.error
            }
        }
        case GET_JOBS_LOADING: {
            return {
                ...state,
                getJobsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};