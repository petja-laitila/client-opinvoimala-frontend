import React from 'react';
import styled from 'styled-components';
import { Appointment } from '../../store/AppointmentsStore';
import AppointmentsListItem from './AppointmentsListItem';

const Container = styled.section`
  margin-bottom: ${p => p.theme.spacing.xl};

  h1 {
    ${p => p.theme.font.h2};
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
`;

interface Props {
  title?: string;
  items: Appointment[];
  onCancel?: (id: number) => void;
  onJoin?: (link: string) => void;
}

export const AppointmentsList: React.FC<Props> = ({
  title,
  items,
  onCancel,
  onJoin,
}) => (
  <Container>
    {title && <h1>{title}</h1>}

    <ul>
      {items.map(appointment => (
        <AppointmentsListItem
          key={appointment.id}
          onCancel={onCancel}
          onJoin={onJoin}
          {...appointment}
        />
      ))}
    </ul>
  </Container>
);

export default AppointmentsList;
