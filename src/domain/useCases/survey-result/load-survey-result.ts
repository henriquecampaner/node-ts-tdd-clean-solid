import { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadsurveyResult {
  load(surveyId: string): Promise<SurveyResultModel>
}
