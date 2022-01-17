import {
    CREATE_ANNOUNCEMENT_SUCCESS,
    CREATE_ANNOUNCEMENT_LOADING,
    CREATE_ANNOUNCEMENT_FAILED,
    UPDATE_ANNOUNCEMENT_SUCCESS,
    UPDATE_ANNOUNCEMENT_LOADING,
    UPDATE_ANNOUNCEMENT_FAILED,
    DELETE_ANNOUNCEMENT_SUCCESS,
    DELETE_ANNOUNCEMENT_FAILED,
    DELETE_ANNOUNCEMENT_LOADING,
    GET_ANNOUNCEMENT_SUCCESS,
    GET_ANNOUNCEMENT_FAILED,
    GET_ANNOUNCEMENT_LOADING,
    GET_ANNOUNCEMENTS_SUCCESS
    , GET_ANNOUNCEMENTS_FAILED,
    GET_ANNOUNCEMENTS_LOADING
} from './types';
import {IAnnouncement,IResponsePaging} from 'types'

export const InitialAnnouncementState = {
    getAnnouncementloading: false,
    getAnnouncementSuccess: false,
    getAnnouncementFailed: false,
    createAnnouncementloading: false,
    createAnnouncementSuccess: false,
    createAnnouncementFailed: false,
    updateAnnouncementloading: false,
    updateAnnouncementSuccess: false,
    updateAnnouncementFailed: false,
    deleteAnnouncementloading: false,
    deleteAnnouncementSuccess: false,
    deleteAnnouncementFailed: false,
    getAnnouncementsloading: false,
    getAnnouncementsSuccess: false,
    getAnnouncementsFailed: false,
    announcements:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    announcement: null,
    error: null,

}
export type AnnouncementState = {
    readonly getAnnouncementloading?: boolean,
    readonly getAnnouncementSuccess?: boolean,
    readonly getAnnouncementFailed?: boolean,
    readonly createAnnouncementloading?: boolean,
    readonly createAnnouncementSuccess?: boolean,
    readonly createAnnouncementFailed?: boolean,
    readonly updateAnnouncementloading?: boolean,
    readonly updateAnnouncementSuccess?: boolean,
    readonly updateAnnouncementFailed?: boolean,
    readonly deleteAnnouncementloading?: boolean,
    readonly deleteAnnouncementSuccess?: boolean,
    readonly deleteAnnouncementFailed?: boolean,
    readonly getAnnouncementsloading?: boolean,
    readonly getAnnouncementsSuccess?: boolean,
    readonly getAnnouncementsFailed?: boolean,
    readonly announcements?: IResponsePaging,
    readonly announcement?: IAnnouncement,
    readonly error?: string,

}


export type announcementActionType = {
    type: string;
    payload: AnnouncementState
};



export const announcementReducer: React.Reducer<AnnouncementState, announcementActionType> = (
    state: AnnouncementState= InitialAnnouncementState,
    action: announcementActionType
) => {
    switch (action.type) {
        case CREATE_ANNOUNCEMENT_SUCCESS: {
            return {
                ...state,
                createAnnouncementloading: false,
                createAnnouncementSuccess: true,
                announcement: action.payload.announcement,
            }
        }
        case CREATE_ANNOUNCEMENT_LOADING: {
            return {
                ...state,
                createAnnouncementloading: true,
            }
        }
        case CREATE_ANNOUNCEMENT_FAILED: {
            return {
                ...state,
                createAnnouncementloading: false,
                createAnnouncementFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_ANNOUNCEMENT_SUCCESS: {
            return {
                ...state,
                updateAnnouncementloading: false,
                updateAnnouncementSuccess: true,
                announcement: action.payload.announcement
            }
        }
        case UPDATE_ANNOUNCEMENT_LOADING: {
            return {
                ...state,
                updateAnnouncementloading: true
            }
        }
        case UPDATE_ANNOUNCEMENT_FAILED: {
            return {
                ...state,
                updateAnnouncementloading: false,
                updateAnnouncementFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_ANNOUNCEMENT_SUCCESS: {
            return {
                ...state,
                deleteAnnouncementloading: false,
                deleteAnnouncementSuccess: true
            }
        }
        case DELETE_ANNOUNCEMENT_FAILED: {
            return {
                ...state,
                deleteAnnouncementloading: false,
                deleteAnnouncementFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_ANNOUNCEMENT_LOADING: {
            return {
                ...state,
                deleteAnnouncementloading: true
            }
        }
        case GET_ANNOUNCEMENT_SUCCESS: {
            return {
                ...state,
                getAnnouncementloading: false,
                getAnnouncementSuccess: true,
                announcement: action.payload.announcement
            }
        }
        case GET_ANNOUNCEMENT_FAILED: {
            return {
                ...state,
                getAnnouncementloading: false,
                getAnnouncementFailed: true,
                error: action.payload.error
            }
        }
        case GET_ANNOUNCEMENT_LOADING: {
            return {
                ...state,
                getAnnouncementloading: true
            }
        }
        case GET_ANNOUNCEMENTS_SUCCESS: {
            return {
                ...state,
                getAnnouncementsloading: false,
                getAnnouncementsSuccess: true,
                announcements: action.payload.announcements
            }
        }
        case GET_ANNOUNCEMENTS_FAILED: {
            return {
                ...state,
                getAnnouncementsloading: false,
                getAnnouncementsFailed: true,
                error: action.payload.error
            }
        }
        case GET_ANNOUNCEMENTS_LOADING: {
            return {
                ...state,
                getAnnouncementsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};