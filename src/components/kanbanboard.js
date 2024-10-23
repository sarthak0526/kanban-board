// src/components/KanbanBoard.js
import React, { useState, useEffect, useRef } from 'react';
import { fetchTickets } from '../services/api';
import KanbanColumn from '../components/kanbancolumn';
import DisplayControls from '../components/displaycontrol';
import '../styles/kanbanboard.css';

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [groupBy, setGroupBy] = useState('status'); // Group by status initially
    const [sortBy, setSortBy] = useState('priority'); // Sort by priority initially
    const [users, setUsers] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const getTickets = async () => {
            try {
                const data = await fetchTickets();
                if (data && Array.isArray(data.tickets)) {
                    setTickets(data.tickets);
                    setUsers(data.users || []); // Set users from the API response
                } else {
                    console.error('Expected an array of tickets, but received:', data);
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        getTickets();
    }, []);

    // Toggle the dropdown open/close state
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close the dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const groupTickets = () => {
        if (!Array.isArray(tickets) || tickets.length === 0) {
            return { 'No Data': [] };
        }

        if (groupBy === 'status') {
            const statusGroups = {
                backlog: [],
                todo: [],
                'in progress': [],
                done: [],
                cancelled: []
            };

            tickets.forEach(ticket => {
                const statusKey = (ticket.status || 'backlog').toLowerCase();
                if (statusGroups[statusKey]) {
                    statusGroups[statusKey].push(ticket);
                }
            });

            return statusGroups;
        } else if (groupBy === 'priority') {
            const priorityGroups = {
                'no priority': [],
                low: [],
                medium: [],
                high: [],
                urgent: []
            };

            tickets.forEach(ticket => {
                const priorityKey = getPriorityLabel(ticket.priority);
                if (priorityGroups[priorityKey]) {
                    priorityGroups[priorityKey].push(ticket);
                }
            });

            return priorityGroups;
        } else {
            const userGroups = tickets.reduce((acc, ticket) => {
                const userKey = ticket.userId || 'No Group';
                if (!acc[userKey]) acc[userKey] = [];
                acc[userKey].push(ticket);
                return acc;
            }, {});

            return userGroups;
        }
    };

    const getPriorityLabel = (priority) => {
        switch (priority) {
            case 4:
                return 'urgent';
            case 3:
                return 'high';
            case 2:
                return 'medium';
            case 1:
                return 'low';
            default:
                return 'no priority';
        }
    };

    const sortTickets = (ticketGroup) => {
        if (!Array.isArray(ticketGroup)) {
            return [];
        }

        return [...ticketGroup].sort((a, b) => {
            if (sortBy === 'priority') {
                return b.priority - a.priority;
            } else if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    const groupedTickets = groupTickets();
    const columnOrder =
        groupBy === 'status'
            ? ['backlog', 'todo', 'in progress', 'done', 'cancelled']
            : groupBy === 'priority'
            ? ['no priority', 'low', 'medium', 'high', 'urgent']
            : Object.keys(groupedTickets);

    return (
        <div className="kanban-board">
            <div className="display-controls-wrapper" ref={dropdownRef}>
                <DisplayControls
                    setGroupBy={setGroupBy}
                    setSortBy={setSortBy}
                    toggleDropdown={toggleDropdown}
                    isDropdownOpen={isDropdownOpen}
                />
                {isDropdownOpen && <div className="dropdown-overlay" onClick={() => setIsDropdownOpen(false)} />}
            </div>
            <div className="columns">
                {columnOrder.map((columnKey) => {
                    const user =
                        groupBy === 'user'
                            ? users.find((u) => u.id === columnKey)
                            : null;
                    const taskCount = groupedTickets[columnKey]?.length || 0; // Calculate task count

                    return (
                        <KanbanColumn
                            key={columnKey}
                            title={columnKey}
                            tickets={sortTickets(groupedTickets[columnKey])}
                            showUserHeader={groupBy === 'user'}
                            user={user}
                            taskCount={taskCount} // Pass the task count to KanbanColumn
                            groupBy={groupBy}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default KanbanBoard;
