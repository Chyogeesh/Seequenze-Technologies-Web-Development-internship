import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App: React.FC = () => (
    <TaskProvider>
        <div>
            <h1>Task Management</h1>
            <TaskForm />
            <TaskList />
        </div>
    </TaskProvider>
);

export default App;
