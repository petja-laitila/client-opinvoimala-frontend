import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MenuItem } from './DropdownMenu';
import Icon from './Icon';

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
  items?: MenuItem[];
}

const AccordionMenu: React.FC<Props> = ({ id, label, items }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    if (items?.length) {
      setIsOpen(!isOpen);
    }
  };

  if (!items?.length) {
    return null;
  }

  return (
    <Container>
      <div className="accordion__trigger-button">
        <button
          aria-expanded={isOpen}
          aria-haspopup={true}
          onClick={toggleAccordion}
        >
          {label}
        </button>
        <Icon type="Plus" color="primary" />
      </div>

      <ul
        aria-labelledby={t('aria.menu')}
        aria-hidden={!isOpen}
        className={`accordion__menu${isOpen ? ' is-open' : ''}`}
      >
        {isOpen &&
          items.map(({ id, label, url }) => (
            <li key={`accordion-item-${id}`} className="accordion__item">
              {url ? <NavLink to={url}>{label}</NavLink> : <span>{label}</span>}
            </li>
          ))}
      </ul>
    </Container>
  );
};

export default AccordionMenu;
