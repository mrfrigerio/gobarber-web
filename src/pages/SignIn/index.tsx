import React, { useRef, useCallback } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Link } from 'react-router-dom'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../context/ToastContext'
import { Container, Content, Background } from './styles'
import logo from '../../assets/logo.svg'
import Input from '../../components/Form/Input'
import Button from '../../components/Form/Button'
import { useAuth } from '../../context/AuthContext'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)
  const { signIn } = useAuth()
  const handleSubmit = useCallback(
    async (data: SignInFormData, { reset }) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Insira um email válido.')
            .required('O email é obrigatório'),
          password: Yup.string().required('A senha é obrigatória.')
        })
        await schema.validate(data, {
          abortEarly: false
        })
        await signIn({
          email: data.email,
          password: data.password
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(err)
          formRef.current?.setErrors(validationErrors)
        } else {
          addToast({
            type: 'error',
            title: 'Erro de Login',
            description: 'Usuário ou senha inválidos!'
          })
        }
      }
    },
    [addToast, signIn]
  )

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" draggable={false} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input type="text" name="email" placeholder="E-mail" icon={FiMail} />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            icon={FiLock}
          />
          <Button type="submit">Entrar</Button>
          <a href="teste">Esqueci minha senha</a>
          <Link to="/signup">
            <FiLogIn size={16} />
            Criar conta
          </Link>
        </Form>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn
