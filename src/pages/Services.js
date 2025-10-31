import React, { useState } from 'react';
import './Services.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Services = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);

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

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  return (
    <div className="services">
      <Header />
      
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-container">
          <h1 className="services-hero-title">Our Process</h1>
          <p className="services-hero-subtitle">
            A proven roadmap for implementing custom AI automation that delivers real value.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="services-timeline">
        <div className="services-timeline-container">
          <div className="timeline-track">
            {phases.map((phase, index) => (
              <div 
                key={phase.id} 
                className={`timeline-item ${expandedPhase === phase.id ? 'expanded' : ''}`}
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
      </section>

      <Footer />
    </div>
  );
};

export default Services;