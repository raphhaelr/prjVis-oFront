import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import logoVisao from '../../../../assets/logo-horizontal.png'
import { Container, Title, FormContainer, Header } from './styles'
import { FiChevronLeft } from 'react-icons/fi'
import api from '../../../../services/api'
import { Form } from '@unform/web'
import DatePicker from '../../../../components/Datepicker'
import { Dropdown } from 'react-bootstrap'
import { useToast } from '../../../../hooks/toast'
import { useAuth } from '../../../../hooks/auth'
import * as Yup from 'yup'
import getValidationErrors from '../../../../utils/getValidationErrors'
import Input from '../../../../components/InputForm'
import parseDate from '../../../../utils/parseDate'

const UpdateProject = () => {
    const { params } = useRouteMatch()
    const history = useHistory()
    const [project, setProject] = useState([])

    const { addToast } = useToast()
    const { token } = useAuth()
    const formRef = useRef(null)

    const onChange = (evt, field) => {

        setProject({
            ...project,
            [field]: evt.target.value
        })
    }

    const onChangeDateStart = (value, field) => {
        setProject({
            ...project,
            [field]: value
        })
    }

    const onChangeDateEnd = (value, field) => {
        setProject({
            ...project,
            [field]: value
        })
    }

    useEffect(() => {
        api.get(`projects/${params.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            const project = response.data[0]
            project.start_date = parseDate(project.start_date)
            project.end_date = parseDate(project.end_date)
            setProject(project)
        })

    }, [params.id, token])

    const handleSubmit = useCallback(async data => {
        
        try {
            formRef.current.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                description: Yup.string().required('Descrição obrigatória'),
                customer_name: Yup.string().required('Cliente obrigatório'),
                start_date: Yup.date().required('Data obrigatória')
            })

            await schema.validate(data, {
                abortEarly: false,
            })


            const body = {
                name: data.name,
                description: data.description,
                customer_name: data.customer_name,
                start_date: data.start_date,
                end_date: data.end_date,
                
            }

            await api.put(`projects/${params.id}`, body, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            addToast({
                type: 'success',
                title: 'Projeto atualizado com sucesso.',
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
                description: 'Erro ao atualizar o projeto, tente novamente.',
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

            <Title>Editar projeto</Title>

            <FormContainer>
                {project.length === 0 ? <Title>Loading...</Title> : <Form ref={formRef} onSubmit={handleSubmit}  initialData={{ start_date: parseDate(project.start_date), end_date: parseDate(project.end_date) }}>
                    <Input
                        name="name"
                        value={project.name}
                        placeholder="Digite o nome do projeto."
                        onChange={(value) => onChange(value, 'name')}
                    />
                    <Input
                        name="description"
                        value={project.description}
                        placeholder="Digite a descrição do projeto."
                        onChange={(value) => onChange(value, 'description')}
                    />
                    <Input
                        name="customer_name"
                        value={project.customer_name}
                        placeholder="Digite o nome do cliente."
                        onChange={(value) => onChange(value, 'customer_name')}
                    />

                    <DatePicker
                        name="start_date"
                        selected={project.start_date}
                        onChange={(value) => onChangeDateStart(value, 'start_date')}
                    />
                    <DatePicker
                        name="end_date"
                        selected={project.end_date}
                        onChange={(value) => onChangeDateEnd(value, 'end_date')}
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