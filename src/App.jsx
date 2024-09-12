import { useState } from 'react'
import '/node_modules/bootstrap/dist/css/bootstrap-grid.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GamesPage from './pages/GamesPage'
import Login from './components/Login'
import Register from './components/Register'
import GameDetail from './pages/GameDetail'
import GameCard from './components/GameCard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Auth.Context'
import AddNewGame from './pages/AddNewGame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<GamesPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/AddGame" element={<AddNewGame />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
