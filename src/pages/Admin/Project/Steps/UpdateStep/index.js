import React, { useCallback, useRef, useState, useEffect } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import logoVisao from '../../../../../assets/logo-horizontal.png'
import { Container, Title, FormContainer, Header } from './styles'
import { FiChevronLeft } from 'react-icons/fi'
import api from '../../../../../services/api'
import { Dropdown } from 'react-bootstrap'
import { Form } from '@unform/web'

import * as Yup from 'yup'
import getValidationErrors from '../../../../../utils/getValidationErrors'
import Input from '../../../../../components/InputForm'
import { useToast } from '../../../../../hooks/toast'
import { useAuth } from '../../../../../hooks/auth'
import Select from '../../../../../components/Select'

const UpdateStep = () => {

    const { addToast } = useToast()
    const { token } = useAuth()
    const formRef = useRef(null)
    const history = useHistory()
    const { params } = useRouteMatch()

    const [step, setStep] = useState([])
    const [options] = useState([
        {
            value: 'Finalizada',
            label: 'Finalizada'
        },
        {
            value: 'Em aberto',
            label: 'Em aberto'
        }
    ])

    const onChangeStatus = (option, field) => {

        setStep({
            ...step,
            [field]: option.value
        })
    }

    const onChangeName = (evt, field) => {

        setStep({
            ...step,
            [field]: evt.target.value
        })
    }

    useEffect(() => {
        api.get(`projects/steps/find/${params.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            setStep(response.data[0])

        })

    }, [params.id, token])

    const handleSubmit = useCallback(async data => {

        try {
            formRef.current.setErrors({})

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),

            })

            await schema.validate(data, {
                abortEarly: false
            })

            const body = {
                name: data.name,
                status: data.status,
                id_step: params.id
            }

            await api.put(`projects/steps/update/${params.id}`, body, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            addToast({
                type: 'success',
                title: 'Etapa atualizada com sucesso.',
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
                description: 'Erro ao atualizar a etapa, cheque a situação das sprints da etapa.',
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

            <Title>Editar etapa</Title>

            <FormContainer>
                {step.length === 0 ? <Title>Loading...</Title> : <Form ref={formRef} onSubmit={handleSubmit} initialData={{ status: step.status }}>

                    <Input
                        type="text"
                        name='name'
                        value={step.name}
                        onChange={(value) => onChangeName(value, 'name')}
                        placeholder="Digite o nome da etapa."
                    />


                    <Select
                        name='status'
                        defaultValue={{ label: step.status, value: step.status }}
                        value={{ label: step.status, value: step.status }}
                        options={options}
                        onChange={(value) => onChangeStatus(value, 'status')}
                    />

                    <section>
                        <button type="submit">Salvar</button>
                    </section>

                </Form>}

            </FormContainer>

        </Container>
    )
}

export default UpdateStep