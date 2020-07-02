import React, { useCallback, useRef } from 'react'

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


const AddProject = () => {


    const { addToast } = useToast()
    const { token, user } = useAuth()
    const formRef = useRef(null)
    const history = useHistory()
    

    const handleSubmit = useCallback(async data => {

        try {
            formRef.current.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('Nome obrigatório'),
                description: Yup.string().required('Descrição obrigatória'),
                customer: Yup.string().required('Cliente obrigatório'),
                start_date: Yup.date().required('Data obrigatória'),
                end_date: Yup.date().required('Cliente obrigatório'),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            const body = {
                name: data.name,
                description: data.description,
                customer_name: data.customer,
                start_date: data.start_date,
                end_date: data.end_date,
                id_manager: user.id
            }

            await api.post('projects', body, {
                headers: {
                    "Authorization": `Bearer ${token}`
                } 
            })

            addToast({
                type: 'success',
                title: 'Projeto adicionado com sucesso.',
            });

            history.push('/dashboard')

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

            <Title>Adicionar projeto</Title>

            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input
                        name='name'
                        placeholder="Digite o nome do projeto."
                    />
                    <Input
                        name='description'
                        placeholder="Digite a descrição do projeto."
                    />
                    <Input
                        name="customer"
                        placeholder="Digite o nome do cliente."
                    />


                    <DatePicker
                        name="start_date"
                    />
                    <DatePicker
                        name="end_date"
                    />

                    <section>
                        <button type="submit">Adicionar</button>
                    </section>

                </Form>

            </FormContainer>

        </Container>
    )
}

export default AddProject