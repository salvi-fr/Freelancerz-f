import {
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_LOADING,
    CREATE_EVENT_FAILED,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_LOADING,
    UPDATE_EVENT_FAILED,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAILED,
    DELETE_EVENT_LOADING,
    GET_EVENT_SUCCESS,
    GET_EVENT_FAILED,
    GET_EVENT_LOADING,
    GET_EVENTS_SUCCESS
    , GET_EVENTS_FAILED,
    GET_EVENTS_LOADING
} from './types';
import {IEvent,IResponsePaging} from 'types'
export const InitialEventState = {
    getEventloading: false,
    getEventSuccess: false,
    getEventFailed: false,
    createEventloading: false,
    createEventSuccess: false,
    createEventFailed: false,
    updateEventloading: false,
    updateEventSuccess: false,
    updateEventFailed: false,
    deleteEventloading: false,
    deleteEventSuccess: false,
    deleteEventFailed: false,
    getEventsloading: false,
    getEventsSuccess: false,
    getEventsFailed: false,
    events:  {
        totalData: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0,
        data: []},
    event: null,
    error: null,

}
export type EventState = {
    readonly getEventloading?: boolean,
    readonly getEventSuccess?: boolean,
    readonly getEventFailed?: boolean,
    readonly createEventloading?: boolean,
    readonly createEventSuccess?: boolean,
    readonly createEventFailed?: boolean,
    readonly updateEventloading?: boolean,
    readonly updateEventSuccess?: boolean,
    readonly updateEventFailed?: boolean,
    readonly deleteEventloading?: boolean,
    readonly deleteEventSuccess?: boolean,
    readonly deleteEventFailed?: boolean,
    readonly getEventsloading?: boolean,
    readonly getEventsSuccess?: boolean,
    readonly getEventsFailed?: boolean,
    readonly events?: IResponsePaging,
    readonly event?: IEvent,
    readonly error?: string,

}
export type EventItem = {
    id: string | number;
    title: string;
    description?: number;
    content: number;
    type?: string;
    activated: boolean;
    created_by: string;
};

export type eventActionType = {
    type: string;
    payload: EventState
};



export const eventReducer: React.Reducer<EventState , eventActionType> = (
    state: EventState = InitialEventState,
    action: eventActionType
) => {
    switch (action.type) {
        case CREATE_EVENT_SUCCESS: {
            return {
                ...state,
                createEventloading: false,
                createEventSuccess: true,
                event: action.payload.event,
            }
        }
        case CREATE_EVENT_LOADING: {
            return {
                ...state,
                createEventloading: true,
            }
        }
        case CREATE_EVENT_FAILED: {
            return {
                ...state,
                createEventloading: false,
                createEventFailed: true,
                error: action.payload.error,
            }
        }
        case UPDATE_EVENT_SUCCESS: {
            return {
                ...state,
                updateEventloading: false,
                updateEventSuccess: true,
                event: action.payload.event
            }
        }
        case UPDATE_EVENT_LOADING: {
            return {
                ...state,
                updateEventloading: true
            }
        }
        case UPDATE_EVENT_FAILED: {
            return {
                ...state,
                updateEventloading: false,
                updateEventFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_EVENT_SUCCESS: {
            return {
                ...state,
                deleteEventloading: false,
                deleteEventSuccess: true
            }
        }
        case DELETE_EVENT_FAILED: {
            return {
                ...state,
                deleteEventloading: false,
                deleteEventFailed: true,
                error: action.payload.error
            }
        }
        case DELETE_EVENT_LOADING: {
            return {
                ...state,
                deleteEventloading: true
            }
        }
        case GET_EVENT_SUCCESS: {
            return {
                ...state,
                getEventloading: false,
                getEventSuccess: true,
                event: action.payload.event
            }
        }
        case GET_EVENT_FAILED: {
            return {
                ...state,
                getEventloading: false,
                getEventFailed: true,
                error: action.payload.error
            }
        }
        case GET_EVENT_LOADING: {
            return {
                ...state,
                getEventloading: true
            }
        }
        case GET_EVENTS_SUCCESS: {
            return {
                ...state,
                getEventsloading: false,
                getEventsSuccess: true,
                events: action.payload.events
            }
        }
        case GET_EVENTS_FAILED: {
            return {
                ...state,
                getEventsloading: false,
                getEventsFailed: true,
                error: action.payload.error
            }
        }
        case GET_EVENTS_LOADING: {
            return {
                ...state,
                getEventsloading: true
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
};