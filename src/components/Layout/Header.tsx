import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStore } from '../../store/storeContext';
import useWindowDimensions from '../../utils/hooks';
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

    & > div {
      display: flex;
      gap: ${p => p.theme.spacing.lg};
    }
  }
`;

const Header: React.FC = observer(() => {
  const { isMobile, isTablet } = useWindowDimensions();
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
                height={`${HEADER_HEIGHT - (isMobile ? 40 : 20)}px`}
                alt="logo"
              />
            </Link>
          )}
        </div>

        {isTablet ? (
          <div>
            <UserMenu />
            <NavBar />
          </div>
        ) : (
          <>
            <div>
              <NavBar />
            </div>
            <div>
              <UserMenu />
            </div>
          </>
        )}
      </Wrapper>
    </StyledHeader>
  );
});

export default Header;
