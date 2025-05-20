export const calculateStage = (answeredCount, totalQuestions, maxStage) => {
  const questionsPerStage = totalQuestions / maxStage
  return Math.min(Math.floor(answeredCount / questionsPerStage) + 1, maxStage)
}

export const calculateRemainingToNextStage = (answeredCount, totalQuestions, maxStage) => {
  const questionsPerStage = totalQuestions / maxStage
  const currentStage = calculateStage(answeredCount, totalQuestions, maxStage)
  const nextStageThreshold = currentStage * questionsPerStage
  return Math.max(nextStageThreshold - answeredCount, 0)
}
