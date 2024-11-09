import React, { createContext, useState, useContext, useEffect } from 'react';
import { Task } from '../types';

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    fetchTasks: () => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
    };

    const addTask = async (task: Task) => {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
        });
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
    };

    const updateTask = async (id: string, updates: Partial<Task>) => {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
        const updatedTask = await response.json();
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    };

    const deleteTask = async (id: string) => {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        setTasks(tasks.filter(task => task.id !== id));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
    return context;
};
