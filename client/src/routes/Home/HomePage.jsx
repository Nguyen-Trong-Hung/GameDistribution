import React from 'react';
import './HomePage.scss'; // Import file CSS
import GameList from '../../components/gameList/GameList';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className='intro'>
        <div className='title'>
          <h1>High-Yield Solutions</h1>
          <h1>For Publishers</h1>
        </div>
        <div className='slogan'>
          <p>Discover the advantages of </p>
          <p>partnering with GameDistribution</p>
        </div>
        <button>Show More</button>
        <img src="/gamedistributionpublisher.png-removebg.png" alt="Game Distribution Publisher" />
      </div>
      <div className="gamelist">
        <div className="titlegamelist">
          <h1>Featured Game</h1>
        </div>
          <GameList />
      </div>
    </div>
  );
};

export default HomePage;