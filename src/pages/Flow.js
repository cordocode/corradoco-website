import React, { useState, useEffect } from 'react';
import './Flow.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import Slider from '../components/Slider';
import scootImage from '../assets/scoot.png';
import benImage from '../assets/ben.png';

const Flow = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [visitedPhases, setVisitedPhases] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Value calculator state
  const [employees, setEmployees] = useState(10);
  const [hours, setHours] = useState(5);
  const [salary, setSalary] = useState(75000);
  const [result, setResult] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Wait for Vanta to be available, then initialize
    const timer = setTimeout(() => {
      if (window.VANTA && window.VANTA.NET) {
        console.log('Initializing Vanta NET');
        window.VANTA.NET({
          el: '#flow-net-background',
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.5,
          scaleMobile: 1.0,
          color: 0x1a1a1a,
          backgroundColor: 0xffffe2,
          points: 4.0,
          maxDistance: 40.0,
          spacing: 25.0,
        });
      } else {
        console.warn('Vanta NET not available');
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update NET animation based on visited phases
    const timer = setTimeout(() => {
      if (window.VANTA && window.VANTA.NET) {
        const visitedCount = visitedPhases.size;
        const points = Math.max(4, 4 + visitedCount * 0.8);
        const maxDistance = Math.max(40, 40 + visitedCount * 3);
        
        window.VANTA.NET({
          el: '#flow-net-background',
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.5,
          scaleMobile: 1.0,
          color: 0x1a1a1a,
          backgroundColor: 0xffffe2,
          points: points,
          maxDistance: maxDistance,
          spacing: 25.0,
        });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [visitedPhases]);

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

  // Format currency for display - shows full number with commas
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US');
  };

  return (
    <div className="flow">
      <Header />
      
      {/* NET Background Animation */}
      <div id="flow-net-background" className="flow-net-background"></div>
      
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

      {/* About Section */}
      <section className="flow-about">
        <div className="flow-about-container">
          <h2 className="flow-about-title">Our Team</h2>
          <div className="flow-about-grid">
            {/* Scoot */}
            <div className="about-person">
              <div className="about-image-wrapper">
                <img src={scootImage} alt="Scoot Norwesh" className="about-image" />
              </div>
              <h3 className="about-name">Scoot Norwesh</h3>
              <p className="about-role">Business Guy</p>
              <p className="about-description">
                Scoot has a knack for turning strangers into friends and ideas into action. With a background in business and marketing, he's the guy who makes sure projects actually happen (and that everyone enjoys the process). He also happens to be a professional Skateboarder.
              </p>
            </div>

            {/* Ben */}
            <div className="about-person">
              <div className="about-image-wrapper">
                <img src={benImage} alt="Ben Corrado" className="about-image" />
              </div>
              <h3 className="about-name">Ben Corrado</h3>
              <p className="about-role">Tech Guy</p>
              <p className="about-description">
                Ben's curiosity has taken him through filmmaking, furniture making, and now automation. Each project taught him something new, and all of them reinforced two core values: efficiency and excellence. He builds systems that don't just work—they work beautifully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Calculator Section */}
      <section className="flow-value">
        <div className="flow-value-container">
          <h2 className="flow-value-title">We Serve Those Who See The Value</h2>
          <p className="flow-value-subtitle">
            Adjust the sliders below to calculate how much manual work is costing your business each year.
          </p>
          
          <div className="flow-value-cards">
            {/* Card 1: Employees */}
            <div className="value-card">
              <div className="value-number">{employees}</div>
              <div className="value-label">Employees</div>
              <div className="value-slider-wrapper">
                <Slider
                  value={employees}
                  onChange={(val) => {
                    setEmployees(val);
                    setShowResult(false);
                  }}
                  min={1}
                  max={50}
                  width="100%"
                  displayValue=""
                  suffix=""
                />
              </div>
            </div>

            {/* Card 2: Hours */}
            <div className="value-card">
              <div className="value-number">{hours}</div>
              <div className="value-label">Hours Per Week</div>
              <div className="value-slider-wrapper">
                <Slider
                  value={hours}
                  onChange={(val) => {
                    setHours(val);
                    setShowResult(false);
                  }}
                  min={1}
                  max={20}
                  width="100%"
                  displayValue=""
                  suffix=""
                />
              </div>
            </div>

            {/* Card 3: Salary - Now shows full number */}
            <div className="value-card">
              <div className="value-number">${formatCurrency(salary)}</div>
              <div className="value-label">Average Salary</div>
              <div className="value-slider-wrapper">
                <Slider
                  value={salary}
                  onChange={(val) => {
                    setSalary(val);
                    setShowResult(false);
                  }}
                  min={40000}
                  max={150000}
                  step={5000}
                  width="100%"
                  displayValue=""
                  suffix=""
                />
              </div>
            </div>

            {/* Card 4: Calculate/Result - Smooth expansion animation */}
            <div 
              className={`value-card value-card-result ${showResult ? 'calculated' : ''}`}
              onClick={() => {
                if (!showResult) {
                  // Calculation:
                  // hourlyRate = annual salary / 2000 work hours per year (50 weeks × 40 hours)
                  // totalHours = employees × hours per week × 52 weeks
                  // annualCost = totalHours × hourlyRate
                  const hourlyRate = salary / 2000;
                  const totalHours = employees * hours * 52;
                  const annualCost = Math.round(totalHours * hourlyRate);
                  setResult(annualCost);
                  setShowResult(true);
                }
              }}
            >
              <div className="value-result-content">
                {!showResult ? (
                  <div className="value-calculate">Calculate</div>
                ) : (
                  <>
                    <div className="value-result-number" key={result}>${formatCurrency(result)}</div>
                    <div className="value-result-label">Annual Value</div>
                  </>
                )}
              </div>
            </div>
          </div>

          <p className="flow-value-text">
            We serve those who see the math. If your people don't have enough hours to do what grows the business, and you're ready to fix that permanently—let's talk.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flow-cta">
        <div className="flow-cta-container">
          <h2 className="flow-cta-title">Let's Start Simple</h2>
          <p className="flow-cta-subtitle">
            Free discovery call to identify which manual process you could automate.
          </p>
          <button className="flow-cta-button" onClick={() => setIsModalOpen(true)}>
            Book Your Strategy Call
          </button>
        </div>
      </section>

      <Footer />

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subtitle="Free discovery call to identify which manual process you could automate."
      />
    </div>
  );
};

export default Flow;