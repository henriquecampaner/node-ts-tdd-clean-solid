import { LoadSurveyRepository } from '@/data/protocols/db/surveyResult/load-survey-result-repository'
import {
  SaveSurveyResult,
  SaveSurveyResultRepository,
  SaveSurveyResultParams,
  SurveyResultModel,
} from './db-save-survey-result-protocols'

export class DbSaveResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyRepository,
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)

    return await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
  }
}
