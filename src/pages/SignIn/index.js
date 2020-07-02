import React, { useRef, useCallback } from 'react'
import { Container, LogoContainer, FormContainer, AnimationContainer } from './styles'
import logoVisao from '../../assets/logo-horizontal.png'
import { Form } from '@unform/web'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { FiUser, FiLock } from 'react-icons/fi'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

const SignIn = () => {

    const formRef = useRef(null)
    const history = useHistory()
    const { signIn } = useAuth()
    const { addToast } = useToast()

    const handleSubmit = useCallback(async data => {

        try {
            formRef.current.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('Email obrigatório')
                    .email('Digite um e-mail válido.'),
                password: Yup.string().required('Senha obrigatória.')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            await signIn({
                email: data.email,
                password: data.password
            })

            history.push('/dashboard')

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error)

                formRef.current.setErrors(errors)
                return
            }

            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
            });
        }
    }, [signIn, addToast, history])


    return (
        <Container>
            <AnimationContainer>
                <LogoContainer>
                    <img src={logoVisao} alt='Visão' />
                </LogoContainer>
                <FormContainer>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input icon={FiUser} name="email" placeholder="Email"></Input>
                        <Input icon={FiLock} type="password" name="password" placeholder="Senha"></Input>
                        <Button type="submit">Entrar</Button>
                    </Form>
                </FormContainer>
            </AnimationContainer>
        </Container>
    )
}

export default SignIn