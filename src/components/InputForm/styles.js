import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';
import { lighten } from 'polished'

export const Container = styled.div`
  background: ${lighten(0.1, '#E1E2E0')};
  border-radius: 8px;
  border: 2px solid ${lighten(0.1, '#E1E2E0')};
  width: 100%;
  color: #292929;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 14px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  

  ${props =>
    props.isFilled &&
    css`
      color: #88B04B;
    `}

  input {
    color: #292929;
    background: transparent;
    border: 0;

    &::placeholder {
        color: #292929;
    }
  }

  svg {
    margin-right: 16px;
  }

  
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-right: 10px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
