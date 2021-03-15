import { SurveyModel } from '@/domain/models/survey'
import { AddSurvey, AddSurveyParams } from '@/domain/useCases/survey/add-survey'
import { LoadSurveys } from '@/domain/useCases/survey/load-surveys'
import {
  mockSurvey,
  mockSurveysModel,
  mockSaveSurveyResultParams,
} from '@/domain/test'
import { LoadSurveyById } from '@/domain/useCases/survey/load-survey-by-id'
import {
  SaveSurveyResult,
  SaveSurveyResultParams,
} from '@/domain/useCases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'

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

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSaveSurveyResultParams())
    }
  }
  return new SaveSurveyResultStub()
}
