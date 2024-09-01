import React, { useState } from 'react';
import './App.css';

function App() {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [contactError, setContactError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [experience, setExperience] = useState(''); 


  const isFormValid = () => {
    return (
      firstName &&
      lastName &&
      email &&
      contact &&
      !contactError &&
      selectedOption &&
      experience && 
      selectedLocations.length > 0
    );
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    setShowOtherInput(event.target.value === 'Other');
  };

  const handleCheckboxChange = (location) => {
    setSelectedLocations((prevLocations) => {
      if (prevLocations.includes(location)) {
        return prevLocations.filter((item) => item !== location);
      } else {
        return [...prevLocations, location];
      }
    });
  };

  const handleContactChange = (event) => {
    const value = event.target.value;
    setContact(value);
    if (/[a-zA-Z]/.test(value)) {
      setContactError('Contact number should only contain digits.');
    } else {
      setContactError('');
    }
  };

  const handleClearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setContact('');
    setContactError('');
    setSelectedOption('');
    setSelectedLocations([]);
    setShowOtherInput(false);
    setExperience(''); 
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1 className="title">
          Launch your career<br />
          <span>with Us</span>
        </h1>
        <p className="description" style={{ textAlign: 'justify' }}>
          Join our team by filling out the application form. Whether front-end, back-end, or other tech roles, your next opportunity is just a step away.
        </p>
      </div>

      <div className="right-section">
        <div className="form-container">
          <form>
            <div className="input-group">
              <input
                type="text"
                placeholder="First name"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Contact"
              className="input"
              value={contact}
              onChange={handleContactChange}
            />
            {contactError && <p className="error-message">{contactError}</p>}

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="option"
                  value="Option1"
                  onChange={handleRadioChange}
                />
                Front-End
              </label>
              <label>
                <input
                  type="radio"
                  name="option"
                  value="Option2"
                  onChange={handleRadioChange}
                />
                Backend
              </label>
              <label>
                <input
                  type="radio"
                  name="option"
                  value="Other"
                  onChange={handleRadioChange}
                />
                Other
              </label>
            </div>
            {showOtherInput && (
              <input
                type="text"
                placeholder="Please specify"
                className="other-input"
              />
            )}

            <div className="dropdown-group">
              <select
                className="dropdown"
                value={experience} 
                onChange={(e) => setExperience(e.target.value)} 
              >
                <option value="" disabled>
                  Select your experience
                </option>
                <option value="1">Less than 1 Year</option>
                <option value="2">1-3 Years</option>
                <option value="3">3-5 Years</option>
                <option value="5">5+ Years</option>
              </select>
            </div>

            <div className="multi-select-group">
              {['Pune', 'Banglore', 'Remote'].map((location) => (
                <label
                  key={location}
                  className={`checkbox-label ${selectedLocations.includes(location) ? 'checked' : ''}`}
                  onClick={() => handleCheckboxChange(location)}
                >
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location)}
                    onChange={() => handleCheckboxChange(location)}
                  />
                  {location}
                </label>
              ))}
            </div>

            <div>
              <button
                type="submit"
                className={`btn-primary ${isFormValid() ? 'active' : ''}`}
                disabled={!isFormValid()}
              >
                Submit
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleClearForm}
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
