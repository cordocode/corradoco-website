import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import BIRDS from 'vanta/dist/vanta.birds.min';
// NOTE: Three.js loaded via CDN in index.html

// Import partner logos
import fleetAdvisor from '../assets/customer-logos/fleet_advisor.svg';
import vwco from '../assets/customer-logos/vwco.svg';
import norcon from '../assets/customer-logos/norcon.svg';
import reliant from '../assets/customer-logos/reliant.svg';
import autodesk from '../assets/customer-logos/autodesk.svg';
import chatgpt from '../assets/customer-logos/chatgpt.svg';
import claude from '../assets/customer-logos/claude.svg';
import cmic from '../assets/customer-logos/cmic.svg';
import microsoft from '../assets/customer-logos/microsoft.svg';
import procore from '../assets/customer-logos/procore.svg';

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

  // ============ PARTNERS CAROUSEL STATE ============
  const scrollRef = useRef(null);
  
  // Reordered: procore and autodesk near the beginning
  const logos = [
    { id: 1, src: procore, alt: 'Procore', name: 'procore' },
    { id: 2, src: autodesk, alt: 'Autodesk', name: 'autodesk' },
    { id: 3, src: fleetAdvisor, alt: 'Fleet Advisor', name: 'fleet-advisor' },
    { id: 4, src: vwco, alt: 'VWCO', name: 'vwco' },
    { id: 5, src: norcon, alt: 'Norcon', name: 'norcon' },
    { id: 6, src: reliant, alt: 'Reliant', name: 'reliant' },
    { id: 7, src: chatgpt, alt: 'ChatGPT', name: 'chatgpt' },
    { id: 8, src: claude, alt: 'Claude', name: 'claude' },
    { id: 9, src: cmic, alt: 'CMiC', name: 'cmic' },
    { id: 10, src: microsoft, alt: 'Microsoft', name: 'microsoft' },
    // Duplicates for seamless carousel loop
    { id: 11, src: procore, alt: 'Procore', name: 'procore' },
    { id: 12, src: autodesk, alt: 'Autodesk', name: 'autodesk' },
    { id: 13, src: fleetAdvisor, alt: 'Fleet Advisor', name: 'fleet-advisor' },
    { id: 14, src: vwco, alt: 'VWCO', name: 'vwco' },
    { id: 15, src: norcon, alt: 'Norcon', name: 'norcon' },
    { id: 16, src: reliant, alt: 'Reliant', name: 'reliant' },
    { id: 17, src: chatgpt, alt: 'ChatGPT', name: 'chatgpt' },
    { id: 18, src: claude, alt: 'Claude', name: 'claude' },
    { id: 19, src: cmic, alt: 'CMiC', name: 'cmic' },
    { id: 20, src: microsoft, alt: 'Microsoft', name: 'microsoft' },
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
            Eliminating the Work<br />
            Contractors <span className="hate-emphasis">Hate.</span>
          </h1>
          <p className="hero-subheadline">
            We help you identify, design, and build tailored automations by integrating the tools you already have into value adding solutions.
          </p>
          <button className="hero-cta-button" onClick={() => openModal("Discover how custom automation can transform your operations.")}>
            See What's Possible
          </button>
        </div>
      </section>

      {/* PLACEHOLDER SECTION */}
      <section className="placeholder-section">
        <div className="placeholder-container">
          <h2 className="placeholder-title">Unlock Your Team's Potential</h2>
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
                {/* 
                  #explanation: The 'logo-cmic' class is conditionally applied below because 
                  the CMiC logo SVG is much larger/bolder than other partner logos, causing it 
                  to visually overpower the carousel. The class scales it down to match the 
                  visual weight of other logos while preserving consistent wrapper spacing.
                  See .logo-cmic in Home.css for the sizing rule.
                */}
                {logos.map((logo) => (
                  <div 
                    key={logo.id} 
                    className={`partner-logo-wrapper ${logo.name === 'cmic' ? 'logo-cmic' : ''}`}
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
      />
    </div>
  );
};

export default Home;