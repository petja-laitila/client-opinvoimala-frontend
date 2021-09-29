import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import Button from '../inputs/Button';

const UserMenu = () => {
  const { t } = useTranslation();

  const handleLoginClick = () => {
    console.log('TODO: Open login form!');
  };

  return (
    <div>
      <Button
        id="user-menu__login__button"
        text={t('login')}
        icon={<Icon type="SignIn" color="background" />}
        onClick={handleLoginClick}
      />
    </div>
  );
};

export default UserMenu;
