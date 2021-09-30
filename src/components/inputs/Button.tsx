import React, { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../../theme/styled';

const StyledButton = styled.button<{
  color: ColorType;
  negativeText: boolean;
  isSmall: boolean;
  noMargin: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${p => (p.isSmall ? undefined : '140px')};
  border-radius: ${p => (p.isSmall ? p.theme.borderRadius.md : '40px')};
  margin: ${p => (p.noMargin ? 0 : p.theme.spacing.sm)} auto;

  padding-top: ${p => (p.isSmall ? p.theme.spacing.sm : p.theme.spacing.md)};
  padding-bottom: ${p => (p.isSmall ? p.theme.spacing.sm : p.theme.spacing.md)};
  padding-left: ${p => p.theme.spacing.lg};
  padding-right: ${p => p.theme.spacing.lg};

  font-family: ${p => p.theme.font.secondary};
  ${p => (p.isSmall ? p.theme.font.size.sm : p.theme.font.size.md)};
  font-weight: bold;
  user-select: none;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  svg {
    margin-left: 8px;
  }

  :active {
    box-shadow: none;
    opacity: 0.7;
  }

  &.button-filled {
    border: 1px solid ${p => p.theme.color[p.color]};
    background-color: ${p => p.theme.color[p.color]};
    color: ${p =>
      p.negativeText ? p.theme.color.secondary : p.theme.color.background};
    opacity: 1;
    :hover {
      opacity: 0.7;
    }
  }

  &.button-outlined {
    background-color: transparent;
    border: 1px solid ${p => p.theme.color[p.color]};
    color: ${p => p.theme.color[p.color]};
    opacity: 0.7;
    :hover {
      opacity: 1;
    }
  }

  &.button-link {
    background-color: transparent;
    border: 1px solid transparent;
    color: ${p => p.theme.color[p.color]};
    opacity: 1;
    text-decoration: underline;
    font-weight: normal;
    :hover:not(.disabled) {
      font-weight: bold;
    }
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

type ColorType = keyof Colors;
type VariantType = 'filled' | 'outlined' | 'link';

interface Props {
  id: string;
  text?: string | JSX.Element;
  icon?: JSX.Element;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  type?: 'button' | 'submit' | 'reset';
  color?: ColorType;
  negativeText?: boolean;
  variant?: VariantType;
  disabled?: boolean;
  isSmall?: boolean;
  noMargin?: boolean;
}

export const Button: FC<Props> = ({
  id,
  text,
  icon,
  onClick,
  type = 'button',
  color = 'secondary',
  negativeText = false,
  variant = 'filled',
  disabled,
  isSmall = false,
  noMargin = false,
}) => {
  return (
    <StyledButton
      id={id}
      data-testid={id}
      type={type}
      onClick={onClick}
      className={`button-${variant} ${disabled ? ' disabled' : ''}`}
      disabled={disabled}
      color={color}
      negativeText={negativeText}
      isSmall={isSmall}
      noMargin={noMargin}
    >
      {text}
      {icon}
    </StyledButton>
  );
};

export default Button;
