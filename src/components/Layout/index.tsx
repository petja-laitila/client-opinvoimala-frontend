import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Hero, { HeroProps } from './Hero';
import Wrapper from './Wrapper';

const Container = styled.div`
  .header {
    &__header,
    &__hero {
      background-color: ${p => p.theme.color.primaryLight};
    }
    &__hero {
      padding-top: 50px;
    }
  }
  main {
    background-color: ${p => p.theme.color.background};
    position: relative;
    padding-bottom: 60px;
  }
`;

const DiagonalSeparator = styled.div`
  height: 200px;
  background: linear-gradient(
    -182deg,
    ${p => p.theme.color.primaryLight} 50%,
    transparent 0%
  );

  @media ${p => p.theme.breakpoint.tablet} {
    height: 150px;
  }

  @media ${p => p.theme.breakpoint.mobile} {
    height: 100px;
    background: linear-gradient(
      -184deg,
      ${p => p.theme.color.primaryLight} 50%,
      transparent 0%
    );
  }
`;

interface Props {
  wrapperSize?: 'sm' | 'normal';
  hero?: HeroProps;
}

const Layout: React.FC<Props> = ({
  hero,
  wrapperSize = 'normal',
  children,
}) => {
  return (
    <Container>
      <div className="header__header">
        <Header />
      </div>

      <main>
        {hero && (
          <div className="header__hero">
            <Wrapper size={wrapperSize}>
              <Hero {...hero} />
            </Wrapper>
          </div>
        )}

        <DiagonalSeparator />

        <Wrapper size={wrapperSize}>{children}</Wrapper>
      </main>

      <Footer />
    </Container>
  );
};

export default Layout;
