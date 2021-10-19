import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import OptionToggleButton from '../inputs/OptionToggleButton';
import { Role } from './MakeAppointmentContainer';

const RoleList = styled.ul`
  list-style-type: none;
  padding: 0;
  li {
    margin: ${p => p.theme.spacing.md} 0;
  }
`;

interface Props {
  roles: Role[];
  setRole: Dispatch<SetStateAction<Role | undefined>>;
  selectedRole?: Role;
}

const MakeAppointmentPhase1: React.FC<Props> = ({
  roles,
  setRole,
  selectedRole,
}) => {
  const handleRoleClick = (role: Role) => () => {
    if (role.id === selectedRole?.id) {
      setRole(undefined);
    } else {
      setRole(role);
    }
  };

  const isSelected = (role: Role) => {
    return role.id === selectedRole?.id;
  };

  return (
    <RoleList>
      {roles.map((role, i) => (
        <li key={role.id}>
          <OptionToggleButton
            aria-label="Role option"
            isSelected={isSelected(role)}
            autoFocus={i === 0}
            onClick={handleRoleClick(role)}
          >
            {role.role}
          </OptionToggleButton>
        </li>
      ))}
    </RoleList>
  );
};

export default MakeAppointmentPhase1;
