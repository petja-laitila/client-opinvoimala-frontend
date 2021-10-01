import React from 'react';
import { useTranslation } from 'react-i18next';
import { path, rt } from '../../routes/routes';
import Icon from '../Icon';
import Button from '../inputs/Button';
import NavMenu from '../DropdownMenu';

const UserMenu: React.FC = () => {
  const { t } = useTranslation();

  const isLoggedIn = false; // TODO

  const handleLoginClick = () => {
    console.log('TODO: Open login form!');
  };

  if (isLoggedIn) {
    const items = [
      { id: 'my_profile', label: rt('my_profile'), url: path('my_profile') },
      { id: 'tests', label: rt('tests'), url: path('tests') },
      {
        id: 'appointments',
        label: rt('appointments'),
        url: path('appointments'),
      },
      {
        id: 'change_password',
        label: rt('change_password'),
        url: path('change_password'),
      },
      { id: 'logout', label: rt('logout'), url: path('logout') },
    ];

    return (
      <div>
        <NavMenu
          items={items}
          align="right"
          verticalPosition={20}
          triggerEl={
            <Button
              id="user-menu__button"
              text={t('student')}
              icon={<Icon type="User" color="primary" />}
              color="primary"
              variant="link"
              onClick={() => {}}
            />
          }
        />
      </div>
    );
  } else {
    // User is not logged in!
    return (
      <Button
        id="user-menu__login__button"
        text={t('login')}
        icon={<Icon type="SignIn" color="background" />}
        onClick={handleLoginClick}
      />
    );
  }
};

export default UserMenu;
