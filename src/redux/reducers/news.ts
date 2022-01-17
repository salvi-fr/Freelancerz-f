import {
    CREATE_NEWS_SUCCESS,
    CREATE_NEWS_LOADING,
    CREATE_NEWS_FAILED,
    UPDATE_NEWS_SUCCESS,
    UPDATE_NEWS_LOADING,
    UPDATE_NEWS_FAILED,
    DELETE_NEWS_SUCCESS,
    DELETE_NEWS_FAILED,
    DELETE_NEWS_LOADING,
    GET_NEWS_SUCCESS,
    GET_NEWS_FAILED,
    GET_NEWS_LOADING,
    GET_NEWSES_SUCCESS
    , GET_NEWSES_FAILED,
    GET_NEWSES_LOADING
} from './types';
import {INews,IResponsePaging} from 'types'
export const InitialNewsState = {
    getNewsloading: false,
    getNewsSuccess: false,
    getNewsFailed: false,
    createNewsloading: false,
    createNewsSuccess: false,
    createNewsFailed: false,
    updateNewsloading: false,
    updateNewsSuccess: false,
    updateNewsFailed: false,
    deleteNewsloading: false,
    deleteNewsSuccess: false,
    deleteNewsFailed: false,
    getNewsesloading: false,
    getNewsesSuccess: false,
    getNewsesFailed: false,
    newses:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    news: null,
    error: null,

}
export type NewsState = {
    readonly getNewsloading?: boolean,
    readonly getNewsSuccess?: boolean,
    readonly getNewsFailed?: boolean,
    readonly createNewsloading?: boolean,
    readonly createNewsSuccess?: boolean,
    readonly createNewsFailed?: boolean,
    readonly updateNewsloading?: boolean,
    readonly updateNewsSuccess?: boolean,
    readonly updateNewsFailed?: boolean,
    readonly deleteNewsloading?: boolean,
    readonly deleteNewsSuccess?: boolean,
    readonly deleteNewsFailed?: boolean,
    readonly getNewsesloading?: boolean,
    readonly getNewsesSuccess?: boolean,
    readonly getNewsesFailed?: boolean,
    readonly newses?:IResponsePaging,
    readonly news?: INews,
    readonly error?: string,

}


export type newsActionType = {
    type: string;
    payload: NewsState
};



export const newsReducer: React.Reducer<NewsState, newsActionType> = (
    state: NewsState=InitialNewsState,
    action: newsActionType
) => {
    switch (action.type) {
        case CREATE_NEWS_SUCCESS: {
            return {
                ...state,
                createNewsloading: false,
                createNewsSuccess: true,
                news: action.payload.news,
            }
        }
        case CREATE_NEWS_LOADING: {
            return {
                ...state,
                createNewsloading: true,
            }
        }
        case CREATE_NEWS_FAILED: {
            return {
                ...state,
                createNewsloading: false,
                createNewsFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_NEWS_SUCCESS: {
            return {
                ...state,
                updateNewsloading: false,
                updateNewsSuccess: true,
                news: action.payload.news
            }
        }
        case UPDATE_NEWS_LOADING: {
            return {
                ...state,
                updateNewsloading: true
            }
        }
        case UPDATE_NEWS_FAILED: {
            return {
                ...state,
                updateNewsloading: false,
                updateNewsFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_NEWS_SUCCESS: {
            return {
                ...state,
                deleteNewsloading: false,
                deleteNewsSuccess: true
            }
        }
        case DELETE_NEWS_FAILED: {
            return {
                ...state,
                deleteNewsloading: false,
                deleteNewsFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_NEWS_LOADING: {
            return {
                ...state,
                deleteNewsloading: true
            }
        }
        case GET_NEWS_SUCCESS: {
            return {
                ...state,
                getNewsloading: false,
                getNewsSuccess: true,
                news: action.payload.news
            }
        }
        case GET_NEWS_FAILED: {
            return {
                ...state,
                getNewsloading: false,
                getNewsFailed: true,
                error: action.payload.error
            }
        }
        case GET_NEWS_LOADING: {
            return {
                ...state,
                getNewsloading: true
            }
        }
        case GET_NEWSES_SUCCESS: {
            return {
                ...state,
                getNewsesloading: false,
                getNewsesSuccess: true,
                newses: action.payload.newses
            }
        }
        case GET_NEWSES_FAILED: {
            return {
                ...state,
                getNewsesloading: false,
                getNewsesFailed: true,
                error: action.payload.error
            }
        }
        case GET_NEWSES_LOADING: {
            return {
                ...state,
                getNewsesloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};