import { observer } from 'mobx-react-lite';
import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { OTAVIA_SPECIALISTS_URL } from '../../utils/constants';

const Container = styled.div`
  margin-bottom: ${p => p.theme.spacing.xl};
`;

interface Props {}

export const MakeAppointmentNoAppointments: React.FC<Props> = observer(() => {
  return (
    <Container>
      <Trans i18nKey="view.appointments.make_new.specialist_contacts">
        See contacts in{' '}
        <a href={OTAVIA_SPECIALISTS_URL} target="_blank" rel="noreferrer">
          Otavia
        </a>
      </Trans>
    </Container>
  );
});

export default MakeAppointmentNoAppointments;
