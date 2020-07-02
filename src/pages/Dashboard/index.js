import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import logoVisao from '../../assets/logo-horizontal.png'
import { Container, Title, FormContainer, Projects, Header, AddProject } from './styles'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'
import { Dropdown } from 'react-bootstrap'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import Input from '../../components/InputForm'
import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'
import { Form } from '@unform/web'

const Dashboard = () => {

    const [projects, setProjects] = useState([])
   
    const formRef = useRef()

    const { signOut, token, permission } = useAuth()
    const { addToast } = useToast()

    const handleSubmit = useCallback(async data => {

        try {
            formRef.current.setErrors({})

            await api.get('projects/name', {
                params: {
                    name: data.name
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }).then(response => {
                setProjects(response.data)
            })

            addToast({
                type: 'success',
                title: 'Pesquisa concluída com sucesso.',
            });

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
    }, [addToast, token])



    useEffect(() => {
        api.get('projects', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            setProjects(response.data)
        })

    }, [token])

    return (

        <Container>
            <Header>
                <img src={logoVisao} alt='Visão tecnologia e sistemas' />
                <nav>
                    {permission === 'admin' && <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Admin
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Link to="/users">Usuários</Link>
                        </Dropdown.Menu>
                    </Dropdown>}

        
                    <Link to="/" onClick={signOut}>Logout</Link>
                </nav>

            </Header>

            <Title>Explore projetos em desenvolvimento</Title>



            <Form ref={formRef} onSubmit={handleSubmit}>
                <FormContainer>
                    <Input
                        name="name"
                        placeholder="Digite o nome do projeto."
                    />
                    <button type="submit">Pesquisar</button>
                </FormContainer>
            </Form>



            {permission === 'admin' &&
                <AddProject>
                    <Link to="/projects/create" type="submit">Adicionar projeto</Link>
                </AddProject>}

            <Projects>
                {projects.map(project => (
                    <div type={permission} key={project.id}>
                        <Link
                            key={project.id}
                            to={{ pathname: `/project/${project.id}` }}

                        >
                            <div>
                                <strong>{project.name}</strong>
                                <p>{project.description}</p>
                            </div>

                            <FiChevronRight size={20} />
                        </Link>
                    </div>
                ))}
            </Projects>
        </Container>

    )
}

export default Dashboard