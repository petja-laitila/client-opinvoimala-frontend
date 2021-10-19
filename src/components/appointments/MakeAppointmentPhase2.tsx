import React from 'react';
import { useTranslation } from 'react-i18next';
import { Appointment } from '../../store/AppointmentsStore';

interface Props {
  appointments: Appointment[];
}

const MakeAppointmentPhase2: React.FC<Props> = ({ appointments }) => {
  const { t } = useTranslation();

  // TODO

  return (
    <div>
      <div>{appointments.map(({ id }) => id)}</div>
    </div>
  );
};

export default MakeAppointmentPhase2;
