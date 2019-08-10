import React from 'react'
import { sumExercises } from '../utils/sumExercises'

const Total = ({ parts }) => {
  return <strong>Total of {sumExercises(parts)} exercises</strong>
}

export { Total }
