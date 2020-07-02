import styled from 'styled-components'
import { shade, lighten } from 'polished'

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav{
        display: flex;
        align-items: center;
        a{
        display: flex;
        font-size: 18px;
        align-items: center;
        text-decoration: none;
        color: ${lighten(0.3, '#1F1F28')};
        transition: 0.2s;

        & + a {
          margin-left: 32px;
        }


        &:hover{
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

export const ProjectInfo = styled.section`
    margin-top: 80px;

    header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        div{
            margin-left: 2px;

            strong{
                font-size: 42px;
                color: #3d3d4d;
            }

            p{
                font-size: 18px;
                color: #737380;
                margin-top: 4px;

                & + p {
                    margin-top: 20px;
                }
            }
        } 
    }

    ul{
        display: flex;
        list-style: none;
        margin-top: 20px;
        margin-left: 2px;
        
        li {
            & + li{
                margin-left: 80px;
            }

            strong{
                display: block;
                font-size: 28px;
                color: #3d3d4d;
            }

            span{
                display: block;
                margin-top: 4px;
                color: #6c6c80;
            }
        }

        
    }

    section{
        margin-top: 50px;
        display: flex;
        max-width: 700px;


        a {
        display: flex;
        align-items: center;
        justify-content: center;
        
        font-size: 20px;
        text-decoration: none;
        border: 0px;
        color: #292929;
        
        font-weight: bold;
        transition: background-color 0.4s;

            & + a {
                margin-left: 20px;
            }

            &:hover {
                color: ${shade(0.6, '#292929')};
            }
            
            svg{
                margin-right: 6px;
            }
        }

        button{
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            font-size: 20px;
            text-decoration: none;
            border: 0px;
            color: #292929;
            
            font-weight: bold;
            transition: background-color 0.4s;

            margin-left: 8px;
            margin-right: 20px;
            svg{
                margin-right: 6px;
            }

            &:hover {
                    color: ${shade(0.3, '#1F1F28')}
            }
        }
    }
`

export const Steps = styled.div`
    margin-top: 40px;

    section{
        display: flex;
        margin-left: auto;
        
        button{
            background: transparent;
            align-items: center;
            display: flex;
            border: 0px;
            color: #1F1F28;
          

            &+ button{
                margin-left: 20px;
                margin-right: 10px;
            }

        svg{
       
        margin-right: 4px;
        color: #1F1F28;
        }
      }
    }
`;