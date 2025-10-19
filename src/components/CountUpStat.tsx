import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { LucideIcon } from "lucide-react";

interface CountUpStatProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: LucideIcon;
  decimals?: number;
}

const CountUpStat: React.FC<CountUpStatProps> = ({
  end,
  duration = 2.5,
  suffix = "",
  prefix = "",
  label,
  icon: Icon,
  decimals = 0,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group"
    >
      {Icon && (
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-tjk-orange to-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
      )}
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-poppins font-bold text-white mb-2">
          {inView ? (
            <CountUp
              end={end}
              duration={duration}
              suffix={suffix}
              prefix={prefix}
              decimals={decimals}
            />
          ) : (
            <span>0{suffix}</span>
          )}
        </div>
        <div className="text-white/80 font-inter font-medium">{label}</div>
      </div>
    </div>
  );
};

export default CountUpStat;
