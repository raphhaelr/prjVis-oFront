import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link, useHistory } from 'react-router-dom'
import { Header, ProjectInfo, Steps } from './styles'
import logoVisao from '../../assets/logo-horizontal.png'
import { FiChevronLeft, FiChevronDown, FiEdit2, FiDelete, FiSettings } from 'react-icons/fi'
import Stepinfo from '../../components/Steps'
import { Form } from '@unform/web';
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

const Project = (props) => {

    const { params } = useRouteMatch()

    const [project, setProject] = useState([])
    const [steps, setSteps] = useState([])

    const { permission, token } = useAuth()

    const history = useHistory()

    const deleteProject = async (id) => {
        const option = window.confirm('Deseja excluir esse projeto ?')


        if (option) {
            await api.delete(`projects/delete/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            history.goBack()
        }
    }



    useEffect(() => {
        api.get(`projects/${params.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            setProject(response.data)
        })

        api.get(`projects/steps/${params.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            setSteps(response.data)
        })

    }, [params.id, token])

    return (
        <div>
            <Header>
                <img src={logoVisao} alt='Visão tecnologia e sistemas' />

                <nav>
                    <Link to="/dashboard">
                        <FiChevronLeft size={20} />
                    Voltar
                    </Link>
                </nav>
            </Header>

            {project && project.map(proj => (
                <ProjectInfo key={proj.id}>
                    <header>
                        <div>
                            <strong>{proj.name}</strong>
                            <p>{proj.description}</p>
                        </div>
                        <section>
                            
                        </section>
                    </header>

                    <ul>
                        <li>
                            <strong>{proj.customer_name}</strong>
                            <span>Stakeholder</span>
                        </li>

                        <li>
                            <strong>{proj.start_date}</strong>
                            <span>Início</span>
                        </li>
                        <li>
                            <strong>{proj.end_date}</strong>
                            <span>Término</span>
                        </li>
                        <li>
                            <strong>{proj.progress.value > 0 ? proj.progress.value : 0}%</strong>
                            <span>Progresso</span>
                        </li>

                    </ul>

                    {permission === 'admin' && <section>
                        <Link
                            to={`/project/edit/${proj.id}`}

                        >
                            <FiEdit2 size={20} />
                            Editar
                        </Link>
                        <button
                            onClick={() => deleteProject(proj.id)}
                        >
                            <FiDelete size={20} />
                            Excluir
                        </button>
                        
                        <Link
                            to={`/project/steps/all/${proj.id}`}
                        >
                            <FiSettings size={20} />
                            Gerenciar etapas
                        </Link>
                        <Link
                            to={`/project/sprints/all/${proj.id}`}
                        >
                            <FiSettings size={20} />
                            Gerenciar sprints
                        </Link>

                    </section>}

                </ProjectInfo>
            ))}
            <Steps>
                <Form>
                    {steps && steps.length > 0 ? steps.map(step => (

                        <Stepinfo
                            key={step.id}
                            name={step.name}
                            id={step.id}
                        >

                            <div>
                                <strong>{step.name}</strong>
                            </div>


                            <FiChevronDown name="icon" size={20} />
                        </Stepinfo>
                    )) : <Stepinfo
                        key={1}
                        name="sem-etapa"
                    >

                            <div>
                                <strong>Esse projeto não possui etapas até o momento.</strong>
                            </div>

                        </Stepinfo>}
                </Form>
            </Steps>

        </div>
    )
}

export default Project