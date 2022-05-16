import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userApi';
import { StoreContext } from './index';

function App() {
  const { user } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      user.setUser(data);
      user.setIsAuth(true);
    }).finally(() => setLoading(false));
  }, []);

  return (
    loading ?
      <div
        style={{ height: document.documentElement.clientHeight }}
        className="d-flex justify-content-center align-items-center">
        <Spinner animation="grow" />
      </div>
      :
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/*" element={<AppRouter />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
