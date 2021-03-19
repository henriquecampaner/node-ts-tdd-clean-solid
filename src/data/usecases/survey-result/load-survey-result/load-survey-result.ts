import {
  SurveyResultModel,
  LoadsurveyResult,
  LoadSurveyRepository,
  LoadSurveyById,
} from './load-survey-result-protocols'
export class DbLoadSurveyResult implements LoadsurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyRepository,
    private readonly loadSurveyById: LoadSurveyById,
  ) {}

  async load(surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
    )

    if (!surveyResult) {
      await this.loadSurveyById.loadById(surveyId)
    }

    return surveyResult
  }
}
