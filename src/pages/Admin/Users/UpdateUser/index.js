import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import logoVisao from '../../../../assets/logo-horizontal.png'
import { Container, Title, FormContainer, Header } from './styles'
import { FiChevronLeft } from 'react-icons/fi'
import api from '../../../../services/api'
import { Form } from '@unform/web'
import { Dropdown } from 'react-bootstrap'
import { useToast } from '../../../../hooks/toast'
import { useAuth } from '../../../../hooks/auth'
import * as Yup from 'yup'
import getValidationErrors from '../../../../utils/getValidationErrors'
import Input from '../../../../components/InputForm'
import parseDate from '../../../../utils/parseDate'
import Select from '../../../../components/Select'

const UpdateProject = () => {
    const { params } = useRouteMatch()
    const history = useHistory()
    const [user, setUser] = useState([])

    const { addToast } = useToast()
    const { token } = useAuth()
    const formRef = useRef(null)

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

    const onChange = (evt, field) => {

        setUser({
            ...user,
            [field]: evt.target.value
        })
    }

    const onChangeType = (option, field) => {

        setUser({
            ...user,
            [field]: option.value
        })
    }


    useEffect(() => {
        api.get(`users/${params.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            const user = response.data[0]
            setUser(user)
        })

    }, [params.id, token])

    const handleSubmit = useCallback(async data => {

        try {
            formRef.current.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório'),

            })

            await schema.validate(data, {
                abortEarly: false,
            })


            const body = {
                name: data.name,
                email: data.email,
                password: data.password,
                type: data.type,
            }

            await api.put(`users/update/${params.id}`, body, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            addToast({
                type: 'success',
                title: 'Usuário atualizado com sucesso.',
            });

            history.goBack()

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error)

                formRef.current.setErrors(errors)
                return
            }

            addToast({
                type: 'error',
                title: 'Ocorreu um erro',
                description: 'Erro ao atualizar o usuário, tente novamente.',
            });
        }
    }, [addToast, history, token, params.id])

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
                    <button onClick={() => history.goBack()}>
                        <FiChevronLeft size={20} />
                        Voltar
                    </button>
                </nav>

            </Header>

            <Title>Editar usuário</Title>

            <FormContainer>
                {user.length === 0 ? <Title>Loading...</Title> : <Form ref={formRef} onSubmit={handleSubmit} initialData={{ start_date: parseDate(user.start_date), end_date: parseDate(user.end_date) }}>
                    <Input
                        name="name"
                        value={user.name}
                        placeholder="Digite o nome do projeto."
                        onChange={(value) => onChange(value, 'name')}
                    />
                    <Input
                        name="email"
                        value={user.email}
                        placeholder="Digite o email do usuário."
                        onChange={(value) => onChange(value, 'description')}
                    />

                    
                    <Input
                        name="password"
                        type="password"
                        value={user.password}
                        placeholder="Digite uma senha apenas se for para alterar."
                        onChange={(value) => onChange(value, 'password')}
                    />
                    

                    <Select
                        name='type'
                        defaultValue={{ label: user.type, value: user.type }}
                        value={{ label: user.type, value: user.type }}
                        options={options}
                        onChange={(value) => onChangeType(value, 'type')}
                    />

                    <section>
                    
                        <button type="submit">Finalizar</button>
                    </section>
                </Form>
                }
            </FormContainer>

        </Container>
    )
}

export default UpdateProject