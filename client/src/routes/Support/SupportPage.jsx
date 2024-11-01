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
      <h1>Contact XGame</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-left">
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
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
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
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-right">
          <div className="form-group">
            <label>Your message</label>
            <textarea
              name="message"
              placeholder="Enter your message here"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Attach a file</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SupportPage;