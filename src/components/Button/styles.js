import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #88B04B;
  height: 44px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #E1E2E0;
  width: 100%;
  font-weight: 600;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#88B04B')};
  }
`;
