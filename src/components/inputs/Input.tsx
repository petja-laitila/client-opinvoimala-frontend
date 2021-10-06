import React from 'react';
import { Input as SemanticInput, InputProps } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled.div`
  margin: ${p => p.theme.spacing.lg} 0;
`;

interface Props extends InputProps {}

export const Input: React.FC<Props> = ({
  id,
  size = 'mini',
  label,
  ...props
}) => {
  return (
    <Container>
      {label && <label htmlFor={id}>{label}</label>}

      <SemanticInput {...props} size={size} fluid />
    </Container>
  );
};

export default Input;
