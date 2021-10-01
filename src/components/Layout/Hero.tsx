import React from 'react';
import styled from 'styled-components';
import { Image } from '../../store/models';
import Watermark from './Watermark';

const Container = styled.div`
  margin-bottom: -40px;
  position: relative;
  display: flex;
  justify-content: space-between;

  .hero {
    &__main-column {
      flex: 1;
      z-index: 1;
      h1 {
        line-height: 77px;
      }
    }

    &__side-column {
      position: absolute;
      right: 0;
      top: 0;
      width: 30%;
    }

    &__side-column-placeholder {
      width: 35%;
    }
  }

  @media ${p => p.theme.breakpoint.mobile} {
    flex-direction: column;
    align-items: center;
    .hero {
      &__side-column,
      &__main-column {
        position: initial;
        width: 100%;
      }
      &__main-column {
        h1 {
          line-height: 43px;
        }
        &.align-center {
          text-align: center;
        }
      }
      &__side-column {
        text-align: center;
        & > img {
          margin-top: ${p => p.theme.spacing.xl};
          margin-bottom: -50px;
          width: 75%;
        }
      }
    }
  }
`;

export interface HeroProps {
  title?: string | null;
  lead?: string | null;
  image?: Image | null;
  align?: string;
}

const Hero: React.FC<HeroProps> = ({ title, lead, image, align = 'left' }) => {
  return (
    <Container>
      <Watermark isNegative left={-220} top={40} />

      <div className={`hero__main-column align-${align}`}>
        <h1>{title}</h1>
        <div>{lead}</div>
      </div>

      {image && (
        <>
          <div className="hero__side-column">
            <img src={image?.url} alt="" />
          </div>
          <div className="hero__side-column-placeholder"></div>
        </>
      )}
    </Container>
  );
};

export default Hero;
