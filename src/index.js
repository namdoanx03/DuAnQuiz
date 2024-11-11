import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';
import 'nprogress/nprogress.css'
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

//persistgate dam bao ung dung se chay khi duoc nap du lieu trong redux thanh cong , con qua trinh chua nap thanh cong thi chuong trinh react se khong chay

root.render(
  <Provider store={store}>  
    <PersistGate loading={null} persistor={persistor}> 
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);


reportWebVitals();
