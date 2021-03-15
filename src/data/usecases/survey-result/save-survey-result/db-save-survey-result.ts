import {
  SaveSurveyResult,
  SaveSurveyResultRepository,
  SaveSurveyResultParams,
  SurveyResultModel,
} from './db-save-survey-result-protocols'

export class DbSaveResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return await this.saveSurveyResultRepository.save(data)
  }
}
