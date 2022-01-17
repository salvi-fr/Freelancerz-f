import {
    CREATE_SUBSCRIPTION_SUCCESS,
    CREATE_SUBSCRIPTION_LOADING,
    CREATE_SUBSCRIPTION_FAILED,
    UPDATE_SUBSCRIPTION_SUCCESS,
    UPDATE_SUBSCRIPTION_LOADING,
    UPDATE_SUBSCRIPTION_FAILED,
    DELETE_SUBSCRIPTION_SUCCESS,
    DELETE_SUBSCRIPTION_FAILED,
    DELETE_SUBSCRIPTION_LOADING,
    GET_SUBSCRIPTION_SUCCESS,
    GET_SUBSCRIPTION_FAILED,
    GET_SUBSCRIPTION_LOADING,
    GET_SUBSCRIPTIONS_SUCCESS
    , GET_SUBSCRIPTIONS_FAILED,
    GET_SUBSCRIPTIONS_LOADING
} from './types';
import {ISubscription,IResponsePaging} from 'types'
export const InitialSubscriptionState = {
    getSubscriptionloading: false,
    getSubscriptionSuccess: false,
    getSubscriptionFailed: false,
    createSubscriptionloading: false,
    createSubscriptionSuccess: false,
    createSubscriptionFailed: false,
    updateSubscriptionloading: false,
    updateSubscriptionSuccess: false,
    updateSubscriptionFailed: false,
    deleteSubscriptionloading: false,
    deleteSubscriptionSuccess: false,
    deleteSubscriptionFailed: false,
    getSubscriptionsloading: false,
    getSubscriptionsSuccess: false,
    getSubscriptionsFailed: false,
    subscriptions:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    subscription: null,
    error: null,

}
export type SubscriptionState = {
    readonly getSubscriptionloading?: boolean,
    readonly getSubscriptionSuccess?: boolean,
    readonly getSubscriptionFailed?: boolean,
    readonly createSubscriptionloading?: boolean,
    readonly createSubscriptionSuccess?: boolean,
    readonly createSubscriptionFailed?: boolean,
    readonly updateSubscriptionloading?: boolean,
    readonly updateSubscriptionSuccess?: boolean,
    readonly updateSubscriptionFailed?: boolean,
    readonly deleteSubscriptionloading?: boolean,
    readonly deleteSubscriptionSuccess?: boolean,
    readonly deleteSubscriptionFailed?: boolean,
    readonly getSubscriptionsloading?: boolean,
    readonly getSubscriptionsSuccess?: boolean,
    readonly getSubscriptionsFailed?: boolean,
    readonly subscriptions?: IResponsePaging,
    readonly subscription?: ISubscription,
    readonly error?: string,

}

export type subscriptionActionType = {
    type: string;
    payload: SubscriptionState
};



export const subscriptionReducer: React.Reducer<SubscriptionState, subscriptionActionType> = (
    state: SubscriptionState= InitialSubscriptionState,
    action: subscriptionActionType
) => {
    switch (action.type) {
        case CREATE_SUBSCRIPTION_SUCCESS: {
            return {
                ...state,
                createSubscriptionloading: false,
                createSubscriptionSuccess: true,
                subscription: action.payload.subscription,
            }
        }
        case CREATE_SUBSCRIPTION_LOADING: {
            return {
                ...state,
                createSubscriptionloading: true,
            }
        }
        case CREATE_SUBSCRIPTION_FAILED: {
            return {
                ...state,
                createSubscriptionloading: false,
                createSubscriptionFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_SUBSCRIPTION_SUCCESS: {
            return {
                ...state,
                updateSubscriptionloading: false,
                updateSubscriptionSuccess: true,
                subscription: action.payload.subscription
            }
        }
        case UPDATE_SUBSCRIPTION_LOADING: {
            return {
                ...state,
                updateSubscriptionloading: true
            }
        }
        case UPDATE_SUBSCRIPTION_FAILED: {
            return {
                ...state,
                updateSubscriptionloading: false,
                updateSubscriptionFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_SUBSCRIPTION_SUCCESS: {
            return {
                ...state,
                deleteSubscriptionloading: false,
                deleteSubscriptionSuccess: true
            }
        }
        case DELETE_SUBSCRIPTION_FAILED: {
            return {
                ...state,
                deleteSubscriptionloading: false,
                deleteSubscriptionFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_SUBSCRIPTION_LOADING: {
            return {
                ...state,
                deleteSubscriptionloading: true
            }
        }
        case GET_SUBSCRIPTION_SUCCESS: {
            return {
                ...state,
                getSubscriptionloading: false,
                getSubscriptionSuccess: true,
                subscription: action.payload.subscription
            }
        }
        case GET_SUBSCRIPTION_FAILED: {
            return {
                ...state,
                getSubscriptionloading: false,
                getSubscriptionFailed: true,
                error: action.payload.error
            }
        }
        case GET_SUBSCRIPTION_LOADING: {
            return {
                ...state,
                getSubscriptionloading: true
            }
        }
        case GET_SUBSCRIPTIONS_SUCCESS: {
            return {
                ...state,
                getSubscriptionsloading: false,
                getSubscriptionsSuccess: true,
                subscriptions: action.payload.subscriptions
            }
        }
        case GET_SUBSCRIPTIONS_FAILED: {
            return {
                ...state,
                getSubscriptionsloading: false,
                getSubscriptionsFailed: true,
                error: action.payload.error
            }
        }
        case GET_SUBSCRIPTIONS_LOADING: {
            return {
                ...state,
                getSubscriptionsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};