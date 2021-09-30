import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { path } from '../../routes/routes';
import { NavItem } from '../../store/NavigationStore';
import { useOutsideClickAction } from '../../utils/hooks';

const StyledNavMenu = styled.div`
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
      top: 35px;
      left: 20px;
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

const NavMenu: React.FC<NavItem> = ({ id, label, targetPage, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref: React.RefObject<HTMLDivElement> = React.createRef();

  useOutsideClickAction({
    ref,
    condition: isOpen,
    action: () => setIsOpen(false),
  });

  const toggleMenu = () => {
    if (links?.length) setIsOpen(!isOpen);
  };

  const pageUrl = (target?: number | null) => {
    if (!target) return '/';
    return `/${path('content_page')}/${target}`;
  };

  const renderMainLink = () => {
    if (targetPage)
      return (
        <NavLink key={id} to={pageUrl(targetPage)}>
          {label}
        </NavLink>
      );
    else return <span key={id}>{label}</span>;
  };

  const showMenu = isOpen && links?.length;

  return (
    <StyledNavMenu onClick={toggleMenu} ref={ref}>
      <div className="navigation__main-link">{renderMainLink()}</div>
      <div className={`navigation__menu${isOpen ? ' is-open' : ''}`}>
        {showMenu &&
          links
            .filter(({ targetPage }) => targetPage)
            .map(({ id, label, targetPage }) => (
              <NavLink key={id} to={pageUrl(targetPage)}>
                {label}
              </NavLink>
            ))}
      </div>
    </StyledNavMenu>
  );
};

export default NavMenu;
