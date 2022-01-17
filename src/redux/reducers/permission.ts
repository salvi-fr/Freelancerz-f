import {
    CREATE_PERMISSION_SUCCESS,
    CREATE_PERMISSION_LOADING,
    CREATE_PERMISSION_FAILED,
    UPDATE_PERMISSION_SUCCESS,
    UPDATE_PERMISSION_LOADING,
    UPDATE_PERMISSION_FAILED,
    DELETE_PERMISSION_SUCCESS,
    DELETE_PERMISSION_FAILED,
    DELETE_PERMISSION_LOADING,
    GET_PERMISSION_SUCCESS,
    GET_PERMISSION_FAILED,
    GET_PERMISSION_LOADING,
    GET_PERMISSIONS_SUCCESS
    , GET_PERMISSIONS_FAILED,
    GET_PERMISSIONS_LOADING
} from './types';
import {IPermission,IResponsePaging} from 'types'
export const InitialPermissionState = {
    getPermissionloading: false,
    getPermissionSuccess: false,
    getPermissionFailed: false,
    createPermissionloading: false,
    createPermissionSuccess: false,
    createPermissionFailed: false,
    updatePermissionloading: false,
    updatePermissionSuccess: false,
    updatePermissionFailed: false,
    deletePermissionloading: false,
    deletePermissionSuccess: false,
    deletePermissionFailed: false,
    getPermissionsloading: false,
    getPermissionsSuccess: false,
    getPermissionsFailed: false,
    permissions:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    permission:null,
    error: null,

}
export type PermissionState = {
    readonly getPermissionloading?: boolean,
    readonly getPermissionSuccess?: boolean,
    readonly getPermissionFailed?: boolean,
    readonly createPermissionloading?: boolean,
    readonly createPermissionSuccess?: boolean,
    readonly createPermissionFailed?: boolean,
    readonly updatePermissionloading?: boolean,
    readonly updatePermissionSuccess?: boolean,
    readonly updatePermissionFailed?: boolean,
    readonly deletePermissionloading?: boolean,
    readonly deletePermissionSuccess?: boolean,
    readonly deletePermissionFailed?: boolean,
    readonly getPermissionsloading?: boolean,
    readonly getPermissionsSuccess?: boolean,
    readonly getPermissionsFailed?: boolean,
    readonly permissions?: IResponsePaging,
    readonly permission?: IPermission,
    readonly error?: string,

}

export type permissionActionType = {
    type: string;
    payload: PermissionState
};



export const permissionReducer: React.Reducer<PermissionState, permissionActionType> = (
    state: PermissionState=InitialPermissionState,
    action: permissionActionType
) => {
    switch (action.type) {
        case CREATE_PERMISSION_SUCCESS: {
            return {
                ...state,
                createPermissionloading: false,
                createPermissionSuccess: true,
                permission: action.payload.permission,
            }
        }
        case CREATE_PERMISSION_LOADING: {
            return {
                ...state,
                createPermissionloading: true,
            }
        }
        case CREATE_PERMISSION_FAILED: {
            return {
                ...state,
                createPermissionloading: false,
                createPermissionFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_PERMISSION_SUCCESS: {
            return {
                ...state,
                updatePermissionloading: false,
                updatePermissionSuccess: true,
                permission: action.payload.permission
            }
        }
        case UPDATE_PERMISSION_LOADING: {
            return {
                ...state,
                updatePermissionloading: true
            }
        }
        case UPDATE_PERMISSION_FAILED: {
            return {
                ...state,
                updatePermissionloading: false,
                updatePermissionFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_PERMISSION_SUCCESS: {
            return {
                ...state,
                deletePermissionloading: false,
                deletePermissionSuccess: true
            }
        }
        case DELETE_PERMISSION_FAILED: {
            return {
                ...state,
                deletePermissionloading: false,
                deletePermissionFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_PERMISSION_LOADING: {
            return {
                ...state,
                deletePermissionloading: true
            }
        }
        case GET_PERMISSION_SUCCESS: {
            return {
                ...state,
                getPermissionloading: false,
                getPermissionSuccess: true,
                permission: action.payload.permission
            }
        }
        case GET_PERMISSION_FAILED: {
            return {
                ...state,
                getPermissionloading: false,
                getPermissionFailed: true,
                error: action.payload.error
            }
        }
        case GET_PERMISSION_LOADING: {
            return {
                ...state,
                getPermissionloading: true
            }
        }
        case GET_PERMISSIONS_SUCCESS: {
            return {
                ...state,
                getPermissionsloading: false,
                getPermissionsSuccess: true,
                permissions: action.payload.permissions
            }
        }
        case GET_PERMISSIONS_FAILED: {
            return {
                ...state,
                getPermissionsloading: false,
                getPermissionsFailed: true,
                error: action.payload.error
            }
        }
        case GET_PERMISSIONS_LOADING: {
            return {
                ...state,
                getPermissionsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};