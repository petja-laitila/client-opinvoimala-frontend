import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { path } from '../routes/routes';
import { Link } from '../store/models';
import Icon from './Icon';

const Container = styled.article`
  background-color: ${p => p.theme.color.background};
  border-radius: ${p => p.theme.borderRadius.sm};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 1;
  ${p => p.theme.shadows[0]};

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
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${p => p.theme.color.secondary};
      font-family: ${p => p.theme.font.secondary};
      ${p => p.theme.font.size.md};
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
      svg {
        margin-left: ${p => p.theme.spacing.md};
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
          <RouterLink to={`/${path('content_page')}/${link.targetPage}`}>
            {link.label}
            <Icon
              type="ArrowRight"
              strokeColor="secondary"
              color="none"
              width={22}
            />
          </RouterLink>
        </footer>
      )}
    </Container>
  );
};

export default Card;
