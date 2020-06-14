import styled, { css } from 'styled-components'

interface InputContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

interface ErrorProps {
  message: string
}

export const Container = styled.div<InputContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  background: #232129;
  color: #666360;
  padding: 16px;
  width: 100%;
  border: 2px solid #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}


  input {
    flex: 1;
    border: none;
    background: inherit;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
    min-width: 20px;
    min-height: 20px;
  }
`
export const Error = styled.div<ErrorProps>`
  display: flex;
  align-items: center;
  margin-left: 16px;
  svg {
    margin-right: 0;
    color: #c53030;
  }
  &::before {
    content: '${props => props.message}';
      position: absolute;
      text-align: center;
      left: 100%;
      width: 160px;
      margin-left: -20px;
      margin-top: -30px;
      font-size: 14px;
      color: #f5f5f5;
      background: #c53030;
      padding: 8px;
      border-radius: 10px 10px 10px 0px;
      transition: opacity 0.4s;
      visibility: hidden;
      opacity: 0;
  }
  &:hover {
    &::before {
      visibility: visible;
      opacity: 1;
    }
  }
`
