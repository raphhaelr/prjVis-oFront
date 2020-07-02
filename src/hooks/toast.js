import React, { createContext, useCallback, useState, useContext } from 'react'
import { uuid } from 'uuidv4'
import ToastContainer from '../components/ToastContainer'

const ToastContext = createContext({})

const ToastProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    const addToast = useCallback(
        ({ type, title, description }) => {
            const id = uuid();

            const toast = {
                id,
                type,
                title,
                description,
            };

            setMessages(state => [...state, toast]);
        },
        [],
    );

    const removeToast = useCallback((id) => {
        setMessages(state => state.filter(message => message.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    );
}

function useToast() {
    const context = useContext(ToastContext)

    if (!context) {
        throw new Error('useToast must be used within an ToastProvider.')
    }

    return context
}

export { ToastProvider, useToast }