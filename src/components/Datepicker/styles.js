import styled from 'styled-components'
import { shade, lighten } from 'polished'


export const Container = styled.div`
    margin-top: 20px;
`

export const StyledDatePicker = styled.div`
  .react-datepicker__month-container{
    background: #E1E2E0;

    border-color: #88B04B;
  }
  
  .react-datepicker__day-name{
    font-size: 16px;
  }

  .react-datepicker__day{
    background: ${shade(0.05, '#E1E2E0')};
    border-radius: 10px;

    span{
      color: #1F1F28;
    }

    &:not(.react-datepicker__day--disabled):hover{
      background: ${shade(0.2, '#88B04B')};
    }
  }

  .react-datepicker__day--today{
    span{
      color: #1F1F28;
      font-weight: 500;
    }
  }

  .react-datepicker__day--selected{
    background: #88B04B;

      span{
        color: #292929;
        font-weight: bold;
      }
     
    }

  .react-datepicker__day--disabled{
    background: ${shade(0.05, '#E1E2E0')};
    border-radius: 10px;
    
    span{
      color: ${lighten(0.4, '#292929')}
    }
  }

  

  .react-datepicker__week{
    
  }


  .react-datepicker__header{
    background: #88B04B;
  }

  .react-datepicker__current-month{
    
  }

  .react-datepicker__navigation--next{
    color: #292929;
    border-left-color: #292929;
  }

  .react-datepicker__navigation--previous{
    color: #292929;
    border-right-color: #292929;
  }

  .react-datepicker__day--keyboard-selected{
    
    span{
      color: #1F1F28;
    }
  }
`;