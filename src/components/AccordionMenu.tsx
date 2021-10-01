import React, { useState } from 'react';
import { MenuItem } from './DropdownMenu';
import Icon from './Icon';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  .accordion__trigger-button {
    padding-right: ${p => p.theme.spacing.lg};
    display: flex;
  }
  a,
  span,
  button {
    width: 100%;
  }

  .accordion__menu {
    max-height: 0;
    opacity: 0;
    &.is-open {
      max-height: 1000px;
      opacity: 1;
    }
    transition: all 0.2s ease-in-out;

    li.accordion__item {
      a,
      span,
      button {
        padding-left: ${p => p.theme.spacing.xl};
        ${p => p.theme.font.size.lg};
      }
    }
  }
`;

interface Props {
  id: number | string;
  label: string;
  url?: string;
  items?: MenuItem[];
}

const AccordionMenu: React.FC<Props> = ({ id, label, url, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    if (items?.length) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Container>
      <div className="accordion__trigger-button">
        {url ? (
          <NavLink to={url}>{label}</NavLink>
        ) : (
          <button onClick={toggleAccordion}>{label}</button>
        )}
        {!!items?.length && <Icon type="Plus" color="primary" />}
      </div>

      {!!items?.length && (
        <ul className={`accordion__menu${isOpen ? ' is-open' : ''}`}>
          {isOpen &&
            items.map(({ id, label, url }) => (
              <li key={`accordion-item-${id}`} className="accordion__item">
                {url ? (
                  <NavLink to={url}>{label}</NavLink>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            ))}
        </ul>
      )}
    </Container>
  );
};

export default AccordionMenu;
