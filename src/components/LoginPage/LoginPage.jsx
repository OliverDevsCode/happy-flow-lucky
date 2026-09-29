import React, { useState } from 'react'
import { auth } from '../../utils/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'

function LoginPage() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');

  const navigate = useNavigate();
  

  

  async function signIn(){
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setError('');
      navigate('/admin');

    } catch (err) {
      console.error('Sign-in error:', err.message);
      setError('Invalid email or password');
    }

  }

  return (
    <div className='login-page'>
      <p>Admin Login</p>
      <form id='sign-in-form' onSubmit={(e) => { e.preventDefault(); signIn(); }}>
        <input type='text' placeholder='email' value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          autoComplete="email"
        />
        <input type='password' placeholder='password' value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          autoComplete="current-password"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>

      </form>
    </div>
    
  )
}

export default LoginPage