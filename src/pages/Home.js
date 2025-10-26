import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import BIRDS from 'vanta/dist/vanta.birds.min';
// NOTE: Three.js loaded via CDN in index.html - see instructions

// Import partner logos from assets folder (via symlink)
import fleetAdvisor from '../assets/customer-logos/fleet_advisor.svg';
import vwco from '../assets/customer-logos/vwco.svg';
import norcon from '../assets/customer-logos/norcon.svg';
import reliant from '../assets/customer-logos/reliant.svg';

const Home = () => {
  // ============ VANTA BIRDS EFFECT ============
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  // ============ CHATBOX STATE ============
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [employees, setEmployees] = useState(2);
  const [avgSalary, setAvgSalary] = useState(85000);
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // ============ PARTNERS CAROUSEL STATE ============
  const scrollRef = useRef(null);
  
  // Partner logos array with duplicates for seamless scrolling
  const logos = [
    { id: 1, src: fleetAdvisor, alt: 'Fleet Advisor', name: 'fleet-advisor' },
    { id: 2, src: vwco, alt: 'VWCO', name: 'vwco' },
    { id: 3, src: norcon, alt: 'Norcon', name: 'norcon' },
    { id: 4, src: reliant, alt: 'Reliant', name: 'reliant' },
    // Duplicate for seamless loop
    { id: 5, src: fleetAdvisor, alt: 'Fleet Advisor', name: 'fleet-advisor' },
    { id: 6, src: vwco, alt: 'VWCO', name: 'vwco' },
    { id: 7, src: norcon, alt: 'Norcon', name: 'norcon' },
    { id: 8, src: reliant, alt: 'Reliant', name: 'reliant' },
  ];

  // ============ VANTA BIRDS INITIALIZATION (using CDN THREE) ============
  useEffect(() => {
    if (!vantaEffect && window.THREE) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          THREE: window.THREE, // Use THREE from CDN
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0xffffff, // White, but made transparent with backgroundAlpha
          backgroundAlpha: 0.00, // Fully transparent - your cream background shows through!
          color1: 0x0a2005, // Dark green/blue bird color
          color2: 0x111101, // Very dark color
          birdSize: 1.10,
          wingSpan: 20.00,
          speedLimit: 6.00,
          separation: 19.00,
          alignment: 33.00,
          cohesion: 20.00,
          quantity: 1.00,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // ============ CHATBOX FUNCTIONS ============
  const formatSalary = (value) => {
    return value.toLocaleString('en-US');
  };
  
  const handleSendMessage = () => {
    if (!chatStarted) {
      const hoursPerYear = hoursPerWeek * 52;
      const hourlyRate = avgSalary / 2080;
      const totalValue = Math.round(hoursPerYear * employees * hourlyRate);
      
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
      setMessages([...messages, { type: 'user', content: inputText }]);
      setInputText('');
      // TODO: Trigger AI response via API
    }
  };
  
  const handleRefresh = () => {
    setChatStarted(false);
    setMessages([]);
    setHoursPerWeek(5);
    setEmployees(2);
    setAvgSalary(85000);
  };
  
  const salaryInThousands = Math.round(avgSalary / 1000);
  const handleSalaryChange = (thousands) => {
    setAvgSalary(thousands * 1000);
  };

  // ============ PARTNERS CAROUSEL EFFECT ============
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    
    const animate = () => {
      scrollPosition += scrollSpeed;
      const halfWidth = scrollContainer.scrollWidth / 2;
      
      if (scrollPosition >= halfWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };
    
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };
    
    const container = scrollContainer.parentElement;
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  const handleLogoClick = (logoName) => {
    // TODO: Add partner description expansion
    console.log(`Clicked on ${logoName}`);
  };

  // ============ RENDER ============
  return (
    <div className="home">
      <Header />
      
      {/* HERO SECTION WITH VANTA BIRDS BACKGROUND */}
      <section className="hero" ref={vantaRef}>
        <div className="hero-container">
          <h1 className="hero-headline">
            Your Partner in Custom Automation.
          </h1>
          <p className="hero-subheadline">
            We help you identify, design, and build tailored automations — blending AI, current software, and low-code tools into one cohesive system.
          </p>
        </div>
      </section>

      {/* CHATBOX SECTION */}
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

      {/* PARTNERS SECTION */}
      <section className="partners">
        <div className="partners-container">
          <h2 className="partners-title">Our Partners</h2>
          <div className="partners-carousel-wrapper">
            <div className="fade-overlay fade-left"></div>
            <div className="fade-overlay fade-right"></div>
            
            <div className="partners-carousel">
              <div className="partners-track" ref={scrollRef}>
                {logos.map((logo) => (
                  <div 
                    key={logo.id} 
                    className="partner-logo-wrapper"
                    onClick={() => handleLogoClick(logo.name)}
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="partner-logo"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="partner-descriptions">
            {/* TODO: Add partner descriptions */}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="home-cta">
        <div className="home-cta-container">
          <h2 className="home-cta-title">
            Efficiency Without Compromise
          </h2>
          <a href="mailto:ben@corradoco.com" className="home-cta-button">
            Book Your Free Automation Audit
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;