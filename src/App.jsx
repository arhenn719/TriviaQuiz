import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Finish from './pages/finish'
import Questions from './pages/questions';
import PositionTable from './pages/positionTable';


function App() {
  return (
    <>
      <div id="container-gral" className='container my-3 d-flex align-items-center justify-content-center'>
        <div className='card h-100 col-12'>
          <div className="p-3 d-flex flex-column">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/questions' element={<Questions />} />
              <Route path='/finish' element={<Finish />} />
              <Route path='/positionTable' element={<PositionTable />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )


}

export default App;
