
import './App.css'
import { Route, Routes, } from "react-router";
import HomePage from './pages/HomePage/HomePage';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';

function App() {

  return (
    <>
    {/* Header */}

    <Header/>
    
    {/* Routers */}
    <Routes>
      <Route path="/" element={<HomePage/>}/>
    </Routes>

    {/* Footer */}

    <Footer/>
    </>
  )
}

export default App
