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

  // ============ CALCULATOR STATE ============
  const [bidsPerYear, setBidsPerYear] = useState(50);
  const [winRate, setWinRate] = useState(15);
  const [contractValue, setContractValue] = useState(2500000);
  const [hoursPerBid, setHoursPerBid] = useState(80);
  const [profitMargin, setProfitMargin] = useState(4);

  // ============ OPEN MODAL WITH SPECIFIC SUBTITLE ============
  const openModal = (subtitle) => {
    setModalSubtitle(subtitle);
    setIsModalOpen(true);
  };

  // ============ FORMAT CURRENCY ============
  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return '$' + (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1000) {
      return '$' + (value / 1000).toFixed(0) + 'k';
    }
    return '$' + value.toLocaleString('en-US');
  };

  const formatFullCurrency = (value) => {
    return '$' + Math.round(value).toLocaleString('en-US');
  };

  // ============ CALCULATOR LOGIC ============
  const calculateTierProfit = (automationPercent) => {
    // Current Profit Per Bid = Contract Value × Win Rate × Profit Margin
    const currentProfitPerBid = contractValue * (winRate / 100) * (profitMargin / 100);
    
    // Multiplier = 1 / (1 - automation%)
    const multiplier = 1 / (1 - automationPercent);
    
    // New Bids Possible = (Total Bids × Multiplier) - Total Bids
    const newBidsPossible = (bidsPerYear * multiplier) - bidsPerYear;
    
    // Additional Profit = New Bids × Profit Per Bid
    const additionalProfit = newBidsPossible * currentProfitPerBid;
    
    return additionalProfit;
  };

  const tier1Profit = calculateTierProfit(0.10); // 10% automation
  const tier2Profit = calculateTierProfit(0.25); // 25% automation
  const tier3Profit = calculateTierProfit(0.50); // 50% automation

  // ============ PARTNERS CAROUSEL STATE ============
  const scrollRef = useRef(null);
  
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
      title: 'Instant Scope Creation',
      tagline: 'Generate detailed, trade-specific scope sheets from your drawing sets in seconds, not hours.',
      illustration: illustrationInternalKnowledge
    },
    {
      id: 2,
      icon: iconCustomerPortal,
      title: 'Smart Sub Outreach',
      tagline: 'Personalized, automated invitations that track engagement and answer basic scope questions for you.',
      illustration: illustrationCustomerPortal
    },
    {
      id: 3,
      icon: iconDocumentIntelligence,
      title: 'Centralized Bid Tracking',
      tagline: 'Stop tracking status in your head. See exactly who has bid, who is reviewing, and who needs a nudge.',
      illustration: illustrationDocumentIntelligence
    },
    {
      id: 4,
      icon: iconDataBridge,
      title: 'Assisted Bid Leveling',
      tagline: 'AI normalizes inconsistent quotes so you can compare apples-to-apples without the manual data entry.',
      illustration: illustrationDataBridge
    },
    {
      id: 5,
      icon: iconIntelligentDoc,
      title: 'Intelligent Scope Review',
      tagline: 'Your AI intern flags missing inclusions or exclusions on every quote before you commit to a number.',
      illustration: illustrationIntelligentDoc
    },
    {
      id: 6,
      icon: iconProactiveFollowUp,
      title: 'Automated Data Transfer',
      tagline: 'Push your final leveled numbers directly into your master estimate. No copy-pasting, no typos.',
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
            Double Your Bidding Capacity.
          </h1>
          <p className="hero-subheadline">
            Give your estimators a super-intelligent AI assistant. We automate the manual grunt work—chasing subs, entering data, and reviewing scope—so your team can bid 2x more work with the same headcount.
          </p>
          <button className="hero-cta-button" onClick={() => openModal("See how AI can double your bidding capacity.")}>
            Request a Demo
          </button>
        </div>
      </section>

      {/* PRE-CONSTRUCTION POTENTIAL CALCULATOR */}
      <section className="calculator-section">
        <div className="calculator-container">
          <h2 className="calculator-title">Pre-Construction Potential</h2>
          <p className="calculator-subtitle">
            See how much additional profit you could generate by reinvesting time saved into bidding more projects.
          </p>
          
          {/* Sliders Grid */}
          <div className="calculator-sliders">
            {/* Slider 1: Total Bids Per Year */}
            <div className="calc-slider-group">
              <div className="calc-slider-header">
                <span className="calc-slider-label">Total Bids Per Year</span>
                <span className="calc-slider-value">{bidsPerYear}</span>
              </div>
              <input
                type="range"
                className="calc-slider"
                min={10}
                max={500}
                step={5}
                value={bidsPerYear}
                onChange={(e) => setBidsPerYear(Number(e.target.value))}
              />
              <div className="calc-slider-range">
                <span>10</span>
                <span>500</span>
              </div>
            </div>

            {/* Slider 2: Win Rate */}
            <div className="calc-slider-group">
              <div className="calc-slider-header">
                <span className="calc-slider-label">Win Rate</span>
                <span className="calc-slider-value">{winRate}%</span>
              </div>
              <input
                type="range"
                className="calc-slider"
                min={5}
                max={50}
                step={1}
                value={winRate}
                onChange={(e) => setWinRate(Number(e.target.value))}
              />
              <div className="calc-slider-range">
                <span>5%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Slider 3: Avg Contract Value */}
            <div className="calc-slider-group">
              <div className="calc-slider-header">
                <span className="calc-slider-label">Avg. Contract Value</span>
                <span className="calc-slider-value">{formatCurrency(contractValue)}</span>
              </div>
              <input
                type="range"
                className="calc-slider"
                min={500000}
                max={50000000}
                step={100000}
                value={contractValue}
                onChange={(e) => setContractValue(Number(e.target.value))}
              />
              <div className="calc-slider-range">
                <span>$500k</span>
                <span>$50M</span>
              </div>
            </div>

            {/* Slider 4: Man-Hours Per Bid */}
            <div className="calc-slider-group">
              <div className="calc-slider-header">
                <span className="calc-slider-label">Avg. Man-Hours Per Bid</span>
                <span className="calc-slider-value">{hoursPerBid} hrs</span>
              </div>
              <input
                type="range"
                className="calc-slider"
                min={20}
                max={400}
                step={10}
                value={hoursPerBid}
                onChange={(e) => setHoursPerBid(Number(e.target.value))}
              />
              <div className="calc-slider-range">
                <span>20 hrs</span>
                <span>400 hrs</span>
              </div>
            </div>

            {/* Slider 5: Net Profit Margin */}
            <div className="calc-slider-group">
              <div className="calc-slider-header">
                <span className="calc-slider-label">Net Profit Margin</span>
                <span className="calc-slider-value">{profitMargin}%</span>
              </div>
              <input
                type="range"
                className="calc-slider"
                min={1}
                max={15}
                step={0.5}
                value={profitMargin}
                onChange={(e) => setProfitMargin(Number(e.target.value))}
              />
              <div className="calc-slider-range">
                <span>1%</span>
                <span>15%</span>
              </div>
            </div>
          </div>

          {/* Results Tiers */}
          <div className="calculator-results">
            {/* Tier 1: Bronze */}
            <div className="result-tier tier-bronze">
              <div className="tier-badge">10% Automation</div>
              <h3 className="tier-name">The Efficiency Bump</h3>
              <p className="tier-subtext">Removing simple admin & data entry</p>
              <div className="tier-profit">+{formatFullCurrency(tier1Profit)}</div>
              <p className="tier-label">Additional Annual Profit</p>
            </div>

            {/* Tier 2: Silver */}
            <div className="result-tier tier-silver">
              <div className="tier-badge">25% Automation</div>
              <h3 className="tier-name">The Growth Mode</h3>
              <p className="tier-subtext">Streamlining scope sheets & outreach</p>
              <div className="tier-profit">+{formatFullCurrency(tier2Profit)}</div>
              <p className="tier-label">Additional Annual Profit</p>
            </div>

            {/* Tier 3: Gold */}
            <div className="result-tier tier-gold">
              <div className="tier-badge">50% Automation</div>
              <h3 className="tier-name">The Market Leader</h3>
              <p className="tier-subtext">Full "Intelligent Intern" integration</p>
              <div className="tier-profit">+{formatFullCurrency(tier3Profit)}</div>
              <p className="tier-label">Additional Annual Profit</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="calculator-cta">
            <button className="calculator-cta-button" onClick={() => openModal("Let's explore your pre-construction potential together.")}>
              Unlock Your Potential → Book Discovery
            </button>
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