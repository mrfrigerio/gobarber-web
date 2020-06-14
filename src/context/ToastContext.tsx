import React, { createContext, useContext, useCallback, useState } from 'react'
import { uuid } from 'uuidv4'
import ToastContainer from '../components/ToastContainer'

interface ToastContextData {
  addToast: ({ type, description, visible }: Omit<ToastProps, 'id'>) => void
  removeToast: (id: string) => void
}

type ToastTypes = 'success' | 'error' | 'info'

export interface ToastProps {
  id?: string
  type?: ToastTypes
  title?: string
  description?: string
  visible?: boolean
}

const ToastContext = createContext<Partial<ToastContextData>>({})

const ToastProvider: React.FC<ToastProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = useCallback(
    ({
      type,
      title,
      description,
      visible = true
    }: Omit<ToastProps, 'id'>): void => {
      const newToast = { id: uuid(), type, title, description, visible }
      setToasts(oldToasts => [...oldToasts, newToast])
    },
    []
  )

  const removeToast = useCallback((id: string): void => {
    setToasts(oldToasts => oldToasts.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  )
}

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be user within a ToastProvider')
  }
  return context as ToastContextData
}

export { ToastProvider, useToast }
