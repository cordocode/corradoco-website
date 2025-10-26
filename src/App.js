import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ChatBox from './components/ChatBox';
import Partners from './components/Partners';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <ChatBox />
      <Partners />
      <Footer />
    </div>
  );
}

export default App;