import {
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_LOADING,
    CREATE_PAYMENT_FAILED,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_LOADING,
    UPDATE_PAYMENT_FAILED,
    DELETE_PAYMENT_SUCCESS,
    DELETE_PAYMENT_FAILED,
    DELETE_PAYMENT_LOADING,
    GET_PAYMENT_SUCCESS,
    GET_PAYMENT_FAILED,
    GET_PAYMENT_LOADING,
    GET_PAYMENTS_SUCCESS
    , GET_PAYMENTS_FAILED,
    GET_PAYMENTS_LOADING
} from './types';
import {IPayment,IResponsePaging} from 'types'
export const InitialPaymentState = {
    getPaymentloading: false,
    getPaymentSuccess: false,
    getPaymentFailed: false,
    createPaymentloading: false,
    createPaymentSuccess: false,
    createPaymentFailed: false,
    updatePaymentloading: false,
    updatePaymentSuccess: false,
    updatePaymentFailed: false,
    deletePaymentloading: false,
    deletePaymentSuccess: false,
    deletePaymentFailed: false,
    getPaymentsloading: false,
    getPaymentsSuccess: false,
    getPaymentsFailed: false,
    payments:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    payment: null,
    error: null,

}
export type PaymentState = {
    readonly getPaymentloading?: boolean,
    readonly getPaymentSuccess?: boolean,
    readonly getPaymentFailed?: boolean,
    readonly createPaymentloading?: boolean,
    readonly createPaymentSuccess?: boolean,
    readonly createPaymentFailed?: boolean,
    readonly updatePaymentloading?: boolean,
    readonly updatePaymentSuccess?: boolean,
    readonly updatePaymentFailed?: boolean,
    readonly deletePaymentloading?: boolean,
    readonly deletePaymentSuccess?: boolean,
    readonly deletePaymentFailed?: boolean,
    readonly getPaymentsloading?: boolean,
    readonly getPaymentsSuccess?: boolean,
    readonly getPaymentsFailed?: boolean,
    readonly payments?: IResponsePaging,
    readonly payment?: IPayment,
    readonly error?: string,

}


export type paymentActionType = {
    type: string;
    payload: PaymentState
};



export const paymentReducer: React.Reducer<PaymentState, paymentActionType> = (
    state: PaymentState=InitialPaymentState,
    action: paymentActionType
) => {
    switch (action.type) {
        case CREATE_PAYMENT_SUCCESS: {
            return {
                ...state,
                createPaymentloading: false,
                createPaymentSuccess: true,
                payment: action.payload.payment,
            }
        }
        case CREATE_PAYMENT_LOADING: {
            return {
                ...state,
                createPaymentloading: true,
            }
        }
        case CREATE_PAYMENT_FAILED: {
            return {
                ...state,
                createPaymentloading: false,
                createPaymentFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_PAYMENT_SUCCESS: {
            return {
                ...state,
                updatePaymentloading: false,
                updatePaymentSuccess: true,
                payment: action.payload.payment
            }
        }
        case UPDATE_PAYMENT_LOADING: {
            return {
                ...state,
                updatePaymentloading: true
            }
        }
        case UPDATE_PAYMENT_FAILED: {
            return {
                ...state,
                updatePaymentloading: false,
                updatePaymentFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_PAYMENT_SUCCESS: {
            return {
                ...state,
                deletePaymentloading: false,
                deletePaymentSuccess: true
            }
        }
        case DELETE_PAYMENT_FAILED: {
            return {
                ...state,
                deletePaymentloading: false,
                deletePaymentFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_PAYMENT_LOADING: {
            return {
                ...state,
                deletePaymentloading: true
            }
        }
        case GET_PAYMENT_SUCCESS: {
            return {
                ...state,
                getPaymentloading: false,
                getPaymentSuccess: true,
                payment: action.payload.payment
            }
        }
        case GET_PAYMENT_FAILED: {
            return {
                ...state,
                getPaymentloading: false,
                getPaymentFailed: true,
                error: action.payload.error
            }
        }
        case GET_PAYMENT_LOADING: {
            return {
                ...state,
                getPaymentloading: true
            }
        }
        case GET_PAYMENTS_SUCCESS: {
            return {
                ...state,
                getPaymentsloading: false,
                getPaymentsSuccess: true,
                payments: action.payload.payments
            }
        }
        case GET_PAYMENTS_FAILED: {
            return {
                ...state,
                getPaymentsloading: false,
                getPaymentsFailed: true,
                error: action.payload.error
            }
        }
        case GET_PAYMENTS_LOADING: {
            return {
                ...state,
                getPaymentsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};