import { combineReducers } from 'redux'
import {userReducer} from './user'
import {applicationReducer} from './application'
import {authReducer} from './auth'
import { jobReducer} from './job'
import { complainReducer } from './complain'
import { statReducer } from './stats'
const RootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    complain: complainReducer,
    application: applicationReducer,
    job:jobReducer,
    stat: statReducer,
    
})

export type RootState = ReturnType<typeof RootReducer>


export default RootReducer