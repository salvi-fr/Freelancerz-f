import {
    CREATE_CERTIFICATE_SUCCESS,
    CREATE_CERTIFICATE_LOADING,
    CREATE_CERTIFICATE_FAILED,
    UPDATE_CERTIFICATE_SUCCESS,
    UPDATE_CERTIFICATE_LOADING,
    UPDATE_CERTIFICATE_FAILED,
    DELETE_CERTIFICATE_SUCCESS,
    DELETE_CERTIFICATE_FAILED,
    DELETE_CERTIFICATE_LOADING,
    GET_CERTIFICATE_SUCCESS,
    GET_CERTIFICATE_FAILED,
    GET_CERTIFICATE_LOADING,
    GET_CERTIFICATES_SUCCESS
    , GET_CERTIFICATES_FAILED,
    GET_CERTIFICATES_LOADING
} from './types';
import {ICertificate,IResponsePaging} from 'types'
export const InitialCertificateState = {
    getCertificateloading: false,
    getCertificateSuccess: false,
    getCertificateFailed: false,
    createCertificateloading: false,
    createCertificateSuccess: false,
    createCertificateFailed: false,
    updateCertificateloading: false,
    updateCertificateSuccess: false,
    updateCertificateFailed: false,
    deleteCertificateloading: false,
    deleteCertificateSuccess: false,
    deleteCertificateFailed: false,
    getCertificatesloading: false,
    getCertificatesSuccess: false,
    getCertificatesFailed: false,
    certificates:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    certificate: null,
    error: null,

}
export type CertificateState = {
    readonly getCertificateloading?: boolean,
    readonly getCertificateSuccess?: boolean,
    readonly getCertificateFailed?: boolean,
    readonly createCertificateloading?: boolean,
    readonly createCertificateSuccess?: boolean,
    readonly createCertificateFailed?: boolean,
    readonly updateCertificateloading?: boolean,
    readonly updateCertificateSuccess?: boolean,
    readonly updateCertificateFailed?: boolean,
    readonly deleteCertificateloading?: boolean,
    readonly deleteCertificateSuccess?: boolean,
    readonly deleteCertificateFailed?: boolean,
    readonly getCertificatesloading?: boolean,
    readonly getCertificatesSuccess?: boolean,
    readonly getCertificatesFailed?: boolean,
    readonly certificates?: IResponsePaging,
    readonly certificate?: ICertificate,
    readonly error?: string,

}


export type certificateActionType = {
    type: string;
    payload: CertificateState
};



export const certificateReducer: React.Reducer<CertificateState, certificateActionType> = (
    state: CertificateState= InitialCertificateState,
    action: certificateActionType
) => {
    switch (action.type) {
        case CREATE_CERTIFICATE_SUCCESS: {
            return {
                ...state,
                createCertificateloading: false,
                createCertificateSuccess: true,
                certificate: action.payload.certificate,
            }
        }
        case CREATE_CERTIFICATE_LOADING: {
            return {
                ...state,
                createCertificateloading: true,
            }
        }
        case CREATE_CERTIFICATE_FAILED: {
            return {
                ...state,
                createCertificateloading: false,
                createCertificateFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_CERTIFICATE_SUCCESS: {
            return {
                ...state,
                updateCertificateloading: false,
                updateCertificateSuccess: true,
                certificate: action.payload.certificate
            }
        }
        case UPDATE_CERTIFICATE_LOADING: {
            return {
                ...state,
                updateCertificateloading: true
            }
        }
        case UPDATE_CERTIFICATE_FAILED: {
            return {
                ...state,
                updateCertificateloading: false,
                updateCertificateFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_CERTIFICATE_SUCCESS: {
            return {
                ...state,
                deleteCertificateloading: false,
                deleteCertificateSuccess: true
            }
        }
        case DELETE_CERTIFICATE_FAILED: {
            return {
                ...state,
                deleteCertificateloading: false,
                deleteCertificateFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_CERTIFICATE_LOADING: {
            return {
                ...state,
                deleteCertificateloading: true
            }
        }
        case GET_CERTIFICATE_SUCCESS: {
            return {
                ...state,
                getCertificateloading: false,
                getCertificateSuccess: true,
                certificate: action.payload.certificate
            }
        }
        case GET_CERTIFICATE_FAILED: {
            return {
                ...state,
                getCertificateloading: false,
                getCertificateFailed: true,
                error: action.payload.error
            }
        }
        case GET_CERTIFICATE_LOADING: {
            return {
                ...state,
                getCertificateloading: true
            }
        }
        case GET_CERTIFICATES_SUCCESS: {
            return {
                ...state,
                getCertificatesloading: false,
                getCertificatesSuccess: true,
                certificates: action.payload.certificates
            }
        }
        case GET_CERTIFICATES_FAILED: {
            return {
                ...state,
                getCertificatesloading: false,
                getCertificatesFailed: true,
                error: action.payload.error
            }
        }
        case GET_CERTIFICATES_LOADING: {
            return {
                ...state,
                getCertificatesloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};