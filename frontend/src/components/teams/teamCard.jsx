import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { fetchTeamPlayer } from '@/services/api';
import ProgressBar from '@/components/teams/progressBar';

const TeamCard = ({ team, onClick, isExpanded }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true);
      try {
        const result = await fetchTeamPlayer(team.id); // Fetch players based on team ID
        setPlayers(result); // Set the players state
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false); // Loading ends regardless of success or failure
      }
    };

    loadPlayers();
  }, [team.id]); // Only re-fetch when team.id changes

  const total_player = 11
  const max_player = 12
  const player_number = Object.keys(players).length;
  if (loading) return <div>Loading...</div>; // Show a loading message

  return (
    <div
      className={`p-5 border rounded-xl shadow-md hover:scale-105 ${(player_number==max_player || team.balance<20)?'bg-red-400':'bg-white'} cursor-pointer  transform transition-transform duration-300 ease-in-out 
          ${isExpanded ? 'fixed top-10 left-10 w-[45vw] z-10 h-[90vh] scale-105' : 'w-full h-full scale-100'}`}
      onClick={onClick}
    >
      <div className={`h-auto w-full ${isExpanded ? 'my-[20vh]' : 'h-full'}`}>
      <div className={`flex flex-col justify-between  ${isExpanded ? 'h-auto' : 'h-full'}`}>
        <div
          className={`flex items-center justify-center transition-all duration-300 flex-col ${isExpanded ? 'scale-110' : ''}`}
        >
          <img
            src={`/logo/${team.team_name}.png`}
            alt={team.team_name}
            className={`w-40 mb`}
          />
          <div className={`font-kanit mb-5 text-center ${isExpanded ? '' : 'm-5' }`}>
            <h2 className="text-3xl font-bold mb-2">{team.team_name}</h2>
            <p className="text-2xl text-gray-600">Players: {player_number}</p>
            <p className="text-2xl text-gray-600">Next Bid Max : {player_number<total_player? (team.balance - (total_player-player_number-1)*20):team.balance}</p>
          </div>
        </div>
        <div className={`${isExpanded ? 'mx-20 mt-10' : 'm-4'}`}>

        <ProgressBar progress={team.balance} />
        </div>
      </div>

      {/* {isExpanded && (
        <div className="mt-4 text-black transition-opacity duration-500 opacity-100">
          <p>Some extra info about the team here.</p>
        </div>
      )} */}
      </div>
    </div>
  );
};

// PropTypes validation
TeamCard.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    team_name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired, // 'team' is an object with required fields
  onClick: PropTypes.func.isRequired, // 'onClick' is a required function
  isExpanded: PropTypes.bool.isRequired, // 'isExpanded' is a required boolean
};




export default TeamCard;
