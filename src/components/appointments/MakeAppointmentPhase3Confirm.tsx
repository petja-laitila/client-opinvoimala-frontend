import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Appointment } from '../../store/AppointmentsStore';
import { Input } from '../inputs';
import AppointmentDetails from './AppointmentDetails';

const Container = styled.div`
  ${p => p.theme.font.size.sm};
  h2 {
    ${p => p.theme.font.h5};
    margin-bottom: 0;
  }
  .confirm-appointment__details {
    display: flex;
    gap: ${p => p.theme.spacing.xl};
    margin-bottom: ${p => p.theme.spacing.xl};
  }
`;

interface Props {
  appointment?: Appointment;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

const MakeAppointmentPhase3Confirm: React.FC<Props> = observer(
  ({ appointment, name, setName, email, setEmail }) => {
    const { t } = useTranslation();

    const handleChange =
      (setter: Dispatch<SetStateAction<string>>) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        setter(event.currentTarget.value);
      };

    if (!appointment) {
      return t('error.appointment.make.appointment_not_selected');
    }

    return (
      <Container>
        <AppointmentDetails appointment={appointment} direction="row" />

        <h2>{t('view.appointments.make_new.contact_data_title')}</h2>
        <p>{t('view.appointments.make_new.contact_data_info')}</p>

        <Input
          label={t('label.name')}
          id="make_appointment__name-input"
          name="name"
          value={name}
          onChange={handleChange(setName)}
          size="large"
        />
        <Input
          label={t('label.email')}
          id="email-input"
          name="email"
          value={email}
          onChange={handleChange(setEmail)}
          size="large"
        />
      </Container>
    );
  }
);

export default MakeAppointmentPhase3Confirm;
