import React,{useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import AuthPage from './components/AuthPage/AuthPage';
import LoginPage from './components/LoginPage/LoginPage';
import { AuthProvider } from './contexts/authContext';



function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AuthPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
    
  )
}

export default App