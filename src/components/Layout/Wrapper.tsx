import styled from 'styled-components';

const Wrapper = styled.div<{ size?: 'sm' | 'normal' }>`
  position: relative;
  margin: auto;
  max-width: ${p => (p.size === 'sm' ? 900 : 1200)}px;
  padding-left: ${p => p.theme.spacing.xl};
  padding-right: ${p => p.theme.spacing.xl};

  @media ${p => p.theme.breakpoint.mobile} {
    padding-left: ${p => p.theme.spacing.lg};
    padding-right: ${p => p.theme.spacing.lg};
  }
`;

export default Wrapper;
