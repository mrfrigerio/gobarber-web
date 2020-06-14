import React from 'react'
import { Container } from './styles'
import Toast from './Toast'
import { ToastProps } from '../../context/ToastContext'

const ToastContainer: React.FC<{ toasts: ToastProps[] }> = ({ toasts }) => {
  return (
    <Container>
      {!!toasts.length &&
        toasts.map(toast => {
          if (toast.visible) {
            return (
              <Toast
                id={toast.id}
                key={toast.id}
                type={toast.type}
                title={toast.title}
                description={toast.description}
                visible
              />
            )
          }
          return null
        })}
    </Container>
  )
}
export default ToastContainer
