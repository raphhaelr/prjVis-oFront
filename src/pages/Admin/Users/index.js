import React, { useState, useEffect } from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import logoVisao from '../../../assets/logo-horizontal.png'
import { Container, Title, Projects, Header, AddProject, Sprints, AnimationContainer } from './styles'
import { FiEdit2, FiChevronLeft, FiTrash2 } from 'react-icons/fi'
import api from '../../../services/api'
import { Dropdown } from 'react-bootstrap'
import { useAuth } from '../../../hooks/auth'
import { useToast } from '../../../hooks/toast'


const ManageUsers = () => {
    const { params } = useRouteMatch()
    const [users, setUsers] = useState([])
    const { signOut, token, permission } = useAuth()
    const { addToast } = useToast()
    const history = useHistory()

    const deleteUser = async (id) => {
        const option = window.confirm('Deseja excluir esse usuário ?')
        
        if (option) {
            await api.delete(`users/delete/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            await api.get('users', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                setUsers(response.data)
            })
        }

        addToast({
            type: 'error',
            title: 'Usuário excluído com sucesso.',
        });
    }

    const redirectEdit = (id) => (
        history.push(`/users/edit/${id}`)
    )

    useEffect(() => {

        api.get('users', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            
            setUsers(response.data)
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

            <Title>Usuários</Title>

            {permission === 'admin' &&
                <AddProject>
                    <Link to='/users/create' type="submit">Adicionar usuário</Link>
                </AddProject>}

            <Projects>

                {users && users.length > 0 ? users.map(user => (
                    <div type={permission} key={user.id}>
                        <AnimationContainer>
                            <Sprints
                                key={user.id}
                                to={{ pathname: `/project/steps/${user.id}` }}
                            >

                                <div>
                                    <strong>{user.name}</strong>
                                    <p>{user.email}</p>
                                </div>
                                <section>
                                    <button onClick={() => redirectEdit(user.id)}><FiEdit2 size={20} />Editar</button>
                                    <button onClick={() => deleteUser(user.id)}><FiTrash2 size={20} />Excluir</button>

                                </section>

                            </Sprints>
                        </AnimationContainer>

                    </div>
                )) : <div type={permission}>
                        <AnimationContainer>
                            <Sprints>
                                <div>
                                    <strong>Não existe usuários até o momento.</strong>

                                </div>
                            </Sprints>
                        </AnimationContainer>

                    </div>}
            </Projects>
        </Container>

    )
}

export default ManageUsers