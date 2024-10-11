import React from 'react';
import './HomePage.scss'; // Import file CSS

const HomePage = () => {
  return (
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
  );
};

export default HomePage;