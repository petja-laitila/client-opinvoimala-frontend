import React from 'react';
import styled from 'styled-components';
import Watermark from './Watermark';

const Section = styled.section<{ reverseOrderOnMobile: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: stretch;
  position: relative;
  margin-top: 60px;
  margin-bottom: 60px;
  gap: 20px;

  @media ${p => p.theme.breakpoint.mobile} {
    flex-direction: ${p =>
      p.reverseOrderOnMobile ? 'column-reverse' : 'column'};
  }

  & > div {
    flex: 1;
  }
`;

interface Props {
  reverseOrderOnMobile?: boolean;
  showTopWatermark?: boolean;
  showBottomWatermark?: boolean;
}

const Columns: React.FC<Props> = ({
  reverseOrderOnMobile = false,
  showTopWatermark = true,
  showBottomWatermark = false,
  children,
}) => {
  return (
    <Section reverseOrderOnMobile={reverseOrderOnMobile}>
      {showTopWatermark && <Watermark right={-100} />}
      {showBottomWatermark && <Watermark bottom={-20} left={-60} />}
      {children}
    </Section>
  );
};

export default Columns;
