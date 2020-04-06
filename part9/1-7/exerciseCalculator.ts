interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const descriptionsByRating = (rating: number): string => {
  if (rating <= 1) return "Bad"
  if (rating <= 2) return "Could be better"
  return "Good"
}

const calculateExercises = (done: number[], target: number): Result => {
  let sum = 0
  let trainingDays = 0
  for (let hoursInDay of done) {
    sum += hoursInDay
    trainingDays += hoursInDay > 0 ? 1 : 0
  }
  const baseRate = 1 + Math.floor((sum / (target * done.length)) * 2)
  return {
    periodLength: done.length,
    trainingDays: trainingDays,
    success: sum >= target * done.length,
    rating: baseRate < 3 ? baseRate : 3,
    ratingDescription: descriptionsByRating(baseRate),
    target: target,
    average: sum / done.length
  }
}

interface Arguments {
  done: number[]
  target: number
}

const parseExerciseArguments = (args: Array<String>): Arguments => {
  if (args.length < 4) throw new Error("Not enought arguments")
  if (isNaN(Number(args[3]))) throw new Error("Target must be number")
  const done = []
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) throw new Error("Done hours must be numbers")
    done.push(Number(args[i]))
  }
  return {
    done: done,
    target: Number(args[2])
  }
}

try {
  const { done, target } = parseExerciseArguments(process.argv)
  console.log(calculateExercises(done, target))
} catch (e) {
  console.log(e.stack)
}
