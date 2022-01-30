import React, { createContext, useContext, useMemo, useEffect, useReducer } from 'react';
import {
  initialState,
  rootActionType,
  rootReducer,
} from '../../reducers/rootReducer';
import {setSession,isValidToken} from '@utils/utils';
import axios from '@lib/http/client'
import {IUserLogin} from 'types'

const AppContext = createContext(null);

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);


  const login = async (email: string, password: string) => {
    dispatch ({ type: "LOGIN_AUTH_LOADING" });
    axios.post('/api/auth/login',{
    email,
    password}
  ).then((res) => {
    const { token} = res.data

    setSession(token)
        dispatch({
            type: "LOGIN_AUTH_SUCCESS",
            payload: {user:res.data,
              isAuthenticated: true},
        })
    }).catch(function (error) {
        dispatch ({ type: "LOGIN_AUTH_FAILED", 
            payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request",
            isAuthenticated: false}  })
      });
  }

  const loginWithToken = async () => {
    dispatch ({ type: "LOGIN_AUTH_LOADING" });
    axios.get('/api/user'
  ).then((res) => {
        dispatch({
            type: "LOGIN_AUTH_SUCCESS",
            payload: {isAuthenticated: true,user:res.data},
        })
    }).catch(function (error) {
    
      setSession(null)
        dispatch ({ type: "LOGIN_AUTH_FAILED", 
            payload:{error:error?.response?.data?.error? error.response.data.error: "Error Accured with the request",isAuthenticated: false}  })
      });
  }



  const logout = () => {
    setSession(null)
    dispatch({ type: 'LOGOUT' })
    if (typeof window !== "undefined") {
      
        window.location.href = "/login";
      }
  }

  useEffect(() => {
    ; (async () => {
      try {
        const access = window.localStorage.getItem('accessToken')
        if (access && isValidToken(access)) {
          setSession(access)
          await loginWithToken ()
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
    return { state,login,logout, dispatch,loginWithToken };
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
    loginWithToken:()=>void,
  }>(AppContext);

export default AppContext;
