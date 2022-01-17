import {
    CREATE_PUBLICATION_SUCCESS,
    CREATE_PUBLICATION_LOADING,
    CREATE_PUBLICATION_FAILED,
    UPDATE_PUBLICATION_SUCCESS,
    UPDATE_PUBLICATION_LOADING,
    UPDATE_PUBLICATION_FAILED,
    DELETE_PUBLICATION_SUCCESS,
    DELETE_PUBLICATION_FAILED,
    DELETE_PUBLICATION_LOADING,
    GET_PUBLICATION_SUCCESS,
    GET_PUBLICATION_FAILED,
    GET_PUBLICATION_LOADING,
    GET_PUBLICATIONS_SUCCESS
    , GET_PUBLICATIONS_FAILED,
    GET_PUBLICATIONS_LOADING
} from './types';
import {IPublication,IResponsePaging} from 'types'
export const InitialPublicationState = {
    getPublicationloading: false,
    getPublicationSuccess: false,
    getPublicationFailed: false,
    createPublicationloading: false,
    createPublicationSuccess: false,
    createPublicationFailed: false,
    updatePublicationloading: false,
    updatePublicationSuccess: false,
    updatePublicationFailed: false,
    deletePublicationloading: false,
    deletePublicationSuccess: false,
    deletePublicationFailed: false,
    getPublicationsloading: false,
    getPublicationsSuccess: false,
    getPublicationsFailed: false,
    publications:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    publication: null,
    error: null,

}
export type PublicationState = {
    readonly getPublicationloading?: boolean,
    readonly getPublicationSuccess?: boolean,
    readonly getPublicationFailed?: boolean,
    readonly createPublicationloading?: boolean,
    readonly createPublicationSuccess?: boolean,
    readonly createPublicationFailed?: boolean,
    readonly updatePublicationloading?: boolean,
    readonly updatePublicationSuccess?: boolean,
    readonly updatePublicationFailed?: boolean,
    readonly deletePublicationloading?: boolean,
    readonly deletePublicationSuccess?: boolean,
    readonly deletePublicationFailed?: boolean,
    readonly getPublicationsloading?: boolean,
    readonly getPublicationsSuccess?: boolean,
    readonly getPublicationsFailed?: boolean,
    readonly publications?: IResponsePaging,
    readonly publication?: IPublication,
    readonly error?: string,

}


export type publicationActionType = {
    type: string;
    payload: PublicationState
};



export const publicationReducer: React.Reducer<PublicationState, publicationActionType> = (
    state: PublicationState=InitialPublicationState,
    action: publicationActionType
) => {
    switch (action.type) {
        case CREATE_PUBLICATION_SUCCESS: {
            return {
                ...state,
                createPublicationloading: false,
                createPublicationSuccess: true,
                publication: action.payload.publication,
            }
        }
        case CREATE_PUBLICATION_LOADING: {
            return {
                ...state,
                createPublicationloading: true,
            }
        }
        case CREATE_PUBLICATION_FAILED: {
            return {
                ...state,
                createPublicationloading: false,
                createPublicationFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_PUBLICATION_SUCCESS: {
            return {
                ...state,
                updatePublicationloading: false,
                updatePublicationSuccess: true,
                publication: action.payload.publication
            }
        }
        case UPDATE_PUBLICATION_LOADING: {
            return {
                ...state,
                updatePublicationloading: true
            }
        }
        case UPDATE_PUBLICATION_FAILED: {
            return {
                ...state,
                updatePublicationloading: false,
                updatePublicationFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_PUBLICATION_SUCCESS: {
            return {
                ...state,
                deletePublicationloading: false,
                deletePublicationSuccess: true
            }
        }
        case DELETE_PUBLICATION_FAILED: {
            return {
                ...state,
                deletePublicationloading: false,
                deletePublicationFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_PUBLICATION_LOADING: {
            return {
                ...state,
                deletePublicationloading: true
            }
        }
        case GET_PUBLICATION_SUCCESS: {
            return {
                ...state,
                getPublicationloading: false,
                getPublicationSuccess: true,
                publication: action.payload.publication
            }
        }
        case GET_PUBLICATION_FAILED: {
            return {
                ...state,
                getPublicationloading: false,
                getPublicationFailed: true,
                error: action.payload.error
            }
        }
        case GET_PUBLICATION_LOADING: {
            return {
                ...state,
                getPublicationloading: true
            }
        }
        case GET_PUBLICATIONS_SUCCESS: {
            return {
                ...state,
                getPublicationsloading: false,
                getPublicationsSuccess: true,
                publications: action.payload.publications
            }
        }
        case GET_PUBLICATIONS_FAILED: {
            return {
                ...state,
                getPublicationsloading: false,
                getPublicationsFailed: true,
                error: action.payload.error
            }
        }
        case GET_PUBLICATIONS_LOADING: {
            return {
                ...state,
                getPublicationsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};