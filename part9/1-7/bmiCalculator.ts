const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));

  if (bmi < 15) return "Very severly underweight";
  if (bmi < 16) return "Severly underweight";
  if (bmi < 18.5) return "Underweight";
  if (bmi <= 25) return "Normal (healthy weight)";
  if (bmi < 30) return "Overweight";
  if (bmi < 35) return "Obese Class I (Moderately obese)";
  if (bmi < 40) return "Obese Class II (Severely obese)";
  return "Obese class III (Very severity obese)";
};

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error("Not enought arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (Number(args[3]) < 0.1)
      throw new Error("Weight must be greater than 0 kg");
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error("Values were not numbers");
  }
};

if (process.argv.length > 1 && process.argv[1] === "calculateBmi") {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    console.log(e.stack);
  }
}

export { calculateBmi };
