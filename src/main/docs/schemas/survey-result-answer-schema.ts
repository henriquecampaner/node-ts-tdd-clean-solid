export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string',
    },
    answer: {
      type: 'string',
    },
    count: {
      type: 'number',
    },
    total: {
      type: 'number',
    },
  },
  required: ['answer', 'count', 'percent'],
}
