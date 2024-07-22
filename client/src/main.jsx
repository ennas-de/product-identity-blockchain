import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

// import Sidebar from "./widgets/Sidebar"
// import Footer from "./widgets/Footer"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Sidebar /> */}
    <Router>
      <App />
    </Router>
    {/* <Footer /> */}
  </React.StrictMode>,
)
