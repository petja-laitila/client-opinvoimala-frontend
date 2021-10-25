import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LinkIn } from '../store/models';
import { linkTargetUrl } from '../utils/links';

interface Props {
  link: LinkIn;
}

const Link: React.FC<Props> = ({ link, children }) => {
  if (!link) return null;

  const isExternal = link.type === 'external';
  const url = linkTargetUrl(link);

  if (isExternal) {
    return (
      <a href={url} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return <RouterLink to={url}>{children}</RouterLink>;
};

export default Link;
