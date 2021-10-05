interface bmiArgs {
  height: number;
  weight: number;
}

const parseBmiArgs = (args: Array<string>): bmiArgs => {
  if (args.length !== 4) {
    throw new Error("You need height and weight to calculate bmi in this order.");    
  }
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Values must be numbers.");    
  }
  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

export function bmiCalculator (height: number, weight: number): string {
  height = (height) / 100;
  const bmi = (weight) / ((height) * (height));
  
  if (bmi < 18.5) {
    return `Underweight (Unhealthy)`;
  } else if (bmi > 23.0) {
    return `Overweight I (At risk)`;
  } else {
    return `Normal range (Healthy)`;
  }
}

try {
  const { height, weight } = parseBmiArgs(process.argv);
  console.log(bmiCalculator(height, weight));  
} catch (e) {
  console.log('There was an error:');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(e.message);  
}