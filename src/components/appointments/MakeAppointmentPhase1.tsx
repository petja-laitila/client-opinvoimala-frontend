import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Role } from './MakeAppointmentContainer';

const RoleList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-family: ${p => p.theme.font.secondary};
  li button {
    width: 100%;
    text-align: left;
    margin: ${p => p.theme.spacing.sm} 0;
    padding: ${p => p.theme.spacing.lg};
    background-color: ${p => p.theme.color.grey3};
    color: ${p => p.theme.color.secondary};
    border-radius: ${p => p.theme.borderRadius.md};
    cursor: pointer;

    border: 2px solid ${p => p.theme.color.grey3};
    &.is-selected {
      border: 2px solid ${p => p.theme.color.secondary};
    }

    &.not-selected {
      color: ${p => p.theme.color.grey};
    }

    :hover:not(.is-selected) {
      border: 2px solid ${p => p.theme.color.accent};
    }
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

  const getButtonClassName = (role: Role) => {
    if (selectedRole) {
      const isSelected = role.id === selectedRole.id;
      return isSelected ? ' is-selected' : ' not-selected';
    }
    return undefined;
  };

  return (
    <RoleList>
      {roles.map((role, i) => (
        <li key={role.id}>
          <button
            aria-label="Role option"
            aria-pressed={isSelected(role)}
            autoFocus={i === 0}
            className={getButtonClassName(role)}
            onClick={handleRoleClick(role)}
          >
            {role.role}
          </button>
        </li>
      ))}
    </RoleList>
  );
};

export default MakeAppointmentPhase1;
