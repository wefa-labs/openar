import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TransactionProvider } from './context/TransactionContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </React.StrictMode>
)
