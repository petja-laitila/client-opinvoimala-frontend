import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/storeContext';
import NavMenu from './NavMenu';

const NavBar = observer(() => {
  const {
    navigation: { state, navigation, fetchNavigation },
  } = useStore();

  useEffect(() => {
    if (state === 'NOT_FETCHED') fetchNavigation({});
  }, [fetchNavigation, state]);

  const navItems = navigation?.items ?? [];

  return (
    <nav>
      {navItems.map(navItem => (
        <NavMenu key={navItem.id} {...navItem} />
      ))}
    </nav>
  );
});

export default NavBar;
