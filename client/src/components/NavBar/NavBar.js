import React, { useContext } from 'react';
import { StoreContext } from '../../index';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
  const { user } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link
          style={{ color: 'white', textDecoration: 'none' }}
          to={SHOP_ROUTE}>КупиДевайс!
        </Link>
        <Nav className="ml-auto">
          {user.isAuth ?
            <>
              <Link to={ADMIN_ROUTE}>
                <Button variant={'outline-light'}>Админ панель</Button>
              </Link>
              <Link to={LOGIN_ROUTE}>
                <Button
                  variant={'outline-light'}
                  className="ms-2"
                  onClick={logout}
                >
                  Выйти
                </Button>
              </Link>
            </>
            : <Button
              variant={'outline-light'}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          }
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
