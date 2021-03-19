import { SaveSurveyResultParams } from '@/domain/useCases/survey-result/save-survey-result'

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<void>
}
