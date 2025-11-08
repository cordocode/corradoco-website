import React, { useState } from 'react';
import './Flow.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Flow = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [visitedPhases, setVisitedPhases] = useState(new Set());

  const phases = [
    {
      id: 1,
      number: '01',
      title: 'Discovery Call',
      subtitle: 'We learn about your business and current software',
      description: 'We start by understanding what tools you already use—your CRM, accounting software, project management systems, and any custom tools. We research what these systems can do and where they can talk to each other. This helps us see what\'s actually possible without disrupting your existing setup.'
    },
    {
      id: 2,
      number: '02',
      title: 'Find the Right Process to Automate',
      subtitle: 'Identify repetitive tasks that waste time',
      description: 'We look for manual processes that happen over and over—things like data entry, sending follow-up emails, organizing files, or pulling information from different systems. The goal is to find tasks that eat up hours but don\'t require complex human judgment. We start small with one high-impact process rather than trying to automate everything at once.'
    },
    {
      id: 3,
      number: '03',
      title: 'Build the System',
      subtitle: 'Create automation that actually works',
      description: 'We build the automation using tools like n8n, Zapier, or custom code depending on what you need. If AI is involved, we set up a knowledge base so it can access your company information reliably. We test everything thoroughly to make sure it handles real-world scenarios, not just perfect conditions.'
    },
    {
      id: 4,
      number: '04',
      title: 'Train Your Team',
      subtitle: 'Get everyone comfortable with the new system',
      description: 'We walk your team through how the automation works and what to expect. We create simple documentation and are available to answer questions. The goal is to make sure everyone understands what changed, why it helps them, and what to do if something seems off.'
    },
    {
      id: 5,
      number: '05',
      title: 'Ongoing Support',
      subtitle: 'Keep everything running smoothly',
      description: 'After launch, we monitor the system and send you monthly reports showing what\'s working. When your software updates or your needs change, we adjust the automation accordingly. We\'re here for minor tweaks and questions so your automation keeps delivering value over time.'
    }
  ];

  const togglePhase = (phaseId) => {
    // Add to visited phases if not already there
    if (!visitedPhases.has(phaseId)) {
      setVisitedPhases(new Set([...visitedPhases, phaseId]));
    }
    
    // Toggle expansion
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  return (
    <div className="flow">
      <Header />
      
      {/* Flow Content */}
      <section className="flow-content">
        {/* Page Header */}
        <div className="flow-header">
          <h1 className="flow-title">Discovery to Deployment</h1>
          <p className="flow-subtitle">
            We guide you through every phase of building custom automation that transforms your operations.
          </p>
        </div>
        
        {/* Timeline Section */}
        <div className="flow-timeline-wrapper">
          <div className="flow-timeline-container">
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

export default Flow;