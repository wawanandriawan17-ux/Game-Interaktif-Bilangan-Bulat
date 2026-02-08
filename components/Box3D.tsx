
import React from 'react';

interface Box3DProps {
  id: number;
  isOpen: boolean;
  onClick: () => void;
  isCompleted: boolean;
}

const Box3D: React.FC<Box3DProps> = ({ id, isOpen, onClick, isCompleted }) => {
  return (
    <div 
      className={`relative w-32 h-32 md:w-48 md:h-48 cursor-pointer perspective-1000 group transition-all duration-500 ${isCompleted ? 'opacity-50 scale-95 pointer-events-none' : 'hover:scale-105'}`}
      onClick={onClick}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isOpen ? 'rotate-y-180' : ''}`}>
        
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl shadow-2xl border-4 border-yellow-200">
           <div className="text-white text-5xl md:text-7xl font-bold drop-shadow-lg select-none">
             {id}
           </div>
           {/* Decorative elements */}
           <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-200 rounded-full opacity-50"></div>
           <div className="absolute bottom-2 right-2 w-4 h-4 bg-orange-200 rounded-full opacity-50"></div>
        </div>

        {/* Back Side (Inside) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-slate-100 rounded-xl shadow-inner border-4 border-slate-300 overflow-hidden">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mb-2 flex items-center justify-center">
                <span className="text-white font-bold">?</span>
              </div>
              <span className="text-slate-600 font-semibold text-sm">MEMBUKA...</span>
            </div>
        </div>

      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Box3D;
