import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import AppointmentsList from '../components/AppointmentsList';
import Layout from '../components/Layout';
import { useStore } from '../store/storeContext';

interface Props {}

export const UserAppointments: React.FC<Props> = observer(() => {
  const { t } = useTranslation();

  const {
    appointments: {
      state,
      upcomingAppointments,
      pastAppointments,
      fetchAppointments,
    },
  } = useStore();

  const isLoading = state === 'FETCHING';

  const noAppointments =
    !upcomingAppointments.length && !pastAppointments.length;

  useEffect(() => {
    if (state === 'NOT_FETCHED') {
      fetchAppointments();
    }
  }, [fetchAppointments, state]);

  const handleCancel = (id: number) => {
    alert(`TODO: Cancel appointment (OPI-45): ${id}`);
  };

  const handleJoinMeeting = (link: string) => {
    window.open(link, '_newtab');
  };

  const hero = {
    title: t('route.appointments'),
  };

  return (
    <Layout hero={hero} isLoading={isLoading}>
      {noAppointments && (
        <Message content={t('view.appointments.no_appointments')} />
      )}

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
