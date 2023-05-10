import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import * as bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageVerbs from './routes/verbs/pageVerbs'
import Login from './routes/access/login'
import DashBoard from './routes/access/dashBoard'
import Signout from './routes/access/signout'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/p/:pageVerbsMode' element={<PageVerbs />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<DashBoard />}></Route>
        <Route path='/signout' element={<Signout />}></Route>
        <Route path='/pastverbs' element={<PageVerbs />}></Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
