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

const SpecialistModel = types.model({
  name: types.string,
  role: types.string,
});
export interface Specialist extends SnapshotOut<typeof SpecialistModel> {}

const AppointmentModel = types.model({
  id: types.number,
  visible: types.boolean,
  cancelled: types.maybeNull(types.boolean),
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

    return {
      fetchAppointments,
    };
  });

export interface IAppointmentsStore
  extends Instance<typeof AppointmentsStore> {}
