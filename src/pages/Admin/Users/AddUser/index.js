import React, { useCallback, useRef, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import logoVisao from '../../../../assets/logo-horizontal.png'
import { Container, Title, FormContainer, Header } from './styles'
import { FiChevronLeft } from 'react-icons/fi'
import api from '../../../../services/api'
import { Dropdown } from 'react-bootstrap'
import { Form } from '@unform/web'
import DatePicker from '../../../../components/Datepicker'
import Input from '../../../../components/InputForm'
import * as Yup from 'yup'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { useToast } from '../../../../hooks/toast'
import { useAuth } from '../../../../hooks/auth'
import Select from '../../../../components/Select'


const AddUser = () => {

    const { addToast } = useToast()
    const { token, user } = useAuth()
    const formRef = useRef(null)
    const history = useHistory()

    const [options] = useState([
        {
            value: 'user',
            label: 'user'
        },
        {
            value: 'admin',
            label: 'admin'
        }
    ])

    

    const handleSubmit = useCallback(async data => {

        try {
            formRef.current.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().email().required('Email obrigatório'),
                password: Yup.string().required('Senha obrigatória')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            const body = {
                name: data.name,
                email: data.email,
                password: data.password,
                type: data.type
            }

            await api.post('users', body, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            addToast({
                type: 'success',
                title: 'Usuário adicionado com sucesso.',
            });

            history.push('/users')

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error)

                formRef.current.setErrors(errors)
                return
            }

            addToast({
                type: 'error',
                title: 'Ocorreu um erro',
                description: 'Erro ao conectar com o servidor, tente novamente.',
            });
        }
    }, [addToast, history, token, user.id])

    return (
        <Container>
            <Header>
                <img src={logoVisao} alt='Visão tecnologia e sistemas' />
                <nav>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Admin
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Link to="/users">Usuários</Link>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Link to="/">Logout</Link>
                    <Link to="/dashboard">
                        <FiChevronLeft size={20} />
                        Voltar
                    </Link>
                </nav>

            </Header>

            <Title>Adicionar usuário</Title>

            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input
                        name='name'
                        placeholder="Digite o nome do usuário."
                    />
                    <Input
                        name='email'
                        placeholder="Digite o email do usuário."
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Digite a senha do usuário"
                    />

                    <Select
                        name='type'
                        options={options}
                    />

                    <section>
                        <button type="submit">Adicionar</button>
                    </section>

                </Form>

            </FormContainer>

        </Container>
    )
}

export default AddUser