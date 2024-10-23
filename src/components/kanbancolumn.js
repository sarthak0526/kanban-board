// src/components/KanbanColumn.js
import React from 'react';
import KanbanCard from '../components/kanbancard';
import KanbanUserHeader from '../components/kanbanuserheader';
import '../styles/kanbancolumn.css';
import nopriority from '../images/No-priority.svg';
import lowpriority from '../images/Img - Low Priority.svg';
import mediumpriority from '../images/Img - Medium Priority.svg';
import highpriority from '../images/Img - High Priority.svg';
import urgentpriority from '../images/SVG - Urgent Priority colour.svg';

// Import status icons
import backlogIcon from '../images/Backlog.svg';
import todoIcon from '../images/To-do.svg';
import inProgressIcon from '../images/in-progress.svg';
import doneIcon from '../images/Done.svg';
import cancelledIcon from '../images/Cancelled.svg';

// Import the add and dot menu icons
import addIcon from '../images/add.svg';
import dotMenuIcon from '../images/3 dot menu.svg';

const priorityIcons = {
    'no priority': nopriority,
    low: lowpriority,
    medium: mediumpriority,
    high: highpriority,
    urgent: urgentpriority
};

// Map status to corresponding images
const statusIcons = {
    backlog: backlogIcon,
    todo: todoIcon,
    'in progress': inProgressIcon,
    done: doneIcon,
    cancelled: cancelledIcon
};

const KanbanColumn = ({ title, tickets, showUserHeader, user, groupBy }) => {
    const columnLabel = title.charAt(0).toUpperCase() + title.slice(1); // Capitalize the title
    const ticketCount = tickets.length;

    return (
        <div className="kanban-column">
            {showUserHeader && user ? (
                <KanbanUserHeader user={user} taskCount={ticketCount} />
            ) : (
                <div className="column-header">
                    {groupBy === 'status' ? (
                        <img
                            src={statusIcons[title.toLowerCase()]}
                            alt={`${columnLabel} Icon`}
                            className="status-icon"
                        />
                    ) : (
                        <img
                            src={priorityIcons[title.toLowerCase()]}
                            alt={`${columnLabel} Icon`}
                            className="priority-icon"
                        />
                    )}
                    <h2 className="column-title">{columnLabel}</h2>
                    <span className="ticket-count">{ticketCount}</span>
                    <div className="action-buttons">
                        <img src={addIcon} alt="Add" className="add-button" />
                        <img src={dotMenuIcon} alt="More Options" className="more-options" />
                    </div>
                </div>
            )}
            {tickets.map((ticket) => (
                <KanbanCard
                    key={ticket.id}
                    ticket={ticket}
                    user={user}
                    showButtons={groupBy !== 'status'} // Only show buttons if not grouped by status
                />
            ))}
        </div>
    );
};

export default KanbanColumn;
