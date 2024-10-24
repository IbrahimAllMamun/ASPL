// src/components/NavigationCard.jsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faUsers } from '@fortawesome/free-solid-svg-icons'; // Use faImage instead of faSlideshow

const NavigationCard = ({ isVisible, setIsVisible }) => {
  const cardRef = useRef(null);

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

  // Function to handle link click
  const handleLinkClick = () => {
    setIsVisible(false); // Close the navigation card
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50 
      transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        ref={cardRef}
        className="flex font-kanit text-2xl text-white flex-col items-center"
      >
        <div className="flex items-center">
          <Link
            to="/"
            
            onClick={handleLinkClick}
          >
          <div className={`flex justify-center items-center hover:bg-orange-700 hover:scale-110 w-64 h-20 m-5 p-4 bg-green-700 rounded-3xl shadow-lg transform transition-all duration-300 
            ${isVisible ? 'scale-100' : 'scale-90'}`}>
            <FontAwesomeIcon icon={faImage} className="mr-2" /> {/* Updated icon */}
            Slideshow
          </div>
          </Link>

          <Link
          to="/teams"
          
          onClick={handleLinkClick}
        >
            <div className={`flex justify-center hover:bg-orange-700 hover:scale-110 items-center w-64 h-20 m-5 p-4 bg-green-700 rounded-3xl shadow-lg transform transition-all duration-300 
            ${isVisible ? 'scale-100' : 'scale-90'}`}>
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Teams
            </div>
          </Link>

          {/* Add more links with icons as needed */}
        </div>
      </div>
    </div>
  );
};

NavigationCard.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};

export default NavigationCard;
