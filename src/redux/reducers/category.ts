import {
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_LOADING,
    CREATE_CATEGORY_FAILED,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_LOADING,
    UPDATE_CATEGORY_FAILED,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILED,
    DELETE_CATEGORY_LOADING,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILED,
    GET_CATEGORY_LOADING,
    GET_CATEGORIES_SUCCESS
    , GET_CATEGORIES_FAILED,
    GET_CATEGORIES_LOADING
} from './types';
import {ICategory,IResponsePaging} from 'types'
export const InitialCategoryState = {
    getCategoryloading: false,
    getCategorySuccess: false,
    getCategoryFailed: false,
    createCategoryloading: false,
    createCategorySuccess: false,
    createCategoryFailed: false,
    updateCategoryloading: false,
    updateCategorySuccess: false,
    updateCategoryFailed: false,
    deleteCategoryloading: false,
    deleteCategorySuccess: false,
    deleteCategoryFailed: false,
    getCategoriesloading: false,
    getCategoriesSuccess: false,
    getCategoriesFailed: false,
    categories: {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    category: null,
    error: null,

}
export type CategoryState = {
    readonly getCategoryloading?: boolean,
    readonly getCategorySuccess?: boolean,
    readonly getCategoryFailed?: boolean,
    readonly createCategoryloading?: boolean,
    readonly createCategorySuccess?: boolean,
    readonly createCategoryFailed?: boolean,
    readonly updateCategoryloading?: boolean,
    readonly updateCategorySuccess?: boolean,
    readonly updateCategoryFailed?: boolean,
    readonly deleteCategoryloading?: boolean,
    readonly deleteCategorySuccess?: boolean,
    readonly deleteCategoryFailed?: boolean,
    readonly getCategoriesloading?: boolean,
    readonly getCategoriesSuccess?: boolean,
    readonly getCategoriesFailed?: boolean,
    readonly categories?: IResponsePaging,
    readonly category?: ICategory,
    readonly error?: string,

}

export type categoryActionType = {
    type: string;
    payload: CategoryState
};



export const categoryReducer: React.Reducer<CategoryState, categoryActionType> = (
    state: CategoryState= InitialCategoryState,
    action: categoryActionType
) => {
    switch (action.type) {
        case CREATE_CATEGORY_SUCCESS: {
            return {
                ...state,
                createCategoryloading: false,
                createCategorySuccess: true,
                category: action.payload.category,
            }
        }
        case CREATE_CATEGORY_LOADING: {
            return {
                ...state,
                createCategoryloading: true,
            }
        }
        case CREATE_CATEGORY_FAILED: {
            return {
                ...state,
                createCategoryloading: false,
                createCategoryFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_CATEGORY_SUCCESS: {
            return {
                ...state,
                updateCategoryloading: false,
                updateCategorySuccess: true,
                category: action.payload.category
            }
        }
        case UPDATE_CATEGORY_LOADING: {
            return {
                ...state,
                updateCategoryloading: true
            }
        }
        case UPDATE_CATEGORY_FAILED: {
            return {
                ...state,
                updateCategoryloading: false,
                updateCategoryFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_CATEGORY_SUCCESS: {
            return {
                ...state,
                deleteCategoryloading: false,
                deleteCategorySuccess: true
            }
        }
        case DELETE_CATEGORY_FAILED: {
            return {
                ...state,
                deleteCategoryloading: false,
                deleteCategoryFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_CATEGORY_LOADING: {
            return {
                ...state,
                deleteCategoryloading: true
            }
        }
        case GET_CATEGORY_SUCCESS: {
            return {
                ...state,
                getCategoryloading: false,
                getCategorySuccess: true,
                category: action.payload.category
            }
        }
        case GET_CATEGORY_FAILED: {
            return {
                ...state,
                getCategoryloading: false,
                getCategoryFailed: true,
                error: action.payload.error
            }
        }
        case GET_CATEGORY_LOADING: {
            return {
                ...state,
                getCategoryloading: true
            }
        }
        case GET_CATEGORIES_SUCCESS: {
            return {
                ...state,
                getCategoriesloading: false,
                getCategoriesSuccess: true,
                categories: action.payload.categories
            }
        }
        case GET_CATEGORIES_FAILED: {
            return {
                ...state,
                getCategoriesloading: false,
                getCategoriesFailed: true,
                error: action.payload.error
            }
        }
        case GET_CATEGORIES_LOADING: {
            return {
                ...state,
                getCategoriesloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};