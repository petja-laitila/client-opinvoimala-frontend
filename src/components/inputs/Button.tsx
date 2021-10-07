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

  svg {
    margin-left: 8px;
  }

  &.icon-button {
    padding: ${p => p.theme.spacing.md};
    svg {
      margin-left: 0;
    }
  }

  font-family: ${p => p.theme.font.secondary};
  ${p => (p.isSmall ? p.theme.font.size.sm : p.theme.font.size.md)};
  font-weight: bold;
  user-select: none;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  :active {
    box-shadow: none;
    opacity: 0.8;
  }

  &.button-filled {
    border: 1px solid ${p => p.theme.color[p.color]};
    background-color: ${p => p.theme.color[p.color]};
    color: ${p =>
      p.negativeText ? p.theme.color.secondary : p.theme.color.background};

    opacity: 1;
    :hover {
      opacity: 0.8;
    }
  }

  &.button-outlined {
    background-color: transparent;
    color: ${p => p.theme.color[p.color]};
    border: 1px solid ${p => p.theme.color[p.color]};

    &.icon-button {
      border-width: 2px;
    }

    opacity: 1;
    :hover {
      opacity: 0.8;
    }
  }

  &.button-link {
    background-color: transparent;
    border: 1px solid transparent;
    color: ${p => p.theme.color[p.color]};
    opacity: 1;
    font-weight: bold;
    :hover:not(.disabled) {
      text-decoration: underline;
    }
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.8;
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
  const isIconButton = !!icon && !text;

  const getClassName = () => {
    let className = `button-${variant}`;
    className += disabled ? ' disabled' : '';
    className += isIconButton ? ' icon-button' : '';
    return className;
  };

  return (
    <StyledButton
      id={id}
      data-testid={id}
      type={type}
      onClick={onClick}
      className={getClassName()}
      disabled={disabled}
      color={color}
      negativeText={negativeText}
      isSmall={isSmall || isIconButton}
      noMargin={noMargin}
    >
      {text}
      {icon}
    </StyledButton>
  );
};

export default Button;
