import React from 'react'
import { Container } from './styles'
import { Progress } from 'reactstrap'

const ProgressBar = ({ children }) => {
    return (
        <Container>
            <Progress color='success' value={children} />
            <Progress multi>
                <Progress bar value="15" />
                <Progress bar color="success" value="30" />
                <Progress bar color="info" value="25" />
                <Progress bar color="warning" value="20" />
                <Progress bar color="danger" value="5" />
            </Progress>
        </Container>
    )
}

export default ProgressBar