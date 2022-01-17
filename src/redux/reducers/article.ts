import {
    CREATE_ARTICLE_SUCCESS,
    CREATE_ARTICLE_LOADING,
    CREATE_ARTICLE_FAILED,
    UPDATE_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_LOADING,
    UPDATE_ARTICLE_FAILED,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_FAILED,
    DELETE_ARTICLE_LOADING,
    GET_ARTICLE_SUCCESS,
    GET_ARTICLE_FAILED,
    GET_ARTICLE_LOADING,
    GET_ARTICLES_SUCCESS
    , GET_ARTICLES_FAILED,
    GET_ARTICLES_LOADING
} from './types';
import {IArticle,IResponsePaging} from 'types'

export const InitialArticleState = {
    getArticleloading: false,
    getArticleSuccess: false,
    getArticleFailed: false,
    createArticleloading: false,
    createArticleSuccess: false,
    createArticleFailed: false,
    updateArticleloading: false,
    updateArticleSuccess: false,
    updateArticleFailed: false,
    deleteArticleloading: false,
    deleteArticleSuccess: false,
    deleteArticleFailed: false,
    getArticlesloading: false,
    getArticlesSuccess: false,
    getArticlesFailed: false,
    articles:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    article: null,
    error: null,

}
export type ArticleState = {
    readonly getArticleloading?: boolean,
    readonly getArticleSuccess?: boolean,
    readonly getArticleFailed?: boolean,
    readonly createArticleloading?: boolean,
    readonly createArticleSuccess?: boolean,
    readonly createArticleFailed?: boolean,
    readonly updateArticleloading?: boolean,
    readonly updateArticleSuccess?: boolean,
    readonly updateArticleFailed?: boolean,
    readonly deleteArticleloading?: boolean,
    readonly deleteArticleSuccess?: boolean,
    readonly deleteArticleFailed?: boolean,
    readonly getArticlesloading?: boolean,
    readonly getArticlesSuccess?: boolean,
    readonly getArticlesFailed?: boolean,
    readonly articles?: IResponsePaging,
    readonly article?: IArticle,
    readonly error?: string,

}


export type articleActionType = {
    type: string;
    payload: ArticleState
};



export const articleReducer: React.Reducer<ArticleState, articleActionType> = (
    state: ArticleState= InitialArticleState,
    action: articleActionType
) => {
    switch (action.type) {
        case CREATE_ARTICLE_SUCCESS: {
            return {
                ...state,
                createArticleloading: false,
                createArticleSuccess: true,
                article: action.payload.article,
            }
        }
        case CREATE_ARTICLE_LOADING: {
            return {
                ...state,
                createArticleloading: true,
            }
        }
        case CREATE_ARTICLE_FAILED: {
            return {
                ...state,
                createArticleloading: false,
                createArticleFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_ARTICLE_SUCCESS: {
            return {
                ...state,
                updateArticleloading: false,
                updateArticleSuccess: true,
                article: action.payload.article
            }
        }
        case UPDATE_ARTICLE_LOADING: {
            return {
                ...state,
                updateArticleloading: true
            }
        }
        case UPDATE_ARTICLE_FAILED: {
            return {
                ...state,
                updateArticleloading: false,
                updateArticleFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_ARTICLE_SUCCESS: {
            return {
                ...state,
                deleteArticleloading: false,
                deleteArticleSuccess: true
            }
        }
        case DELETE_ARTICLE_FAILED: {
            return {
                ...state,
                deleteArticleloading: false,
                deleteArticleFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_ARTICLE_LOADING: {
            return {
                ...state,
                deleteArticleloading: true
            }
        }
        case GET_ARTICLE_SUCCESS: {
            return {
                ...state,
                getArticleloading: false,
                getArticleSuccess: true,
                article: action.payload.article
            }
        }
        case GET_ARTICLE_FAILED: {
            return {
                ...state,
                getArticleloading: false,
                getArticleFailed: true,
                error: action.payload.error
            }
        }
        case GET_ARTICLE_LOADING: {
            return {
                ...state,
                getArticleloading: true
            }
        }
        case GET_ARTICLES_SUCCESS: {
            return {
                ...state,
                getArticlesloading: false,
                getArticlesSuccess: true,
                articles: action.payload.articles
            }
        }
        case GET_ARTICLES_FAILED: {
            return {
                ...state,
                getArticlesloading: false,
                getArticlesFailed: true,
                error: action.payload.error
            }
        }
        case GET_ARTICLES_LOADING: {
            return {
                ...state,
                getArticlesloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};