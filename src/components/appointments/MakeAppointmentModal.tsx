import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { Button } from '../inputs';
import Modal from '../Modal';

const TriggerButtonContainer = styled.div`
  margin-top: ${p => p.theme.spacing.xl};
`;

const MakeAppointmentModal: React.FC = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <TriggerButtonContainer>
        <Button
          aria-label="Make new appointment"
          id="appointments__make-new-appointment-button"
          text={t('view.appointments.make_new.title')}
          color="primary"
          icon={<Icon name="plus square outline" size="large" />}
          onClick={toggleModal}
        />
      </TriggerButtonContainer>

      <Modal
        title={t('view.appointments.make_new.title')}
        open={isOpen}
        onClose={toggleModal}
        size="small"
        closeOnDimmerClick={false}
        closeButtonText={t('action.cancel')}
      >
        TODO: Content
      </Modal>
    </>
  );
};

export default MakeAppointmentModal;
