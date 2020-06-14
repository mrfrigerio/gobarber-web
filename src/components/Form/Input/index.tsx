import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback
} from 'react'
import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { Container, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ icon: Icon, name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback((): void => {
    setIsFilled(!!inputRef.current?.value)
    setIsFocused(false)
  }, [])

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && (
        <Error message={error}>
          <FiAlertCircle />
        </Error>
      )}
    </Container>
  )
}

export default Input
