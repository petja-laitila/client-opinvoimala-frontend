import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/storeContext';
import NavMenu from './NavMenu';
import { path } from '../../routes/routes';
import { Link } from '../../store/models';

const NavBar: React.FC = observer(() => {
  const {
    navigation: { state, navigation, fetchNavigation },
  } = useStore();

  useEffect(() => {
    if (state === 'NOT_FETCHED') fetchNavigation({});
  }, [fetchNavigation, state]);

  const navItems = navigation?.items ?? [];

  const getUrl = (page: number | null) => {
    if (page) return `/${path('content_page')}/${page}`;
    return undefined;
  };

  const getLinkItems = (links: Link[]) => {
    return links
      .filter(({ targetPage }) => !!targetPage)
      .map(({ id, label, targetPage }) => ({
        id,
        label: label ?? '',
        url: getUrl(targetPage) ?? '/',
      }));
  };

  return (
    <nav>
      {navItems.map(navItem => (
        <NavMenu
          key={navItem.id}
          triggerLink={{
            label: navItem.label,
            url: getUrl(navItem.targetPage),
          }}
          items={getLinkItems(navItem.links)}
        />
      ))}
    </nav>
  );
});

export default NavBar;
