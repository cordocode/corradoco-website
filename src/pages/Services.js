import React, { useState, useEffect, useRef } from 'react';
import './Services.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
// NOTE: Vanta.js NET and Three.js loaded via CDN in index.html

const Services = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [visitedPhases, setVisitedPhases] = useState(new Set());
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  const phases = [
    {
      id: 1,
      number: '01',
      title: 'Assess Tools & Partners',
      subtitle: 'Understanding your current technology ecosystem',
      description: 'AI workflows require integration with your current tool set. We analyze available API endpoints from your CRM, ERP, and custom databases to understand what\'s possible and where opportunities exist for meaningful automation.'
    },
    {
      id: 2,
      number: '02',
      title: 'Identify High-Impact Use Cases',
      subtitle: 'Finding the right starting point',
      description: 'Many businesses new to AI instinctively want broad implementation. We recommend starting small with targeted use cases where AI excels. We ask: What processes can be streamlined? What information do you need faster access to? Does available data need to be synthesized and delivered directly to customers? Where are people getting bogged down?'
    },
    {
      id: 3,
      number: '03',
      title: 'Strengthen Data Infrastructure',
      subtitle: 'Building the foundation',
      description: 'The backbone of any custom AI is a RAG (Retrieval-Augmented Generation) database infrastructure. We work on cleaning and structuring incoming data to create a stable environment where the AI can reliably access accurate information—far beyond what could fit in a single prompt.'
    },
    {
      id: 4,
      number: '04',
      title: 'Prepare for Organizational Change',
      subtitle: 'Ensuring adoption and success',
      description: 'Even the most efficient solutions need proper onboarding. We provide training to help your team understand what\'s possible and how to use new tools effectively, ensuring your investment delivers real value.'
    },
    {
      id: 5,
      number: '05',
      title: 'Implement and Maintain',
      subtitle: 'Ongoing optimization',
      description: 'We provide monthly usage reports, proactive updates when dependencies change, and minor adjustments as your needs evolve. Consistent maintenance ensures your automation continues delivering value long-term.'
    }
  ];

  // Initialize Vanta NET effect
  useEffect(() => {
    if (!vantaEffect && window.THREE && window.VANTA) {
      setVantaEffect(
        window.VANTA.NET({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x1a1a1a, // Changed to charcoal
          backgroundColor: 0xffffe2,
          points: 2.00,
          maxDistance: 15.00,
          spacing: 18.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Update NET effect based on progression
  useEffect(() => {
    if (vantaEffect) {
      const progressionLevel = visitedPhases.size;
      
      // Calculate points and maxDistance based on progression
      // 2X MORE DRAMATIC GROWTH
      // Start: 2 points, 15 distance
      // End (5 phases): 18 points, 39 distance
      const points = 2 + (progressionLevel * 3.2); // 2 → 18 (doubled from 1.6)
      const maxDistance = 15 + (progressionLevel * 4.8); // 15 → 39 (doubled from 2.4)
      
      vantaEffect.setOptions({
        points: points,
        maxDistance: maxDistance
      });
    }
  }, [visitedPhases, vantaEffect]);

  const togglePhase = (phaseId) => {
    // Add to visited phases if not already there
    if (!visitedPhases.has(phaseId)) {
      setVisitedPhases(new Set([...visitedPhases, phaseId]));
    }
    
    // Toggle expansion
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  return (
    <div className="services">
      <Header />
      
      {/* Services Content with NET background */}
      <section className="services-content">
        {/* Vanta NET Animation */}
        <div className="services-net-background" ref={vantaRef}></div>
        
        {/* Timeline Section */}
        <div className="services-timeline-wrapper">
          <div className="services-timeline-container">
            <div className="timeline-track">
              {phases.map((phase, index) => (
                <div 
                  key={phase.id} 
                  className={`timeline-item ${expandedPhase === phase.id ? 'expanded' : ''} ${visitedPhases.has(phase.id) ? 'visited' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="timeline-node">
                    <div className="node-circle">
                      <span className="node-number">{phase.number}</span>
                    </div>
                    {index < phases.length - 1 && <div className="node-line"></div>}
                  </div>

                  {/* Timeline Content */}
                  <div className="timeline-content">
                    <div 
                      className="timeline-header"
                      onClick={() => togglePhase(phase.id)}
                    >
                      <div className="timeline-header-text">
                        <h3 className="timeline-title">{phase.title}</h3>
                        <p className="timeline-subtitle">{phase.subtitle}</p>
                      </div>
                      <button className="timeline-toggle">
                        {expandedPhase === phase.id ? '−' : '+'}
                      </button>
                    </div>

                    {/* Expanded Description */}
                    <div className="timeline-description">
                      <p>{phase.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;