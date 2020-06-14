import React, { useCallback, useState, useEffect } from 'react'
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { Toast } from './styles'
import { ToastProps, useToast } from '../../../context/ToastContext'

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />
}

const ToastComponent: React.FC<ToastProps> = ({
  id,
  type,
  title,
  description
}) => {
  const [visible, setVisible] = useState<boolean>(true)
  const { removeToast } = useToast()

  const handleClose = useCallback((): void => {
    setVisible(false)
    setTimeout(() => {
      removeToast(id as string)
    }, 400)
  }, [id, removeToast])

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        removeToast(id as string)
      }, 400)
    }, 3000)

    return () => {
      clearTimeout(timer)
      removeToast(id as string)
    }
  }, [id, removeToast])

  return (
    <Toast type={type} visible={visible}>
      {icons[type || 'info']}
      <div>
        {!!title && <strong>{title}</strong>}
        {!!description && <p>{description}</p>}
      </div>
      <button type="button" onClick={handleClose}>
        <FiXCircle size={18} />
      </button>
    </Toast>
  )
}
export default ToastComponent
