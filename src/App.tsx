import React, { useState } from 'react';
import { DeveloperIntro } from './components/DeveloperIntro.tsx';
import { LawyerNetworkShell } from './components/LawyerNetworkShell.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'platform'>('intro');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnterPlatform = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen('platform');
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 200);
  };

  const handleBackToIntro = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen('intro');
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 150);
  };

  return (
    <div
      className={`min-h-screen w-full transition-opacity duration-200 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {currentScreen === 'intro' ? (
        <DeveloperIntro onEnter={handleEnterPlatform} />
      ) : (
        <LawyerNetworkShell onBackToIntro={handleBackToIntro} />
      )}
    </div>
  );
}

