import React from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';

const StyledHeader = styled.header`
  padding-bottom: 50px;
  .header__wrapper {
    display: flex;
    justify-content: space-between;
  }
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Wrapper className="header__wrapper">
        {/* TODO */}
        <div>LOGO</div>
        <div>NAV</div>
        <div>USER MENU</div>
      </Wrapper>
    </StyledHeader>
  );
};

export default Header;
