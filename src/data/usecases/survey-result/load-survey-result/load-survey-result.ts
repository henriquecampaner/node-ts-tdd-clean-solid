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
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
    )

    if (!surveyResult) {
      const survey = await this.loadSurveyById.loadById(surveyId)

      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map(answer =>
          Object.assign({}, answer, {
            count: 0,
            percent: 0,
          }),
        ),
      }
    }

    return surveyResult
  }
}
