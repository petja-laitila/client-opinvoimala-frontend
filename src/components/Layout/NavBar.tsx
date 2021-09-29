import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  a {
    color: ${p => p.theme.color.secondary};
    font-family: ${p => p.theme.font.secondary};
    ${p => p.theme.font.size.md};
    font-weight: bold;
    margin-left: ${p => p.theme.spacing.lg};
    margin-right: ${p => p.theme.spacing.lg};
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;

const NavBar = () => {
  const navLinks = [
    { label: 'TODO ->', path: '#' },
    { label: 'Ajankohtaista', path: '#' },
    { label: 'Hyvinvointi', path: '#' },
    { label: 'Oppimisen tuki', path: '#' },
    { label: 'Tietoa meistä', path: '#' },
  ];

  return (
    <Nav>
      {navLinks.map(({ label, path }) => (
        <NavLink to={path}>{label}</NavLink>
      ))}
    </Nav>
  );
};

export default NavBar;
