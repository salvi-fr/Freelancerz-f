import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode, { JwtPayload } from 'jwt-decode'


import axios from '@lib/http/client'
// import { MatxLoading } from 'components/matx'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken:string) => {
    if (!accessToken) {
        return false
    }
    const decodedToken = jwtDecode<JwtPayload>(accessToken)
    // const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    console.log(decodedToken)
    return decodedToken.exp > currentTime
}

export const setSession = (accessToken:string|null,refreshToken:string|null) => {
    if (accessToken && refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        localStorage.setItem('accessToken', accessToken)
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
        localStorage.removeItem('refreshToken')
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (email:string, password:string) => {
        console.log('login')
        const response = await axios.post('/api/auth/login', {
            email,
            password,
        })
        console.log(response)
        const { accessToken, refreshToken } = response.data

        setSession(accessToken,refreshToken)

        dispatch({
            type: 'LOGIN',
            payload: {
                // user,
            },
        })
    }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })
console.log(response)
        // const { accessToken, user } = response.data

        // setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                // user,
            },
        })
    }

    const logout = () => {
        setSession(null,null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ;(async () => {
            try {
                console.log("in context api")
                const access = window.localStorage.getItem('accessToken')
                const refresh = window.localStorage.getItem('refreshToken')
                if (access && isValidToken(access)) {
                    setSession(access,null)
                    const response = await axios.get('/api/user/me')
                    const user = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else if(refresh && isValidToken(refresh)) {
                    axios.defaults.headers.common.Authorization = `Bearer ${refresh}`
                    const res = await axios.get('/api/auth/refresh')
                    const { accessToken, refreshToken } = res.data
                    setSession(accessToken,refreshToken)
                    const response = await axios.get('/api/user/me')
                    const user = response.data
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user: user,
                        },
                    })
                }
             else {
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
            }
             catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <p>Loading</p> 
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
