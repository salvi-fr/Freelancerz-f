import React, { createContext, useContext, useMemo, useEffect, useReducer } from 'react';
import { ContextDevTool } from "react-context-devtool";
import {
  initialState,
  rootActionType,
  rootReducer,
} from '../../reducers/rootReducer';
import {setSession,isValidToken} from '@utils/utils';
import axios from '@lib/http/client'
import {IUserLogin, IUserCreate} from 'types'

const AppContext = createContext(null);

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);


  const login = async (email: string, password: string) => {
    dispatch ({ type: "LOGIN_AUTH_LOADING" });
    axios.post('/api/auth/login',{
    email,
    password}
  ).then((res) => {
    const { accessToken, refreshToken } = res.data

    setSession(accessToken, refreshToken)
        dispatch({
            type: "LOGIN_AUTH_SUCCESS",
            payload: {user:res.data.data,
              isAuthenticated: true},
        })
    }).catch(function (error) {
        dispatch ({ type: "LOGIN_AUTH_FAILED", 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request",
            isAuthenticated: false}  })
      });
  }

  const loginWithToken = async () => {
    dispatch ({ type: "LOGIN_AUTH_LOADING" });
    axios.get('/api/user/me'
  ).then((res) => {
        dispatch({
            type: "LOGIN_AUTH_SUCCESS",
            payload: {isAuthenticated: true,user:res.data.data},
        })
    }).catch(function (error) {
    
      setSession(null, null)
        dispatch ({ type: "LOGIN_AUTH_FAILED", 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request",isAuthenticated: false}  })
      });
  }

  const refreshToken = async (refresh:string) => {
    console.log("refresh token")
    dispatch ({ type: "REFRESH_AUTH_LOADING" });
    axios.defaults.headers.common.Authorization = `Bearer ${refresh}`
    axios.post('/api/auth/refresh').then((res) => {
      const { accessToken, refreshToken:rt } = res.data
          setSession(accessToken, rt)
        dispatch({
            type: "REFRESH_AUTH_SUCCESS",
            payload: {user:res.data.data,isAuthenticated: true},
        })
    }).catch(function (error) {
      console.log(error)
        dispatch ({ type: "REFRESH_AUTH_FAILED", 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request",isAuthenticated: false}})
      });
      
  }
  const register = async (data:IUserCreate) => {

    dispatch ({ type: "SIGNUP_AUTH_LOADING" });
    axios.post('/api/auth/signup',{...data}).then((res) => {
        dispatch({
            type: "SIGNUP_AUTH_SUCCESS",
            payload: {auth:res.data.data},
        })
    }).catch(function (error) {
        dispatch ({ type: "SIGNUP_AUTH_FAILED", 
            payload:{error:error?.response?.data?.message? error.response.data.message: "Error Accured with the request"} })
      });
  }
  const logout = () => {
    setSession(null, null)
    dispatch({ type: 'LOGOUT' })
    if (typeof window !== "undefined") {
      
        window.location.href = "/login";
      }
  }

  useEffect(() => {
    ; (async () => {
      try {
        const access = window.localStorage.getItem('accessToken')
        const refresh = window.localStorage.getItem('refreshToken')
        if (access && isValidToken(access)) {
          setSession(access, refresh)
          await loginWithToken ()
        
        } else if (refresh && isValidToken(refresh)) {
      await refreshToken(refresh)
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
  const contextValue = useMemo(() => {
    return { state,login,register,logout,refreshToken, dispatch,loginWithToken };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>
      {/* <ContextDevTool context={AppContext} id="app-context" displayName="App" /> */}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () =>
  useContext<{
    state: typeof initialState;
    dispatch: (args: rootActionType) => void;
    method: 'JWT';
    login: (args:IUserLogin) => void;
    logout: () => {},
    refreshToken:()=>void,
    loginWithToken:()=>void,
    register: (args:IUserCreate) => void;
  }>(AppContext);

export default AppContext;
