
import React, { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ value, suffix, label, inView }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const startTime = Date.now();

    if (inView) {
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentCount = Math.floor(progress * (end - start) + start);
        
        setCount(currentCount);
        
        if (progress === 1) {
          clearInterval(timer);
        }
      }, 20);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-tjk-blue font-montserrat mb-2">
        {inView ? count : 0}{suffix}
      </div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const Stats: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-gradient-to-r from-tjk-gray to-white">
      <div className="container px-4 mx-auto">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-tjk-blue mb-12 text-center">
          Areál Komáří vížka v číslech
        </h2>
        
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatItem value={800} suffix=" m" label="Nadmořská výška" inView={inView} />
          <StatItem value={5} suffix=" km" label="Délka trailů" inView={inView} />
          <StatItem value={30} suffix="+" label="Lůžek pro ubytování" inView={inView} />
          <StatItem value={4} suffix="" label="Sportovní aktivity" inView={inView} />
        </div>
      </div>
    </section>
  );
};

export default Stats;
