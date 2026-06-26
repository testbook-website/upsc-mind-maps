import React, { useState } from 'react';
import { Joyride, STATUS } from 'react-joyride';

export default function OnboardingTour({ onFinish }) {
  const [run] = useState(true);

  const steps = [
    {
      target: '#tour-nav',
      content: (
        <div>
          <h3 style={{ margin: '0 0 5px', color: '#1e293b' }}>Welcome to UPSC Prep Lab! 🎉</h3>
          <p style={{ margin: '0 0 10px', color: '#64748b', fontSize: 13 }}>Let's take a quick tour.</p>
          <h4 style={{ margin: '0 0 5px' }}>Subject Filters</h4>
          <p style={{ margin: 0 }}>Quickly filter all 50 mindmaps by specific GS Papers or Subjects right here.</p>
        </div>
      ),
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '#tour-search',
      content: (
        <div>
          <h3 style={{ margin: '0 0 5px' }}>Instant Search</h3>
          <p style={{ margin: 0 }}>Looking for something specific? Search topics instantly right here.</p>
        </div>
      ),
      placement: 'bottom-end',
    },
    {
      target: '#tour-progress',
      content: (
        <div>
          <h3 style={{ margin: '0 0 5px' }}>Mastery Tracking</h3>
          <p style={{ margin: 0 }}>Watch this bar fill up as you mark topics as 'Mastered'. Aim for 100%!</p>
        </div>
      ),
      placement: 'top',
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    
    if (finishedStatuses.includes(status)) {
      onFinish();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#3b82f6',
          zIndex: 10000,
          textColor: '#334155',
          backgroundColor: '#ffffff',
          arrowColor: '#ffffff',
        },
        tooltipContainer: {
          textAlign: 'left'
        },
        buttonNext: {
          backgroundColor: '#3b82f6',
          borderRadius: 8,
          fontWeight: 'bold',
        },
        buttonBack: {
          color: '#64748b'
        }
      }}
    />
  );
}
