import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Message, Transition } from 'semantic-ui-react';
import { useStore } from '../../store/storeContext';
import { today } from '../../utils/date';
import { Button } from '../inputs';
import MakeAppointmentPhase1 from './MakeAppointmentPhase1';
import MakeAppointmentPhase2 from './MakeAppointmentPhase2';
import MakeAppointmentPhase3 from './MakeAppointmentPhase3';
import { Appointment } from '../../store/AppointmentsStore';
import { getApiErrorMessages } from '../../utils/api';

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

    @media ${p => p.theme.breakpoint.mobile} {
      flex-direction: column-reverse;
      gap: ${p => p.theme.spacing.sm};
      button {
        width: 100%;
      }
    }
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
  const [selectedDate, setSelectedDate] = useState<Date>(today().toJSDate());
  const [appointment, setAppointment] = useState<Appointment>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);

  const okPhase1 = phase >= 1 && !!specialistRole;
  const okPhase2 = phase >= 2 && !!appointment;
  const continueDisabled =
    (phase === 1 && !okPhase1) || (phase === 2 && !okPhase2);

  const {
    appointments: {
      appointmentsByRole,
      roles,
      fetchAppointments,
      appointmentState,
      makeAppointment,
    },
  } = useStore();

  // Fetch available appointments always on mount
  useEffect(() => {
    const todayISO = today().toISO();
    fetchAppointments({ status: 'available', start_time_gte: todayISO });
  }, [fetchAppointments]);

  // Clear appointment if role was changed
  useEffect(() => {
    const roleChanged = specialistRole;
    if (roleChanged) setAppointment(undefined);
  }, [specialistRole]);

  const phases = [
    {
      title: t('view.appointments.make_new.choose_specialist'),
      controlButtons: ['next'],
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
      controlButtons: ['back', 'next'],
      component: (
        <MakeAppointmentPhase2
          appointments={appointmentsByRole(specialistRole?.id)}
          setAppointment={setAppointment}
          selectedAppointment={appointment}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ),
    },
    {
      title: t('view.appointments.make_new.confirm'),
      controlButtons: ['back', 'confirm'],
      component: (
        <MakeAppointmentPhase3
          appointment={appointment}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
        />
      ),
    },
  ];

  const currentPhase = phases[phase - 1];

  const progressText = `${phase}/${phases.length}`;

  const handlePhaseChange = (step: number) => () => {
    setErrorMsgs([]);
    const newPhase = phase + step;
    if (newPhase > 0 && newPhase <= phases.length) {
      setPhase(newPhase);
    }
  };

  const handleMakeAppointment = async () => {
    setErrorMsgs([]);
    const id = appointment?.id;
    if (appointmentState !== 'BOOKING' && id) {
      const { success, error } = await makeAppointment({ id, name, email });
      if (success) {
        // TODO: Go to next phase (summary)
      } else {
        setErrorMsgs(getApiErrorMessages(error.data));
      }
    }
  };

  const showBackButton = currentPhase.controlButtons.includes('back');
  const showNextButton = currentPhase.controlButtons.includes('next');
  const showConfirmButton = currentPhase.controlButtons.includes('confirm');

  return (
    <Container>
      <h1>
        {currentPhase.title}
        <span className="make-appointment__title--current-phase">
          {progressText}
        </span>
      </h1>

      <div>{currentPhase.component}</div>

      <Transition.Group>
        {!!errorMsgs.length && (
          <div>
            <Message
              error
              icon="warning sign"
              header={t('view.appointments.make_new.error_message_header')}
              list={errorMsgs}
            />
          </div>
        )}
      </Transition.Group>

      <div className="make-appointment__control-buttons">
        {showBackButton && (
          <Button
            aria-label="Back"
            id="make-appointment__back-button"
            text={t('view.appointments.make_new.action.back')}
            onClick={handlePhaseChange(-1)}
            color="grey3"
            negativeText
          />
        )}
        {showNextButton && (
          <Button
            aria-label="Continue"
            id="make-appointment__continue-button"
            text={t('view.appointments.make_new.action.continue')}
            onClick={handlePhaseChange(1)}
            disabled={continueDisabled}
          />
        )}
        {showConfirmButton && (
          <Button
            aria-label="Confirm"
            id="make-appointment__confirm-button"
            text={t('view.appointments.make_new.action.confirm')}
            onClick={handleMakeAppointment}
          />
        )}
      </div>
    </Container>
  );
});

export default MakeAppointmentContainer;
