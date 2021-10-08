import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/storeContext';
import DropdownMenu from '../DropdownMenu';
import { path } from '../../routes/routes';
import { Link } from '../../store/models';
import useWindowDimensions from '../../utils/hooks';
import Drawer from '../Drawer';
import Button from '../inputs/Button';
import Icon from '../Icon';
import AccordionMenu from '../AccordionMenu';

const getUrl = (page: number | null) => {
  if (page) return `/${path('content_page')}/${page}`;
  return undefined;
};

const NavBar: React.FC = observer(() => {
  const { isTablet, isMobile } = useWindowDimensions();

  const {
    navigation: { state, navigation, fetchNavigation },
  } = useStore();

  useEffect(() => {
    if (state === 'NOT_FETCHED') fetchNavigation({});
  }, [fetchNavigation, state]);

  const navItems = navigation?.items ?? [];

  const getLinkItems = (links: Link[]) => {
    return links
      .filter(({ page }) => !!page)
      .map(({ id, label, page }) => ({
        id,
        label: label ?? '',
        url: getUrl(page) ?? '/',
      }));
  };

  if (isTablet || isMobile) {
    return (
      <Drawer
        triggerEl={
          <Button
            id="user-menu__button"
            variant="outlined"
            color="primary"
            icon={<Icon type="Menu" strokeColor="primary" />}
            onClick={() => {}}
          />
        }
      >
        <ul>
          {navItems.map(({ id, label, page, links }) => (
            <li key={id}>
              <AccordionMenu
                id={id}
                label={label}
                url={getUrl(page)}
                items={links.map(({ id, label, page }) => ({
                  id,
                  label: label ?? '',
                  url: getUrl(page) ?? '/',
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
          triggerLink={{
            label: navItem.label,
            url: getUrl(navItem.page),
          }}
          items={getLinkItems(navItem.links)}
        />
      ))}
    </nav>
  );
});

export default NavBar;
