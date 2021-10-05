interface exerciseObject { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseArgs {
  target: number;
  excercises: Array<number>;
}

const parseExerciseArgs = (args: Array<string>): exerciseArgs => {
  if (args.length < 4) {
    throw new Error("You need atleast target value and 1 exercise in this order.");    
  }
  const parsedExercises = args.slice(3).map(e => Number(e));
  
  if (isNaN(Number(args[2])) || parsedExercises.filter(e => isNaN(e)).length) {
    throw new Error("All values given must be numbers.");    
  }
  return {
    target: Number(args[2]),
    excercises: parsedExercises,
  };
};

export const calculateExercises  = (exercises: Array<number>, targetValue: number): exerciseObject => {
  const averageValue = exercises.reduce((a, b) => a + b) / exercises.length;
  let ratingValue;
  let ratingDesc;
  if (averageValue < 1) {
    ratingValue = 1;
    ratingDesc = "A bit execise is needed!";
  } else if (averageValue < 2) {
    ratingValue = 2;
    ratingDesc = "This amount training will keep your current form!";
  } else {
    ratingValue = 3;
    ratingDesc = "You are training enough to make progress!";
  }
  return {
    periodLength: exercises.length,
    trainingDays: exercises.filter(day => day !== 0).length,
    success: averageValue > targetValue ? true : false,
    rating: ratingValue,
    ratingDescription: ratingDesc,
    target: Number(targetValue),
    average: averageValue
  };
};

try {
  const { target, excercises } = parseExerciseArgs(process.argv);
  console.log(calculateExercises(excercises, target));  
} catch (e) {
  console.log('There was an error:');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(e.message);  
}