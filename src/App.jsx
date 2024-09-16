import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/home';
import Finish from './pages/finish'
import Questions from './pages/questions';
import './App.css'


function App() {
  return (
    <>
      <div className='container my-3 flex flex-col items-center justify-center gap-10'>
        <div className='card'>
          <div className="card-body">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/questions' element={<Questions />} />
              <Route path='/finish' element={<Finish />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )


}

export default App;
