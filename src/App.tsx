import React from 'react'
import './App.css'
import useAuthStore from './store/authStore';
import LoginForm from './components/LoginForm';
import Home from './components/Home';



const App: React.FC = ()=> {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div>
    {isAuthenticated?(
      <Home/>
    ): (
      <LoginForm/>
    )}
    </div>
  );
};

export default App;
