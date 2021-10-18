import {
  Instance,
  types,
  flow,
  cast,
  getSnapshot,
  SnapshotOut,
  SnapshotIn,
} from 'mobx-state-tree';
import api from '../services/api/Api';
import { isFutureDate, isPastDate } from '../utils/date';

const States = [
  'NOT_FETCHED' as const,
  'FETCHING' as const,
  'FETCHED' as const,
  'ERROR' as const,
];

const AppointmentStates = [
  'IDLE' as const,
  'CANCELLING' as const,
  'BOOKING' as const,
  'ERROR' as const,
];

const SpecialistModel = types.model({
  name: types.string,
  role: types.maybeNull(types.string),
});
export interface Specialist extends SnapshotOut<typeof SpecialistModel> {}

const AppointmentModel = types.model({
  id: types.number,
  status: types.enumeration(['available', 'booked', 'cancelled', 'hidden']),
  startTime: types.string,
  endTime: types.string,
  meetingLink: types.string,
  appointmentSpecialist: types.maybeNull(SpecialistModel),
});
export interface IAppointmentModel extends Instance<typeof AppointmentModel> {}
export interface Appointment extends SnapshotOut<typeof AppointmentModel> {}
export interface AppointmentIn extends SnapshotIn<typeof AppointmentModel> {}

export const AppointmentsStore = types
  .model({
    state: types.enumeration('State', States),
    data: types.maybe(types.array(AppointmentModel)),

    appointmentState: types.enumeration('State', AppointmentStates),
  })
  .views(self => ({
    get appointments() {
      if (!self.data) return [];
      const appointments = getSnapshot(self.data) ?? [];

      const byStartTime = (a: Appointment, b: Appointment) =>
        a.startTime.localeCompare(b.startTime);

      return [...appointments].sort(byStartTime);
    },

    get upcomingAppointments() {
      return this.appointments.filter(({ endTime }) => isFutureDate(endTime));
    },

    get pastAppointments() {
      return this.appointments
        .filter(({ endTime }) => isPastDate(endTime))
        .reverse();
    },
  }))
  .actions(self => {
    const fetchAppointments = flow(function* (
      params: API.GetAppointments = {}
    ) {
      self.state = 'FETCHING';

      const response: API.GeneralResponse<API.RES.GetAppointments> =
        yield api.getAppointments(params);

      if (response.kind === 'ok') {
        self.data = cast(response.data);
        self.state = 'FETCHED';
      } else {
        self.state = 'ERROR';
      }
    });

    const cancelAppointment = flow(function* (params: API.CancelAppointment) {
      self.appointmentState = 'CANCELLING';

      const response: API.GeneralResponse<API.RES.CancelAppointment> =
        yield api.cancelAppointment(params);

      if (response.kind === 'ok') {
        const data = self.data ? getSnapshot(self.data) : undefined;
        self.data = cast(data?.filter(({ id }) => id !== params.id));
        self.appointmentState = 'IDLE';
        return { success: true };
      } else {
        self.appointmentState = 'ERROR';
        return { success: false, error: response.data };
      }
    });

    return {
      fetchAppointments,
      cancelAppointment,
    };
  });

export interface IAppointmentsStore
  extends Instance<typeof AppointmentsStore> {}
