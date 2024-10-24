import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPlayers, fetchRandomPlayer } from '@/services/api';
import TeamGrid from './components/teams/teamGrid';
import Slideshow from './components/slides/slideShow';
import NavigationCard from '@/components/popup/navigationCard'; // Adjust the import path accordingly
import RandomPlayer from '@/components/popup/random'; // Adjust the import path accordingly

function App() {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState(null); // Use null to represent no selected player
  const [loadingPlayers, setLoadingPlayers] = useState(true); // Separate loading states
  const [loadingRandomPlayer, setLoadingRandomPlayer] = useState(false);
  const [isNavVisible, setNavVisible] = useState(false);
  const [isRanVisible, setRanVisible] = useState(false);

  // Fetch all players when the component mounts
  useEffect(() => {
    const loadPlayers = async () => {
      setLoadingPlayers(true);
      try {
        const result = await fetchPlayers();
        setPlayers(result);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoadingPlayers(false);
      }
    };

    loadPlayers();
  }, []);

  // Handle key press events for toggling navigation cards and fetching random players
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.altKey && event.code === 'Space') {
        event.preventDefault();
        setNavVisible((prev) => !prev); // Toggle navigation card visibility
      } else if (event.ctrlKey && event.altKey && event.code === 'KeyR') {
        event.preventDefault();
        setRanVisible((prev) => !prev); // Toggle random player visibility

        const loadRandomPlayer = async () => {
          setLoadingRandomPlayer(true);
          try {
            const result = await fetchRandomPlayer();
            setPlayer(result); // Set the fetched random player
          } catch (error) {
            console.error('Error fetching random player:', error);
          } finally {
            setLoadingRandomPlayer(false);
          }
        };

        loadRandomPlayer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Show loading indicator when fetching players or random player
  if (loadingPlayers || (isRanVisible && loadingRandomPlayer)) {

    return (
      <div className="fixed top-0 left-0 bg-[url('/public/bg.jpg')] bg-cover bg-bottom w-screen h-screen">
    <div className='absolute top-10 left-10 z-50'>Loading...
    </div>
    </div>
    );
  }

  // Set the initialSL based on the random player or the first player from the list
  const initialSL = player?.SL || (players.length > 0 ? players[0].SL : null);

  return (
    <Router>
      <div className="fixed top-0 left-0 bg-[url('/public/bg.jpg')] bg-cover bg-bottom w-screen h-screen">
        {/* Render navigation and random player cards */}
        <NavigationCard isVisible={isNavVisible} setIsVisible={setNavVisible} />
        <RandomPlayer isVisible={isRanVisible} setIsVisible={setRanVisible} playerSL={player?.SL || 0} />

        {/* Define the routes for the app */}
        <Routes>
          <Route
            path="/"
            element={<Slideshow initialSL={initialSL} totalPlayers={players.length} />}
          />
          <Route path="/teams" element={<TeamGrid />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
