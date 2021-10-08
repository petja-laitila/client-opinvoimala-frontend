import React from 'react';
import { Modal as SemanticModal, ModalProps } from 'semantic-ui-react';

export interface Props extends ModalProps {}

const Modal: React.FC<Props> = ({ size = 'tiny', children, ...props }) => (
  <SemanticModal {...props} size={size}>
    <SemanticModal.Content>{children}</SemanticModal.Content>
  </SemanticModal>
);

export default Modal;
