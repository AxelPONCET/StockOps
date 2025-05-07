
import './App.scss'
import { Route, Routes, } from "react-router";
import HomePage from './pages/HomePage/HomePage';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {

  return (
    <>
    {/* Header */}

    <Header/>
    
    {/* Routers */}
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>

    {/* Footer */}

    <Footer/>
    </>
  )
}

export default App
