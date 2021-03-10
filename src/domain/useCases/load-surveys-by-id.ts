import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyById {
  load(id: string): Promise<SurveyModel[]>
}
