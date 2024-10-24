import PropTypes from 'prop-types';

const fieldPositions = {
  GK: { top: '90%', left: '50%' },
  LB: { top: '74%', left: '30%' },
  RB: { top: '74%', left: '70%' },
  CDM: { top: '58%', left: '50%' },
  CM: { top: '46%', left: '50%' },
  LW: { top: '25%', left: '20%' },
  RW: { top: '25%', left: '80%' },
  CF: { top: '21%', left: '50%' },
};

const FootballField = ({ playingPosition }) => {
  return (
    <div className="relative w-full h-[600px] bg-green-700 border-4 border-white rounded-lg my-8">
      {/* Center Circle */}
      <div
        className="absolute w-28 h-28 border-2 border-white rounded-full"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      ></div>

      {/* Penalty Box Areas */}
      {/* Top penalty area */}
      <div
        className="absolute w-64 h-36 border-2 border-white"
        style={{ top: '0%', left: '50%', transform: 'translateX(-50%)' }}
      ></div>
      {/* Bottom penalty area */}
      <div
        className="absolute w-64 h-36 border-2 border-white"
        style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)' }}
      ></div>

      {/* Top goal area */}
      <div
        className="absolute w-40 h-20 border-2 border-white"
        style={{ top: '0%', left: '50%', transform: 'translateX(-50%)' }}
      ></div>
      {/* Bottom goal area */}
      <div
        className="absolute w-40 h-20 border-2 border-white"
        style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)' }}
      ></div>

      {/* Render All Player Positions */}
      {Object.keys(fieldPositions).map((position) => (
        <div
          key={position}
          className={`absolute rounded-full border-2 border-white z-10 ${
            position === playingPosition
              ? 'bg-orange-500 w-14 h-14 shadow-lg shadow-black/40'
              : 'bg-red-500 w-8 h-8 z-5'
          }`}
          style={{
            top: fieldPositions[position].top,
            left: fieldPositions[position].left,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-[11px]">
            {position}
          </span>
        </div>
      ))}

      {/* Top boundary goal circle */}
      <svg
        width="132"
        height="78"
        className="absolute"
        style={{ top: '20.5%', left: '50%', transform: 'translateX(-50%)' }}
      >
        <path
          d="M 0,76.8 A 76.8,76.8 0 0,1 132,76.8"
          fill="transparent"
          stroke="white"
          strokeWidth="3.6"
          transform="scale(1, -1) translate(0, -76.8)"
        />
      </svg>

      {/* Bottom boundary goal circle */}
      <svg
        width="132"
        height="78"
        className="absolute"
        style={{ bottom: '20.5%', left: '50%', transform: 'translateX(-50%)' }}
      >
        <path
          d="M 0,76.8 A 76.8,76.8 0 0,1 132,76.8"
          fill="transparent"
          stroke="white"
          strokeWidth="3.6"
        />
      </svg>

      {/* Midfield Line */}
      <div
        className="absolute w-full h-1 bg-white"
        style={{ top: '50%' }}
      ></div>

      {/* Side Lines */}
      {/* <div className="absolute inset-0 flex justify-between">
        <div className="w-1 h-full bg-white"></div>
        <div className="w-1 h-full bg-white"></div> 
      </div> */}
    </div>
  );
};



FootballField.propTypes = {
  playingPosition: PropTypes.string.isRequired, // Validate that playingPosition is a required string
};


export default FootballField;
