import { useState, useEffect } from 'react';
import TeamCard from './teamCard';
import PlayerTable from './playerTable';
import { fetchTeams } from '@/services/api';

const TeamGrid = () => {
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const result = await fetchTeams();
        setTeams(result);
        console.log(result); // Log the fetched result
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadTeams();
  }, []); // Dependency array should be empty

  const handleCardClick = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  if (loading) return <div>Loading...</div>; // Show a loading message

  return (
    <div className="grid grid-cols-3 gap-8 p-6 w-screen h-screen">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          onClick={() => handleCardClick(team.id)}
          isExpanded={expandedTeam === team.id}
        />
      ))}

      {expandedTeam && (
        <div className="fixed top-0 left-0 bg-[url('../public/bg.jpg')] bg-cover bg-bottom w-screen h-screen z-9"></div>
      )}
      {expandedTeam && (
        <PlayerTable id={expandedTeam} isExpanded={expandedTeam != null} />
      )}
    </div>
  );
};

export default TeamGrid;
