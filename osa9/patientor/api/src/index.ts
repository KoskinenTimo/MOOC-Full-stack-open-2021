import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';
const app = express();

const origin = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: origin
};

app.use(cors(options));
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log("Someone pinged!");
  
  res.send('pong');
});

app.get('/', (_req, res) => {
  console.log("Someone pinged!");
  
  res.send('pong');
});
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});