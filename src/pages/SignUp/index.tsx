import React, { useRef, useCallback } from 'react'
import { Form } from '@unform/web'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Container, Content, Background } from './styles'
import logo from '../../assets/logo.svg'
import Input from '../../components/Form/Input'
import Button from '../../components/Form/Button'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

interface UserInterface {
  email: string
  password: string
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório.'),
          email: Yup.string()
            .email('Insira um email válido.')
            .required('O email é obrigatório'),
          password: Yup.string()
            .min(6, 'A senha deve ter o mínimo de 6 dígitos.')
            .required('A senha é obrigatória.')
        })
        await schema.validate(data, {
          abortEarly: false
        })

        const response = await api.post<UserInterface>('/users', data)
        await signIn(response.data)
        addToast({
          type: 'success',
          title: 'Cadastro realizado.',
          description: 'Usuário cadastrado com sucesso!'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(err)
          formRef.current?.setErrors(validationErrors)
        } else {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um erro no cadastro, tente novamente!'
          })
        }
      }
    },
    [addToast, signIn]
  )
  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GoBarber" draggable={false} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input type="text" name="name" placeholder="Nome" icon={FiUser} />
          <Input type="text" name="email" placeholder="E-mail" icon={FiMail} />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            icon={FiLock}
          />
          <Button type="submit">Cadastrar</Button>
          <Link to="/">
            <FiArrowLeft size={16} />
            Voltar para logon
          </Link>
        </Form>
      </Content>
    </Container>
  )
}

export default SignUp
