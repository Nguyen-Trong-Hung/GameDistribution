import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DistributionPage.scss';

const DistributionPage = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    GameName: '',
    PublisherName: '',
    GameGenres: '',
    GameDescription: '',
    file: null,
  });


  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/genres');
        if (res.data.success) {
          // console.log('Genres:', res.data.data);
          setGenres(res.data.data);
        } else {
          console.error('Failed to fetch genres:', res.data.message);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    
    fetchGenres();
  }, []);
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
    <div className="distribute-form">
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
          <label>Your publisher name</label>
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
            {genres.map((genre) => (
              <button
                type="button"
                key={genre.id}
                className={`category-button ${formData.GameGenres.includes(genre.name) ? 'active' : ''}`}
                onClick={() => {
                  const newGenres = formData.GameGenres.includes(genre.name)
                    ? formData.GameGenres.filter((g) => g !== genre.name)
                    : [...formData.GameGenres, genre.name];
                  setFormData({ ...formData, GameGenres: newGenres });
                }}
              >
                {genre.name}
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
          />
        </div>

        <button type="submit" className="submit-button">
          Send your game to us - Thank you very much for your contribution!
        </button>
      </form>
    </div>
  );
};

export default DistributionPage;
