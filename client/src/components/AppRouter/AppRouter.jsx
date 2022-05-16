import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../utils/routes';
import { SHOP_ROUTE } from '../utils/consts';
import { StoreContext } from '../../index';
import { observer } from 'mobx-react-lite';


const AppRouter = observer(() => {
  const { user } = useContext(StoreContext);

  return (
    <Routes>
      {user.isAuth && authRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={<Component />} />
      )}
      {publicRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={<Component />} />
      )}
      <Route path="/*" element={<Navigate to={SHOP_ROUTE} replace />} />
    </Routes>
  );
});

export default AppRouter;
