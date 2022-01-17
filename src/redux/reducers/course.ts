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
} from './types';
import {ICourse,IResponsePaging} from 'types'
export const InitialCourseState = {
    getCourseloading: false,
    getCourseSuccess: false,
    getCourseFailed: false,
    createCourseloading: false,
    createCourseSuccess: false,
    createCourseFailed: false,
    updateCourseloading: false,
    updateCourseSuccess: false,
    updateCourseFailed: false,
    deleteCourseloading: false,
    deleteCourseSuccess: false,
    deleteCourseFailed: false,
    getCoursesloading: false,
    getCoursesSuccess: false,
    getCoursesFailed: false,
    courses:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    course: null,
    error: null,

}
export type CourseState = {
    readonly getCourseloading?: boolean,
    readonly getCourseSuccess?: boolean,
    readonly getCourseFailed?: boolean,
    readonly createCourseloading?: boolean,
    readonly createCourseSuccess?: boolean,
    readonly createCourseFailed?: boolean,
    readonly updateCourseloading?: boolean,
    readonly updateCourseSuccess?: boolean,
    readonly updateCourseFailed?: boolean,
    readonly deleteCourseloading?: boolean,
    readonly deleteCourseSuccess?: boolean,
    readonly deleteCourseFailed?: boolean,
    readonly getCoursesloading?: boolean,
    readonly getCoursesSuccess?: boolean,
    readonly getCoursesFailed?: boolean,
    readonly courses?: IResponsePaging,
    readonly course?: ICourse,
    readonly error?: string,

}

export type courseActionType = {
    type: string;
    payload: CourseState
};



export const courseReducer: React.Reducer<CourseState, courseActionType> = (
    state: CourseState= InitialCourseState,
    action: courseActionType
) => {
    switch (action.type) {
        case CREATE_COURSE_SUCCESS: {
            return {
                ...state,
                createCourseloading: false,
                createCourseSuccess: true,
                course: action.payload.course,
            }
        }
        case CREATE_COURSE_LOADING: {
            return {
                ...state,
                createCourseloading: true,
            }
        }
        case CREATE_COURSE_FAILED: {
            return {
                ...state,
                createCourseloading: false,
                createCourseFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_COURSE_SUCCESS: {
            return {
                ...state,
                updateCourseloading: false,
                updateCourseSuccess: true,
                course: action.payload.course
            }
        }
        case UPDATE_COURSE_LOADING: {
            return {
                ...state,
                updateCourseloading: true
            }
        }
        case UPDATE_COURSE_FAILED: {
            return {
                ...state,
                updateCourseloading: false,
                updateCourseFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_COURSE_SUCCESS: {
            return {
                ...state,
                deleteCourseloading: false,
                deleteCourseSuccess: true
            }
        }
        case DELETE_COURSE_FAILED: {
            return {
                ...state,
                deleteCourseloading: false,
                deleteCourseFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_COURSE_LOADING: {
            return {
                ...state,
                deleteCourseloading: true
            }
        }
        case GET_COURSE_SUCCESS: {
            return {
                ...state,
                getCourseloading: false,
                getCourseSuccess: true,
                course: action.payload.course
            }
        }
        case GET_COURSE_FAILED: {
            return {
                ...state,
                getCourseloading: false,
                getCourseFailed: true,
                error: action.payload.error
            }
        }
        case GET_COURSE_LOADING: {
            return {
                ...state,
                getCourseloading: true
            }
        }
        case GET_COURSES_SUCCESS: {
            return {
                ...state,
                getCoursesloading: false,
                getCoursesSuccess: true,
                courses: action.payload.courses
            }
        }
        case GET_COURSES_FAILED: {
            return {
                ...state,
                getCoursesloading: false,
                getCoursesFailed: true,
                error: action.payload.error
            }
        }
        case GET_COURSES_LOADING: {
            return {
                ...state,
                getCoursesloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};