import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes, Path, BrowserRouter, Link, useSearchParams, useParams } from 'react-router-dom';
import { Home } from './pages/Home';
import { Mypapers } from './pages/Mypapers';
import { History } from './pages/History';
import HouseIcon from '@mui/icons-material/House';
import DescriptionIcon from '@mui/icons-material/Description';
import HistoryIcon from '@mui/icons-material/History';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { Paper } from './pages/Paper';


function App() {
  let [nav, setnav] = useState(true)

  return (



    <BrowserRouter>
      <div className="App">

        <div className="App_navbar">
          {nav ? <ul>

            <Link to="/" className='home_menu'><HouseIcon /> <li >home</li></Link>
            <Link to="/mypapers"><DescriptionIcon /><li>mypapers</li></Link>
            <Link to="/history"><HistoryIcon /><li>history</li></Link>





          </ul> : <ul className='icon_bar'>
            <li className='home_menu'><HouseIcon /></li>
            <li><DescriptionIcon /></li>
            <li><HistoryIcon /></li>
          </ul>}
          <div className="App_navbar_switch" onClick={() => setnav(!nav)}>
            {nav ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home nav={nav} />} />
          <Route path="/mypapers" element={<Mypapers />} />

          <Route path="/history" element={<History />} />
          <Route path="/paper/:id" element={<Paper nav={nav} />} />

        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
