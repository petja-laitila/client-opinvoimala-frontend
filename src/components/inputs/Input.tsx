import React from 'react';
import { Input as SemanticInput, InputProps } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled.div<{ labelHidden?: boolean }>`
  margin: ${p => p.theme.spacing.lg} 0;
  label {
    display: ${p => (p.labelHidden ? 'none' : 'initial')};
  }
`;

interface Props extends InputProps {
  labelHidden?: boolean;
}

export const Input: React.FC<Props> = ({
  labelHidden = false,
  id,
  size = 'mini',
  label,
  ...props
}) => {
  return (
    <Container labelHidden={labelHidden}>
      {label && <label htmlFor={id}>{label}</label>}

      <SemanticInput {...props} size={size} fluid />
    </Container>
  );
};

export default Input;
