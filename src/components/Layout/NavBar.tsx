import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/storeContext';
import DropdownMenu from '../DropdownMenu';
import { Link } from '../../store/models';
import useWindowDimensions from '../../utils/hooks';
import Drawer from '../Drawer';
import Button from '../inputs/Button';
import Icon from '../Icon';
import AccordionMenu from '../AccordionMenu';
import { contentPageUrl } from '../../routes/routes';

const NavBar: React.FC = observer(() => {
  const { t } = useTranslation();
  const { isTablet, isMobile } = useWindowDimensions();

  const {
    navigation: { state, navigation, fetchNavigation },
  } = useStore();

  useEffect(() => {
    if (state === 'NOT_FETCHED') fetchNavigation();
  }, [fetchNavigation, state]);

  const navItems = navigation?.items ?? [];

  const getLinkItems = (links: Link[]) => {
    return links
      .filter(({ page }) => !!page)
      .map(({ id, label, page }) => ({
        id,
        label: label ?? '',
        url: contentPageUrl(page),
      }));
  };

  if (isTablet || isMobile) {
    return (
      <Drawer
        triggerEl={(isOpen, onClick) => (
          <Button
            ariaLabel={t('aria.main_navigation')}
            aria-expanded={isOpen}
            id="navigation-menu__button"
            variant="outlined"
            color="secondary"
            icon={<Icon type="Menu" strokeColor="secondary" />}
            onClick={onClick}
          />
        )}
      >
        <ul className="drawer__link-list">
          {navItems.map(({ id, label, links }) => (
            <li key={id}>
              <AccordionMenu
                id={id}
                label={label}
                items={links.map(({ id, label, page }) => ({
                  id,
                  label: label ?? '',
                  url: contentPageUrl(page),
                }))}
              />
            </li>
          ))}
        </ul>
      </Drawer>
    );
  }

  return (
    <nav>
      {navItems.map(navItem => (
        <DropdownMenu
          key={navItem.id}
          triggerButton={{
            label: navItem.label,
          }}
          items={getLinkItems(navItem.links)}
        />
      ))}
    </nav>
  );
});

export default NavBar;
