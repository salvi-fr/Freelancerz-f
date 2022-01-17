import {
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_LOADING,
    CREATE_REVIEW_FAILED,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_LOADING,
    UPDATE_REVIEW_FAILED,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAILED,
    DELETE_REVIEW_LOADING,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAILED,
    GET_REVIEW_LOADING,
    GET_REVIEWS_SUCCESS
    , GET_REVIEWS_FAILED,
    GET_REVIEWS_LOADING
} from './types';
import {IReview,IResponsePaging} from 'types'
export const InitialReviewState = {
    getReviewloading: false,
    getReviewSuccess: false,
    getReviewFailed: false,
    createReviewloading: false,
    createReviewSuccess: false,
    createReviewFailed: false,
    updateReviewloading: false,
    updateReviewSuccess: false,
    updateReviewFailed: false,
    deleteReviewloading: false,
    deleteReviewSuccess: false,
    deleteReviewFailed: false,
    getReviewsloading: false,
    getReviewsSuccess: false,
    getReviewsFailed: false,
    reviews:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    review: null,
    error: null,

}
export type ReviewState = {
    readonly getReviewloading?: boolean,
    readonly getReviewSuccess?: boolean,
    readonly getReviewFailed?: boolean,
    readonly createReviewloading?: boolean,
    readonly createReviewSuccess?: boolean,
    readonly createReviewFailed?: boolean,
    readonly updateReviewloading?: boolean,
    readonly updateReviewSuccess?: boolean,
    readonly updateReviewFailed?: boolean,
    readonly deleteReviewloading?: boolean,
    readonly deleteReviewSuccess?: boolean,
    readonly deleteReviewFailed?: boolean,
    readonly getReviewsloading?: boolean,
    readonly getReviewsSuccess?: boolean,
    readonly getReviewsFailed?: boolean,
    readonly reviews?:IResponsePaging,
    readonly review?: IReview,
    readonly error?: string,

}

export type reviewActionType = {
    type: string;
    payload: ReviewState
};



export const reviewReducer: React.Reducer<ReviewState, reviewActionType> = (
    state: ReviewState=InitialReviewState,
    action: reviewActionType
) => {
    switch (action.type) {
        case CREATE_REVIEW_SUCCESS: {
            return {
                ...state,
                createReviewloading: false,
                createReviewSuccess: true,
                review: action.payload.review,
            }
        }
        case CREATE_REVIEW_LOADING: {
            return {
                ...state,
                createReviewloading: true,
            }
        }
        case CREATE_REVIEW_FAILED: {
            return {
                ...state,
                createReviewloading: false,
                createReviewFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_REVIEW_SUCCESS: {
            return {
                ...state,
                updateReviewloading: false,
                updateReviewSuccess: true,
                review: action.payload.review
            }
        }
        case UPDATE_REVIEW_LOADING: {
            return {
                ...state,
                updateReviewloading: true
            }
        }
        case UPDATE_REVIEW_FAILED: {
            return {
                ...state,
                updateReviewloading: false,
                updateReviewFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_REVIEW_SUCCESS: {
            return {
                ...state,
                deleteReviewloading: false,
                deleteReviewSuccess: true
            }
        }
        case DELETE_REVIEW_FAILED: {
            return {
                ...state,
                deleteReviewloading: false,
                deleteReviewFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_REVIEW_LOADING: {
            return {
                ...state,
                deleteReviewloading: true
            }
        }
        case GET_REVIEW_SUCCESS: {
            return {
                ...state,
                getReviewloading: false,
                getReviewSuccess: true,
                review: action.payload.review
            }
        }
        case GET_REVIEW_FAILED: {
            return {
                ...state,
                getReviewloading: false,
                getReviewFailed: true,
                error: action.payload.error
            }
        }
        case GET_REVIEW_LOADING: {
            return {
                ...state,
                getReviewloading: true
            }
        }
        case GET_REVIEWS_SUCCESS: {
            return {
                ...state,
                getReviewsloading: false,
                getReviewsSuccess: true,
                reviews: action.payload.reviews
            }
        }
        case GET_REVIEWS_FAILED: {
            return {
                ...state,
                getReviewsloading: false,
                getReviewsFailed: true,
                error: action.payload.error
            }
        }
        case GET_REVIEWS_LOADING: {
            return {
                ...state,
                getReviewsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};