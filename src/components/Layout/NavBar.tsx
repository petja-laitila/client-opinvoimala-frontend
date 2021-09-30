import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { path } from '../../routes/routes';
import { useStore } from '../../store/storeContext';

const Nav = styled.nav`
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
`;

const NavBar = observer(() => {
  const {
    navigation: { state, navigation, fetchNavigation },
  } = useStore();

  useEffect(() => {
    if (state === 'NOT_FETCHED') fetchNavigation({});
  }, [fetchNavigation, state]);

  const navItems = navigation?.items ?? [];

  return (
    <Nav>
      {navItems.map(({ id, label, targetPage }) => {
        if (targetPage)
          return (
            <NavLink key={id} to={`/${path('content_page')}/${targetPage}`}>
              {label}
            </NavLink>
          );
        else return <span key={id}>{label}</span>;
      })}
    </Nav>
  );
});

export default NavBar;
