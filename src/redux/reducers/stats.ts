import {
    GET_STATS_SUCCESS
    , GET_STATS_FAILED,
    GET_STATS_LOADING
} from './types';
import {IStats,IResponsePaging} from 'types'
export const InitialRoleState = {
    getStatsloading: false,
    getStatsSuccess: false,
    getStatsFailed: false,
    stats:null,
    stat: null,
    error: null,

}
export type RoleState = {
    readonly getStatsloading?: boolean,
    readonly getStatsSuccess?: boolean,
    readonly getStatsFailed?: boolean,
    readonly stats?: IStats|null,
    readonly error?: string,

}

export type statActionType = {
    type: string;
    payload: RoleState
};



export const statReducer: React.Reducer<RoleState, statActionType> = (
    state: RoleState= InitialRoleState,
    action: statActionType
) => {
    switch (action.type) {
        case GET_STATS_SUCCESS: {
            return {
                ...state,
                getStatsloading: false,
                getStatsSuccess: true,
                stats: action.payload.stats
            }
        }
        case GET_STATS_FAILED: {
            return {
                ...state,
                getStatsloading: false,
                getStatsFailed: true,
                error: action.payload.error
            }
        }
        case GET_STATS_LOADING: {
            return {
                ...state,
                getStatsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};