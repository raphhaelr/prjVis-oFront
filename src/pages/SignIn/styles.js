import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
    animation: ${appearFromLeft} 1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  

    img{
        width: 90%;
        height: 90%;
    }
`

export const FormContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 700px;
    
    form{
        margin-top: 20px;
    
        input{
            display: block;

            & + input{
                margin-top: 10px;
            }
        }

        button{
            margin-top: 10px;
        }
    }
`