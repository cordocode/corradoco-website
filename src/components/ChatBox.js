import React, { useState } from 'react';
import './ChatBox.css';
import Slider from './slider';

const ChatBox = () => {
  // Slider states
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [employees, setEmployees] = useState(2);
  const [avgSalary, setAvgSalary] = useState(85000);
  
  // Chat state
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  
  // Format salary for display
  const formatSalary = (value) => {
    return value.toLocaleString('en-US');
  };
  
  // Handle enter button click
  const handleSendMessage = () => {
    if (!chatStarted) {
      // Calculate the annual value
      const hoursPerYear = hoursPerWeek * 52;
      const hourlyRate = avgSalary / 2080;
      const totalValue = Math.round(hoursPerYear * employees * hourlyRate);
      
      // Create the initial messages
      const userMessage = {
        type: 'user',
        content: `Imagine automating a process that saves ${hoursPerWeek} hours per week for ${employees} employees who make about $${formatSalary(avgSalary)} per year.`
      };
      
      const aiResponse = {
        type: 'ai',
        content: `Wow — that automation would be worth $${totalValue.toLocaleString('en-US')} in annual value. What process did you have in mind?`
      };
      
      setMessages([userMessage, aiResponse]);
      setChatStarted(true);
    } else if (inputText.trim()) {
      // Handle regular chat messages
      setMessages([...messages, { type: 'user', content: inputText }]);
      setInputText('');
      // Here you would normally trigger an AI response
    }
  };
  
  // Handle refresh
  const handleRefresh = () => {
    setChatStarted(false);
    setMessages([]);
    setHoursPerWeek(5);
    setEmployees(2);
    setAvgSalary(85000);
  };
  
  // For salary inline slider display
  const salaryInThousands = Math.round(avgSalary / 1000);
  const handleSalaryChange = (thousands) => {
    setAvgSalary(thousands * 1000);
  };
  
  return (
    <section className="chatbox-section">
      <div className="chatbox-container">
        <div className={`chat-window ${chatStarted ? 'expanded' : ''}`}>
          <div className={`messages-area ${chatStarted ? 'expanded' : ''}`}>
            {!chatStarted ? (
              <div className="message ai-message pre-filled">
                <span className="message-label">AI:</span>
                <span className="message-content">
                  Imagine automating a process that saves
                  <Slider
                    value={hoursPerWeek}
                    onChange={setHoursPerWeek}
                    min={0}
                    max={10}
                    step={0.5}
                    width="100px"
                    suffix="hours per week for"
                  />
                  <Slider
                    value={employees}
                    onChange={setEmployees}
                    min={1}
                    max={10}
                    step={1}
                    width="90px"
                    suffix="employees who make about $"
                  />
                  <Slider
                    value={salaryInThousands}
                    onChange={handleSalaryChange}
                    min={35}
                    max={250}
                    step={5}
                    width="100px"
                    displayValue={`${salaryInThousands}k`}
                    suffix="per year."
                  />
                </span>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.type}-message`}>
                    <span className="message-label">{message.type === 'ai' ? 'AI:' : 'You:'}</span>
                    <span className="message-content">{message.content}</span>
                  </div>
                ))}
              </>
            )}
          </div>
          
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder={chatStarted ? "Type your message..." : "Click send to calculate value"}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={!chatStarted}
            />
            <button className={`send-button ${chatStarted ? 'rotate' : ''}`} onClick={handleSendMessage}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
            {chatStarted && (
              <button className="refresh-button" onClick={handleRefresh}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatBox;