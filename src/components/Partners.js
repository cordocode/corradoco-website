import React, { useEffect, useRef } from 'react';
import './Partners.css';
import fleetAdvisor from '../assets/customer-logos/fleet_advisor.svg';
import vwco from '../assets/customer-logos/vwco.svg';
import norcon from '../assets/customer-logos/norcon.svg';
import reliant from '../assets/customer-logos/reliant.svg';

const Partners = () => {
  const scrollRef = useRef(null);
  
  // Create array of logos with duplicates for seamless scrolling
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
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed as needed
    
    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Get the width of 4 logo items (half the total since we duplicated)
      const halfWidth = scrollContainer.scrollWidth / 2;
      
      // Reset position when we've scrolled through the first set
      if (scrollPosition >= halfWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationId = requestAnimationFrame(animate);
    
    // Pause on hover
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
    // Placeholder for future functionality
    console.log(`Clicked on ${logoName}`);
    // This is where you'll add the text box expansion logic later
  };
  
  return (
    <section className="partners">
      <div className="partners-container">
        <h2 className="partners-title">Our Partners</h2>
        <div className="partners-carousel-wrapper">
          {/* Fade overlays for edge effect */}
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
        
        {/* Placeholder for future description boxes */}
        <div className="partner-descriptions">
          {/* Descriptions will be added here later */}
        </div>
      </div>
    </section>
  );
};

export default Partners;