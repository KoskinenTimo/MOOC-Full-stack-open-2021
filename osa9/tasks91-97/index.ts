import express from 'express';
import { bmiCalculator as bmi } from './bmiCalculator';
import { calculateExercises as exercise }  from './exerciseCalculator';
import { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get('/hello', (_req,res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
  const { height, weight } = req.query;
  if (
    isNaN(Number(height))
    || isNaN(Number(weight))
    || !height
    || !weight
  ) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmiText = bmi(Number(height),Number(weight));
    res.json({height, weight, bmi: bmiText});
  }  
});

interface exerciseBody {
  target: number,
  daily_exercises: Array<number>
}
interface CustomRequest<T> extends Request {
  body: T
}
app.post('/exercises', (req: CustomRequest<exerciseBody>, res: Response) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ error: "parameters missing" });
  } else {
    const { target, daily_exercises } = data;
    if (!target || !daily_exercises) {
      res.status(400).json({ error: "parameters missing" });
    } else {
      const parsed_daily_exercises = daily_exercises.map(e => Number(e));
      const parsed_target = Number(target);
      if (isNaN(parsed_target) || parsed_daily_exercises.filter(e => isNaN(e)).length) {
        res.status(400).json({ error: "malformatted parameters" });
      } else {
        const result = exercise(parsed_daily_exercises, target);
        res.json({ ...result }); 
      }
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});