import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'nprogress/nprogress.css'
import Layout from './Layout';
import i18n from './components/utils/i18n'
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import "react-awesome-lightbox/build/style.css";


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
