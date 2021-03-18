import { SaveSurveyResultParams } from '@/domain/useCases/survey-result/save-survey-result'
import { SaveSurveyResultRepository } from '../protocols/db/surveyResult/save-survey-result-repository'
import { mockSurveyResultModel } from '@/domain/test'
import { SurveyResultModel } from '@/domain/models/survey-result'

export const mockSaveResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }

  return new SaveSurveyResultRepositoryStub()
}
