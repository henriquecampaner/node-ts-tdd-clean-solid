import { SurveyModel } from '@/domain/models/survey'
import { AddSurvey, AddSurveyParams } from '@/domain/useCases/survey/add-survey'
import { LoadSurveys } from '@/domain/useCases/survey/load-surveys'
import { mockSurvey, mockSurveysModel } from '@/domain/test'
import { LoadSurveyById } from '@/domain/useCases/survey/load-survey-by-id'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(data: AddSurveyParams): Promise<void> {
      return Promise.resolve()
    }
  }

  return new AddSurveyStub()
}

export const mockLoadSurveys = () => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveysModel())
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurvey())
    }
  }

  return new LoadSurveyByIdStub()
}
