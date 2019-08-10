export const sumExercises = arr => {
  return arr.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
}
