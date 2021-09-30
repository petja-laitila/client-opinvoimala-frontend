import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useOutsideClickAction } from '../../utils/hooks';

const StyledNavMenu = styled.div<{ verticalPosition: number }>`
  display: inline-block;
  position: relative;

  .navigation {
    &__main-link,
    &__menu {
      a,
      span {
        color: ${p => p.theme.color.secondary};
        font-family: ${p => p.theme.font.secondary};
        ${p => p.theme.font.size.md};
        font-weight: bold;
        margin-left: ${p => p.theme.spacing.lg};
        margin-right: ${p => p.theme.spacing.lg};
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    }

    &__menu {
      position: absolute;
      top: ${p => 35 + p.verticalPosition}px;
      &.align-right {
        right: 0;
      }
      &.align-left {
        left: 10px;
      }
      background-color: ${p => p.theme.color.background};
      ${p => p.theme.shadows[0]};
      border-radius: ${p => p.theme.borderRadius.sm};
      z-index: 99;
      width: 230px;

      transition: all 0.2s ease-in-out;

      opacity: 0;
      &.is-open {
        opacity: 1;
      }

      a {
        display: block;
        padding: ${p => p.theme.spacing.md} ${p => p.theme.spacing.lg};
        margin: 0;
        font-weight: normal;
      }
    }
  }
`;

interface Props {
  triggerLink?: {
    label: string;
    url?: string;
  };
  // Optional trigger element (e.g. Button) to toggle menu open
  // (Will override possible label & url props above)
  triggerEl?: JSX.Element;

  items: {
    id: number | string;
    label: string;
    url: string;
  }[];
  align?: 'left' | 'right';
  verticalPosition?: number;
}

const NavMenu: React.FC<Props> = ({
  triggerLink,
  triggerEl,
  items,
  align = 'left',
  verticalPosition = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref: React.RefObject<HTMLDivElement> = React.createRef();

  useOutsideClickAction({
    ref,
    condition: isOpen,
    action: () => setIsOpen(false),
  });

  const toggleMenu = () => {
    if (items?.length) setIsOpen(!isOpen);
  };

  const renderTrigger = () => {
    if (triggerEl) return triggerEl;
    if (triggerLink) {
      const { url, label } = triggerLink;
      if (url) return <NavLink to={url}>{label}</NavLink>;
      if (label) return <span>{label}</span>;
    }
    return null;
  };

  const getMenuClassName = () => {
    let className = 'navigation__menu';
    className += ` align-${align}`;
    if (isOpen) className += ' is-open';
    return className;
  };

  const showMenu = isOpen && items?.length;

  return (
    <StyledNavMenu
      onClick={toggleMenu}
      ref={ref}
      verticalPosition={verticalPosition}
    >
      <div className="navigation__main-link">{renderTrigger()}</div>
      <div className={getMenuClassName()}>
        {showMenu &&
          items.map(({ id, label, url }) => (
            <NavLink key={id} to={url}>
              {label}
            </NavLink>
          ))}
      </div>
    </StyledNavMenu>
  );
};

export default NavMenu;
