import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";


export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'AUTH_IS_READY': 
            return { ...state, user: action.payload, authIsReady: true }
        case 'LOGOUT':
            return { ...state, user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady:false
    })

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged(user => {
            console.log('user is',user);
            dispatch({ type: 'AUTH_IS_READY', payload: user })
            unsub()
        })
    }, [])

    console.log('Authcontext stata -', state);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
          {children}
    </AuthContext.Provider>
  )
}