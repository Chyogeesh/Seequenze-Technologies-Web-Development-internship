import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskList: React.FC = () => {
    const { tasks, deleteTask } = useTaskContext();

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.status}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
