import {
  HttpRequest,
  SurveyModel,
  LoadSurveyById,
} from './save-survey-result-controller-protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    loadById(id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }

  return new LoadSurveyByIdStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyById: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyById = makeLoadSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyById)

  return {
    sut,
    loadSurveyById,
  }
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id',
  },
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  date: new Date(),
})

describe('SaveSurveyResult Controller', () => {
  it('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyById } = makeSut()

    const loadSpyt = jest.spyOn(loadSurveyById, 'loadById')

    await sut.handle(makeFakeRequest())

    expect(loadSpyt).toHaveBeenCalledWith('any_survey_id')
  })
})
