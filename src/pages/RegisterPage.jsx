import React from 'react'
import { TextField, Button } from '@mui/material';
import alert from '../utility/alert';
import { Navigate } from 'react-router-dom';


const RegisterPage = () => {
  const [redirect, setRedirect] = React.useState(false)
  const name = React.useRef()
  const phone = React.useRef()
  const email = React.useRef()
  const username = React.useRef()
  const password = React.useRef()


  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const nameVal = name.current.value;
    const phoneVal = Number(phone.current.value);
    const emailVal = email.current.value;
    const usernameVal = username.current.value;
    const passwordVal = password.current.value;

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        name: nameVal,
        phone: phoneVal,
        email: emailVal,
        username: usernameVal,
        password: passwordVal
      })
    })
    const data = await response.json()
    if (response.ok) {
      alert('User registered', 'success')
      setRedirect(true)
    }
    else {
      alert(data.error, 'error')
    }
  }

  if (redirect) {
    return <Navigate to = {'/login'}/>
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth id="filled-basic" label="Full Name" variant="filled" inputRef={name} required autoComplete='true'/>
            <TextField fullWidth id="filled-basic" label="Email" variant="filled" inputRef={email} required autoComplete='true'/>
            <TextField fullWidth id="filled-basic" label="Phone" type='number' variant="filled" inputRef={phone} required autoComplete='true'/>
            <TextField fullWidth id="filled-basic" label="Username" variant="filled" inputRef={username} required autoComplete='true'/>
            <TextField fullWidth id="filled-basic" label="Password" type='password' variant="filled" inputRef={password} required autoComplete='true'/>
            <Button sx={{marginTop: '20px', width: '100%'}} variant="contained" type='submit'>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
