import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import Modal from '../components/Modal';
import BIRDS from 'vanta/dist/vanta.birds.min';
// NOTE: Three.js loaded via CDN in index.html

// Import partner logos
import fleetAdvisor from '../assets/customer-logos/fleet_advisor.svg';
import vwco from '../assets/customer-logos/vwco.svg';
import norcon from '../assets/customer-logos/norcon.svg';
import reliant from '../assets/customer-logos/reliant.svg';

// Import AI Integration icons and illustrations as URLs
import iconInternalKnowledge from '../assets/Icon_Internal Knowledge Assistant.svg?url';
import iconCustomerPortal from '../assets/Icon_Customer Self-Service Portal.svg?url';
import iconDocumentIntelligence from '../assets/Icon_Document Intelligence.svg?url';
import iconDataBridge from '../assets/Icon_Data Bridge Automation.svg?url';
import iconIntelligentDoc from '../assets/Icon_Intelligent Document Processing.svg?url';
import iconProactiveFollowUp from '../assets/Icon_Proactive Follow-Up System.svg?url';

import illustrationInternalKnowledge from '../assets/Illustration_Internal Knowledge Assistant.svg?url';
import illustrationCustomerPortal from '../assets/Illustration_Customer Self-Service Portal .svg?url';
import illustrationDocumentIntelligence from '../assets/Illustration_Document Intelligence.svg?url';
import illustrationDataBridge from '../assets/Illustration_Data Bridge Automation .svg?url';
import illustrationIntelligentDoc from '../assets/Illustration_Intelligent Document Processing.svg?url';
import illustrationProactiveFollowUp from '../assets/Illustration_Proactive Follow-Up System.svg?url';

const Home = () => {
  // ============ VANTA BIRDS EFFECT ============
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  // ============ MODAL STATE ============
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubtitle, setModalSubtitle] = useState('');

  // ============ OPEN MODAL WITH SPECIFIC SUBTITLE ============
  const openModal = (subtitle) => {
    setModalSubtitle(subtitle);
    setIsModalOpen(true);
  };

  // ============ GENERATE DYNAMIC SUBTITLE FROM CONVERSATION ============
  const getConversationSubtitle = () => {
    const userMessages = messages.filter(m => m.type === 'user');
    
    if (userMessages.length === 0) {
      return "Let's discuss your automation needs in detail.";
    }
    
    const lastUserMessage = userMessages[userMessages.length - 1]?.content || '';
    const lowercaseMessage = lastUserMessage.toLowerCase();
    
    if (lowercaseMessage.includes('email') || lowercaseMessage.includes('scheduling')) {
      return "Let's explore your email scheduling automation in detail.";
    } else if (lowercaseMessage.includes('invoice') || lowercaseMessage.includes('billing')) {
      return "Let's discuss your invoice processing automation.";
    } else if (lowercaseMessage.includes('submittal') || lowercaseMessage.includes('rfp') || lowercaseMessage.includes('proposal')) {
      return "Let's dive into your submittal process automation.";
    } else if (lowercaseMessage.includes('document') || lowercaseMessage.includes('file')) {
      return "Let's explore your document management automation.";
    } else if (userMessages.length === 1 && lastUserMessage.length < 30) {
      return "Let's gather more details about your current processes.";
    } else if (userMessages.length > 2) {
      return "Let's continue this conversation on a call.";
    }
    
    return "Let's discuss your automation needs in detail.";
  };

  // ============ CHATBOX STATE ============
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [employees, setEmployees] = useState(2);
  const [avgSalary, setAvgSalary] = useState(85000);
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showArrow, setShowArrow] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);

  // ============ PARTNERS CAROUSEL STATE ============
  const scrollRef = useRef(null);
  
  const logos = [
    { id: 1, src: fleetAdvisor, alt: 'Fleet Advisor', name: 'fleet-advisor' },
    { id: 2, src: vwco, alt: 'VWCO', name: 'vwco' },
    { id: 3, src: norcon, alt: 'Norcon', name: 'norcon' },
    { id: 4, src: reliant, alt: 'Reliant', name: 'reliant' },
    { id: 5, src: fleetAdvisor, alt: 'Fleet Advisor', name: 'fleet-advisor' },
    { id: 6, src: vwco, alt: 'VWCO', name: 'vwco' },
    { id: 7, src: norcon, alt: 'Norcon', name: 'norcon' },
    { id: 8, src: reliant, alt: 'Reliant', name: 'reliant' },
  ];

  // ============ AI INTEGRATION BOXES DATA ============
  const aiIntegrationBoxes = [
    {
      id: 1,
      icon: iconInternalKnowledge,
      title: 'Internal LLM',
      tagline: 'ChatGPT fine-tuned and trained on your company\'s knowledge',
      illustration: illustrationInternalKnowledge
    },
    {
      id: 2,
      icon: iconCustomerPortal,
      title: 'External LLM',
      tagline: 'Modern LLM that delivers useful answers to your customers',
      illustration: illustrationCustomerPortal
    },
    {
      id: 3,
      icon: iconDocumentIntelligence,
      title: 'Document Organization',
      tagline: 'Rename and store files automatically and consistently',
      illustration: illustrationDocumentIntelligence
    },
    {
      id: 4,
      icon: iconDataBridge,
      title: 'Data Bridge Automation',
      tagline: 'Extract information from one document and store it in another software automatically',
      illustration: illustrationDataBridge
    },
    {
      id: 5,
      icon: iconIntelligentDoc,
      title: 'Intelligent Document Processing',
      tagline: 'AI analysis of large and complex documents for quick and reliable answers',
      illustration: illustrationIntelligentDoc
    },
    {
      id: 6,
      icon: iconProactiveFollowUp,
      title: 'Proactive Follow-Up System',
      tagline: 'Automated reminders and escalations',
      illustration: illustrationProactiveFollowUp
    }
  ];

  // ============ VANTA BIRDS INITIALIZATION ============
  useEffect(() => {
    if (!vantaEffect && window.THREE) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0xffffff,
          backgroundAlpha: 0.00,
          color1: 0x0a2005,
          color2: 0x111101,
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

  // ============ STREAMING API CALL FUNCTION ============
  const callStreamingAPI = async (userMessage, isInitial = false, calculatedValue = null, sliderValues = null) => {
    try {
      setIsStreaming(true);
      
      let messagesToSend;
      
      if (isInitial) {
        messagesToSend = [
          {
            role: 'user',
            content: userMessage
          }
        ];
      } else {
        messagesToSend = [
          ...conversationHistory,
          {
            role: 'user',
            content: userMessage
          }
        ];
      }

      const aiMessageId = Date.now() + Math.random();
      
      setMessages(prev => [...prev, { 
        id: aiMessageId,
        type: 'ai', 
        content: '', 
        isTyping: true 
      }]);

      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/chat' 
        : 'http://localhost:5001/api/chat';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messagesToSend,
          automationValue: calculatedValue,
          sliderData: sliderValues
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              setIsStreaming(false);
              break;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                const contentToAdd = parsed.content;
                aiResponse += contentToAdd;
                
                const currentResponse = aiResponse;
                
                setMessages(prev => {
                  return prev.map(msg => 
                    msg.id === aiMessageId 
                      ? { ...msg, content: currentResponse, isTyping: true }
                      : msg
                  );
                });
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }
      
      const hasScheduleButton = aiResponse.includes('[SCHEDULE_CALL]');
      const cleanedResponse = aiResponse.replace('[SCHEDULE_CALL]', '').trim();
      
      setMessages(prev => prev.map(msg =>
        msg.id === aiMessageId
          ? { ...msg, content: cleanedResponse, isTyping: false, showScheduleButton: hasScheduleButton }
          : msg
      ));
      
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: cleanedResponse }
      ]);
      
    } catch (error) {
      console.error('Error calling API:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + Math.random(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        isTyping: false
      }]);
    } finally {
      setIsStreaming(false);
    }
  };

  // ============ CHATBOX FUNCTIONS ============
  const handleSliderChange = (setter) => (value) => {
    setter(value);
    if (!chatStarted) {
      setShowArrow(true);
    }
  };
  
  const handleSendMessage = async () => {
    setShowArrow(false);
    
    if (!chatStarted) {
      const hoursPerYear = hoursPerWeek * 52;
      const hourlyRate = avgSalary / 2080;
      const totalValue = Math.round(hoursPerYear * employees * hourlyRate);
      
      setChatStarted(true);
      
      const initialMessage = `I want to explore automating a process that could save ${hoursPerWeek} hours per week for ${employees} ${employees === 1 ? 'employee' : 'employees'} making $${avgSalary.toLocaleString()} per year.`;
      
      const sliderValues = {
        hoursPerWeek,
        employees,
        avgSalary
      };
      
      await callStreamingAPI(initialMessage, true, totalValue, sliderValues);
      
    } else if (inputText.trim() && !isStreaming) {
      const userMessage = inputText;
      
      setInputText('');
      
      setMessages(prev => [...prev, { 
        id: Date.now() + Math.random(),
        type: 'user', 
        content: userMessage 
      }]);
      
      await callStreamingAPI(userMessage, false, null, null);
    }
  };
  
  const handleRefresh = () => {
    setChatStarted(false);
    setMessages([]);
    setConversationHistory([]);
    setHoursPerWeek(5);
    setEmployees(2);
    setAvgSalary(85000);
    setShowArrow(false);
    setIsStreaming(false);
  };
  
  const salaryInThousands = Math.round(avgSalary / 1000);
  
  const handleSalaryChange = (value) => {
    const thousands = value;
    setAvgSalary(thousands * 1000);
    if (!chatStarted) {
      setShowArrow(true);
    }
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
            Eliminating the Work People Hate.
          </h1>
          <p className="hero-subheadline">
            We help you identify, design, and build tailored automations by integrating the tools you already have into value adding solutions.
          </p>
          <button className="hero-cta-button" onClick={() => openModal("Discover how custom automation can transform your operations.")}>
            See What's Possible
          </button>
        </div>
      </section>

      {/* CHATBOX SECTION */}
      <section className={`chatbox-section ${chatStarted ? 'expanded' : ''}`}>
        <div className="chatbox-container">
          <div className="chatbox-header">
            <h2 className="chatbox-title">Unlock Your Team's Potential</h2>
            <p className="chatbox-subtitle">Use our interactive tool to see the annual value hidden in your manual processes</p>
          </div>
          <div className="chat-window-wrapper">
            {!chatStarted && (
              <div className="chat-instruction">
                **Adjust the sliders to calculate**
              </div>
            )}
            <div className={`chat-window ${chatStarted ? 'expanded' : ''}`}>
              <div className={`messages-area ${chatStarted ? 'expanded' : ''}`}>
              <div className="message ai-message pre-filled">
                <span className="message-label">AI:</span>
                <span className="message-content">
                  Imagine automating a process that saves
                  <Slider
                    value={hoursPerWeek}
                    onChange={handleSliderChange(setHoursPerWeek)}
                    min={0}
                    max={10}
                    step={1}
                    width="100px"
                    suffix="hours per week for"
                    disabled={chatStarted}
                  />
                  <Slider
                    value={employees}
                    onChange={handleSliderChange(setEmployees)}
                    min={1}
                    max={100}
                    step={1}
                    width="90px"
                    suffix="employees who make about $"
                    disabled={chatStarted}
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
                    disabled={chatStarted}
                  />
                </span>
              </div>
              
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.type}-message ${message.isTyping ? 'typing' : ''}`}>
                  <span className="message-label">{message.type === 'ai' ? 'AI:' : 'You:'}</span>
                  <span className="message-content">{message.content}</span>
                  {message.showScheduleButton && (
                    <button 
                      className="inline-schedule-button"
                      onClick={() => openModal(getConversationSubtitle())}
                    >
                      Schedule a Call
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                placeholder={chatStarted ? "Type your message..." : "Click send to calculate value"}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isStreaming && handleSendMessage()}
                disabled={!chatStarted || isStreaming}
              />
              <button 
                className={`send-button ${chatStarted ? 'rotate' : ''}`} 
                onClick={handleSendMessage}
                disabled={isStreaming}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
              {showArrow && !chatStarted && (
                <div className="send-arrow">
                  →
                </div>
              )}
              {chatStarted && (
                <button className="refresh-button" onClick={handleRefresh} disabled={isStreaming}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                  </svg>
                </button>
              )}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI INTEGRATION SECTION */}
      <section className="ai-integration">
        <div className="ai-integration-container">
          <div className="ai-integration-header">
            <h2 className="ai-integration-title">Where to get started with AI</h2>
            <p className="ai-integration-subtitle">Six areas where automation actually delivers</p>
          </div>

          <div className="ai-integration-grid">
            {aiIntegrationBoxes.map((box) => (
              <div key={box.id} className="ai-integration-box">
                <div className="ai-box-header">
                  <img 
                    src={box.icon}
                    alt={`${box.title} icon`} 
                    className="ai-box-icon"
                    style={{ filter: 'invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(10%) contrast(100%)' }}
                  />
                  <h3 className="ai-box-title">{box.title}</h3>
                </div>
                <p className="ai-box-tagline">{box.tagline}</p>
                <img 
                  src={box.illustration}
                  alt={`${box.title} illustration`} 
                  className="ai-box-illustration"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="home-cta">
        <div className="home-cta-container">
          <h2 className="home-cta-title">
            Watch It Work Before You Pay
          </h2>
          <p className="home-cta-subtitle">
            Free process audit + proof-of-concept automation. See real results in your business first.
          </p>
          <button className="home-cta-button" onClick={() => openModal("Let's schedule your free process audit and proof-of-concept automation.")}>
            Book Your Free Process Audit
          </button>
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

      <Footer />

      {/* REUSABLE MODAL */}
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subtitle={modalSubtitle}
        conversationData={{
          messages: messages,
          automationValue: chatStarted ? Math.round((hoursPerWeek * 52 * employees * (avgSalary / 2080))) : null
        }}
      />
    </div>
  );
};

export default Home;