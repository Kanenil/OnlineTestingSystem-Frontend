import {IQuestionModel} from "./question.model";

export interface ITestModel {
  id: number | string,
  name: string,
  description?: string,
  questions: IQuestionModel[]
}
