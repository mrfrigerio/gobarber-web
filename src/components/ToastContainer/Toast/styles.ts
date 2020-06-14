import styled, { css } from 'styled-components'
import { ToastProps } from '../../../context/ToastContext'

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `
}

export const Toast = styled.div<ToastProps>`
  display: flex;
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  ${props => toastTypeVariations[props.type || 'info']}

  @keyframes showToast {
    from {
      transform: translateX(500px);
    }

    to {
      transform: translateX(0px);
    }
  }

  @keyframes closeToast {
    from {
      transform: translateX(0px);
    }

    99% {
      transform: translateX(500px);
    }

    to {
      transform: translateX(500px);
    }
  }

  ${props =>
    props.visible
      ? css`
          animation: showToast forwards 0.5s;
        `
      : css`
          animation: closeToast forwards 0.5s;
        `};

  > svg {
    margin: 4px 12px 0 0;
  }
  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8px;
      line-height: 20px;
    }
  }
  button {
    position: absolute;
    right: 10px;
    top: 10px;
    opacity: 0.6;
    background: transparent;
    border: none;
    color: inherit;
  }
  ${props =>
    !props.description &&
    css`
      align-items: center;

      svg: {
        margin-top: 0;
      }
    `}

  & + & {
    margin-top: 8px;
  }
`
