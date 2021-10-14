import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Loader, Message, Transition } from 'semantic-ui-react';
import AppointmentsList from '../components/AppointmentsList';
import Layout from '../components/Layout';
import { useStore } from '../store/storeContext';
import { getApiErrorMessages } from '../utils/api';

interface Props {}

export const UserAppointments: React.FC<Props> = observer(() => {
  const { t } = useTranslation();

  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState<string>();

  const {
    appointments: {
      state,
      appointmentState,
      upcomingAppointments,
      pastAppointments,
      fetchAppointments,
      cancelAppointment,
    },
  } = useStore();

  const isLoading = state === 'FETCHING';
  const showLoader = !['IDLE', 'ERROR'].includes(appointmentState);

  const noAppointments =
    !upcomingAppointments.length && !pastAppointments.length;

  useEffect(() => {
    if (state === 'NOT_FETCHED') {
      fetchAppointments();
    }
  }, [fetchAppointments, state]);

  const clearMessages = () => {
    setErrorMsgs([]);
    setSuccessMsg(undefined);
  };

  const handleCancel = async (id: number) => {
    clearMessages();
    const { success, error } = await cancelAppointment({ id });
    if (success) {
      setSuccessMsg(t('view.appointments.appointment_cancelled'));
    } else {
      setErrorMsgs(getApiErrorMessages(error.data));
    }
  };

  const handleJoinMeeting = (link: string) => {
    window.open(link, '_newtab');
  };

  const hero = {
    title: t('route.appointments'),
  };

  return (
    <Layout hero={hero} isLoading={isLoading}>
      <Loader active={showLoader} size="massive" />

      {noAppointments && (
        <Message content={t('view.appointments.no_appointments')} />
      )}

      <Transition.Group>
        {!!successMsg && (
          <div>
            <Message success icon="check circle" content={successMsg} />
            <Divider hidden />
          </div>
        )}
      </Transition.Group>

      <Transition.Group>
        {!!errorMsgs.length && (
          <div>
            <Message
              error
              icon="warning sign"
              header={t('view.appointments.title.cancel_error')}
              list={errorMsgs}
            />
            <Divider hidden />
          </div>
        )}
      </Transition.Group>

      {!!upcomingAppointments.length && (
        <AppointmentsList
          title={t('view.appointments.title.upcoming')}
          items={upcomingAppointments}
          onCancel={handleCancel}
          onJoin={handleJoinMeeting}
        />
      )}

      {!!pastAppointments.length && (
        <AppointmentsList
          title={t('view.appointments.title.past')}
          items={pastAppointments}
        />
      )}
    </Layout>
  );
});
