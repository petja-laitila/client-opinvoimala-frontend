import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStore } from '../../store/storeContext';
import NavBar from './NavBar';
import UserMenu from './UserMenu';
import Wrapper from './Wrapper';

const HEADER_HEIGHT = 100; // px

const StyledHeader = styled.header`
  .header__wrapper {
    height: ${HEADER_HEIGHT}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Header: React.FC = observer(() => {
  const {
    settings: { settings },
  } = useStore();

  const { logo } = settings ?? {};

  return (
    <StyledHeader>
      <Wrapper className="header__wrapper">
        <div>
          {logo && (
            <Link to="/">
              <img
                src={logo.url}
                height={`${HEADER_HEIGHT - 20}px`}
                alt="logo"
              />
            </Link>
          )}
        </div>

        <div>
          <NavBar />
        </div>

        <div>
          <UserMenu />
        </div>
      </Wrapper>
    </StyledHeader>
  );
});

export default Header;
