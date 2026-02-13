import { Zap} from 'lucide-react';

export const MarqueeDivider = ({ text, color = "#deff00", isDark }) => (
  <div 
    className="py-6 border-y-4 border-black -rotate-1 scale-105 overflow-hidden whitespace-nowrap z-20 relative my-24 shadow-2xl"
    style={{ backgroundColor: color }}
  >
    <div className="flex animate-marquee">
      {[...Array(6)].map((_, i) => (
        <span key={i} className="text-black font-display font-black text-2xl md:text-4xl uppercase px-8 flex items-center gap-8 italic">
          {text} <Zap size={24} fill="black" />
        </span>
      ))}
    </div>
    <style>
        {`@keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 20s linear infinite;
        }`}
    </style>
  </div>
);