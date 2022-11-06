import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthContentProvider } from './components/store/auth-context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContentProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContentProvider>
);
