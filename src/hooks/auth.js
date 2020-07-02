import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'
import decodeToken from 'jwt-decode'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const token = localStorage.getItem('@Visão:token')
        const user = localStorage.getItem('@Visão:user')
        let permission

        if (token && user) {
            permission = decodeToken(token)
  
            return { token, user: JSON.parse(user), type: permission.type }
        }

        return {}
    })

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password
        })

        const { token, user } = response.data
        const { type } = decodeToken(token)

        localStorage.setItem('@Visão:token', token)
        localStorage.setItem('@Visão:user', JSON.stringify(user))

        setData({ token, user,  type})
    }, [])

    const signOut = useCallback(() => {
        localStorage.removeItem('@Visão:token')
        localStorage.removeItem('@Visão:user')

        setData({})
    }, [])

    return (
        <AuthContext.Provider value={{
            token: data.token,
            user: data.user,
            permission: data.type,
            signIn,
            signOut,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

export { AuthProvider, useAuth }