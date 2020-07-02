import React, {
    useEffect,
    useRef,
    useState,
    useCallback
} from 'react';

import { useField } from '@unform/core';
import {
    Container,
    AnimationContainer,
    StepNameContainer,
} from './styles';

import api from '../../services/api'
import { useAuth } from '../../hooks/auth';


const Stepinfo = ({ name, iconRef, ...rest }) => {

    const { fieldName, defaultValue, registerField } = useField(name);

    const [toggle, setToggle] = useState(false);
    const [sprints, setSprints] = useState([])
    const [size, setSize] = useState(0)
    const stepRef = useRef(null);
    const { token } = useAuth()

    const divRef = useRef(null)

    const handleToggle = useCallback(() => {
        setToggle(!toggle)

        if (!toggle) {
            api.get(`projects/steps/sprints/${rest.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                setSprints(response.data)
            })
        }
    }, [toggle, rest.id, token]);

    useEffect(() => {
        if (sprints.sprints) {
            setSize(sprints.sprints.length)
        }

    }, [sprints])

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: stepRef.current,
            path: 'value',
        });


    }, [registerField, fieldName]);

    return (
        <Container toggle={toggle} sizeSprints={size} >
            <AnimationContainer>
                {toggle ? <a
                    onClick={handleToggle}
                    defaultValue={defaultValue}
                    ref={stepRef}
                    {...rest}
                >

                    <AnimationContainer >

                        {sprints.sprints && sprints.sprints.length > 0
                            && <StepNameContainer >
                                <strong>{sprints.step.name}</strong>

                            </StepNameContainer>
                        }

                        {sprints.sprints && sprints.sprints.length === 0
                            && <StepNameContainer>
                                <strong>{sprints.step.name}</strong>
                                <p>Nenhum sprint encontrado</p>

                            </StepNameContainer>
                        }
                        {sprints.sprints && sprints.sprints.map(sprint => (
                            <div ref={divRef}>
                                <strong>{sprint.name}</strong>
                                
                                <div className="stepinfo">

                                    <p className="date">Início: {sprint.start_date}</p>
                                    <p className="date">Término: {sprint.end_date}</p>
                                    <p>Status: {sprint.status}</p>
                                </div>
                                <p className="description">{sprint.description}</p>

                            </div>

                        ))}
                    </AnimationContainer>


                </a> : <a
                    onClick={name !== "sem-etapa" ? handleToggle : undefined}
                    defaultValue={defaultValue}
                    ref={stepRef}
                    {...rest}
                >{}</a>}
            </AnimationContainer>
        </Container>
    );
};

export default Stepinfo;
