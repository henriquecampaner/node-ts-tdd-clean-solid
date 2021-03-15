import {
  SaveSurveyResultParams,
  SurveyResultModel,
} from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'

export const mockSaveSurveyResultParams = (): SurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date(),
})

export const mockSurveyResultModel = (): SaveSurveyResultParams =>
  Object.assign({}, mockSaveSurveyResultParams(), {
    id: 'any_id',
  })
