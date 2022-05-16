import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';

export const StoreContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreContext.Provider value={{
    user: new UserStore(),
    device: new DeviceStore()
  }}>
    <App />
  </StoreContext.Provider>
);
