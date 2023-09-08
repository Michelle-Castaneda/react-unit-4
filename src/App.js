import React from 'react'
import { useContext } from 'react' 
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Auth from './components/Auth'
import Form from './components/Form'
import Profile from './components/Profile'

import AuthContext, { AuthContextProvider } from './store/authContext'

const App = () => {

//Inside the component, destructure {state} from invoking useContext passing in AuthContext. 
//This will allow the App component to hook into the auth context.
const { state } = useContext(AuthContext)



  return (
    <div className='app'>
        <AuthContextProvider>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={!state.token ? <Auth/> : <Navigate to='/'/>}/>
        <Route path='/form' element={state.token ? <Form/> : <Navigate to='/auth'/>}/>
        <Route path='/profile' element={state.token ?<Profile/> : <Navigate to='/auth'/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App

//In the Auth route’s element prop, check if there is a state.token in context. 
//If there isn’t, send users to Auth, if there is, use the Navigate component to send them to the home path.

//Using a similar method (checking for the state.token and utilizing Navigate).
//send unauthenticated users to the authentication form if they try to view the form or profile pages.