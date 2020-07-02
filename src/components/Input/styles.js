import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';
import { lighten } from 'polished'

export const Container = styled.div`
  background: ${lighten(0.1, '#292929')};
  border-radius: 10px;
  border: 2px solid ${lighten(0.1, '#292929')};
  padding: 12px;
  width: 100%;
  color: #E1E2E0;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #88B04B;
      color: #88B04B;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #88B04B;
    `}

  input {
    color: #E1E2E0;
    background: transparent;
    border: 0;

    &::placeholder {
        color: ${lighten(0.1, '#E1E2E0')};
    }
  }

  svg {
    margin-right: 16px;
  }

  
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: -20px;

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
