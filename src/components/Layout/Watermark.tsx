import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ImageWhite } from '../../assets/hearts-white.svg';
import { ReactComponent as ImageColor } from '../../assets/hearts-color.svg';

const Container = styled.div<{ position: string }>`
  position: absolute;
  ${p => p.position};

  @media ${p => p.theme.breakpoint.tablet} {
    top: -50px;
    right: 0px;
    left: auto;
    bottom: auto;
    svg {
      width: 80px;
    }
  }
`;

interface Position {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface Props extends Position {
  width?: number;
  isNegative?: boolean;
}

const getPositionCss = ({ top, right, bottom, left }: Position) => {
  let css = '';
  if (top && !isNaN(top)) css += `top: ${top}px;`;
  if (right && !isNaN(right)) css += `right: ${right}px;`;
  if (bottom && !isNaN(bottom)) css += `bottom: ${bottom}px;`;
  if (left && !isNaN(left)) css += `left: ${left}px;`;
  return css;
};

const Watermark: React.FC<Props> = ({
  width = 150,
  isNegative = false,
  top,
  right,
  bottom,
  left,
}) => {
  const positionCss = getPositionCss({ top, right, bottom, left });

  const Image = isNegative ? ImageWhite : ImageColor;

  return (
    <Container position={positionCss}>
      <Image width={`${width}px`} />
    </Container>
  );
};

export default Watermark;
