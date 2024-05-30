import express, { Application } from 'express';
import cors from 'cors';
import mockDatabase from './app/mock/mockData';
import api from './app/routes/api';

const app: Application = express();
const port: number = Number(process.env.PORT) || 8000;

app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(express.json());

app.use("/v1", api);

app.listen(port, () => {
    mockDatabase();
    console.log(`Server is Fire at http://localhost:${port}`);
});

export default app;
