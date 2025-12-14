import React, { useState } from 'react';
import Login from './components/Login';
import Success from './components/Success';
import './App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">

      {isLoggedIn ? (
        <Success />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
