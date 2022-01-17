
import {
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_LOADING,
    CREATE_ROLE_FAILED,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_LOADING,
    UPDATE_ROLE_FAILED,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_FAILED,
    DELETE_ROLE_LOADING,
    GET_ROLE_SUCCESS,
    GET_ROLE_FAILED,
    GET_ROLE_LOADING,
    GET_ROLES_SUCCESS
    , GET_ROLES_FAILED,
    GET_ROLES_LOADING
} from './types';
import {IRole,IResponsePaging} from 'types'
export const InitialRoleState = {
    getRoleloading: false,
    getRoleSuccess: false,
    getRoleFailed: false,
    createRoleloading: false,
    createRoleSuccess: false,
    createRoleFailed: false,
    updateRoleloading: false,
    updateRoleSuccess: false,
    updateRoleFailed: false,
    deleteRoleloading: false,
    deleteRoleSuccess: false,
    deleteRoleFailed: false,
    getRolesloading: false,
    getRolesSuccess: false,
    getRolesFailed: false,
    roles:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    role: null,
    error: null,

}
export type RoleState = {
    readonly getRoleloading?: boolean,
    readonly getRoleSuccess?: boolean,
    readonly getRoleFailed?: boolean,
    readonly createRoleloading?: boolean,
    readonly createRoleSuccess?: boolean,
    readonly createRoleFailed?: boolean,
    readonly updateRoleloading?: boolean,
    readonly updateRoleSuccess?: boolean,
    readonly updateRoleFailed?: boolean,
    readonly deleteRoleloading?: boolean,
    readonly deleteRoleSuccess?: boolean,
    readonly deleteRoleFailed?: boolean,
    readonly getRolesloading?: boolean,
    readonly getRolesSuccess?: boolean,
    readonly getRolesFailed?: boolean,
    readonly roles?: IResponsePaging,
    readonly role?: IRole|null,
    readonly error?: string,

}

export type roleActionType = {
    type: string;
    payload: RoleState
};



export const roleReducer: React.Reducer<RoleState, roleActionType> = (
    state: RoleState= InitialRoleState,
    action: roleActionType
) => {
    switch (action.type) {
        case CREATE_ROLE_SUCCESS: {
            return {
                ...state,
                createRoleloading: false,
                createRoleSuccess: true,
                role: action.payload.role,
            }
        }
        case CREATE_ROLE_LOADING: {
            return {
                ...state,
                createRoleloading: true,
            }
        }
        case CREATE_ROLE_FAILED: {
            return {
                ...state,
                createRoleloading: false,
                createRoleFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_ROLE_SUCCESS: {
            return {
                ...state,
                updateRoleloading: false,
                updateRoleSuccess: true,
                role: action.payload.role
            }
        }
        case UPDATE_ROLE_LOADING: {
            return {
                ...state,
                updateRoleloading: true
            }
        }
        case UPDATE_ROLE_FAILED: {
            return {
                ...state,
                updateRoleloading: false,
                updateRoleFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_ROLE_SUCCESS: {
            return {
                ...state,
                deleteRoleloading: false,
                deleteRoleSuccess: true
            }
        }
        case DELETE_ROLE_FAILED: {
            return {
                ...state,
                deleteRoleloading: false,
                deleteRoleFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_ROLE_LOADING: {
            return {
                ...state,
                deleteRoleloading: true
            }
        }
        case GET_ROLE_SUCCESS: {
            return {
                ...state,
                getRoleloading: false,
                getRoleSuccess: true,
                role: action.payload.role
            }
        }
        case GET_ROLE_FAILED: {
            return {
                ...state,
                getRoleloading: false,
                getRoleFailed: true,
                error: action.payload.error
            }
        }
        case GET_ROLE_LOADING: {
            return {
                ...state,
                getRoleloading: true
            }
        }
        case GET_ROLES_SUCCESS: {
            return {
                ...state,
                getRolesloading: false,
                getRolesSuccess: true,
                roles: action.payload.roles
            }
        }
        case GET_ROLES_FAILED: {
            return {
                ...state,
                getRolesloading: false,
                getRolesFailed: true,
                error: action.payload.error
            }
        }
        case GET_ROLES_LOADING: {
            return {
                ...state,
                getRolesloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};