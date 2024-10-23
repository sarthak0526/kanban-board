// src/components/DisplayControls.js
import React, { useState, useEffect, useRef } from 'react';
import '../styles/displaycontrols.css';
import displayIcon from '../images/Display.svg';

const DisplayControls = ({ setGroupBy, setSortBy }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for outside clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="display-controls-wrapper">
      <div className="display-controls" ref={dropdownRef}>
        <button className="display-button" onClick={toggleDropdown}>
          <img src={displayIcon} alt="Display Icon" className="display-icon" />
          <span className="display-text">Display</span>
        </button>
        <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
          <div className="dropdown-item">
            <label>Grouping</label>
            <select onChange={(e) => setGroupBy(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-item">
            <label>Ordering</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayControls;
