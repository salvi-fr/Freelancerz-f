import {
    CREATE_PROMO_SUCCESS,
    CREATE_PROMO_LOADING,
    CREATE_PROMO_FAILED,
    UPDATE_PROMO_SUCCESS,
    UPDATE_PROMO_LOADING,
    UPDATE_PROMO_FAILED,
    DELETE_PROMO_SUCCESS,
    DELETE_PROMO_FAILED,
    DELETE_PROMO_LOADING,
    GET_PROMO_SUCCESS,
    GET_PROMO_FAILED,
    GET_PROMO_LOADING,
    GET_PROMOS_SUCCESS
    , GET_PROMOS_FAILED,
    GET_PROMOS_LOADING
} from './types';
import {IPromo,IResponsePaging} from 'types'
export const InitialPromoState = {
    getPromoloading: false,
    getPromoSuccess: false,
    getPromoFailed: false,
    createPromoloading: false,
    createPromoSuccess: false,
    createPromoFailed: false,
    updatePromoloading: false,
    updatePromoSuccess: false,
    updatePromoFailed: false,
    deletePromoloading: false,
    deletePromoSuccess: false,
    deletePromoFailed: false,
    getPromosloading: false,
    getPromosSuccess: false,
    getPromosFailed: false,
    promos:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    promo: null,
    error: null,

}
export type PromoState = {
    readonly getPromoloading?: boolean,
    readonly getPromoSuccess?: boolean,
    readonly getPromoFailed?: boolean,
    readonly createPromoloading?: boolean,
    readonly createPromoSuccess?: boolean,
    readonly createPromoFailed?: boolean,
    readonly updatePromoloading?: boolean,
    readonly updatePromoSuccess?: boolean,
    readonly updatePromoFailed?: boolean,
    readonly deletePromoloading?: boolean,
    readonly deletePromoSuccess?: boolean,
    readonly deletePromoFailed?: boolean,
    readonly getPromosloading?: boolean,
    readonly getPromosSuccess?: boolean,
    readonly getPromosFailed?: boolean,
    readonly promos?: IResponsePaging,
    readonly promo?: IPromo,
    readonly error?: string,

}
export type PromoItem = {
    id: string | number;
    title: string;
    description?: number;
    content: number;
    type?: string;
    activated: boolean;
    created_by: string;
};

export type promoActionType = {
    type: string;
    payload: PromoState
};



export const promoReducer: React.Reducer<PromoState, promoActionType> = (
    state: PromoState=InitialPromoState,
    action: promoActionType
) => {
    switch (action.type) {
        case CREATE_PROMO_SUCCESS: {
            return {
                ...state,
                createPromoloading: false,
                createPromoSuccess: true,
                promo: action.payload.promo,
            }
        }
        case CREATE_PROMO_LOADING: {
            return {
                ...state,
                createPromoloading: true,
            }
        }
        case CREATE_PROMO_FAILED: {
            return {
                ...state,
                createPromoloading: false,
                createPromoFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_PROMO_SUCCESS: {
            return {
                ...state,
                updatePromoloading: false,
                updatePromoSuccess: true,
                promo: action.payload.promo
            }
        }
        case UPDATE_PROMO_LOADING: {
            return {
                ...state,
                updatePromoloading: true
            }
        }
        case UPDATE_PROMO_FAILED: {
            return {
                ...state,
                updatePromoloading: false,
                updatePromoFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_PROMO_SUCCESS: {
            return {
                ...state,
                deletePromoloading: false,
                deletePromoSuccess: true
            }
        }
        case DELETE_PROMO_FAILED: {
            return {
                ...state,
                deletePromoloading: false,
                deletePromoFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_PROMO_LOADING: {
            return {
                ...state,
                deletePromoloading: true
            }
        }
        case GET_PROMO_SUCCESS: {
            return {
                ...state,
                getPromoloading: false,
                getPromoSuccess: true,
                promo: action.payload.promo
            }
        }
        case GET_PROMO_FAILED: {
            return {
                ...state,
                getPromoloading: false,
                getPromoFailed: true,
                error: action.payload.error
            }
        }
        case GET_PROMO_LOADING: {
            return {
                ...state,
                getPromoloading: true
            }
        }
        case GET_PROMOS_SUCCESS: {
            return {
                ...state,
                getPromosloading: false,
                getPromosSuccess: true,
                promos: action.payload.promos
            }
        }
        case GET_PROMOS_FAILED: {
            return {
                ...state,
                getPromosloading: false,
                getPromosFailed: true,
                error: action.payload.error
            }
        }
        case GET_PROMOS_LOADING: {
            return {
                ...state,
                getPromosloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};