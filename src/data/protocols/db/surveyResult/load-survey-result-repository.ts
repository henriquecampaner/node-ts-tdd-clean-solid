import { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadSurveyRepository {
  loadBySurveyId(surveyId: string): Promise<SurveyResultModel>
}
