import {
    CREATE_USER_SUCCESS,
    CREATE_USER_LOADING,
    CREATE_USER_FAILED,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_LOADING,
    UPDATE_USER_FAILED,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED,
    DELETE_USER_LOADING,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    GET_USER_LOADING,
    GET_ME_SUCCESS,
    GET_ME_FAILED,
    GET_ME_LOADING,
    GET_USERS_SUCCESS
    , GET_USERS_FAILED,
    GET_USERS_LOADING
} from './types';
import {IUser,IResponsePaging} from 'types'
export const InitialUserState:UserState = {
    getUserloading: false,
    getUserSuccess: false,
    getUserFailed: false,
    getMeloading: false,
    getMeSuccess: false,
    getMeFailed: false,
    createUserloading: false,
    createUserSuccess: false,
    createUserFailed: false,
    updateUserloading: false,
    updateUserSuccess: false,
    updateUserFailed: false,
    deleteUserloading: false,
    deleteUserSuccess: false,
    deleteUserFailed: false,
    getUsersloading: false,
    getUsersSuccess: false,
    getUsersFailed: false,
    profile:null,
    users: {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    user: null,
    error: null,

}
export type UserState = {
    readonly getUserloading?: boolean,
    readonly getUserSuccess?: boolean,
    readonly getUserFailed?: boolean,
    readonly getMeloading?: boolean,
    readonly getMeSuccess?: boolean,
    readonly getMeFailed?: boolean,
    readonly createUserloading?: boolean,
    readonly createUserSuccess?: boolean,
    readonly createUserFailed?: boolean,
    readonly updateUserloading?: boolean,
    readonly updateUserSuccess?: boolean,
    readonly updateUserFailed?: boolean,
    readonly deleteUserloading?: boolean,
    readonly deleteUserSuccess?: boolean,
    readonly deleteUserFailed?: boolean,
    readonly getUsersloading?: boolean,
    readonly getUsersSuccess?: boolean,
    readonly getUsersFailed?: boolean,
    readonly profile?: IUser| null,
    readonly users?: IResponsePaging,
    readonly user?: IUser,
    readonly error?: string,

}

export type userActionType = {
    type: string;
    payload: UserState
};



export const userReducer: React.Reducer<UserState, userActionType> = (
    state: UserState= InitialUserState,
    action: userActionType
) => {
    switch (action.type) {
        case CREATE_USER_SUCCESS: {
            return {
                ...state,
                createUserloading: false,
                createUserSuccess: true,
                user: action.payload.user,
            }
        }
        case CREATE_USER_LOADING: {
            return {
                ...state,
                createUserloading: true,
            }
        }
        case CREATE_USER_FAILED: {
            return {
                ...state,
                createUserloading: false,
                createUserFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserloading: false,
                updateUserSuccess: true,
                user: action.payload.user
            }
        }
        case UPDATE_USER_LOADING: {
            return {
                ...state,
                updateUserloading: true
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserloading: false,
                updateUserFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_USER_SUCCESS: {
            return {
                ...state,
                deleteUserloading: false,
                deleteUserSuccess: true
            }
        }
        case DELETE_USER_FAILED: {
            return {
                ...state,
                deleteUserloading: false,
                deleteUserFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_USER_LOADING: {
            return {
                ...state,
                deleteUserloading: true
            }
        }
        case GET_ME_SUCCESS: {
            return {
                ...state,
                getMeloading: false,
                getMeSuccess: true,
                profile: action.payload.profile
            }
        }
        case GET_ME_FAILED: {
            return {
                ...state,
                getMeloading: false,
                getMeFailed: true,
                error: action.payload.error
            }
        }
        case GET_ME_LOADING: {
            return {
                ...state,
                getMeloading: true
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserloading: false,
                getUserSuccess: true,
                user: action.payload.user
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserloading: false,
                getUserFailed: true,
                error: action.payload.error
            }
        }
        case GET_USER_LOADING: {
            return {
                ...state,
                getUserloading: true
            }
        }
        case GET_USERS_SUCCESS: {
            return {
                ...state,
                getUsersloading: false,
                getUsersSuccess: true,
                users: action.payload.users
            }
        }
        case GET_USERS_FAILED: {
            return {
                ...state,
                getUsersloading: false,
                getUsersFailed: true,
                error: action.payload.error
            }
        }
        case GET_USERS_LOADING: {
            return {
                ...state,
                getUsersloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};