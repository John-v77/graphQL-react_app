
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Events from './components/events/Events';
import Booking from './components/booking/Booking';
import Auth from './components/auth/Auth';
import NavBar from './components/nav/NavBar';

function App() {
  return (
    <div className="App">
      <h1>Welcome</h1>
      <NavBar/>

      {/* Define all the routes */}
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/events' element={<Events/>}></Route>
        <Route path='/booking' element={<Booking/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
