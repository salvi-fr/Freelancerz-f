import {
    CREATE_LECTURE_VIEW_SUCCESS,
    CREATE_LECTURE_VIEW_LOADING,
    CREATE_LECTURE_VIEW_FAILED,
    UPDATE_LECTURE_VIEW_SUCCESS,
    UPDATE_LECTURE_VIEW_LOADING,
    UPDATE_LECTURE_VIEW_FAILED,
    DELETE_LECTURE_VIEW_SUCCESS,
    DELETE_LECTURE_VIEW_FAILED,
    DELETE_LECTURE_VIEW_LOADING,
    GET_LECTURE_VIEW_SUCCESS,
    GET_LECTURE_VIEW_FAILED,
    GET_LECTURE_VIEW_LOADING,
    GET_LECTURE_VIEWS_SUCCESS
    , GET_LECTURE_VIEWS_FAILED,
    GET_LECTURE_VIEWS_LOADING
} from './types';
import {ILectureView,IResponsePaging} from 'types'
export const InitialLectureViewState = {
    getLectureViewloading: false,
    getLectureViewSuccess: false,
    getLectureViewFailed: false,
    createLectureViewloading: false,
    createLectureViewSuccess: false,
    createLectureViewFailed: false,
    updateLectureViewloading: false,
    updateLectureViewSuccess: false,
    updateLectureViewFailed: false,
    deleteLectureViewloading: false,
    deleteLectureViewSuccess: false,
    deleteLectureViewFailed: false,
    getLectureViewsloading: false,
    getLectureViewsSuccess: false,
    getLectureViewsFailed: false,
    lectureViews: {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    lecture: null,
    error: null,

}
export type LectureViewState = {
    readonly getLectureViewloading?: boolean,
    readonly getLectureViewSuccess?: boolean,
    readonly getLectureViewFailed?: boolean,
    readonly createLectureViewloading?: boolean,
    readonly createLectureViewSuccess?: boolean,
    readonly createLectureViewFailed?: boolean,
    readonly updateLectureViewloading?: boolean,
    readonly updateLectureViewSuccess?: boolean,
    readonly updateLectureViewFailed?: boolean,
    readonly deleteLectureViewloading?: boolean,
    readonly deleteLectureViewSuccess?: boolean,
    readonly deleteLectureViewFailed?: boolean,
    readonly getLectureViewsloading?: boolean,
    readonly getLectureViewsSuccess?: boolean,
    readonly getLectureViewsFailed?: boolean,
    readonly lectures?: IResponsePaging,
    readonly lecture?: ILectureView,
    readonly error?: string,

}


export type lectureViewActionType = {
    type: string;
    payload: LectureViewState
};



export const lectureViewReducer: React.Reducer<LectureViewState, lectureViewActionType> = (
    state: LectureViewState=InitialLectureViewState,
    action: lectureViewActionType
) => {
    switch (action.type) {
        case CREATE_LECTURE_VIEW_SUCCESS: {
            return {
                ...state,
                createLectureViewloading: false,
                createLectureViewSuccess: true,
                lecture: action.payload.lecture,
            }
        }
        case CREATE_LECTURE_VIEW_LOADING: {
            return {
                ...state,
                createLectureViewloading: true,
            }
        }
        case CREATE_LECTURE_VIEW_FAILED: {
            return {
                ...state,
                createLectureViewloading: false,
                createLectureViewFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_LECTURE_VIEW_SUCCESS: {
            return {
                ...state,
                updateLectureViewloading: false,
                updateLectureViewSuccess: true,
                lecture: action.payload.lecture
            }
        }
        case UPDATE_LECTURE_VIEW_LOADING: {
            return {
                ...state,
                updateLectureViewloading: true
            }
        }
        case UPDATE_LECTURE_VIEW_FAILED: {
            return {
                ...state,
                updateLectureViewloading: false,
                updateLectureViewFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_LECTURE_VIEW_SUCCESS: {
            return {
                ...state,
                deleteLectureViewloading: false,
                deleteLectureViewSuccess: true
            }
        }
        case DELETE_LECTURE_VIEW_FAILED: {
            return {
                ...state,
                deleteLectureViewloading: false,
                deleteLectureViewFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_LECTURE_VIEW_LOADING: {
            return {
                ...state,
                deleteLectureViewloading: true
            }
        }
        case GET_LECTURE_VIEW_SUCCESS: {
            return {
                ...state,
                getLectureViewloading: false,
                getLectureViewSuccess: true,
                lecture: action.payload.lecture
            }
        }
        case GET_LECTURE_VIEW_FAILED: {
            return {
                ...state,
                getLectureViewloading: false,
                getLectureViewFailed: true,
                error: action.payload.error
            }
        }
        case GET_LECTURE_VIEW_LOADING: {
            return {
                ...state,
                getLectureViewloading: true
            }
        }
        case GET_LECTURE_VIEWS_SUCCESS: {
            return {
                ...state,
                getLectureViewsloading: false,
                getLectureViewsSuccess: true,
                lectures: action.payload.lectures
            }
        }
        case GET_LECTURE_VIEWS_FAILED: {
            return {
                ...state,
                getLectureViewsloading: false,
                getLectureViewsFailed: true,
                error: action.payload.error
            }
        }
        case GET_LECTURE_VIEWS_LOADING: {
            return {
                ...state,
                getLectureViewsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};