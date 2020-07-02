import styled, {keyframes} from 'styled-components'
import { shade, lighten } from 'polished'

const appearFromTop = keyframes`
  from{
    opacity: 0;
    transform: translateY(-20px);
  }
  to{
    opacity: 1;
    transform: translateY(20);
  }
`;

export const AnimationContainer = styled.div`
    animation: ${appearFromTop} 1s; 
`

export const Container = styled.div`
    
  img{
     width: 30%;
     height: 30%
  }  
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    nav{
        display: flex;
        align-items: center;
        
        div{
            display: block;
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

export const Form = styled.form`
    margin-top: 40px;
    max-width: 700px;
    display: flex;

    input{
        flex: 1;
        height: 70px;
        padding: 0 18px;
        border: 0;
        border-radius: 5px 0 0 5px;
        font-size: 18px;
        color: #292929;
        border: 2px solid #fff;
        border-right: 0;

        &::placeholder {
            color: #1F1F28;
        }
    }

   

    button{
        height: 70px;
        width: 210px;
        background: #88B04B;
        border-radius: 0 5px 5px 0;
        border: 0px;
        color: #fff;
        font-weight: bold;
        transition: background-color 0.4s;

        &:hover {
            background: ${shade(0.2, '#88B04B')};
        }
    }
`;

export const Projects = styled.div`
    margin-top: 30px;
    max-width: 700px;

    a{
        background: #FFF;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;

        text-decoration: none;
        display: flex;
        align-items: center;
        transition: transform 0.2s;
        margin-top: 20px;

        &:hover {
            transform: translateX(10px);
        }

        div{
            margin: 0 16px;
            flex: 1;
            
            strong{
                font-size: 20px;
                color: #292929;
            }

            p{
 
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1; /* number of lines to show */
                -webkit-box-orient: vertical;
                font-size: 18px;
                color: ${lighten(0.4, '#1F1F28')};
                margin-top: 4px;
            }
        }


        svg{
            margin-left: auto;
            color: #1F1F28;
        }

    }
`;

export const AddProject = styled.div`
    margin-top: 20px;
    margin-left: 10px;

    max-width: 700px;
    

    a{
        font-size: 16px;
        text-decoration: none;
        border: 0px;
        color: #292929;
        
        font-weight: bold;
        transition: background-color 0.4s;

        &:hover {
            color: ${shade(0.6, '#292929')};
        }
    }
`;

export const Sprints = styled.div`
    background: #FFF;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;

    text-decoration: none;
    display: flex;
    align-items: center;

    transition: transform 0.2s;
    margin-top: 20px;

    strong{
        font-size: 20px;
        color: #292929;
    }

    p{
 
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
        font-size: 18px;
        color: ${lighten(0.4, '#1F1F28')};
        margin-top: 4px;
    }

    &:hover {
            transform: translateX(10px);
    }

   
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
            }

        svg{
       
        margin-right: 4px;
        color: #1F1F28;
        }
      }
    }
`



