import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const RandomPlayer = ({ isVisible, setIsVisible, playerSL }) => {
  const cardRef = useRef(null);
  const [displayedSL, setDisplayedSL] = useState(playerSL);

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsVisible]);

  // Auto-hide the card after 2 seconds when it becomes visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide the card after 2 seconds
      }, 2000);

      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }
  }, [isVisible, setIsVisible]);
  // Animation effect to display random numbers for 1 second before showing the actual playerSL
  useEffect(() => {
      if (isVisible) {
      let interval = null;

      const animateSL = () => {
        interval = setInterval(() => {
          setDisplayedSL(Math.floor(Math.random() * 100) + 1); // Show random numbers (1-100)

        }, 100); // Change random number every 100ms

        setTimeout(() => {
          clearInterval(interval); // Stop random number generation after 1 second
          setDisplayedSL(playerSL); // Show the actual playerSL
        }, 1000); // 1 second duration for random number animation
      };

      animateSL();
      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [isVisible, playerSL]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50 
      transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        ref={cardRef}
        className={`"flex font-kanit text-[20rem] text-white flex-col items-center"`}
      >
        <div className="flex items-center">
          <span>{displayedSL}</span> {/* Show the animated or actual playerSL */}
        </div>
      </div>
    </div>
  );
};

RandomPlayer.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  playerSL: PropTypes.number.isRequired,
};

export default RandomPlayer;
