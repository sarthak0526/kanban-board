// src/components/KanbanCard.js
import React, { useState } from 'react';
import '../styles/kanbancard.css';
import DoneIcon from '../images/Done.svg'; // Assuming you have these images in the specified path
import InProgressIcon from '../images/To-do.svg';

const KanbanCard = ({ ticket, user, showButtons }) => {
    const [status, setStatus] = useState(ticket.status);
  
    const handleStatusToggle = () => {
      setStatus((prevStatus) => (prevStatus === 'Done' ? 'In Progress' : 'Done'));
    };
  
    return (
      <div className="kanban-card">
        <div className="card-content">
          <div className="card-header">
            {showButtons && (
              <button className="status-dot" onClick={handleStatusToggle}>
                <img
                  src={status === 'Done' ? DoneIcon : InProgressIcon}
                  alt={status}
                  className="status-icon"
                />
              </button>
            )}
            <div className="text-section">
              <span className="card-id">{ticket.id}</span>
              <h3 className="card-title">{ticket.title}</h3>
            </div>
            {user && user.avatar ? (
              <img className="user-avatar" src={user.avatar} alt={user.name || 'User'} />
            ) : (
              <div className="user-avatar-placeholder">N/A</div>
            )}
          </div>
          <div className="card-footer">
            <span className="card-badge">{ticket.tag[0]}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default KanbanCard;
  