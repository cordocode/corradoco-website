import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import Slider from '../components/Slider';
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

  // ============ VALUE CALCULATOR STATE ============
  const [employees, setEmployees] = useState(10);
  const [hours, setHours] = useState(5);
  const [salary, setSalary] = useState(75000);
  const [result, setResult] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // ============ OPEN MODAL WITH SPECIFIC SUBTITLE ============
  const openModal = (subtitle) => {
    setModalSubtitle(subtitle);
    setIsModalOpen(true);
  };

  // ============ FORMAT CURRENCY ============
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US');
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
      title: 'Project Search',
      tagline: 'Find any drawing, spec, or RFI response in seconds',
      illustration: illustrationInternalKnowledge
    },
    {
      id: 2,
      icon: iconCustomerPortal,
      title: 'COI Compliance',
      tagline: 'Auto-track and chase expired sub policies',
      illustration: illustrationCustomerPortal
    },
    {
      id: 3,
      icon: iconDocumentIntelligence,
      title: 'Lien Waiver Collection',
      tagline: 'Auto-request and match waivers to payments',
      illustration: illustrationDocumentIntelligence
    },
    {
      id: 4,
      icon: iconDataBridge,
      title: 'Invoice Processing',
      tagline: 'Auto-code, route, and track AP approvals',
      illustration: illustrationDataBridge
    },
    {
      id: 5,
      icon: iconIntelligentDoc,
      title: 'RFI Tracking',
      tagline: 'Auto-route and escalate unanswered requests',
      illustration: illustrationIntelligentDoc
    },
    {
      id: 6,
      icon: iconProactiveFollowUp,
      title: 'Vendor Follow-Up',
      tagline: 'Auto-chase quotes and bid responses',
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

      {/* VALUE CALCULATOR SECTION */}
      <section className="home-value-section">
        <div className="home-value-container">
          <h2 className="home-value-title">Unlock Your Team's Potential</h2>
          <p className="home-value-subtitle">Small time savings add up big over the course of a year.</p>
          
          <div className="home-value-cards">
            {/* Card 1: Employees */}
            <div className="home-value-card">
              <div className="home-value-number">{employees}</div>
              <div className="home-value-label">Employees</div>
              <div className="home-value-slider-wrapper">
                <Slider
                  value={employees}
                  onChange={(val) => {
                    setEmployees(val);
                    setShowResult(false);
                  }}
                  min={1}
                  max={500}
                  width="100%"
                  displayValue=""
                  suffix=""
                />
              </div>
            </div>

            {/* Card 2: Hours */}
            <div className="home-value-card">
              <div className="home-value-number">{hours}</div>
              <div className="home-value-label">Hours Per Week</div>
              <div className="home-value-slider-wrapper">
                <Slider
                  value={hours}
                  onChange={(val) => {
                    setHours(val);
                    setShowResult(false);
                  }}
                  min={1}
                  max={30}
                  width="100%"
                  displayValue=""
                  suffix=""
                />
              </div>
            </div>

            {/* Card 3: Salary */}
            <div className="home-value-card">
              <div className="home-value-number">${formatCurrency(salary)}</div>
              <div className="home-value-label">Average Salary</div>
              <div className="home-value-slider-wrapper">
                <Slider
                  value={salary}
                  onChange={(val) => {
                    setSalary(val);
                    setShowResult(false);
                  }}
                  min={40000}
                  max={200000}
                  step={5000}
                  width="100%"
                  displayValue=""
                  suffix=""
                />
              </div>
            </div>

            {/* Card 4: Calculate/Result */}
            <div 
              className={`home-value-card home-value-card-result ${showResult ? 'calculated' : ''}`}
              onClick={() => {
                if (!showResult) {
                  const hourlyRate = salary / 2000;
                  const totalHours = employees * hours * 52;
                  const annualCost = Math.round(totalHours * hourlyRate);
                  setResult(annualCost);
                  setShowResult(true);
                }
              }}
            >
              <div className="home-value-result-content">
                {!showResult ? (
                  <div className="home-value-calculate">Calculate</div>
                ) : (
                  <>
                    <div className="home-value-result-number" key={result}>${formatCurrency(result)}</div>
                    <div className="home-value-result-label">Annual Value</div>
                  </>
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