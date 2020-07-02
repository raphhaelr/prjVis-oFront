import styled from 'styled-components'
import { shade, lighten } from 'polished'
export const Container = styled.div`


`

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    nav{
        display: flex;
        align-items: center;
        
        div{
            display: block;

            button{
                background: transparent;
                color: ${lighten(0.3, '#1F1F28')};
                border: 0px;
                font-size: 18px;
                transition: 0.2s;

                &:hover {
                    color: ${shade(0.3, '#1F1F28')}
                }
            }

            a{
                color: ${lighten(0.3, '#1F1F28')};
                display: block;
                font-size: 14px;
                align-items: center;
                justify-content: center;
                margin-left: 0px;
                margin-top: 8px;
            }
        }

        button{
            display: flex;
            align-items: center;
            background: transparent;
            color: ${lighten(0.3, '#1F1F28')};
            border: 0px;
            font-size: 18px;
            transition: 0.2s;

            &:hover {
                color: ${shade(0.3, '#1F1F28')}
            }
        }

        a {
        display: flex;
        margin-left: 20px;
        justify-content: space-between;
        font-size: 18px;
        align-items: center;
        text-decoration: none;
        color: ${lighten(0.3, '#1F1F28')};
        transition: 0.2s;

        &:hover {
            color: ${shade(0.3, '#1F1F28')}
         }
        }
    }
    
    img{
        margin-left: -14px;
        width: 30%;
        height: 30%;
    }
`

export const Title = styled.h1`
    font-size: 48px;
    color: #292929;

    margin-top: 80px;
    max-width: 500px;
    line-height: 56px;
`;

export const FormContainer = styled.form`
    margin-top: 40px;
    max-width: 700px;

    input{
        display: block;
        height: 50px;
        width: 100%;
        
        padding: 0 18px;
        border: 0;
        border-radius: 5px;
        font-size: 18px;
        color: #292929;
        border: 2px solid #fff;
        border-right: 0;

        &::placeholder {
            color: #292929;
        }

        & + input {
            margin-top: 20px;
        }
    }

   
    section{
        button{
        margin-top: 20px;
        height: 50px;
        width: 200px;
        background: #88B04B;
        border-radius: 5px;
        border: 0px;
        color: #fff;
        font-weight: bold;
        transition: background-color 0.4s;

            &:hover {
                background: ${shade(0.2, '#88B04B')};
            }
        }
    }

`;

