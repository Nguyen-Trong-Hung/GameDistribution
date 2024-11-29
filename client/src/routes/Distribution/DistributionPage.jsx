import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LockUserForm from "../../components/LockUserForm/LockUserForm";
import './DistributionPage.scss';

const DistributionPage = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [isLockFormOpen, setIsLockFormOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  // console.log(isLoggedIn);
  const [formData, setFormData] = useState({
    GameName: '',
    PublisherName: isLoggedIn.userInfo.username,
    GameGenres: [],
    GameDescription: '',
    file: null,
  });

  useEffect(() => {
    const checkLockStatus = async () => {
      if (isLoggedIn.userInfo.is_locked) {
        setIsLockFormOpen(true);
      }
    };

    checkLockStatus();
  }, [isLoggedIn.userInfo.is_locked]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get('https://hungnt.backendintern.online/api/genres');
        if (res.data.success) {
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

  const handleGenreClick = (genreId) => {
    const newGenres = formData.GameGenres.includes(genreId)
      ? formData.GameGenres.filter((id) => id !== genreId)
      : [...formData.GameGenres, genreId];
    setFormData({ ...formData, GameGenres: newGenres });
    console.log(newGenres);
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("GameImage", formData.file);
    data.append("GameName", formData.GameName);
    data.append("PublisherName", formData.PublisherName);
    data.append("GameGenresId", JSON.stringify(formData.GameGenres));
    data.append("GameDescription", formData.GameDescription);

    try {
      const res = await axios.post('https://hungnt.backendintern.online/api/game/create-game', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        alert('Thank you for your contribution! Let\'s wait for Admin to approve your game.');
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
      {isLockFormOpen && <LockUserForm isOpen={isLockFormOpen} onClose={() => setIsLockFormOpen(false)} />}
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
            disabled
          />
        </div>

        <div className="form-group">
          <label>Choose your game genre</label>
          <div className="categories">
            {genres.map((genre) => (
              <button
                type="button"
                key={genre.id}
                className={`category-button ${formData.GameGenres.includes(genre.id) ? 'active' : ''}`}
                onClick={() => handleGenreClick(genre.id)}
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
