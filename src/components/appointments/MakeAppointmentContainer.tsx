import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useStore } from '../../store/storeContext';
import { today } from '../../utils/date';
import { Button } from '../inputs';
import MakeAppointmentPhase1 from './MakeAppointmentPhase1';
import MakeAppointmentPhase2 from './MakeAppointmentPhase2';
import MakeAppointmentPhase3 from './MakeAppointmentPhase3';

const Container = styled.div`
  h1 {
    ${p => p.theme.font.h2};

    .make-appointment__title--current-phase {
      ${p => p.theme.font.h6};
      margin-left: ${p => p.theme.spacing.lg};
    }
  }

  .make-appointment__control-buttons {
    margin-top: ${p => p.theme.spacing.lg};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: ${p => p.theme.spacing.lg};
  }
`;

export interface Role {
  id: number;
  role: string;
}

interface Props {}

const MakeAppointmentContainer: React.FC<Props> = observer(() => {
  const { t } = useTranslation();

  const [phase, setPhase] = useState(1);

  const [specialistRole, setSpecialistRole] = useState<Role>();

  const okPhase1 = !!specialistRole;
  const continueDisabled = !okPhase1;

  const {
    appointments: {
      appointmentsByRole,
      roles,
      fetchAppointments,
      appointmentsState,
    },
  } = useStore();

  useEffect(() => {
    if (appointmentsState === 'NOT_FETCHED') {
      const todayISO = today().toISO();
      fetchAppointments({ status: 'available', start_time_gte: todayISO });
    }
  }, [appointmentsState, fetchAppointments]);

  const phases = [
    {
      title: t('view.appointments.make_new.choose_specialist'),
      component: (
        <MakeAppointmentPhase1
          roles={roles}
          setRole={setSpecialistRole}
          selectedRole={specialistRole}
        />
      ),
    },
    {
      title: t('view.appointments.make_new.choose_appointment'),
      component: (
        <MakeAppointmentPhase2
          appointments={appointmentsByRole(specialistRole?.id)}
        />
      ),
    },
    {
      title: t('view.appointments.make_new.confirm'),
      component: <MakeAppointmentPhase3 />,
    },
  ];

  const currentPhase = phases[phase - 1];

  const progressText = `${phase}/${phases.length}`;

  const handlePhaseChange = (step: number) => () => {
    const newPhase = phase + step;
    if (newPhase > 0 && newPhase <= phases.length) {
      setPhase(newPhase);
    }
  };

  return (
    <Container>
      <h1>
        {currentPhase.title}
        <span className="make-appointment__title--current-phase">
          {progressText}
        </span>
      </h1>

      <div>{currentPhase.component}</div>

      <div className="make-appointment__control-buttons">
        {phase > 1 && (
          <Button
            aria-label="Back"
            id="make-appointment__back-button"
            text={t('view.appointments.make_new.action.back')}
            onClick={handlePhaseChange(-1)}
            color="grey3"
            negativeText
          />
        )}
        <Button
          aria-label="Continue"
          id="make-appointment__continue-button"
          text={t('view.appointments.make_new.action.continue')}
          onClick={handlePhaseChange(1)}
          disabled={continueDisabled}
        />
      </div>
    </Container>
  );
});

export default MakeAppointmentContainer;
