import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { useOutsideClickAction } from '../utils/hooks';
import Icon from './Icon';
import Button from './inputs/Button';

const DrawerContainer = styled.div<{ isOpen: boolean }>`
  z-index: 99;
  position: fixed;
  top: 0;
  padding: ${p => p.theme.spacing.lg};
  background-color: ${p => p.theme.color.background};
  ${p => p.theme.shadows[0]};

  opacity: ${p => (p.isOpen ? 1 : 0)};

  height: 100vh;
  width: 40vw;
  right: ${p => (p.isOpen ? 0 : -60)}vw;
  @media ${p => p.theme.breakpoint.tablet} {
    width: 60vw;
    right: ${p => (p.isOpen ? 0 : -80)}vw;
  }
  @media ${p => p.theme.breakpoint.mobile} {
    width: 80vw;
    right: ${p => (p.isOpen ? 0 : -100)}vw;
  }

  transition: all 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895);

  .drawer__header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 50px;
  }

  .drawer__main-content {
    ul {
      list-style-type: none;
      padding: 0;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        a,
        span {
          display: block;
          padding: ${p => p.theme.spacing.md} ${p => p.theme.spacing.lg};
          color: ${p => p.theme.color.secondary};
          ${p => p.theme.font.size.xl};
          font-family: ${p => p.theme.font.secondary};
          user-select: none;
        }
        a {
          text-decoration: none;
          :hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

interface Props {
  triggerEl: JSX.Element;
}

const Drawer: React.FC<Props> = ({ triggerEl, children }) => {
  const ref: React.RefObject<HTMLDivElement> = React.createRef();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useOutsideClickAction({
    ref,
    condition: isOpen,
    action: () => setIsOpen(false),
  });

  useEffect(() => {
    const unlistenHistory = history.listen(() => {
      // Route changed, close drawer:
      setIsOpen(false);
    });

    return () => unlistenHistory();
  }, [history]);

  return (
    <div>
      <div onClick={toggleDrawer}>{triggerEl}</div>
      <DrawerContainer ref={ref} isOpen={isOpen}>
        <header className="drawer__header">
          <div>
            <Button
              id="drawer__close-button"
              variant="filled"
              icon={<Icon type="Close" color="background" />}
              onClick={toggleDrawer}
              noMargin
            />
          </div>
        </header>
        <main className="drawer__main-content">{children}</main>
      </DrawerContainer>
    </div>
  );
};

export default Drawer;
