import styled, { css, keyframes } from 'styled-components'
import { lighten } from 'polished'

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

const closeSteps = (size) => keyframes`
  0% { height: ${size * 80}px}
  10% {height: ${(size * 80 - (size * 80 * 0.10))}px}
  20% {height: ${(size * 80 - (size * 80 * 0.20))}px}
  30% { height: ${(size * 80 - (size * 80 * 0.30))}px}
  40% { height: ${(size * 80 - (size * 80 * 0.40))}px}
  50% { height: ${(size * 80 - (size * 80 * 0.50))}px}
  60% { height: ${(size * 80 - (size * 80 * 0.60))}px}
  70% { height: ${(size * 80 - (size * 80 * 0.70))}px}
  80% { height: ${(size * 80 - (size * 80 * 0.80))}px}
  90% { height: ${(size * 80 - (size * 80 * 0.90))}px}
 100% { height: 120px;}
`;

export const AnimationContainer = styled.div`
    animation: ${appearFromTop} 1s; 
`

export const AnimationContainerSteps = styled.div`
    animation: ${appearFromTop} 1s;
`
export const Container = styled.div`
    
    
    a {
    background: #FFF;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    margin-top: 16px;
    
    ${(props) => props.sizeSteps === 0 && css`
      height: 100px;
    `}

    ${props => props.sizeSprints > 0 && css`
        height: ${props.sizeSteps*80}px;
        scroll-behavior: smooth;
      `}

      ${props => !props.toggle && css`
        animation: ${closeSteps(props.sizeSprints)} 0.4s;
      `}

    &:hover {
      transform: translateX(10px);
    }

    div {
      margin: 0px 16px;
      flex: 1;
      animation: ${appearFromTop} 1s;
      
      
      
      strong {
        
        margin-top: 30px;
        font-size: 20px;
        color: #292929;
      }

      
      .stepinfo{
        
        display: flex;
        flex: 1;
        margin: 0;
        color: #292929;
        align-items: center;

        
          .date{
          font-size: 18px;
          justify-content: space-between;

          margin-top: 4px;
          margin-right: 30px;
        }
      }

      .description{
        color: ${lighten(0.2, '#1F1F28')};
        font-size: 18px;
        margin-top: 4px;
        margin-right: 30px;
      }
      
      

      & + div{
        margin-top: 20px;
      }
    }

    
    svg {
        margin-left: auto;
        color: #000000;
        cursor: pointer;
    } 
  }
`

export const StepNameContainer = styled.div`
    color: ${lighten(0.2, '#1F1F28')};
    font-size: 18px;
    margin-top: 4px;
    margin-right: 30px;
`
export const StepName = styled.strong`
    
`
