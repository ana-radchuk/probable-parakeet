import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import { Home, Register, Login } from './pages'

function App() {

  return (
    <>
      <div className='grid place-content-center py-10'>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
