import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskForm: React.FC = () => {
    const { addTask } = useTaskContext();
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTask({ title, status: 'To Do' });
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="New Task"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
