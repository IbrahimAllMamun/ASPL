import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { fetchTeamPlayer } from '@/services/api';

const PlayerTable = ({ id, isExpanded }) => {
  const [teamPlayers, setTeamPlayers] = useState([]); // Renamed for clarity
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true);
      try {
        const result = await fetchTeamPlayer(id);
        setTeamPlayers(result); // Set the fetched result
        console.log(result); // Log the fetched result
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, [id]); // Include id in the dependency array

  if (loading) return <div>Loading...</div>; // Show a loading message

  return (
    <div
      className={`fixed top-10 p-5 w-[45vw] z-10 h-[90vh] border scale-105 rounded-xl shadow-md bg-white animate-right-left duration-400 
      ${isExpanded ? 'right-10' : '-right-96'}`}
    >
      <div className="overflow-hidden h-full m-5 font-fredoka font-medium">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">SL</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Batch</th>
              <th className="py-2 px-4">Position</th>
              <th className="py-2 px-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {teamPlayers.map((teamPlayer) => (
              <tr key={teamPlayer.player.SL} className="border-b hover:bg-gray-50 transition-all duration-200">
                <td className="py-2 px-4">{teamPlayer.player.SL}</td>
                <td className="py-2 px-4">{teamPlayer.player.name}</td>
                <td className="py-2 px-4">{teamPlayer.player.batch}</td>
                <td className="py-2 px-4">{teamPlayer.player.playingPosition}</td>
                <td className="py-2 px-4">${teamPlayer.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

PlayerTable.propTypes = {
  id: PropTypes.number.isRequired, // 'id' is a required number
  isExpanded: PropTypes.bool.isRequired, // 'isExpanded' is a required boolean
};

export default PlayerTable;
