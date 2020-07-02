import React, { useState, useEffect } from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import logoVisao from '../../../../assets/logo-horizontal.png'
import { Container, Title, Projects, Header, AddProject, Sprints, AnimationContainer } from './styles'
import { FiEdit2, FiChevronLeft, FiTrash2 } from 'react-icons/fi'
import api from '../../../../services/api'
import { Dropdown } from 'react-bootstrap'
import { useAuth } from '../../../../hooks/auth'
import { useToast } from '../../../../hooks/toast'


const ManageSprints = () => {
    const { params } = useRouteMatch()
    const [sprints, setSprints] = useState([])
    const { signOut, token, permission } = useAuth()
    const { addToast } = useToast()
    const history = useHistory()

    const deleteProjectSprint = async (id) => {
        const option = window.confirm('Deseja excluir essa sprint ?')

        if (option) {
            await api.delete(`projects/steps/sprints/delete/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            await api.get(`projects/sprints/${params.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                setSprints(response.data)
            })
        }

        addToast({
            type: 'error',
            title: 'Sprint excluída com sucesso.',
        });
    }

    const redirectEdit = (id) => (
        history.push(`/project/sprints/edit/${id}`)
    )

    useEffect(() => {

        api.get(`projects/sprints/${params.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            
            setSprints(response.data)
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

            <Title>Sprints</Title>

            {permission === 'admin' &&
                <AddProject>
                    <Link to={`/project/sprints/create/${params.id}`} type="submit">Adicionar sprint</Link>
                </AddProject>}

            <Projects>

                {sprints && sprints.length > 0 ? sprints.map(sprint => (
                    <div type={permission} key={sprint.id}>
                        <AnimationContainer>
                            <Sprints
                                key={sprint.id}
                                to={{ pathname: `/project/steps/${sprint.id}` }}
                            >

                                <div>
                                    <strong>{sprint.name}</strong>
                                    <p>Status: {sprint.status}</p>
                                    <p>Início: {sprint.start_date}</p>
                                    <p>Término: {sprint.end_date}</p>
                                    <p>{sprint.description}</p>
                                    <br/>
                                    <span>{sprint.step}</span>
                                    
                                </div>
                                <section>
                                    <button onClick={() => redirectEdit(sprint.id)}><FiEdit2 size={20} />Editar</button>
                                    <button onClick={() => deleteProjectSprint(sprint.id)}><FiTrash2 size={20} />Excluir</button>

                                </section>

                            </Sprints>
                        </AnimationContainer>

                    </div>
                )) : <div type={permission}>
                        <AnimationContainer>
                            <Sprints>
                                <div>
                                    <strong>Esse projeto não possui sprints até o momento.</strong>

                                </div>
                            </Sprints>
                        </AnimationContainer>

                    </div>}
            </Projects>
        </Container>

    )
}

export default ManageSprints