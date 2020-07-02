import React, { useCallback, useRef } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import logoVisao from '../../../../assets/logo-horizontal.png'
import { Container, Title, FormContainer, Header } from './styles'
import { FiChevronLeft } from 'react-icons/fi'
import api from '../../../../services/api'
import { Dropdown } from 'react-bootstrap'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import getValidationErrors from '../../../../utils/getValidationErrors'
import Input from '../../../../components/InputForm'
import { useToast } from '../../../../hooks/toast'
import { useAuth } from '../../../../hooks/auth'


const AddStep = () => {

    const { params } = useRouteMatch()
    const { addToast } = useToast()
    const { token } = useAuth()
    const formRef = useRef(null)
    const history = useHistory()

    const handleSubmit = useCallback(async data => {

        try {
            formRef.current.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            const body = {
                name: data.name,
                id_project: params.id
            }

            await api.post('projects/steps', body, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            addToast({
                type: 'success',
                title: 'Etapa adicionada com sucesso.',
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
                description: 'Erro ao conectar com o servidor, tente novamente.',
            });
        }
    }, [addToast, history, params.id, token])

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

            <Title>Adicionar etapa</Title>

            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>


                    <Input
                        name='name'
                        placeholder="Digite o nome da etapa."
                    />

                    <section>
                        <button type="submit">Adicionar</button>
                    </section>

                </Form>

            </FormContainer>

        </Container>
    )
}

export default AddStep