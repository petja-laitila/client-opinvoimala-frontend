import { DefaultTheme, ThemeProvider as Provider } from 'styled-components';

const primaryColor = '#315363';
const secondaryColor = '#0B1159';

export const COLORS = Object.freeze({
  primary: primaryColor,
  primaryLight: '#CEE5D8',
  secondary: secondaryColor,
  accent: '#EB5A96',
  grey: '#555555',
  grey2: '#4F4F4F',
  grey3: '#F4F5F7',

  foreground: '#000000',
  background: '#ffffff',

  heading: secondaryColor,
  text: '#555555',
});

export const BREAKPOINTS = Object.freeze({
  mobile: 800,
  tablet: 1100,
  laptop: 1400,
});

export const fontSize = (sm: number, md: number) => {
  return `
    font-size: ${md}px;
    line-height: 160%;
    @media (max-width: ${BREAKPOINTS.mobile}px) {
      font-size: ${sm}px;
    }
  `;
};

export const theme: DefaultTheme = {
  color: COLORS,

  borderRadius: {
    sm: '4px',
    md: '10px',
    lg: '15px',
    xl: '25px',
  },

  spacing: {
    sm: '5px',
    md: '10px',
    lg: '20px',
    xl: '40px',
  },

  breakpoint: {
    mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
    tablet: `(max-width: ${BREAKPOINTS.tablet}px)`,
    laptop: `(max-width: ${BREAKPOINTS.laptop}px)`,
  },

  shadows: [
    'box-shadow: 0px 4px 18px rgba(11, 17, 89, 0.25)',
    'box-shadow: 0px 4px 6px rgba(50, 50, 93, 0.11)',
    'box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.08)',
  ],

  font: {
    main: 'Open sans',
    secondary: 'Urbanist',
    size: {
      sm: fontSize(12, 14),
      md: fontSize(14, 16),
      lg: fontSize(18, 22),
      xl: fontSize(22, 28),
    },
  },
};

export const ThemeProvider = Provider;
