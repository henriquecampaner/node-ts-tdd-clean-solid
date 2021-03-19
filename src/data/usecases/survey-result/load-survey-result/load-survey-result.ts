import {
  SurveyResultModel,
  LoadsurveyResult,
  LoadSurveyRepository,
} from './load-survey-result-protocols'
export class DbLoadSurveyResult implements LoadsurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyRepository,
  ) {}

  async load(surveyId: string): Promise<SurveyResultModel> {
    return await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
  }
}
