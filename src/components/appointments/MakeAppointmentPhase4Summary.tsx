import React from 'react';
import { useTranslation } from 'react-i18next';
import { Appointment } from '../../store/AppointmentsStore';
import AppointmentDetails from './AppointmentDetails';

interface Props {
  appointment?: Appointment;
}

const MakeAppointmentPhase4Summary: React.FC<Props> = ({ appointment }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div>{t('view.appointments.make_new.summary_info')}</div>
      {appointment && <AppointmentDetails appointment={appointment} />}
    </div>
  );
};

export default MakeAppointmentPhase4Summary;
