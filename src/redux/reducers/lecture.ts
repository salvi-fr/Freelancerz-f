import {
    CREATE_LECTURE_SUCCESS,
    CREATE_LECTURE_LOADING,
    CREATE_LECTURE_FAILED,
    UPDATE_LECTURE_SUCCESS,
    UPDATE_LECTURE_LOADING,
    UPDATE_LECTURE_FAILED,
    DELETE_LECTURE_SUCCESS,
    DELETE_LECTURE_FAILED,
    DELETE_LECTURE_LOADING,
    GET_LECTURE_SUCCESS,
    GET_LECTURE_FAILED,
    GET_LECTURE_LOADING,
    GET_LECTURES_SUCCESS
    , GET_LECTURES_FAILED,
    GET_LECTURES_LOADING
} from './types';
import {ILecture,IResponsePaging} from 'types'
export const InitialLectureState = {
    getLectureloading: false,
    getLectureSuccess: false,
    getLectureFailed: false,
    createLectureloading: false,
    createLectureSuccess: false,
    createLectureFailed: false,
    updateLectureloading: false,
    updateLectureSuccess: false,
    updateLectureFailed: false,
    deleteLectureloading: false,
    deleteLectureSuccess: false,
    deleteLectureFailed: false,
    getLecturesloading: false,
    getLecturesSuccess: false,
    getLecturesFailed: false,
    lectures: {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    lecture: null,
    error: null,

}
export type LectureState = {
    readonly getLectureloading?: boolean,
    readonly getLectureSuccess?: boolean,
    readonly getLectureFailed?: boolean,
    readonly createLectureloading?: boolean,
    readonly createLectureSuccess?: boolean,
    readonly createLectureFailed?: boolean,
    readonly updateLectureloading?: boolean,
    readonly updateLectureSuccess?: boolean,
    readonly updateLectureFailed?: boolean,
    readonly deleteLectureloading?: boolean,
    readonly deleteLectureSuccess?: boolean,
    readonly deleteLectureFailed?: boolean,
    readonly getLecturesloading?: boolean,
    readonly getLecturesSuccess?: boolean,
    readonly getLecturesFailed?: boolean,
    readonly lectures?: IResponsePaging,
    readonly lecture?: ILecture,
    readonly error?: string,

}


export type lectureActionType = {
    type: string;
    payload: LectureState
};



export const lectureReducer: React.Reducer<LectureState, lectureActionType> = (
    state: LectureState=InitialLectureState,
    action: lectureActionType
) => {
    switch (action.type) {
        case CREATE_LECTURE_SUCCESS: {
            return {
                ...state,
                createLectureloading: false,
                createLectureSuccess: true,
                lecture: action.payload.lecture,
            }
        }
        case CREATE_LECTURE_LOADING: {
            return {
                ...state,
                createLectureloading: true,
            }
        }
        case CREATE_LECTURE_FAILED: {
            return {
                ...state,
                createLectureloading: false,
                createLectureFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_LECTURE_SUCCESS: {
            return {
                ...state,
                updateLectureloading: false,
                updateLectureSuccess: true,
                lecture: action.payload.lecture
            }
        }
        case UPDATE_LECTURE_LOADING: {
            return {
                ...state,
                updateLectureloading: true
            }
        }
        case UPDATE_LECTURE_FAILED: {
            return {
                ...state,
                updateLectureloading: false,
                updateLectureFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_LECTURE_SUCCESS: {
            return {
                ...state,
                deleteLectureloading: false,
                deleteLectureSuccess: true
            }
        }
        case DELETE_LECTURE_FAILED: {
            return {
                ...state,
                deleteLectureloading: false,
                deleteLectureFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_LECTURE_LOADING: {
            return {
                ...state,
                deleteLectureloading: true
            }
        }
        case GET_LECTURE_SUCCESS: {
            return {
                ...state,
                getLectureloading: false,
                getLectureSuccess: true,
                lecture: action.payload.lecture
            }
        }
        case GET_LECTURE_FAILED: {
            return {
                ...state,
                getLectureloading: false,
                getLectureFailed: true,
                error: action.payload.error
            }
        }
        case GET_LECTURE_LOADING: {
            return {
                ...state,
                getLectureloading: true
            }
        }
        case GET_LECTURES_SUCCESS: {
            return {
                ...state,
                getLecturesloading: false,
                getLecturesSuccess: true,
                lectures: action.payload.lectures
            }
        }
        case GET_LECTURES_FAILED: {
            return {
                ...state,
                getLecturesloading: false,
                getLecturesFailed: true,
                error: action.payload.error
            }
        }
        case GET_LECTURES_LOADING: {
            return {
                ...state,
                getLecturesloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};