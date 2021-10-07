import React from 'react';
import { Message as SemanticMessage, MessageProps } from 'semantic-ui-react';

interface Props extends MessageProps {}

const Message: React.FC<Props> = ({ size = 'mini', ...props }) => (
  <SemanticMessage {...props} size={size} />
);

export default Message;
