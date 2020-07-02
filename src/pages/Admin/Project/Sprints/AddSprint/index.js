import React, { useCallback, useRef, useState, useEffect } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import logoVisao from '../../../../../assets/logo-horizontal.png'
import { Container, Title, FormContainer, Header } from './styles'
import { FiChevronLeft } from 'react-icons/fi'
import api from '../../../../../services/api'
import { Dropdown } from 'react-bootstrap'
import { Form } from '@unform/web'
import DatePicker from '../../../../../components/Datepicker'
import * as Yup from 'yup'
import getValidationErrors from '../../../../../utils/getValidationErrors'
import Input from '../../../../../components/InputForm'
import { useToast } from '../../../../../hooks/toast'
import { useAuth } from '../../../../../hooks/auth'
import Select from '../../../../../components/Select'

const AddSprint = () => {

    const { addToast } = useToast()
    const { token } = useAuth()
    const formRef = useRef(null)
    const history = useHistory()
    const { params } = useRouteMatch()

    const [steps, setSteps] = useState([])

    useEffect(() => {
        api.get(`projects/steps/${params.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            const format = response.data.map(step => {
                return {
                    value: step.id,
                    label: step.name
                }
            })

            setSteps(format)
            
        })
    }, [params.id, token])
  
    const handleSubmit = useCallback(async data => {
        
        try {
            formRef.current.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                description: Yup.string().required('Descrição obrigatória'),
                start_date: Yup.date().required('Data obrigatória'),
                end_date: Yup.date().required('Cliente obrigatório'),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            const body = {
                name: data.name,
                description: data.description,
                start_date: data.start_date,
                end_date: data.end_date,
                id_step: data.id_step
            }
  

            await api.post('projects/steps/sprints', body, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            addToast({
                type: 'success',
                title: 'Sprint adicionada com sucesso.',
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
    }, [addToast, history, token])


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

            <Title>Adicionar sprint</Title>

            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>


                    <Input
                        name='name'
                        placeholder="Digite o nome da sprint."
                    />
                    <Input
                        name="description"
                        placeholder="Digite a descrição da sprint."
                    />

                    <Select
                        name='id_step'
                        options={steps}
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

export default AddSprint