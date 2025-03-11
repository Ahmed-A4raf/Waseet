import React, { useEffect, useState, useRef } from "react";
import dealImg from "../../assets/deals.png";

const DealsSection = () => {
  const targetValues = { days: 14, hours: 20, mins: 15, secs: 5 };
  const [counts, setCounts] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to detect when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCounting(true);
        }
      },
      { threshold: 0.5 } // Start when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Counting animation effect
  useEffect(() => {
    if (!startCounting) return; // Start only when the section is in view

    const duration = 2000; // 2 seconds
    const steps = 60; // Number of steps for smooth animation
    const intervalTime = duration / steps;
    
    const startAnimation = (key, target) => {
      let step = 0;
      const increment = target / steps;

      const interval = setInterval(() => {
        step++;
        setCounts((prev) => ({
          ...prev,
          [key]: Math.min(Math.round(step * increment), target),
        }));

        if (step >= steps) clearInterval(interval);
      }, intervalTime);
    };

    Object.keys(targetValues).forEach((key) => {
      startAnimation(key, targetValues[key]);
    });

  }, [startCounting]); // Runs when `startCounting` becomes true

  return (
    <section ref={sectionRef} className="section__container deals__container">
      {/* Deals Image */}
      <div className="deals__image relative">
        <img src={dealImg} alt="Deals" className="w-full absolute inset-0" />
      </div>

      {/* Deals Content */}
      <div className="deals__content">
        <h5>Your one From Thousand of Products</h5>
        <h4>Deals of the Month</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>

        {/* Countdown Timer */}
        <div className="deals__countdown flex-wrap">
          {Object.entries(counts).map(([key, value]) => (
            <div key={key} className="deals__countdown__card">
              <h4>{value}</h4>
              <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
