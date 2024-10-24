import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { fetchTeams } from '@/services/api'; // Adjust the import path as necessary

const TeamCardForm = ({ player }) => {
  const [selectedTeam, setSelectedTeam] = useState(null); // Updated to null initially
  const [inputText, setInputText] = useState('');
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true);
      try {
        const result = await fetchTeams();
        setTeams(result);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTeams();
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTeam || !inputText || isNaN(parseInt(inputText))) {
      console.error('Invalid team or price input');
      return;
    }

    const data = {
      team: selectedTeam.id,
      player: player.SL,
      price: parseInt(inputText),
    };

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/team-players/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        setInputText('');
        setSelectedTeam(null);
      } else {
        console.error('Error:', await response.json());
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg text-white bg-gray-600/30 font-fredoka backdrop-blur-sm">
      <form id='playerForm' onSubmit={handleSubmit}>
        {/* Dropdown */}
        <div className="mb-4">
          <label htmlFor='teamName' className="block text-3xl font-medium mb-1">Select Team</label>
          <select
            id = 'teamName'
            value={selectedTeam ? selectedTeam.id : ''}
            onChange={(e) => {
              const selectedTeamId = e.target.value;
              const selectedTeamObj = teams.find(
                (team) => team.id === parseInt(selectedTeamId)
              );
              setSelectedTeam(selectedTeamObj); // Store the entire team object in the state
            }}
            className="w-full p-2 text-black border rounded-md"
            required
          >
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.team_name}
              </option>
            ))}
          </select>
        </div>

        {/* Text input and submit button side by side */}
        <div className="flex items-center gap-2">
          <input
            id = 'playerPrice'
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter price"
            className="flex-1 p-2 text-black border rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-green-500 py-2 px-4 rounded text-white hover:bg-green-700 transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </form>

      {player && player.status ? (
        <div className="relative m-0 p-0">
          <img
            src="/images/sold.svg"
            alt="sold"
            className="absolute w-96 z-50 -left-[25rem] -top-80"
          />
        </div>
      ) : null}
    </div>
  );
};

TeamCardForm.propTypes = {
  player: PropTypes.shape({
    SL: PropTypes.number.isRequired,
    status: PropTypes.bool,
  }),
};
export default TeamCardForm;
