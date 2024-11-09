import express, { Application } from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';

const app: Application = express();

app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
