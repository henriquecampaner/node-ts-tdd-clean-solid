import { AddSurveyParams } from '@/domain/useCases/survey/add-survey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveyByIdRepository } from '../protocols/db/survey/load-survey-repository-by-id'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurvey, mockSurveysModel } from '@/domain/test'
import { LoadSurveysRepository } from '../protocols/db/survey/load-survey-repository'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    add(surveyData: AddSurveyParams): Promise<void> {
      return Promise.resolve()
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = () => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurvey())
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = () => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    loadAll(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveysModel())
    }
  }

  return new LoadSurveysRepositoryStub()
}
