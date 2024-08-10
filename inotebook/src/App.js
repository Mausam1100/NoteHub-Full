import { useState } from 'react';
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import AlertContext from './context/notes/AlertContext';
import NoteState from './context/notes/noteState';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [progress, setProgress] = useState(0)

  const findProgress = (progress) => {
    setProgress(progress)
  }

  return (
    <>
      <AlertContext>
        <NoteState>
        <Router>
          <Navbar/>
          <LoadingBar color='#f11946' progress={progress} />
          <Alert/>
          <Routes>
            <Route path='/' element={<Home setProgress={findProgress}/>}/>
            <Route path='/about' element={<About setProgress={findProgress}/>}/>
            <Route path='/login' element={<Login setProgress={findProgress}/>}/>
            <Route path='/signup' element={<Signup setProgress={findProgress}/>}/>
          </Routes>
        </Router>
        </NoteState>
      </AlertContext>
    </>
  );
}

export default App;
