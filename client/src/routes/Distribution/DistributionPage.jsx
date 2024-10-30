import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DistributionPage.scss';

const DistributionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    GameName: '',
    PublisherName: '',
    GameGenres: '',
    GameDescription: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("GameImage", formData.file);
    data.append("GameName", formData.GameName);
    data.append("PublisherName", formData.PublisherName);
    data.append("GameGenres", formData.GameGenres);
    data.append("GameDescription", formData.GameDescription);

    try {
      const res = await axios.post('http://localhost:8800/api/game/create-game', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        alert('Game created successfully');
        navigate("/");
      } else {
        console.error('Failed to create game:', res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="contact-form">
      <h1>Please distribute your game</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your game name</label>
          <input
            type="text"
            name="GameName"
            placeholder="amunra&&yooyunGame"
            value={formData.GameName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="PublisherName"
            placeholder="Amunra&&YooYun"
            value={formData.PublisherName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Choose your game genre</label>
          <div className="categories">
            {[
              'NEW PUBLISHER',
              'GAME ACTIVATION',
              'FINANCE',
              'TECHNICAL',
              'GAME BUG REPORT',
              'BUSINESS OPPORTUNITIES',
              'SITE BUILDER',
              'GENERAL',
            ].map((category) => (
              <button
                type="button"
                key={category}
                className={`category-button ${formData.GameGenres === category ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, GameGenres: category })}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Description of your game</label>
          <textarea
            name="GameDescription"
            placeholder="Description"
            value={formData.GameDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Attach your game</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            multiple
          />
        </div>

        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default DistributionPage;
