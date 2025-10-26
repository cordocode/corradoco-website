import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Partners from './components/Partners';
// import ChatBox from './components/ChatBox'; // Uncomment when ChatBox is ready

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      {/* <ChatBox /> */} {/* Add ChatBox component here when ready */}
      <Partners />
    </div>
  );
}

export default App;