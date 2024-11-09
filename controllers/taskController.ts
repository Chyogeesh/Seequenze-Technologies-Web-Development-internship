import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

let tasks: { id: string; title: string; status: string }[] = [];

export const getTasks = (req: Request, res: Response) => {
    res.json(tasks);
};

export const addTask = (req: Request, res: Response) => {
    const { title, status } = req.body;
    const newTask = { id: uuidv4(), title, status };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, status } = req.body;
    tasks = tasks.map(task => (task.id === id ? { ...task, title, status } : task));
    res.json(tasks.find(task => task.id === id));
};

export const deleteTask = (req: Request, res: Response) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).end();
};
