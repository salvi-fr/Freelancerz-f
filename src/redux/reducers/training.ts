import {
    CREATE_TRAINING_SUCCESS,
    CREATE_TRAINING_LOADING,
    CREATE_TRAINING_FAILED,
    UPDATE_TRAINING_SUCCESS,
    UPDATE_TRAINING_LOADING,
    UPDATE_TRAINING_FAILED,
    DELETE_TRAINING_SUCCESS,
    DELETE_TRAINING_FAILED,
    DELETE_TRAINING_LOADING,
    GET_TRAINING_SUCCESS,
    GET_TRAINING_FAILED,
    GET_TRAINING_LOADING,
    GET_TRAININGS_SUCCESS
    , GET_TRAININGS_FAILED,
    GET_TRAININGS_LOADING
} from './types';
import {ITraining,IResponsePaging} from 'types'
export const InitialTrainingState = {
    getTrainingloading: false,
    getTrainingSuccess: false,
    getTrainingFailed: false,
    createTrainingloading: false,
    createTrainingSuccess: false,
    createTrainingFailed: false,
    updateTrainingloading: false,
    updateTrainingSuccess: false,
    updateTrainingFailed: false,
    deleteTrainingloading: false,
    deleteTrainingSuccess: false,
    deleteTrainingFailed: false,
    getTrainingsloading: false,
    getTrainingsSuccess: false,
    getTrainingsFailed: false,
    trainings:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    training: null,
    error: null,

}
export type TrainingState = {
    readonly getTrainingloading?: boolean,
    readonly getTrainingSuccess?: boolean,
    readonly getTrainingFailed?: boolean,
    readonly createTrainingloading?: boolean,
    readonly createTrainingSuccess?: boolean,
    readonly createTrainingFailed?: boolean,
    readonly updateTrainingloading?: boolean,
    readonly updateTrainingSuccess?: boolean,
    readonly updateTrainingFailed?: boolean,
    readonly deleteTrainingloading?: boolean,
    readonly deleteTrainingSuccess?: boolean,
    readonly deleteTrainingFailed?: boolean,
    readonly getTrainingsloading?: boolean,
    readonly getTrainingsSuccess?: boolean,
    readonly getTrainingsFailed?: boolean,
    readonly trainings?: IResponsePaging,
    readonly training?: ITraining,
    readonly error?: string,

}

export type trainingActionType = {
    type: string;
    payload: TrainingState
};



export const trainingReducer: React.Reducer<TrainingState, trainingActionType> = (
    state: TrainingState= InitialTrainingState,
    action: trainingActionType
) => {
    switch (action.type) {
        case CREATE_TRAINING_SUCCESS: {
            return {
                ...state,
                createTrainingloading: false,
                createTrainingSuccess: true,
                training: action.payload.training,
            }
        }
        case CREATE_TRAINING_LOADING: {
            return {
                ...state,
                createTrainingloading: true,
            }
        }
        case CREATE_TRAINING_FAILED: {
            return {
                ...state,
                createTrainingloading: false,
                createTrainingFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_TRAINING_SUCCESS: {
            return {
                ...state,
                updateTrainingloading: false,
                updateTrainingSuccess: true,
                training: action.payload.training
            }
        }
        case UPDATE_TRAINING_LOADING: {
            return {
                ...state,
                updateTrainingloading: true
            }
        }
        case UPDATE_TRAINING_FAILED: {
            return {
                ...state,
                updateTrainingloading: false,
                updateTrainingFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_TRAINING_SUCCESS: {
            return {
                ...state,
                deleteTrainingloading: false,
                deleteTrainingSuccess: true
            }
        }
        case DELETE_TRAINING_FAILED: {
            return {
                ...state,
                deleteTrainingloading: false,
                deleteTrainingFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_TRAINING_LOADING: {
            return {
                ...state,
                deleteTrainingloading: true
            }
        }
        case GET_TRAINING_SUCCESS: {
            return {
                ...state,
                getTrainingloading: false,
                getTrainingSuccess: true,
                training: action.payload.training
            }
        }
        case GET_TRAINING_FAILED: {
            return {
                ...state,
                getTrainingloading: false,
                getTrainingFailed: true,
                error: action.payload.error
            }
        }
        case GET_TRAINING_LOADING: {
            return {
                ...state,
                getTrainingloading: true
            }
        }
        case GET_TRAININGS_SUCCESS: {
            return {
                ...state,
                getTrainingsloading: false,
                getTrainingsSuccess: true,
                trainings: action.payload.trainings
            }
        }
        case GET_TRAININGS_FAILED: {
            return {
                ...state,
                getTrainingsloading: false,
                getTrainingsFailed: true,
                error: action.payload.error
            }
        }
        case GET_TRAININGS_LOADING: {
            return {
                ...state,
                getTrainingsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};