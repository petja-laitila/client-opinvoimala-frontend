import React from 'react';
import { Checkbox as SemanticCheckbox, CheckboxProps } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: ${p => p.theme.spacing.lg} 0;

  label {
    padding-left: ${p => p.theme.spacing.md};
  }
`;

interface Props extends CheckboxProps {
  id: string;
  label?: string | JSX.Element;
}

export const Checkbox: React.FC<Props> = ({ id, label, ...props }) => {
  return (
    <Container>
      <SemanticCheckbox id={id} {...props} />
      {label && <label htmlFor={id}>{label}</label>}
    </Container>
  );
};

export default Checkbox;
