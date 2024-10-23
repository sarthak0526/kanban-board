// KanbanUserHeader.js
import React from 'react';
import '../styles/kanbanuserheader.css';
import addIcon from '../images/add.svg';
import dotMenuIcon from '../images/3 dot menu.svg';

const KanbanUserHeader = ({ user, taskCount }) => {
    return (
        <div className="user-header">
            <div className="user-info">
                <div className="user-avatar">
                    {user.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
                <span className="task-count">{taskCount}</span>
            </div>
            <div className="action-buttons">
                <img src={addIcon} alt="Add Task" />
                <img src={dotMenuIcon} alt="More Options" />
            </div>
        </div>
    );
};

export default KanbanUserHeader;
