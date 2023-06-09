import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state';

const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(<Provider store={store}><App/></Provider>)