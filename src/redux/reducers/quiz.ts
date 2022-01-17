import {
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_LOADING,
    CREATE_QUIZ_FAILED,
    UPDATE_QUIZ_SUCCESS,
    UPDATE_QUIZ_LOADING,
    UPDATE_QUIZ_FAILED,
    DELETE_QUIZ_SUCCESS,
    DELETE_QUIZ_FAILED,
    DELETE_QUIZ_LOADING,
    GET_QUIZ_SUCCESS,
    GET_QUIZ_FAILED,
    GET_QUIZ_LOADING,
    GET_QUIZES_SUCCESS
    , GET_QUIZES_FAILED,
    GET_QUIZES_LOADING
} from './types';
import {IQuiz,IResponsePaging} from 'types'
export const InitialQuizState = {
    getQuizloading: false,
    getQuizSuccess: false,
    getQuizFailed: false,
    createQuizloading: false,
    createQuizSuccess: false,
    createQuizFailed: false,
    updateQuizloading: false,
    updateQuizSuccess: false,
    updateQuizFailed: false,
    deleteQuizloading: false,
    deleteQuizSuccess: false,
    deleteQuizFailed: false,
    getquizesloading: false,
    getquizesSuccess: false,
    getquizesFailed: false,
    quizes:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    quiz: null,
    error: null,

}
export type QuizState = {
    readonly getQuizloading?: boolean,
    readonly getQuizSuccess?: boolean,
    readonly getQuizFailed?: boolean,
    readonly createQuizloading?: boolean,
    readonly createQuizSuccess?: boolean,
    readonly createQuizFailed?: boolean,
    readonly updateQuizloading?: boolean,
    readonly updateQuizSuccess?: boolean,
    readonly updateQuizFailed?: boolean,
    readonly deleteQuizloading?: boolean,
    readonly deleteQuizSuccess?: boolean,
    readonly deleteQuizFailed?: boolean,
    readonly getquizesloading?: boolean,
    readonly getquizesSuccess?: boolean,
    readonly getquizesFailed?: boolean,
    readonly quizes?: IResponsePaging,
    readonly quiz?: IQuiz|null,
    readonly error?: string,

}


export type quizActionType = {
    type: string;
    payload: QuizState
};



export const quizReducer: React.Reducer<QuizState, quizActionType> = (
    state: QuizState=InitialQuizState,
    action: quizActionType
) => {
    switch (action.type) {
        case CREATE_QUIZ_SUCCESS: {
            return {
                ...state,
                createQuizloading: false,
                createQuizSuccess: true,
                quiz: action.payload.quiz,
            }
        }
        case CREATE_QUIZ_LOADING: {
            return {
                ...state,
                createQuizloading: true,
            }
        }
        case CREATE_QUIZ_FAILED: {
            return {
                ...state,
                createQuizloading: false,
                createQuizFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_QUIZ_SUCCESS: {
            return {
                ...state,
                updateQuizloading: false,
                updateQuizSuccess: true,
                quiz: action.payload.quiz
            }
        }
        case UPDATE_QUIZ_LOADING: {
            return {
                ...state,
                updateQuizloading: true
            }
        }
        case UPDATE_QUIZ_FAILED: {
            return {
                ...state,
                updateQuizloading: false,
                updateQuizFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_QUIZ_SUCCESS: {
            return {
                ...state,
                deleteQuizloading: false,
                deleteQuizSuccess: true
            }
        }
        case DELETE_QUIZ_FAILED: {
            return {
                ...state,
                deleteQuizloading: false,
                deleteQuizFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_QUIZ_LOADING: {
            return {
                ...state,
                deleteQuizloading: true
            }
        }
        case GET_QUIZ_SUCCESS: {
            return {
                ...state,
                getQuizloading: false,
                getQuizSuccess: true,
                quiz: action.payload.quiz
            }
        }
        case GET_QUIZ_FAILED: {
            return {
                ...state,
                getQuizloading: false,
                getQuizFailed: true,
                error: action.payload.error
            }
        }
        case GET_QUIZ_LOADING: {
            return {
                ...state,
                getQuizloading: true
            }
        }
        case GET_QUIZES_SUCCESS: {
            return {
                ...state,
                getquizesloading: false,
                getquizesSuccess: true,
                quizes: action.payload.quizes
            }
        }
        case GET_QUIZES_FAILED: {
            return {
                ...state,
                getquizesloading: false,
                getquizesFailed: true,
                error: action.payload.error
            }
        }
        case GET_QUIZES_LOADING: {
            return {
                ...state,
                getquizesloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};