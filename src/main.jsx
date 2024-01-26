import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import GlobalProvider from "./Context/GlobalState.jsx";



ReactDOM.createRoot(document.getElementById('root')).render(

 <GlobalProvider>
     <BrowserRouter>
         <App />
     </BrowserRouter>
 </GlobalProvider>

)
