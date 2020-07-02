import React, { useState, useEffect } from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import logoVisao from '../../../../assets/logo-horizontal.png'
import { Container, Title, Projects, Header, AddProject, Sprints, AnimationContainer } from './styles'
import { FiEdit2, FiChevronLeft, FiTrash2 } from 'react-icons/fi'
import api from '../../../../services/api'
import { Dropdown } from 'react-bootstrap'
import { useAuth } from '../../../../hooks/auth'


const ManageSteps = () => {
    const { params } = useRouteMatch()
    const [steps, setSteps] = useState([])
    const { signOut, token, permission } = useAuth()
    const history = useHistory()

    const deleteProjectStep = async (id) => {
        const option = window.confirm('Deseja excluir essa sprint ?')

        if (option) {
            await api.delete(`projects/steps/delete/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            await api.get(`projects/steps/${params.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                setSteps(response.data)
            })
        }
    }

    const redirectEdit = (id) => (
        history.push(`/project/steps/edit/${id}`)
    )

    useEffect(() => {

        api.get(`projects/steps/${params.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            setSteps(response.data)
        })

    }, [params.id, token])

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
                    <button onClick={() => history.goBack()}>
                        <FiChevronLeft size={20} />
                        Voltar
                    </button>
                </nav>

            </Header>

            <Title>Etapas</Title>

            {permission === 'admin' &&
                <AddProject>
                    <Link to={`/project/steps/create/${params.id}`} type="submit">Adicionar etapa</Link>
                </AddProject>}

            <Projects>

                {steps && steps.length > 0 ? steps.map(step => (
                    <div type={permission} key={step.id}>
                        <AnimationContainer>
                            <Sprints
                                key={step.id}
                                to={{ pathname: `/project/steps/${step.id}` }}
                            >

                                <div>
                                    <strong>{step.name}</strong>
                                </div>
                                <section>
                                    <button onClick={() => redirectEdit(step.id)}><FiEdit2 size={20} />Editar</button>
                                    <button onClick={() => deleteProjectStep(step.id)}><FiTrash2 size={20} />Excluir</button>

                                </section>

                            </Sprints>
                        </AnimationContainer>

                    </div>
                )) : <div type={permission}>
                        <AnimationContainer>
                            <Sprints>
                                <div>
                                    <strong>Esse projeto não possui etapas até o momento</strong>
                                </div>
                            </Sprints>
                        </AnimationContainer>

                    </div>}
            </Projects>
        </Container>

    )
}

export default ManageSteps