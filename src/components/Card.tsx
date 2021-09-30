import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { path } from '../routes/routes';
import { Link } from '../store/models';

const Container = styled.div`
  background-color: ${p => p.theme.color.background};
  border-radius: ${p => p.theme.borderRadius.sm};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 1;
  ${p => p.theme.shadows[0]};
  min-width: 22%;
  max-width: 24%;

  @media ${p => p.theme.breakpoint.tablet} {
    min-width: 47%;
    max-width: 49%;
  }

  @media ${p => p.theme.breakpoint.mobile} {
    min-width: 100%;
    max-width: 100%;
  }

  main {
    border-top-left-radius: ${p => p.theme.borderRadius.sm};
    border-top-right-radius: ${p => p.theme.borderRadius.sm};
    flex: 1;
    padding: ${p => p.theme.spacing.md} ${p => p.theme.spacing.lg};
    h4 {
      line-height: 28px;
    }
    p {
      ${p => p.theme.font.size.md};
    }
  }

  footer {
    border-bottom-left-radius: ${p => p.theme.borderRadius.sm};
    border-bottom-right-radius: ${p => p.theme.borderRadius.sm};
    padding: ${p => p.theme.spacing.sm} ${p => p.theme.spacing.lg};
    background-color: ${p => p.theme.color.grey3};
    text-align: center;

    a {
      color: ${p => p.theme.color.secondary};
      font-family: ${p => p.theme.font.secondary};
      ${p => p.theme.font.size.md};
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;

interface Props {
  title?: string | null;
  text?: string | null;
  link?: Link | null;
}

const Card: React.FC<Props> = ({ title, text, link }) => {
  return (
    <Container>
      <main>
        {title && <h4>{title}</h4>}
        {text && <p>{text}</p>}
      </main>

      {link && (
        <footer>
          <RouterLink to={`/${path('content_page')}/${link.target_page}`}>
            {link.label}
          </RouterLink>
        </footer>
      )}
    </Container>
  );
};

export default Card;
