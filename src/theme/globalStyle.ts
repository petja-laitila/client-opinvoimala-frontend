import { createGlobalStyle } from 'styled-components';
import { COLORS, fontSize } from './theme';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    background-color: ${COLORS.background};
    color: ${COLORS.text};
    ${fontSize(16, 20)};
    letter-spacing: -0.01em;
    line-height: 160%;
  }

  hr {
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  a {
    color: ${COLORS.accent};
  }

  ul, ol {
    padding-left: 28px;
  }

  blockquote {
    margin-left: 28px;
    padding-left: 5px;
    border-left: 4px solid ${COLORS.grey3};
    font-style: oblique;
  }

  p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: ${COLORS.heading};
    font-family: 'Urbanist', sans-serif;
    font-weight: bold;
    line-height: 120%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  h1 {
    ${fontSize(36, 64)}
  }

  h2 {
    ${fontSize(28, 36)}
  }

  h3 {
    ${fontSize(24, 28)}
  }

  h4 {
    ${fontSize(20, 22)}
  }

  img {
    max-width: 100%;
  }
`;
