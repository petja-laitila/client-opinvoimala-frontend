import React, { FC, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Colors } from '../theme/styled';

import { ReactComponent as ArrowRight } from '../assets/icons/arrow-right.svg';
import { ReactComponent as SignIn } from '../assets/icons/sign-in.svg';
import { ReactComponent as User } from '../assets/icons/md-person.svg';

const Icons = {
  ArrowRight,
  SignIn,
  User,
};

export type IconType = keyof typeof Icons;

interface Props {
  type: IconType;
  color?: keyof Colors | 'none';
  strokeColor?: keyof Colors;
  width?: number;
}

const Icon: FC<Props> = ({
  type,
  color = 'secondary',
  strokeColor,
  width = 18,
}) => {
  const themeContext = useContext(ThemeContext);

  const stroke = strokeColor ? themeContext.color[strokeColor] : 'none';
  const fill = color && color !== 'none' ? themeContext.color[color] : 'none';

  const iconProps = {
    stroke,
    width,
    fill,
  };

  const IconComponent = Icons[type];

  return <IconComponent {...iconProps} />;
};

export default Icon;
