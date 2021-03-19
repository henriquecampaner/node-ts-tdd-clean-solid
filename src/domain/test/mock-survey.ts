import { AddSurveyParams } from '@/presentation/controllers/survey/add-survey/add-survey-controller-protocols'
import { SurveyModel } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller-protocols'

export const mockSurvey = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer',
      },
      {
        answer: 'other_answer',
        image: 'any_image',
      },
    ],
    date: new Date(),
  }
}

export const mockSurveysModel = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
      ],
      date: new Date(),
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [
        {
          image: 'other_image',
          answer: 'other_answer',
        },
      ],
      date: new Date(),
    },
  ]
}

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  date: new Date(),
})
