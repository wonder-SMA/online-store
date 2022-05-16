import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../../../http/userApi';
import { StoreContext } from '../../../index';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/consts';

const Auth = observer(() => {
  const { user } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: document.documentElement.clientWidth - 46 }}
    >
      <Card style={{ width: '600' }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-2"
            placeholder="Введите email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите пароль..."
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ?
              <div>
                Нет аккаунта? <Link style={{ textDecoration: 'none' }} to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
              </div>
              :
              <div>
                Есть аккаунт? <Link style={{ textDecoration: 'none' }} to={LOGIN_ROUTE}>Войти</Link>
              </div>
            }
            <Button
              className="mt-3"
              variant={'outline-success'}
              onClick={handleClick}
            >
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
