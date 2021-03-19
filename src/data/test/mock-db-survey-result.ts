import { SaveSurveyResultParams } from '@/domain/useCases/survey-result/save-survey-result'
import { SaveSurveyResultRepository } from '../protocols/db/surveyResult/save-survey-result-repository'
import { mockSurveyResultModel } from '@/domain/test'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { LoadSurveyRepository } from '@/data/protocols/db/surveyResult/load-survey-result-repository'

export const mockSaveResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyRepository {
    async loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }

  return new LoadSurveyResultRepositoryStub()
}
