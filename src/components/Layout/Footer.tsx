import React from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Wrapper from './Wrapper';

const StyledFooter = styled.footer`
  background-color: ${p => p.theme.color.grey3};
  padding-top: ${p => p.theme.spacing.lg};
  padding-bottom: ${p => p.theme.spacing.lg};

  ${p => p.theme.font.size.sm};
`;

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const year = DateTime.utc().toFormat('yyyy');

  return (
    <StyledFooter>
      <Wrapper>
        <h4>{t('app_name')}</h4>
        <div>{t('phone_abbrv')}</div>
        <hr />
        <div>{t('copyright_text', { year })}</div>
      </Wrapper>
    </StyledFooter>
  );
};

export default Footer;
