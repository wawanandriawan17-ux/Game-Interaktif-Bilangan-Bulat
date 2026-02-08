
import React, { useState, useCallback, useEffect } from 'react';
import Box3D from './components/Box3D';
import QuestionModal from './components/QuestionModal';
import { QUESTIONS } from './data/questions';
import { GameState, Question } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    score: 0,
    openedBoxes: [],
    currentQuestion: null,
    isGameOver: false,
    totalBoxes: QUESTIONS.length
  });

  const handleOpenBox = (question: Question) => {
    if (state.openedBoxes.includes(question.id)) return;
    
    setState(prev => ({
      ...prev,
      currentQuestion: question
    }));
  };

  const handleCloseModal = (correct: boolean, customPoints?: number) => {
    if (!state.currentQuestion) return;

    const pointsToAdd = customPoints !== undefined 
      ? customPoints 
      : (correct ? state.currentQuestion.points : 0);

    const newOpenedBoxes = [...state.openedBoxes, state.currentQuestion.id];
    
    setState(prev => ({
      ...prev,
      score: prev.score + pointsToAdd,
      openedBoxes: newOpenedBoxes,
      currentQuestion: null,
      isGameOver: newOpenedBoxes.length === prev.totalBoxes
    }));
  };

  const restartGame = () => {
    setState({
      score: 0,
      openedBoxes: [],
      currentQuestion: null,
      isGameOver: false,
      totalBoxes: QUESTIONS.length
    });
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col p-4 md:p-8 relative">
      
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header UI */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white/5 p-6 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent drop-shadow-sm uppercase italic">
            Kotak Keberuntungan
          </h1>
          <p className="text-blue-300 font-semibold text-lg tracking-wide uppercase mt-1">
            Matematika SMP: Bilangan Bulat
          </p>
        </div>

        <div className="flex gap-4 items-center">
            <div className="bg-slate-900/50 px-8 py-3 rounded-2xl border-2 border-white/10 text-center min-w-[160px]">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Total Poin</div>
                <div className="text-4xl font-black text-yellow-400 tabular-nums">
                    {state.score}
                </div>
            </div>
            <div className="bg-slate-900/50 px-8 py-3 rounded-2xl border-2 border-white/10 text-center min-w-[120px]">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Progres</div>
                <div className="text-2xl font-black text-blue-400 tabular-nums">
                    {state.openedBoxes.length} / {state.totalBoxes}
                </div>
            </div>
        </div>
      </header>

      {/* Main Grid Area */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {QUESTIONS.map((q) => (
            <Box3D 
              key={q.id}
              id={q.id}
              isOpen={state.currentQuestion?.id === q.id}
              isCompleted={state.openedBoxes.includes(q.id)}
              onClick={() => handleOpenBox(q)}
            />
          ))}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="mt-8 text-center text-slate-500 text-sm font-medium">
        Pilih salah satu nomor untuk membuka tantangan matematika!
      </footer>

      {/* Question Modal Overlay */}
      {state.currentQuestion && (
        <QuestionModal 
          question={state.currentQuestion}
          onClose={handleCloseModal}
        />
      )}

      {/* Game Over Screen */}
      {state.isGameOver && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/95 backdrop-blur-xl animate-in zoom-in duration-300">
           <div className="text-center p-12 max-w-lg space-y-8">
              <div className="text-8xl">🏆</div>
              <h2 className="text-6xl font-black text-white">GAME SELESAI!</h2>
              <div className="space-y-2">
                <p className="text-slate-400 text-xl font-bold uppercase tracking-widest">Skor Akhir Kamu</p>
                <p className="text-8xl font-black text-yellow-400 tabular-nums drop-shadow-2xl">
                    {state.score}
                </p>
              </div>
              <button 
                onClick={restartGame}
                className="w-full py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-2xl font-bold rounded-2xl shadow-xl transition-all active:scale-95"
              >
                MAIN LAGI
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default App;
