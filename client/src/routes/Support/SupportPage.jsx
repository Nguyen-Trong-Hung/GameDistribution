import React, { useState } from 'react';
import './SupportPage.scss';

const SupportPage = () => {
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="contact-form">
      <h1>Contact GameDistribution</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your name</label>
          <input
            type="text"
            name="name"
            placeholder="Amunra"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Your email address</label>
          <input
            type="email"
            name="email"
            placeholder="amunra&&yooyun@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Please choose a category for your inquiry</label>
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
                className={`category-button ${
                  formData.category === category ? 'active' : ''
                }`}
                onClick={() => setFormData({ ...formData, category })}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Please tell us more about your inquiry</label>
          <textarea
            name="message"
            placeholder="Please also include your Developer or Publisher name. If your question concerns a specific game, please add the game name and GameID as well."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Attach file (optional)</label>
          <input type="file" name="file" onChange={handleChange} />
        </div>

        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
      <div className="faq-links">
        <a href="/developers">For Developers</a> - <a href="/publishers">For Publishers</a>
      </div>
    </div>
  );
};

export default SupportPage;
