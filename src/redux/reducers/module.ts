import {
    CREATE_MODULE_SUCCESS,
    CREATE_MODULE_LOADING,
    CREATE_MODULE_FAILED,
    UPDATE_MODULE_SUCCESS,
    UPDATE_MODULE_LOADING,
    UPDATE_MODULE_FAILED,
    DELETE_MODULE_SUCCESS,
    DELETE_MODULE_FAILED,
    DELETE_MODULE_LOADING,
    GET_MODULE_SUCCESS,
    GET_MODULE_FAILED,
    GET_MODULE_LOADING,
    GET_MODULES_SUCCESS
    , GET_MODULES_FAILED,
    GET_MODULES_LOADING
} from './types';
import {IModule,IResponsePaging} from 'types'
export const InitialModuleState = {
    getModuleloading: false,
    getModuleSuccess: false,
    getModuleFailed: false,
    createModuleloading: false,
    createModuleSuccess: false,
    createModuleFailed: false,
    updateModuleloading: false,
    updateModuleSuccess: false,
    updateModuleFailed: false,
    deleteModuleloading: false,
    deleteModuleSuccess: false,
    deleteModuleFailed: false,
    getModulesloading: false,
    getModulesSuccess: false,
    getModulesFailed: false,
    modules:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    module: null,
    error: null,

}
export type ModuleState = {
    readonly getModuleloading?: boolean,
    readonly getModuleSuccess?: boolean,
    readonly getModuleFailed?: boolean,
    readonly createModuleloading?: boolean,
    readonly createModuleSuccess?: boolean,
    readonly createModuleFailed?: boolean,
    readonly updateModuleloading?: boolean,
    readonly updateModuleSuccess?: boolean,
    readonly updateModuleFailed?: boolean,
    readonly deleteModuleloading?: boolean,
    readonly deleteModuleSuccess?: boolean,
    readonly deleteModuleFailed?: boolean,
    readonly getModulesloading?: boolean,
    readonly getModulesSuccess?: boolean,
    readonly getModulesFailed?: boolean,
    readonly modules?: IResponsePaging,
    readonly module?: IModule,
    readonly error?: string,

}


export type moduleActionType = {
    type: string;
    payload: ModuleState
};



export const moduleReducer: React.Reducer<ModuleState, moduleActionType> = (
    state: ModuleState=InitialModuleState,
    action: moduleActionType
) => {
    switch (action.type) {
        case CREATE_MODULE_SUCCESS: {
            return {
                ...state,
                createModuleloading: false,
                createModuleSuccess: true,
                module: action.payload.module,
            }
        }
        case CREATE_MODULE_LOADING: {
            return {
                ...state,
                createModuleloading: true,
            }
        }
        case CREATE_MODULE_FAILED: {
            return {
                ...state,
                createModuleloading: false,
                createModuleFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_MODULE_SUCCESS: {
            return {
                ...state,
                updateModuleloading: false,
                updateModuleSuccess: true,
                module: action.payload.module
            }
        }
        case UPDATE_MODULE_LOADING: {
            return {
                ...state,
                updateModuleloading: true
            }
        }
        case UPDATE_MODULE_FAILED: {
            return {
                ...state,
                updateModuleloading: false,
                updateModuleFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_MODULE_SUCCESS: {
            return {
                ...state,
                deleteModuleloading: false,
                deleteModuleSuccess: true
            }
        }
        case DELETE_MODULE_FAILED: {
            return {
                ...state,
                deleteModuleloading: false,
                deleteModuleFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_MODULE_LOADING: {
            return {
                ...state,
                deleteModuleloading: true
            }
        }
        case GET_MODULE_SUCCESS: {
            return {
                ...state,
                getModuleloading: false,
                getModuleSuccess: true,
                module: action.payload.module
            }
        }
        case GET_MODULE_FAILED: {
            return {
                ...state,
                getModuleloading: false,
                getModuleFailed: true,
                error: action.payload.error
            }
        }
        case GET_MODULE_LOADING: {
            return {
                ...state,
                getModuleloading: true
            }
        }
        case GET_MODULES_SUCCESS: {
            return {
                ...state,
                getModulesloading: false,
                getModulesSuccess: true,
                modules: action.payload.modules
            }
        }
        case GET_MODULES_FAILED: {
            return {
                ...state,
                getModulesloading: false,
                getModulesFailed: true,
                error: action.payload.error
            }
        }
        case GET_MODULES_LOADING: {
            return {
                ...state,
                getModulesloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};