import React from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/storeContext';

const StyledFooter = styled.footer`
  background-color: ${p => p.theme.color.grey3};
  padding-top: ${p => p.theme.spacing.lg};
  padding-bottom: ${p => p.theme.spacing.lg};

  ${p => p.theme.font.size.sm};
`;

const Footer: React.FC = observer(() => {
  const { t } = useTranslation();

  const {
    settings: { settings },
  } = useStore();

  const { phone, email } = settings ?? {};

  const year = DateTime.utc().toFormat('yyyy');

  return (
    <StyledFooter>
      <Wrapper>
        <h4>{settings?.appName ?? t('app_name')}</h4>
        {phone && <div>{`${t('phone_abbrv')} ${phone}`}</div>}
        {email && <div>{`${email}`}</div>}
        <hr />
        <div>{t('copyright_text', { year })}</div>
      </Wrapper>
    </StyledFooter>
  );
});

export default Footer;
