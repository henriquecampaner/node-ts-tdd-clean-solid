import { SaveSurveyResultParams } from '@/domain/useCases/survey-result/save-survey-result'
import { SaveSurveyResultRepository } from '../protocols/db/surveyResult/save-survey-result-repository'
import { mockSaveSurveyResultParams } from '@/domain/test'
import { SurveyResultModel } from '@/domain/models/survey-result'

export const mockSaveResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSaveSurveyResultParams()))
    }
  }

  return new SaveSurveyResultRepositoryStub()
}
