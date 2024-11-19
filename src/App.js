import './App.scss';
import Header from './components/Header/Header';
import { Outlet, Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

const App = () => {

  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='navbar-container'>

        </div>
        <div className='app-content'>
          <PerfectScrollbar>
            {/* phan muon cuon chuot se duoc dat trong  PerfectScrollbar*/}
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  )
}

export default App;
