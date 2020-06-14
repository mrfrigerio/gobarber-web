import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'
import signInBackground from '../../assets/sign-in-background.png'

export const Container = styled.div`
  display: flex;
  height: 100vh;
`

export const animateForm = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`
export const Content = styled.div`
  display: flex;
  top: 0;
  left: 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
  animation: ${animateForm} 1s;
  form {
    width: 90%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 24px;
      font-weight: 400;
      margin: 60px auto 20px;
    }

    a {
      margin-top: 20px;
      font-size: 12px;
      text-decoration: none;
      color: #f4ede8;
      display: flex;
      align-items: center;
      transition: color 0.2s;
      &:hover {
        border: none;
        color: ${shade(0.2, '#f4ede8')};
      }

      & + a {
        margin-top: 40px;
        color: #ff9000;

        &:hover {
          border: none;
          color: ${shade(0.2, '#ff9000')};
        }
        svg {
          margin-right: 10px;
        }
      }
    }
  }
`
export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat;
  background-size: cover;
  background-position-x: 15px;
`
