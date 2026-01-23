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
  const [bidsPerYear, setBidsPerYear] = useState(350);
  const [winRate, setWinRate] = useState(50);
  const [contractValue, setContractValue] = useState(7200000);
  const [profitMargin, setProfitMargin] = useState(3.2);
  const [showResults, setShowResults] = useState(false);

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

  const tier1Profit = calculateTierProfit(0.10);
  const tier2Profit = calculateTierProfit(0.25);
  const tier3Profit = calculateTierProfit(0.50);

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleSliderChange = (setter) => (val) => {
    setter(val);
    setShowResults(false);
  };
  
  // Format profit for display - rounds to K or M for large values
  const formatProfit = (value) => {
    if (value >= 1000000) {
      return '+$' + (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1000) {
      return '+$' + Math.round(value / 1000) + 'k';
    }
    return '+$' + Math.round(value).toLocaleString('en-US');
  };

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
            Cut bidding time by <span className="hero-underline">50%</span>.<br />
            <span className="hero-bold">Win 2x Bids.</span>
          </h1>
          <p className="hero-subheadline">
            Give your estimators an intelligent AI assistant. We automate the manual work like chasing subs, entering data, and reviewing scope—so your team can bid 2x more work with the same headcount.
          </p>
          <button className="hero-cta-button" onClick={() => openModal("See how AI can double your bidding capacity.")}>
            Request a Demo
          </button>
        </div>
      </section>

      {/* PRE-CONSTRUCTION POTENTIAL CALCULATOR */}
      <section className="home-value-section">
        <div className="home-value-container">
          <h2 className="home-value-title">Pre-Construction Potential</h2>
          <p className="home-value-subtitle">See how much additional profit you could unlock by automating your bidding process.</p>
          
          <div className="home-value-cards">
            {/* Card 1: Bids Per Year */}
            <div className="home-value-card">
              <div className="home-value-number">{bidsPerYear}</div>
              <div className="home-value-label">Bids Per Year</div>
              <div className="home-value-slider-wrapper">
                <input
                  type="range"
                  className="home-calc-slider"
                  min={10}
                  max={500}
                  step={5}
                  value={bidsPerYear}
                  onChange={(e) => handleSliderChange(setBidsPerYear)(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Card 2: Win Rate */}
            <div className="home-value-card">
              <div className="home-value-number">{winRate}%</div>
              <div className="home-value-label">Win Rate</div>
              <div className="home-value-slider-wrapper">
                <input
                  type="range"
                  className="home-calc-slider"
                  min={20}
                  max={70}
                  step={1}
                  value={winRate}
                  onChange={(e) => handleSliderChange(setWinRate)(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Card 3: Contract Value */}
            <div className="home-value-card">
              <div className="home-value-number">{formatCurrency(contractValue)}</div>
              <div className="home-value-label">Avg. Contract</div>
              <div className="home-value-slider-wrapper">
                <input
                  type="range"
                  className="home-calc-slider"
                  min={2500000}
                  max={100000000}
                  step={100000}
                  value={contractValue}
                  onChange={(e) => handleSliderChange(setContractValue)(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Card 4: Profit Margin - fixed width display */}
            <div className="home-value-card">
              <div className="home-value-number home-value-number-fixed">{profitMargin.toFixed(1)}%</div>
              <div className="home-value-label">Net Margin</div>
              <div className="home-value-slider-wrapper">
                <input
                  type="range"
                  className="home-calc-slider"
                  min={2}
                  max={7}
                  step={0.1}
                  value={profitMargin}
                  onChange={(e) => handleSliderChange(setProfitMargin)(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Card 5: Calculate Button */}
            <div 
              className={`home-value-card home-value-card-calculate ${showResults ? 'calculated' : ''}`}
              onClick={handleCalculate}
            >
              <div className="home-value-calculate">Calculate</div>
            </div>
          </div>

          {/* Results Tiers - appear after Calculate */}
          <div className={`home-results-tiers ${showResults ? 'visible' : ''}`}>
            {/* Tier 1: 10% */}
            <div className="result-tier">
              <div className="tier-header">
                <div className="tier-percent">10%</div>
                <span className="tier-label-text">Efficiency Gain</span>
              </div>
              <div className="tier-body">
                <h3 className="tier-name">The Efficiency Bump</h3>
                <p className="tier-subtext">Removing simple admin & data entry</p>
                <div className="tier-profit">{formatProfit(tier1Profit)}</div>
                <p className="tier-profit-label">Additional Annual Profit</p>
              </div>
            </div>

            {/* Tier 2: 25% */}
            <div className="result-tier">
              <div className="tier-header">
                <div className="tier-percent">25%</div>
                <span className="tier-label-text">Efficiency Gain</span>
              </div>
              <div className="tier-body">
                <h3 className="tier-name">The Growth Mode</h3>
                <p className="tier-subtext">Streamlining scope sheets & outreach</p>
                <div className="tier-profit">{formatProfit(tier2Profit)}</div>
                <p className="tier-profit-label">Additional Annual Profit</p>
              </div>
            </div>

            {/* Tier 3: 50% */}
            <div className="result-tier">
              <div className="tier-header">
                <div className="tier-percent">50%</div>
                <span className="tier-label-text">Efficiency Gain</span>
              </div>
              <div className="tier-body">
                <h3 className="tier-name">The Market Leader</h3>
                <p className="tier-subtext">Full "Intelligent Intern" integration</p>
                <div className="tier-profit">{formatProfit(tier3Profit)}</div>
                <p className="tier-profit-label">Additional Annual Profit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI INTEGRATION SECTION */}
      <section className="ai-integration">
        <div className="ai-integration-container">
          <div className="ai-integration-header">
            <h2 className="ai-integration-title">Where to get started</h2>
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